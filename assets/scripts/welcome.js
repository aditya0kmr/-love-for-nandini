const CORRECT_PW = "AadiNanniiii2025";

function checkPassword() {
  const input = document.getElementById('pw-input').value;
  if (input === CORRECT_PW) {
    document.getElementById('error-msg').classList.add('hidden');
    document.getElementById('greeting').classList.remove('hidden');
    playAnimation();
    playAudio();
    launchHearts();
  } else {
    document.getElementById('error-msg').classList.remove('hidden');
  }
}

function playAnimation() {
  // Fade in greeting, change background
  document.body.style.background = "radial-gradient(circle, #1565c0 0%, #e1bee7 100%)";
  document.getElementById('welcome-box').classList.add('animated-in');
}

function playAudio() {
  // Play welcome music or greeting
  const audio = document.getElementById('welcome-audio');
  audio.classList.remove('hidden');
  audio.play();
}

// Hearts/confetti animation
function launchHearts() {
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      createFloatingHeart();
    }, i * 100);
  }
}

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = (window.innerHeight + 20) + "px";
  heart.style.fontSize = (Math.random()*20+30) + "px";
  heart.style.opacity = Math.random() * 0.7 + 0.3;
  heart.style.transition = "transform 4s linear, opacity 4s";
  heart.style.zIndex = 9999;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = `translateY(-${window.innerHeight+120}px) rotate(${Math.random()*360}deg)`;
    heart.style.opacity = 0;
  }, 100);

  setTimeout(() => {
    document.body.removeChild(heart);
  }, 4200);
}
