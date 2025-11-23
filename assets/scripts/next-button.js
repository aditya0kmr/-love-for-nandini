/* Next Button Navigation Script */

// Configuration for each page
const nextPageConfig = {
  "index.html": {
    label: "❤️ Begin Our Journey",
    animationClass: "confetti",
    onClickEffect: heartConfettiEffect,
    nextPageUrl: "love-letters.html"
  },
  "love-letters.html": {
    label: "💌 See Our Memories",
    animationClass: "typewriter",
    onClickEffect: envelopeGlowEffect,
    nextPageUrl: "gallery.html"
  },
  "gallery.html": {
    label: "🖼️ Relive Our Timeline",
    animationClass: "flip-btn",
    onClickEffect: photoFlipEffect,
    nextPageUrl: "timeline.html"
  },
  "timeline.html": {
    label: "🌟 Next: Create with AI Magic",
    animationClass: "stars",
    onClickEffect: starBurstEffect,
    nextPageUrl: "ai-generator.html"
  },
  "ai-generator.html": {
    label: "✨ Reveal Your Final Surprise!",
    animationClass: "confetti",
    onClickEffect: heartConfettiEffect,
    nextPageUrl: "final-surprise.html"
  },
  "final-surprise.html": {
    label: "🎁 One Last Secret Awaits...",
    animationClass: "stars",
    onClickEffect: starBurstEffect,
    nextPageUrl: "secret-letter.html"
  },
  "secret-letter.html": {
    label: "💖 Replay the Journey",
    animationClass: "confetti",
    onClickEffect: heartConfettiEffect,
    nextPageUrl: "index.html"
  }
};

// Animation Effects
function heartConfettiEffect(e) {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = `fall ${Math.random() * 2 + 2}s ease-out forwards`;
    heart.style.transform = `translateX(${(Math.random() - 0.5) * 300}px)`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

function envelopeGlowEffect(btn) {
  btn.style.boxShadow = '0 0 40px 10px rgba(255, 255, 255, 0.9)';
  setTimeout(() => {
    btn.style.boxShadow = '';
  }, 600);
}

function photoFlipEffect(btn) {
  btn.style.transform = 'rotateY(180deg)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 600);
}

function starBurstEffect(e) {
  for (let i = 0; i < 17; i++) {
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.position = 'fixed';
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.fontSize = '24px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '9999';
    const angle = (i / 17) * Math.PI * 2;
    const distance = 150;
    star.style.transition = 'all 1s ease-out';
    setTimeout(() => {
      star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      star.style.opacity = '0';
    }, 10);
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1100);
  }
}

// Initialize the button
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('nextBtn');
  const label = document.querySelector('.next-label');
  const currentFile = location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const config = nextPageConfig[currentFile];

  if (config && btn && label) {
    label.textContent = config.label;
    btn.classList.add(config.animationClass);

    btn.addEventListener('click', function(e) {
      if (config.onClickEffect) {
        config.onClickEffect(e.target.closest('.next-btn'));
      }
      setTimeout(() => {
        window.location.href = config.nextPageUrl;
      }, 900);
    });
  }
});

// CSS animation for falling hearts (injected dynamically)
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) translateX(var(--random-x, 0)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
