// Memory Match Game & Relationship Timeline JavaScript

window.onload = function() {
    console.log('Games page loaded!');
    
    // Initialize Memory Match Game
    initMemoryGame();
    
    // Initialize Relationship Timeline
    initTimeline();
    
    // Add navigation button handler
    const letterBtn = document.getElementById('to-letter-btn');
    if (letterBtn) {
        letterBtn.addEventListener('click', function() {
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = 'letter.html';
            }, 800);
        });
    }
};

// ========== MEMORY MATCH GAME ==========

function initMemoryGame() {
    console.log('Initializing Memory Match game...');
    
    // Define image pairs (3 pairs = 6 cards)
    const imagePairs = [
        'assets/images/photo1.jpg',
        'assets/images/photo1.jpg',
        'assets/images/photo2.jpg',
        'assets/images/photo2.jpg',
        'assets/images/photo3.jpg',
        'assets/images/photo3.jpg'
    ];
    
    // Shuffle the array
    const shuffled = shuffleArray(imagePairs);
    
    // Get grid container
    const grid = document.getElementById('grid');
    if (!grid) {
        console.error('Grid container not found');
        return;
    }
    
    // Game state
    let flippedCards = [];
    let matchedPairs = 0;
    
    // Create cards
    shuffled.forEach((imageSrc, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.image = imageSrc;
        card.dataset.index = index;
        
        // Card front (question mark)
        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = '💞';
        
        // Card back (image)
        const back = document.createElement('div');
        back.className = 'card-back';
        back.style.backgroundImage = `url(${imageSrc})`;
        back.style.backgroundSize = 'cover';
        back.style.backgroundPosition = 'center';
        
        card.appendChild(front);
        card.appendChild(back);
        
        // Click handler
        card.addEventListener('click', function() {
            if (card.classList.contains('flipped') || card.classList.contains('matched')) {
                return; // Already flipped or matched
            }
            
            if (flippedCards.length < 2) {
                card.classList.add('flipped');
                flippedCards.push(card);
                
                // Check for match when 2 cards are flipped
                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 600);
                }
            }
        });
        
        grid.appendChild(card);
    });
    
    // Check if two flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.dataset.image;
        const img2 = card2.dataset.image;
        
        if (img1 === img2) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            // Check if game is complete
            if (matchedPairs === 3) {
                setTimeout(() => {
                    showConfetti();
                    alert('🎉 You won! You matched all our special memories! 💕');
                }, 300);
            }
        } else {
            // No match - flip back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        
        flippedCards = [];
    }
}

// Shuffle array helper function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Confetti animation
function showConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['💕', '💖', '💗', '💓', '💞'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '24px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ========== RELATIONSHIP TIMELINE ==========

function initTimeline() {
    console.log('Initializing relationship timeline...');
    
    // Timeline data - Add your special dates and moments
    const timelineData = [
        {
            date: 'January 2023',
            event: 'First time we met 💫',
            description: 'The day my life changed forever. I saw you and knew you were special.'
        },
        {
            date: 'March 2023',
            event: 'Our first date 💕',
            description: 'Coffee, laughter, and endless conversations. I never wanted it to end.'
        },
        {
            date: 'June 2023',
            event: 'Made it official 💑',
            description: 'You said yes! The happiest day of my life. Forever starts here.'
        },
        {
            date: 'December 2023',
            event: 'Our first adventure together 🌟',
            description: 'Creating memories, sharing dreams, and falling deeper in love with you.'
        },
        {
            date: 'Today & Forever',
            event: 'Still falling for you every day 💞',
            description: 'Every moment with you is a gift. Here\'s to our infinite love story.'
        }
    ];
    
    // Get timeline container
    const timelineContainer = document.getElementById('timeline');
    if (!timelineContainer) {
        console.error('Timeline container not found');
        return;
    }
    
    // Create timeline items
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.2}s`;
        
        timelineItem.innerHTML = `
            <div style="font-size: 1.1em; color: #f093fb; font-weight: bold; margin-bottom: 8px;">
                ${item.date}
            </div>
            <div style="font-size: 1.3em; margin-bottom: 8px; font-family: 'Caveat', cursive;">
                ${item.event}
            </div>
            <div style="font-size: 0.95em; line-height: 1.5; opacity: 0.9;">
                ${item.description}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    console.log(`Timeline created with ${timelineData.length} items`);
}

// Add fall animation for confetti in CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);}
