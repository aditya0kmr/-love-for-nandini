// Central Configuration File for Love-for-Nandini Website
// Manages all constants, paths, and global settings

const CONFIG = {
  // Asset Paths
  ASSETS: {
    IMAGES: './assets/images/',
    AUDIO: './assets/images/',
    SCRIPTS: './assets/scripts/',
    STYLES: './assets/styles/',
    MODELS: './assets/models/'
  },

  // Animation Settings
  ANIMATIONS: {
    TRANSITION_DURATION: 1000,
    FADE_DURATION: 600,
    PARTICLE_COUNT: 50,
    HEART_PULSE_DURATION: 2000
  },

  // Page Routes
  ROUTES: {
    INDEX: 'index.html',
    LOVE_LETTER: 'page2.html',
    MEMORIES: 'page3.html',
    GALLERY: 'gallery.html',
    GAMES: 'games.html',
    TIMELINE: 'page4.html',
    LETTER: 'letter.html'
  },

  // Colors & Themes
  THEME: {
    PRIMARY: '#ff4ca5',
    SECONDARY: '#ff85bf',
    GRADIENT_START: '#1b0c2c',
    GRADIENT_END: '#420b58',
    TEXT_LIGHT: '#fce4f4',
    TEXT_GLOW: '#ff73b4'
  },

  // 3D Model URLs
  MODELS: {
    HEART_3D: 'https://prod.spline.design/aUQ5OSwoULMNgL8P/scene.splinecode'
  },

  // External Libraries
  CDN: {
    GSAP: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    GSAP_SCROLL: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    SPLINE: 'https://cdn.skypack.dev/@splinetool/viewer@0.9.414'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
