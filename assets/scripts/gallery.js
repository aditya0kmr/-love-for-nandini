// Gallery Carousel JavaScript with Swiper.js
// Images array - customize photo filenames as needed
const images = [
    "assets/images/photo1.jpg",
    "assets/images/photo2.jpg",
    "assets/images/photo3.jpg",
    "assets/images/photo4.jpg",
    "assets/images/photo5.jpg",
    "assets/images/photo6.jpg"
];

// Memory bubbles - creative romantic captions
const memories = [
    "The day it all began… Our first smile together! ✨",
    "Dancing in the rain, as if the world cheered for us. 💃",
    "A birthday to remember… with a heart-shaped cake! 🎂",
    "Our favorite coffee shop date ☕",
    "Sunset watching together 🌅",
    "Making silly faces! 😄"
];

// Flirty Sticky Notes for each image
const stickyNotes = [
    "You looked so adorable here! I couldn't stop staring... 😍",
    "Remember this? You made my heart skip a beat! 💓",
    "This is my favorite picture of you, babe! You're stunning! ✨",
    "I fell for you all over again looking at this! 😘",
    "You + that smile = my whole world! 🌎💕",
    "This moment... I knew you were THE ONE! 💍❤️"
];

// Inject slides dynamically when page loads
window.onload = () => {
    const wrapper = document.querySelector('.swiper-wrapper');
    
    images.forEach((img, i) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
            <div class="gallery-bubble">
                <img src="${img}" alt="memory" class="gallery-img"/>
                <div class="sticky-note-icon" data-note-index="${i}"></div>
                <div class="memory-bubble">${memories[i]}</div>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Swiper 3D carousel setup with coverflow effect
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 32,
            stretch: 0,
            depth: 160,
            modifier: 2.1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: { enabled: true },
    });

    // Optional: Interactive sound on slide change
    // Uncomment if you add swing.mp3 to assets/audio/
    // let swipeSound = new Audio('assets/audio/swing.mp3');
    // swiper.on('slideChange', () => {
    //     swipeSound.play().catch(err => console.log('Audio play prevented'));
    // });

    // Transition to games page button
    document.getElementById('to-games-btn').onclick = () => {
        document.body.classList.add('page-exit');
        setTimeout(() => window.location.href = "games.html", 800);
    };

    // Sticky Notes Popup Functionality
    // Create popup HTML elements
    const overlay = document.createElement('div');
    overlay.className = 'sticky-overlay';
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.className = 'sticky-note-popup';
    popup.innerHTML = `
        <div class="close-btn">&times;</div>
        <p class="note-content"></p>
    `;
    document.body.appendChild(popup);

    // Add click event to all sticky note icons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('sticky-note-icon')) {
            const noteIndex = e.target.getAttribute('data-note-index');
            const noteContent = popup.querySelector('.note-content');
            noteContent.textContent = stickyNotes[noteIndex];
            
            // Show popup and overlay
            overlay.classList.add('show');
            popup.classList.add('show');
        }

        // Close popup when clicking close button
        if (e.target.classList.contains('close-btn')) {
            overlay.classList.remove('show');
            popup.classList.remove('show');
        }
    });

    // Close popup when clicking overlay
    overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
        popup.classList.remove('show');
    });

    console.log('Gallery loaded with', images.length, 'memories! 💙');
};
