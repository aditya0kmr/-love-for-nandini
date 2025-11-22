// Gallery Carousel JavaScript with Swiper.js
// Images array - customize photo filenames as needed
const images = [
    "assets/images/IMG_20241104_025047.jpg",
    "assets/images/IMG_20241104_025053.jpg",
    "assets/images/IMG_20241218_194513.jpg",
    "assets/images/IMG_20250331_212004_216.jpg",
    "assets/images/PXL_20241104_025215309.jpg",
    "assets/images/Snapchat-502024338.jpg"
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

// Love Poems for Image Click Overlay
const lovePoems = [
    `In your eyes, I found my home,\nEvery moment with you, I'm never alone.\nThis first smile changed my world forever,\nMy love for you will fade? Never! 💕`,
    
    `Dancing in the rain with you,\nMade every storm feel brand new.\nYour laughter is my favorite sound,\nWith you, true joy I've found. 🌧️💃`,
    
    `Your birthday wish came true that day,\nWhen you smiled and looked my way.\nEvery candle's light so bright,\nPales next to your eyes' delight. 🎂✨`,
    
    `Coffee dates and endless talks,\nCity streets and moonlit walks.\nEvery moment spent with you,\nMakes my dreams come true. ☕💖`,
    
    `Sunset skies could never compare,\nTo the way you style your hair.\nWatching colors fade to night,\nWith you, everything feels right. 🌅💕`,
    
    `Your silly face, your perfect smile,\nMake every second worthwhile.\nI fell in love with who you are,\nMy forever shining star! 😄❤️`
];

// GIF Overlays for Key Memories
const gifOverlays = {
    0: "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif", // First smile
    1: "https://media.giphy.com/media/l0HlSCPoJF9lcB9zG/giphy.gif", // Dancing
    2: "https://media.giphy.com/media/g5R9dok94mrIvplmZd/giphy.gif", // Birthday
    3: "https://media.giphy.com/media/xUPGGg5z5RmE6eZjLG/giphy.gif", // Coffee
    5: "https://media.giphy.com/media/l378fIWkQEbvFy0hy/giphy.gif"  // Silly faces
};

// Reaction System - Load from localStorage
let reactions = JSON.parse(localStorage.getItem('galleryReactions')) || {};

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
                <div class="reaction-buttons" data-index="${i}">
                    <button class="reaction-btn heart-btn" data-type="heart">❤️</button>
                    <button class="reaction-btn love-btn" data-type="love">😍</button>
                </div>
                <div class="reaction-badge" id="badge-${i}"></div>
                ${gifOverlays[i] ? `<div class="gif-badge" data-index="${i}">🎬</div>` : ''}
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

    // ========== LOVE POEM OVERLAY ON IMAGE CLICK ==========
    const poemOverlay = document.createElement('div');
    poemOverlay.className = 'poem-overlay';
    poemOverlay.innerHTML = `
        <div class="poem-card">
            <div class="poem-close">&times;</div>
            <div class="poem-content"></div>
        </div>
    `;
    document.body.appendChild(poemOverlay);

    // Click on gallery image to show poem
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-img')) {
            const slideIndex = e.target.closest('.swiper-slide').getAttribute('data-swiper-slide-index');
            const poemContent = poemOverlay.querySelector('.poem-content');
            poemContent.innerHTML = `<pre>${lovePoems[slideIndex]}</pre>`;
            poemOverlay.classList.add('show');
        }

        // Close poem overlay
        if (e.target.classList.contains('poem-close') || e.target.classList.contains('poem-overlay')) {
            poemOverlay.classList.remove('show');
        }
    });

    // ========== REACTION SYSTEM ==========
    function updateReactionBadge(index) {
        const badge = document.getElementById(`badge-${index}`);
        if (!badge) return;
        
        const photoReactions = reactions[index] || {heart: 0, love: 0};
        const total = photoReactions.heart + photoReactions.love;
        
        if (total > 0) {
            badge.textContent = `${photoReactions.heart || 0}❤️ ${photoReactions.love || 0}😍`;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }

    // Initialize reaction badges
    images.forEach((img, i) => updateReactionBadge(i));

    // Reaction button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('reaction-btn')) {
            const index = e.target.closest('.reaction-buttons').getAttribute('data-index');
            const type = e.target.getAttribute('data-type');
            
            // Initialize reactions for this photo if not exists
            if (!reactions[index]) {
                reactions[index] = {heart: 0, love: 0};
            }
            
            // Increment reaction
            reactions[index][type]++;
            
            // Save to localStorage
            localStorage.setItem('galleryReactions', JSON.stringify(reactions));
            
            // Update badge
            updateReactionBadge(index);
            
            // Floating animation
            const floatingEmoji = document.createElement('div');
            floatingEmoji.className = 'floating-reaction';
            floatingEmoji.textContent = type === 'heart' ? '❤️' : '😍';
            floatingEmoji.style.left = e.clientX + 'px';
            floatingEmoji.style.top = e.clientY + 'px';
            document.body.appendChild(floatingEmoji);
            
            setTimeout(() => floatingEmoji.remove(), 2000);
        }
    });

    // ========== GIF OVERLAY SYSTEM ==========
    const gifOverlayElement = document.createElement('div');
    gifOverlayElement.className = 'gif-overlay';
    gifOverlayElement.innerHTML = `
        <div class="gif-container">
            <div class="gif-close">&times;</div>
            <img src="" alt="Animated Memory" class="gif-content">
        </div>
    `;
    document.body.appendChild(gifOverlayElement);

    // Click on GIF badge to show GIF
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('gif-badge')) {
            const index = e.target.getAttribute('data-index');
            const gifUrl = gifOverlays[index];
            
            if (gifUrl) {
                gifOverlayElement.querySelector('.gif-content').src = gifUrl;
                gifOverlayElement.classList.add('show');
            }
        }

        // Close GIF overlay
        if (e.target.classList.contains('gif-close') || e.target.classList.contains('gif-overlay')) {
            gifOverlayElement.classList.remove('show');
        }
    });

    console.log('Gallery loaded with', images.length, 'memories! 💙');
};
