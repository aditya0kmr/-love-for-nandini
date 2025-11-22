// Shared Utility Functions for Love-for-Nandini Website
// Reusable helper functions used across multiple pages

const Utils = {
  // DOM Utilities
  qs: (selector) => document.querySelector(selector),
  qsAll: (selector) => document.querySelectorAll(selector),
  
  // Element creation helper
  createElement: (tag, className = '', attributes = {}) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.keys(attributes).forEach(key => el.setAttribute(key, attributes[key]));
    return el;
  },

  // Wait/Delay utility
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Scroll utilities
  scrollToTop: (duration = 600) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  scrollToElement: (element, offset = 0) => {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  },

  // Random number utilities
  random: (min, max) => Math.random() * (max - min) + min,
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  // Array utilities
  shuffle: (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // String utilities
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  // Local Storage utilities
  storage: {
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Storage error:', e);
        return false;
      }
    },
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Storage error:', e);
        return null;
      }
    },
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
  },

  // Device detection
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  
  // Add class with animation support
  addClass: (element, className, delay = 0) => {
    setTimeout(() => element.classList.add(className), delay);
  },

  removeClass: (element, className, delay = 0) => {
    setTimeout(() => element.classList.remove(className), delay);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
