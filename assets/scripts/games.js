// Memory Match Game & Relationship Timeline JavaScript

window.onload = function() {
    console.log('Games page loaded!');
    
    // Initialize Memory Match Game
    initMemoryGame();
    
    // Initialize Relationship Timeline
    initTimeline();

    // Initialize additional interactive games
    createLoveQuiz();
    createSpinWheel();
    createCardFlipper();
    createLoveTree();
    createEmojiStory();
    createHeartbeatClicker();
    createTicTacToe();
    
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
        card.className = 'mem-card';
        card.dataset.image = imageSrc;
        card.dataset.index = index;
        
        // Card front (questionmem-cardmark)
        const front = document.createElement('div');
        front.className = 'front';
        front.textContent = '💞';
        
        // Card back (image)
        const back = document.createElement('div');
        back.className = 'back';
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

// ========== GAME 2: LOVE QUIZ ==========

function createLoveQuiz() {
    console.log('📝 Initializing Love Quiz...');
    
    const quizQ = [
        {q: "Where was our first date? 🍜", a: "Our favorite cafe"},
        {q: "Who said 'I love you' first? 💕", a: "Aadi"},
        {q: "What's Nandini's favorite color? 🎨", a: "Blue"},
        {q: "The secret nickname Aadi calls Nandini? 😊", a: "Nanniiii"},
        {q: "Our favorite song together? 🎵", a: "Perfect by Ed Sheeran"},
        {q: "Where did we first meet? 💫", a: "College"},
        {q: "Aadi's favorite thing about Nandini? 💖", a: "Her smile"}
    ];
    
    let idx = 0, score = 0;
    const zone = document.getElementById('games-zone');
    
    const quizHTML = `
        <div id='love-quiz' style='max-width:600px; margin:2em auto; padding:20px; background:rgba(255,255,255,0.1); border-radius:15px; backdrop-filter:blur(10px);'>
            <h3 style='text-align:center; color:#fce4ec; font-size:1.8em;'>📝 Love Quiz 💕</h3>
            <p style='text-align:center; color:#fff; margin-bottom:1.5em;'>How well do you know our love story?</p>
            <div id='quiz-q' style='font-size:1.3em; margin:1.5em 0; color:#fff; text-align:center; min-height:60px;'></div>
            <input type='text' id='quiz-in' placeholder='Type your answer here...' style='width:100%; padding:15px; font-size:1.1em; border-radius:10px; border:2px solid #f093fb; background:rgba(255,255,255,0.9); margin:1em 0;'>
            <button id='quiz-next' style='display:block; width:100%; padding:15px; font-size:1.2em; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color:white; border:none; border-radius:10px; cursor:pointer; font-weight:bold; box-shadow:0 4px 15px rgba(245,87,108,0.4);'>Submit Answer ✨</button>
            <div id='quiz-score' style='text-align:center; font-size:1.5em; color:#FFD700; margin-top:1.5em; min-height:40px;'></div>
        </div>
    `;
    
    zone.innerHTML += quizHTML;
    
    function showQ() {
        if(idx < quizQ.length) {
            document.getElementById('quiz-q').innerText = `Question ${idx + 1}/${quizQ.length}: ${quizQ[idx].q}`;
            document.getElementById('quiz-in').value = '';
            document.getElementById('quiz-in').focus();
        }
    }
    
    showQ();
    
    document.getElementById('quiz-next').onclick = () => {
        const ans = document.getElementById('quiz-in').value.trim();
        if(ans.toLowerCase() === quizQ[idx].a.toLowerCase()) {
            score++;
            document.getElementById('quiz-score').innerHTML = `✅ Correct! Score: ${score} 💖`;
        } else {
            document.getElementById('quiz-score').innerHTML = `❌ Oops! The answer was: ${quizQ[idx].a}`;
        }
        idx++;
        
        if(idx < quizQ.length) {
            setTimeout(showQ, 1500);
        } else {
            setTimeout(() => {
                document.getElementById('quiz-score').innerHTML = `🎉 Final Score: ${score}/${quizQ.length}! ${score === quizQ.length ? "Perfect! You know me so well! 💕" : "We'll make more memories together! 💞"}`;
                document.getElementById('quiz-in').style.display = 'none';
                document.getElementById('quiz-next').style.display = 'none';
                document.getElementById('quiz-q').innerHTML = '';
            }, 1500);
        }
    };
    
    // Allow Enter key to submit
    document.getElementById('quiz-in').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            document.getElementById('quiz-next').click();
        }
    });
}

