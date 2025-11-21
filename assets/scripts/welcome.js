const CORRECT_PW = "AadiNanniiii2025"; // Change as you like

function checkPassword() {
  const input = document.getElementById('pw-input').value;
  if (input === CORRECT_PW) {
    document.getElementById('error-msg').classList.add('hidden');
    document.getElementById('greeting').classList.remove('hidden');
    playAnimation();
  } else {
    document.getElementById('error-msg').classList.remove('hidden');
  }
}

function playAnimation() {
  // Basic lovebomb greeting (add more effects later)
  document.body.style.background = "radial-gradient(circle, #303f9f 0%, #e3f2fd 100%)";
  document.getElementById('welcome-box').innerHTML += "<div style='font-size:2em;color:#f06292;'>💞💞 Welcome Nanniiii! 💞💞</div><p>Your magical journey begins... Click the pages above!</p>";
  // You can add confetti, audio, animated images here (later steps!)
}
