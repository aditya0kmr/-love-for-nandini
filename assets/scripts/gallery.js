// Gallery Carousel JavaScript
// List of images to display (put yours in assets/images/)
const images = [
  'assets/images/photo1.jpg',
  'assets/images/photo2.jpg',
  'assets/images/photo3.jpg',
  'assets/images/photo4.jpg',
  'assets/images/photo5.jpg',
  'assets/images/photo6.jpg'
  // Add more as needed
];

const captions = [
  "Our first selfie together! 💕",
  "That rainy day we danced in the street. ☔",
  "Nanniiii's birthday surprise from Aadi! 🎂",
  "Our favorite coffee shop date ☕",
  "Sunset watching together 🌅",
  "Making silly faces! 😜"
  // Add creative captions for each photo
];

let idx = 0;

function showImage(n) {
  idx = (n + images.length) % images.length;
  const carouselDiv = document.getElementById('carousel');
  
  carouselDiv.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; animation: fadeIn 0.5s ease-in;">
      <img src="${images[idx]}" alt="memory" style="max-width: 100%; width: 400px; border-radius: 15px; box-shadow: 0 10px 30px rgba(25, 118, 210, 0.5); transition: transform 0.3s;" 
           onmouseover="this.style.transform='scale(1.05)'" 
           onmouseout="this.style.transform='scale(1)'">
      <p style="margin-top: 15px; color: #ffd700; font-weight: bold; font-size: 1.2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
        ${captions[idx]}
      </p>
      <p style="margin-top: 5px; font-size: 0.9rem; opacity: 0.8;">Photo ${idx + 1} of ${images.length}</p>
    </div>
    <div style="margin-top: 25px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
      <button onclick="showImage(${idx - 1})" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; padding: 12px 30px; font-size: 1.1rem; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s; box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);" 
              onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 30px rgba(240, 147, 251, 0.6)'" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(240, 147, 251, 0.4)'">
        ⟨ Prev
      </button>
      <button onclick="showImage(${idx + 1})" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; padding: 12px 30px; font-size: 1.1rem; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s; box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);" 
              onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 30px rgba(240, 147, 251, 0.6)'" 
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(240, 147, 251, 0.4)'">
        Next ⟩
      </button>
    </div>
  `;
}

// Initialize carousel when page loads
window.onload = () => {
  showImage(0);
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      showImage(idx - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(idx + 1);
    }
  });
  
  console.log('💖 Gallery loaded! Use arrow keys to navigate.');
};

// Auto-advance carousel every 5 seconds (optional)
let autoAdvance = false; // Set to true to enable auto-advance
if (autoAdvance) {
  setInterval(() => {
    showImage(idx + 1);
  }, 5000);
}