// ========== GAME 3: SPIN THE LOVE WHEEL ==========

function createSpinWheel() {
    console.log('🎯 Initializing Spin the Love Wheel...');
    
    const options = [
        "Send a flirty voice note 💬",
        "Give a hug now 🤗",
        "Share a secret hope ✨",
        "Describe our best moment 🌠",
        "Give a virtual kiss 😘",
        "Write a poem line 📜",
        "Say 'I love you' in three ways 💖",
        "Tell me your favorite memory of us 💕",
        "Compliment me in a flirty way 😏",
        "Plan our next date together 🎉"
    ];
    
    const zone = document.getElementById('games-zone');
    
    const wheelHTML = `
        <div id='spin-wheel' style='max-width:500px; margin:2em auto; padding:30px; background:rgba(255,255,255,0.1); border-radius:20px; backdrop-filter:blur(10px); text-align:center;'>
            <h3 style='color:#fce4ec; font-size:1.8em; margin-bottom:0.5em;'>🎯 Spin the Love Wheel!</h3>
            <p style='color:#fff; margin-bottom:2em;'>Click spin to get a romantic dare! 💖</p>
            <button id='spin-btn' style='padding:20px 40px; font-size:1.5em; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color:white; border:none; border-radius:50px; cursor:pointer; font-weight:bold; box-shadow:0 6px 20px rgba(245,87,108,0.5); transition:all 0.3s;'>SPIN THE WHEEL! 🎯</button>
            <div id='spin-result' style='margin-top:2em; padding:20px; background:rgba(255,255,255,0.2); border-radius:15px; min-height:80px; font-size:1.3em; color:#FFD700; display:flex; align-items:center; justify-content:center; font-weight:bold;'></div>
        </div>
    `;
    
    zone.innerHTML += wheelHTML;
    
    document.getElementById('spin-btn').onclick = () => {
        const btn = document.getElementById('spin-btn');
        const result = document.getElementById('spin-result');
        
        // Spinning animation
        btn.disabled = true;
        btn.innerText = 'Spinning... 🌀';
        
        let spinCount = 0;
        const spinInterval = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * options.length);
            result.innerText = options[randomIdx];
            spinCount++;
            
            if(spinCount > 10) {
                clearInterval(spinInterval);
                const finalIdx = Math.floor(Math.random() * options.length);
                result.innerHTML = `🎯 <strong>${options[finalIdx]}</strong> 💖`;
                btn.disabled = false;
                btn.innerText = 'SPIN AGAIN! 🎯';
            }
        }, 150);
    };
}

// ========== REMAINING GAMES (4-8) ==========

// Game 4: Love Card Flipper
function createCardFlipper(){const compliments=["You light up my world!","Every day with you is a blessing","Your laughter is my favorite music","You are my sunshine, Nanniiii!","Our love story is my favorite","You make every moment magical"];const zone=document.getElementById('games-zone');zone.innerHTML+=`<div id='card-flipper' style='max-width:600px;margin:2em auto;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;backdrop-filter:blur(10px);text-align:center;'><h3 style='color:#fce4ec;font-size:1.8em;'>🎴 Flip a Compliment!</h3><p style='color:#fff;margin:1em 0;'>Click the cards to reveal sweet messages 💖</p><div style='display:flex;flex-wrap:wrap;gap:15px;justify-content:center;margin-top:1.5em;'>${compliments.map((txt,i)=>`<button class='flip-card-btn' data-msg='${txt}' style='width:100px;height:100px;font-size:2em;background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;border-radius:15px;cursor:pointer;box-shadow:0 4px 15px rgba(245,87,108,0.4);transition:all 0.3s;'>?</button>`).join('')}</div></div>`;setTimeout(()=>{document.querySelectorAll('.flip-card-btn').forEach(btn=>{btn.onclick=function(){if(this.classList.contains('revealed'))return;this.innerText=this.dataset.msg;this.classList.add('revealed');this.style.fontSize='0.9em';this.style.background='linear-gradient(135deg,#FFD700,#FFA500)';};});},100);}

