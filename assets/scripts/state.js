/**
 * state.js - State Management System
 * Centralized state management with pub/sub pattern
 * Dependencies: Utils for localStorage
 */

const StateManager = (() => {
  // Private state object
  let state = {
    user: {
      name: '',
      visitCount: 0,
      lastVisit: null,
      preferences: {}
    },
    ui: {
      theme: 'romantic',
      soundEnabled: true,
      particlesEnabled: true,
      currentPage: '',
      isLoading: false
    },
    game: {
      currentLevel: 1,
      score: 0,
      highScore: 0
    },
    memories: [],
    gallery: {
      currentIndex: 0,
      images: []
    }
  };

  // Subscribers for state changes
  const subscribers = {};

  // Initialize state from localStorage
  const init = () => {
    const savedState = Utils.storage.get('appState');
    if (savedState) {
      state = { ...state, ...savedState };
    }
    state.user.visitCount += 1;
    state.user.lastVisit = new Date().toISOString();
    saveState();
  };

  // Save state to localStorage
  const saveState = () => {
    Utils.storage.set('appState', state);
  };

  // Get entire state or specific path
  const getState = (path) => {
    if (!path) return { ...state };
    
    const keys = path.split('.');
    let value = state;
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return undefined;
      }
    }
    
    return value;
  };

  // Set state and notify subscribers
  const setState = (path, value) => {
    const keys = path.split('.');
    let current = state;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    // Set the value
    const lastKey = keys[keys.length - 1];
    const oldValue = current[lastKey];
    current[lastKey] = value;
    
    // Save to localStorage
    saveState();
    
    // Notify subscribers
    notify(path, value, oldValue);
    
    return value;
  };

  // Subscribe to state changes
  const subscribe = (path, callback) => {
    if (!subscribers[path]) {
      subscribers[path] = [];
    }
    subscribers[path].push(callback);
    
    // Return unsubscribe function
    return () => {
      subscribers[path] = subscribers[path].filter(cb => cb !== callback);
    };
  };

  // Notify subscribers of state changes
  const notify = (path, newValue, oldValue) => {
    // Notify exact path subscribers
    if (subscribers[path]) {
      subscribers[path].forEach(callback => {
        callback(newValue, oldValue);
      });
    }
    
    // Notify parent path subscribers (e.g., 'user' for 'user.name')
    const pathParts = path.split('.');
    for (let i = pathParts.length - 1; i > 0; i--) {
      const parentPath = pathParts.slice(0, i).join('.');
      if (subscribers[parentPath]) {
        subscribers[parentPath].forEach(callback => {
          callback(getState(parentPath), null);
        });
      }
    }
  };

  // Update state (merge objects)
  const updateState = (path, updates) => {
    const current = getState(path);
    if (typeof current === 'object' && typeof updates === 'object') {
      setState(path, { ...current, ...updates });
    } else {
      setState(path, updates);
    }
  };

  // Reset state to defaults
  const resetState = () => {
    state = {
      user: {
        name: '',
        visitCount: 0,
        lastVisit: null,
        preferences: {}
      },
      ui: {
        theme: 'romantic',
        soundEnabled: true,
        particlesEnabled: true,
        currentPage: '',
        isLoading: false
      },
      game: {
        currentLevel: 1,
        score: 0,
        highScore: 0
      },
      memories: [],
      gallery: {
        currentIndex: 0,
        images: []
      }
    };
    saveState();
    notify('*', state, null);
  };

  // Clear localStorage
  const clearStorage = () => {
    Utils.storage.remove('appState');
    resetState();
  };

  // Debug helper
  const debug = () => {
    console.log('Current State:', state);
    console.log('Subscribers:', subscribers);
  };

  // Public API
  return {
    init,
    getState,
    setState,
    updateState,
    subscribe,
    resetState,
    clearStorage,
    debug
  };
})();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    StateManager.init();
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateManager;
}
