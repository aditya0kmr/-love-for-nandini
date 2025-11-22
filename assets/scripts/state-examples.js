/**
 * state-examples.js - Practical State Management Examples
 * Shows how to use StateManager for AI content, user preferences, and game states
 * Dependencies: state.js, utils.js
 */

// ===================================
// 1. AI-Generated Content State
// ===================================

const AIContentManager = {
  // Save generated love letter
  saveGeneratedLetter: (letterData) => {
    const letters = StateManager.getState('ai.generatedLetters') || [];
    const newLetter = {
      id: Date.now(),
      content: letterData.content,
      type: letterData.type, // 'poem', 'letter', 'message'
      theme: letterData.theme,
      timestamp: new Date().toISOString(),
      isFavorite: false
    };
    
    letters.unshift(newLetter); // Add to beginning
    
    // Keep only last 20 letters
    if (letters.length > 20) {
      letters.pop();
    }
    
    StateManager.setState('ai.generatedLetters', letters);
    console.log('Letter saved:', newLetter.id);
    return newLetter;
  },

  // Mark letter as favorite
  toggleFavorite: (letterId) => {
    const letters = StateManager.getState('ai.generatedLetters') || [];
    const letter = letters.find(l => l.id === letterId);
    
    if (letter) {
      letter.isFavorite = !letter.isFavorite;
      StateManager.setState('ai.generatedLetters', letters);
      return letter.isFavorite;
    }
    return false;
  },

  // Get all favorites
  getFavorites: () => {
    const letters = StateManager.getState('ai.generatedLetters') || [];
    return letters.filter(l => l.isFavorite);
  },

  // Delete a letter
  deleteLetter: (letterId) => {
    let letters = StateManager.getState('ai.generatedLetters') || [];
    letters = letters.filter(l => l.id !== letterId);
    StateManager.setState('ai.generatedLetters', letters);
  },

  // Get letter by ID
  getLetter: (letterId) => {
    const letters = StateManager.getState('ai.generatedLetters') || [];
    return letters.find(l => l.id === letterId);
  },

  // Initialize AI state
  init: () => {
    if (!StateManager.getState('ai')) {
      StateManager.setState('ai', {
        generatedLetters: [],
        lastGeneratedTheme: '',
        totalGenerations: 0
      });
    }
  }
};

// ===================================
// 2. User Preferences State
// ===================================

const PreferencesManager = {
  // Theme preferences
  setTheme: (themeName) => {
    StateManager.setState('preferences.theme', themeName);
    document.body.className = `theme-${themeName}`;
  },

  getTheme: () => {
    return StateManager.getState('preferences.theme') || 'romantic';
  },

  // Sound preferences
  toggleSound: () => {
    const current = StateManager.getState('preferences.soundEnabled');
    StateManager.setState('preferences.soundEnabled', !current);
    return !current;
  },

  isSoundEnabled: () => {
    return StateManager.getState('preferences.soundEnabled') !== false;
  },

  // Particle effects
  toggleParticles: () => {
    const current = StateManager.getState('preferences.particlesEnabled');
    StateManager.setState('preferences.particlesEnabled', !current);
    return !current;
  },

  areParticlesEnabled: () => {
    return StateManager.getState('preferences.particlesEnabled') !== false;
  },

  // Animation speed
  setAnimationSpeed: (speed) => {
    // 'slow', 'normal', 'fast'
    StateManager.setState('preferences.animationSpeed', speed);
    
    const multipliers = { slow: 1.5, normal: 1, fast: 0.7 };
    const multiplier = multipliers[speed] || 1;
    
    // Update CONFIG animation duration
    if (typeof CONFIG !== 'undefined') {
      CONFIG.ANIMATIONS.DURATION = CONFIG.ANIMATIONS.DURATION * multiplier;
    }
  },

  // Font size for accessibility
  setFontSize: (size) => {
    // 'small', 'medium', 'large'
    StateManager.setState('preferences.fontSize', size);
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.fontSize = sizes[size] || '16px';
  },

  // Initialize preferences
  init: () => {
    if (!StateManager.getState('preferences')) {
      StateManager.setState('preferences', {
        theme: 'romantic',
        soundEnabled: true,
        particlesEnabled: true,
        animationSpeed: 'normal',
        fontSize: 'medium',
        notifications: true
      });
    }
  },

  // Apply saved preferences on page load
  apply: () => {
    const prefs = StateManager.getState('preferences') || {};
    
    if (prefs.theme) PreferencesManager.setTheme(prefs.theme);
    if (prefs.fontSize) PreferencesManager.setFontSize(prefs.fontSize);
    if (prefs.animationSpeed) PreferencesManager.setAnimationSpeed(prefs.animationSpeed);
  }
};

// ===================================
// 3. Game State Management
// ===================================