// Game 5: Grow Our Love Tree
function createLoveTree(){const zone=document.getElementById('games-zone');let count=0;zone.innerHTML+=`<div id='love-tree' style='max-width:500px;margin:2em auto;padding:30px;background:rgba(255,255,255,0.1);border-radius:20px;backdrop-filter:blur(10px);text-align:center;'><h3 style='color:#fce4ec;font-size:1.8em;'>🌳 Grow Our Love Tree</h3><p style='color:#fff;margin:1em 0;'>Every click adds a heart to our tree! 💕</p><div id='tree' style='font-size:2.5em;min-height:120px;line-height:1.5;'></div><button id='tree-btn' style='padding:15px 30px;font-size:1.2em;background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;border-radius:50px;cursor:pointer;font-weight:bold;margin-top:1em;box-shadow:0 4px 15px rgba(245,87,108,0.4);'>Add Heart Leaf 💗</button><div id='tree-msg' style='color:#FFD700;font-size:1.2em;margin-top:1em;min-height:40px;'></div></div>`;document.getElementById('tree-btn').onclick=()=>{count++;document.getElementById('tree').innerHTML+='💗';if(count===10){document.getElementById('tree-msg').innerHTML='🎉 Our love flourishes like this beautiful tree — forever growing! 💕';document.getElementById('tree-btn').disabled=true;document.getElementById('tree-btn').innerText='Tree Complete! ✨';}};}

// Game 6: Emoji Love Story
function createEmojiStory(){const emojis=['😍','😄','🥰','🌧️','🌙','🐻','💐','✨','🎉','💕','💋','🌹'];const zone=document.getElementById('games-zone');zone.innerHTML+=`<div id='emoji-story' style='max-width:600px;margin:2em auto;padding:25px;background:rgba(255,255,255,0.1);border-radius:15px;backdrop-filter:blur(10px);text-align:center;'><h3 style='color:#fce4ec;font-size:1.8em;'>💬 Create Emoji Love Story!</h3><p style='color:#fff;margin:1em 0;'>Click emojis to build our story 💖</p><div id='emoji-choices' style='display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:1.5em 0;'>${emojis.map(e=>`<button onclick="addEmojiToStory('${e}')" style='font-size:2em;padding:10px 15px;background:rgba(255,255,255,0.2);border:2px solid #f093fb;border-radius:10px;cursor:pointer;transition:all 0.3s;'>${e}</button>`).join('')}</div><p id='story-output' style='font-size:2em;min-height:80px;padding:20px;background:rgba(255,255,255,0.15);border-radius:10px;margin-top:1em;'></p><button onclick="document.getElementById('story-output').innerText=''" style='padding:10px 20px;background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;border-radius:25px;cursor:pointer;margin-top:1em;'>Clear Story 🔄</button></div>`;window.addEmojiToStory=function(e){document.getElementById('story-output').innerText+=e+' ';};}

