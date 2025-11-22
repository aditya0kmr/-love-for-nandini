/**
 * animations.js - GSAP Animation Utilities
 * Provides reusable animation functions using GSAP
 * Dependencies: GSAP library, CONFIG, Utils
 */

const Animations = {
  // Fade animations
  fadeIn: (element, duration = CONFIG.ANIMATIONS.DURATION, delay = 0) => {
    return gsap.to(element, {
      opacity: 1,
      duration: duration / 1000,
      delay: delay / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  fadeOut: (element, duration = CONFIG.ANIMATIONS.DURATION, delay = 0) => {
    return gsap.to(element, {
      opacity: 0,
      duration: duration / 1000,
      delay: delay / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  // Slide animations
  slideInFromTop: (element, duration = CONFIG.ANIMATIONS.DURATION, distance = 50) => {
    gsap.from(element, {
      y: -distance,
      opacity: 0,
      duration: duration / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  slideInFromBottom: (element, duration = CONFIG.ANIMATIONS.DURATION, distance = 50) => {
    gsap.from(element, {
      y: distance,
      opacity: 0,
      duration: duration / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  slideInFromLeft: (element, duration = CONFIG.ANIMATIONS.DURATION, distance = 50) => {
    gsap.from(element, {
      x: -distance,
      opacity: 0,
      duration: duration / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  slideInFromRight: (element, duration = CONFIG.ANIMATIONS.DURATION, distance = 50) => {
    gsap.from(element, {
      x: distance,
      opacity: 0,
      duration: duration / 1000,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  // Scale animations
  scaleIn: (element, duration = CONFIG.ANIMATIONS.DURATION) => {
    gsap.from(element, {
      scale: 0,
      opacity: 0,
      duration: duration / 1000,
      ease: 'back.out(1.7)'
    });
  },

  pulse: (element, duration = 1000) => {
    gsap.to(element, {
      scale: 1.1,
      duration: duration / 2000,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
  },

  // Text reveal animations
  revealText: (element, duration = CONFIG.ANIMATIONS.DURATION) => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      element.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        duration: 0.05,
        delay: index * 0.05
      });
    });
  },

  typeWriter: (element, text, speed = 50) => {
    element.textContent = '';
    let index = 0;
    
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  },

  // Scroll-triggered animations
  scrollTrigger: (element, animationOptions = {}) => {
    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      ...animationOptions
    });
  },

  // Page transition
  pageTransition: (onComplete) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${CONFIG.THEME.PRIMARY};
      z-index: 9999;
      opacity: 0;
    `;
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        if (onComplete) onComplete();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          onComplete: () => overlay.remove()
        });
      }
    });
  },

  // Sparkle effect
  sparkle: (x, y, container = document.body) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      background: ${CONFIG.THEME.ACCENT};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
    `;
    container.appendChild(sparkle);

    gsap.to(sparkle, {
      opacity: 0,
      scale: 2,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => sparkle.remove()
    });
  },

  // Glow effect
  glow: (element, color = CONFIG.THEME.ACCENT) => {
    gsap.to(element, {
      textShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
      duration: 0.5,
      yoyo: true,
      repeat: -1
    });
  },

  // Floating animation
  float: (element, distance = 20, duration = 3000) => {
    gsap.to(element, {
      y: `-=${distance}`,
      duration: duration / 1000,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
  },

  // Rotate animation
  rotate: (element, degrees = 360, duration = 2000) => {
    gsap.to(element, {
      rotation: degrees,
      duration: duration / 1000,
      repeat: -1,
      ease: 'linear'
    });
  },

  // Stagger animation for multiple elements
  staggerIn: (elements, duration = CONFIG.ANIMATIONS.DURATION, stagger = 0.1) => {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: duration / 1000,
      stagger: stagger,
      ease: CONFIG.ANIMATIONS.EASE
    });
  },

  // Heart beat animation
  heartBeat: (element) => {
    gsap.to(element, {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  },

  // Shake animation
  shake: (element, intensity = 10) => {
    gsap.to(element, {
      x: intensity,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
      onComplete: () => gsap.set(element, { x: 0 })
    });
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
