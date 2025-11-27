// Global Compliment System - Used across all pages
// Shows animated compliment popups on key events

const COMPLIMENTS = {
  general: [
    '"You make me the happiest!" \ud83d\udc95',
    '"Forever with you!" \ud83d\udc96',
    '"You\'re my dream come true!" \u2728',
    '"I love every moment with you!" \ud83d\udc98',
    '"You\'re my forever!" \ud83d\udcaf',
    '"With you, everything feels perfect!" \ud83d\ude0d',
    '"My heart skips for you!" \ud83d\udc3b',
    '"You make life beautiful!" \ud83c\udf18',
  ],
  action: {
    dreamAdded: 'Dream added! \u2728',
    dreamArchived: 'Dream archived! \ud83d\udcaf',
    messageSaved: 'Your love note saved! \ud83d\udcdd',
    favoritesUpdated: 'Added to favorites! \u2764\ufe0f',
    tellMeDream: 'Tell me your dream! \ud83d\ude0c',
    fillFields: 'Fill all fields please! \ud83d\ude09',
  }
};

function showCompliment(text) {
  const comp = document.createElement('div');
  comp.className = 'compliment';
  comp.textContent = text || COMPLIMENTS.general[Math.floor(Math.random() * COMPLIMENTS.general.length)];
  comp.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(255, 105, 180, 0.95);
    padding: 1.5rem 2.5rem;
    border-radius: 50px;
    box-shadow: 0 0 30px rgba(255, 120, 170, 0.8);
    z-index: 9999;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    animation: complimentPop 1.5s ease-out forwards;
  `;
  
  // Add animation if not already in style
  if (!document.querySelector('#compliment-styles')) {
    const style = document.createElement('style');
    style.id = 'compliment-styles';
    style.textContent = `
      @keyframes complimentPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(comp);
  setTimeout(() => comp.remove(), 1500);
}

// Random compliment on page load
window.addEventListener('load', () => {
  setTimeout(() => showCompliment(), 800);
});

// Make available globally
window.showCompliment = showCompliment;
window.COMPLIMENTS = COMPLIMENTS;