// Game 7: Heartbeat Clicker
function createHeartbeatClicker(){let clicks=0,timer=0,interval;const zone=document.getElementById('games-zone');zone.innerHTML+=`<div id='heartbeat' style='max-width:500px;margin:2em auto;padding:30px;background:rgba(255,255,255,0.1);border-radius:20px;backdrop-filter:blur(10px);text-align:center;'><h3 style='color:#fce4ec;font-size:1.8em;'>❤️ Heartbeat Clicker</h3><p style='color:#fff;margin:1em 0;'>Click the heart as fast as you can in 5 seconds! 💖</p><button id='heart-btn' style='font-size:5em;background:none;border:none;cursor:pointer;transition:transform 0.1s;'>❤️</button><div><span style='color:#FFD700;font-size:2em;font-weight:bold;' id='heart-count'>0</span><span style='color:#fff;font-size:1.2em;margin-left:10px;'>clicks</span></div><p id='heart-msg' style='color:#fce4ec;font-size:1.3em;margin-top:1em;min-height:50px;font-weight:bold;'></p></div>`;document.getElementById('heart-btn').onclick=function(){this.style.transform='scale(1.2)';setTimeout(()=>this.style.transform='scale(1)',100);if(timer===0){timer=5;interval=setInterval(()=>{timer--;if(timer===0){clearInterval(interval);let msg=clicks>20?'🎉 Super love speed! My heart races for you! 💖':clicks>15?'💕 Amazing! You make my heart beat faster!':'💓 Sweet effort! Let\'s make more heartbeats together!';document.getElementById('heart-msg').innerText=msg;document.getElementById('heart-btn').disabled=true;setTimeout(()=>{clicks=0;document.getElementById('heart-count').innerText='0';document.getElementById('heart-msg').innerText='';document.getElementById('heart-btn').disabled=false;},3000);}},1000);}clicks++;document.getElementById('heart-count').innerText=clicks;};}

// Game 8: Tic Tac Toe
function createTicTacToe(){const zone=document.getElementById('games-zone');let board=['','','','','','','','',''],currentPlayer='💖',gameActive=true;const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];zone.innerHTML+=`<div id='tic-tac-toe' style='max-width:400px;margin:2em auto;padding:25px;background:rgba(255,255,255,0.1);border-radius:20px;backdrop-filter:blur(10px);text-align:center;'><h3 style='color:#fce4ec;font-size:1.8em;'>❌⭕ Love Tic Tac Toe</h3><p style='color:#fff;margin:1em 0;'>You: 💖 | Aadi: 💕</p><div id='ttt-board' style='display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:1.5em auto;max-width:300px;'></div><p id='ttt-msg' style='color:#FFD700;font-size:1.3em;margin-top:1em;min-height:40px;font-weight:bold;'></p><button id='ttt-reset' style='padding:12px 25px;background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;border-radius:25px;cursor:pointer;font-weight:bold;margin-top:1em;'>New Game 🎮</button></div>`;for(let i=0;i<9;i++){const cell=document.createElement('div');cell.className='ttt-cell';cell.dataset.index=i;cell.style.cssText='width:90px;height:90px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:2.5em;cursor:pointer;transition:all 0.3s;border:2px solid transparent;';cell.onclick=()=>handleCellClick(i);document.getElementById('ttt-board').appendChild(cell);}function handleCellClick(idx){if(board[idx]||!gameActive)return;board[idx]=currentPlayer;document.querySelectorAll('.ttt-cell')[idx].innerText=currentPlayer;if(checkWin()){document.getElementById('ttt-msg').innerHTML=`🎉 ${currentPlayer==='💖'?'You':'Aadi'} won! 💕`;gameActive=false;return;}if(!board.includes('')){document.getElementById('ttt-msg').innerHTML='🤝 It\'s a tie! Love wins! 💖';gameActive=false;return;}currentPlayer=currentPlayer==='💖'?'💕':'💖';document.getElementById('ttt-msg').innerText=`${currentPlayer==='💖'?'Your':'Aadi\'s'} turn!`;}function checkWin(){return winPatterns.some(pattern=>pattern.every(idx=>board[idx]===currentPlayer));}document.getElementById('ttt-reset').onclick=()=>{board=['','','','','','','','',''];currentPlayer='💖';gameActive=true;document.querySelectorAll('.ttt-cell').forEach(cell=>cell.innerText='');document.getElementById('ttt-msg').innerText='Your turn!';};document.getElementById('ttt-msg').innerText='Your turn!';}
document.head.appendChild(style);}