const GameStateManager = {
  // Memory card game
  initMemoryGame: () => {
    StateManager.setState('game.memory', {
      level: 1,
      score: 0,
      attempts: 0,
      matches: 0,
      timeStarted: Date.now(),
      bestTime: StateManager.getState('game.memory.bestTime') || Infinity,
      bestScore: StateManager.getState('game.memory.bestScore') || 0
    });
  },

  updateMemoryGame: (updates) => {
    const current = StateManager.getState('game.memory') || {};
    StateManager.updateState('game.memory', { ...current, ...updates });
  },

  completeMemoryGame: () => {
    const game = StateManager.getState('game.memory');
    const timeTaken = (Date.now() - game.timeStarted) / 1000;
    
    // Update best scores
    if (game.score > game.bestScore) {
      StateManager.setState('game.memory.bestScore', game.score);
    }
    if (timeTaken < game.bestTime) {
      StateManager.setState('game.memory.bestTime', timeTaken);
    }

    return {
      score: game.score,
      time: timeTaken,
      isNewRecord: game.score > game.bestScore
    };
  },

  // Love meter game
  updateLoveMeter: (percentage) => {
    StateManager.setState('game.loveMeter.current', percentage);
    
    const highest = StateManager.getState('game.loveMeter.highest') || 0;
    if (percentage > highest) {
      StateManager.setState('game.loveMeter.highest', percentage);
    }
  },

  // Timeline progress
  markTimelineViewed: (milestoneId) => {
    const viewed = StateManager.getState('game.timeline.viewedMilestones') || [];
    if (!viewed.includes(milestoneId)) {
      viewed.push(milestoneId);
      StateManager.setState('game.timeline.viewedMilestones', viewed);
    }
  },

  getTimelineProgress: () => {
    const viewed = StateManager.getState('game.timeline.viewedMilestones') || [];
    const total = 6; // Total milestones
    return Math.round((viewed.length / total) * 100);
  }
};

// ===================================
// 4. UI State for Conditional Rendering
// ===================================

const UIStateManager = {
  // Modal state
  showModal: (modalId, content = {}) => {
    StateManager.setState('ui.modal', {
      isOpen: true,
      id: modalId,
      content: content
    });
    
    // Trigger UI update
    document.body.classList.add('modal-open');
  },

  closeModal: () => {
    StateManager.setState('ui.modal.isOpen', false);
    document.body.classList.remove('modal-open');
  },

  // Loading state
  setLoading: (isLoading, message = 'Loading...') => {
    StateManager.setState('ui.loading', {
      active: isLoading,
      message: message
    });
    
    // Update UI
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = isLoading ? 'flex' : 'none';
      if (isLoading) loader.textContent = message;
    }
  },

  // Toast notifications
  showToast: (message, type = 'info', duration = 3000) => {
    const toastId = Date.now();
    const toast = {
      id: toastId,
      message: message,
      type: type, // 'success', 'error', 'info', 'warning'
      timestamp: Date.now()
    };
    
    const toasts = StateManager.getState('ui.toasts') || [];
    toasts.push(toast);
    StateManager.setState('ui.toasts', toasts);
    
    // Auto-remove after duration
    setTimeout(() => {
      UIStateManager.removeToast(toastId);
    }, duration);
    
    // Render toast
    UIStateManager.renderToast(toast);
  },

  renderToast: (toast) => {
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${toast.type}`;
    toastEl.id = `toast-${toast.id}`;
    toastEl.innerHTML = `
      <span>${toast.message}</span>
      <button onclick="UIStateManager.removeToast(${toast.id})">&times;</button>
    `;
    
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    container.appendChild(toastEl);
  },

  removeToast: (toastId) => {
    const toasts = StateManager.getState('ui.toasts') || [];
    StateManager.setState('ui.toasts', toasts.filter(t => t.id !== toastId));
    
    const toastEl = document.getElementById(`toast-${toastId}`);
    if (toastEl) toastEl.remove();
  },

  // Page transition state
  setPageTransitioning: (isTransitioning) => {
    StateManager.setState('ui.pageTransitioning', isTransitioning);
  }
};

// ===================================
// 5. Reactive UI Updates with Subscriptions
// ===================================

const setupReactiveUI = () => {
  // Update sound icon when sound preference changes
  StateManager.subscribe('preferences.soundEnabled', (soundEnabled) => {
    const soundIcon = document.querySelector('.sound-toggle');
    if (soundIcon) {
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      soundIcon.setAttribute('aria-label', soundEnabled ? 'Mute' : 'Unmute');
    }
  });

  // Update particle effects when preference changes
  StateManager.subscribe('preferences.particlesEnabled', (enabled) => {
    const canvas = document.querySelector('.particles-canvas');
    if (canvas) {
      canvas.style.display = enabled ? 'block' : 'none';
    }
  });

  // Update game score display
  StateManager.subscribe('game.memory.score', (newScore) => {
    const scoreDisplay = document.querySelector('.game-score');
    if (scoreDisplay) {
      scoreDisplay.textContent = newScore;
      // Animate score change
      scoreDisplay.classList.add('score-pulse');
      setTimeout(() => scoreDisplay.classList.remove('score-pulse'), 500);
    }
  });

  // Show toast when favorite is added
  StateManager.subscribe('ai.generatedLetters', (letters) => {
    const recentLetter = letters[0];
    if (recentLetter && recentLetter.isFavorite) {
      UIStateManager.showToast('❤️ Added to favorites!', 'success');
    }
  });
};

// ===================================
// 6. Initialize Everything
// ===================================

const initStateManagement = () => {
  // Initialize state manager
  StateManager.init();
  
  // Initialize sub-managers
  AIContentManager.init();
  PreferencesManager.init();
  
  // Apply saved preferences
  PreferencesManager.apply();
  
  // Setup reactive UI
  setupReactiveUI();
  
  console.log('✅ State Management Initialized');
  console.log('Current State:', StateManager.getState());
};

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initStateManagement);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AIContentManager,
    PreferencesManager,
    GameStateManager,
    UIStateManager,
    setupReactiveUI,
    initStateManagement
  };
}
