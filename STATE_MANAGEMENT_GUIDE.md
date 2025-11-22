# 🎯 State Management Guide

## Overview

This guide shows how to use the state management system for your romantic website to handle AI-generated content, user preferences, game states, and UI updates.

## 📦 Core Components

### 1. StateManager (state.js)
The foundation - handles all state storage, persistence, and pub/sub subscriptions.

### 2. State Examples (state-examples.js)
Practical implementations for common use cases.

## 🚀 Quick Start

### HTML Setup
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Romantic Page</title>
  <link rel="stylesheet" href="assets/styles/shared.css">
</head>
<body>
  
  <!-- Your content -->
  
  <!-- Core modules (in order!) -->
  <script src="assets/scripts/config.js"></script>
  <script src="assets/scripts/utils.js"></script>
  <script src="assets/scripts/state.js"></script>
  <script src="assets/scripts/state-examples.js"></script>
  
  <!-- Your page script -->
  <script src="assets/scripts/mypage.js"></script>
</body>
</html>
```

## 💾 1. AI Content Management

### Save Generated Love Letter
```javascript
// When AI generates content
const letterData = {
  content: "My dearest Nandini, you light up my world...",
  type: "letter", // 'poem', 'letter', 'message'
  theme: "romantic"
};

const savedLetter = AIContentManager.saveGeneratedLetter(letterData);
console.log('Letter ID:', savedLetter.id);
```

### Display Saved Letters
```javascript
// Get all AI-generated letters
const letters = StateManager.getState('ai.generatedLetters') || [];

// Display in UI
const container = document.querySelector('.letters-container');
letters.forEach(letter => {
  const el = document.createElement('div');
  el.className = 'letter-card';
  el.innerHTML = `
    <div class="letter-content">${letter.content.substring(0, 100)}...</div>
    <button onclick="AIContentManager.toggleFavorite(${letter.id})">
      ${letter.isFavorite ? '❤️' : '🤍'} Favorite
    </button>
    <button onclick="AIContentManager.deleteLetter(${letter.id})">
      🗑️ Delete
    </button>
  `;
  container.appendChild(el);
});
```

### Favorites Management
```javascript
// Toggle favorite
const isFav = AIContentManager.toggleFavorite(letterId);

// Get all favorites
const favorites = AIContentManager.getFavorites();
console.log(`You have ${favorites.length} favorite letters!`);
```

## ⚙️ 2. User Preferences

### Theme Management
```javascript
// Set theme
PreferencesManager.setTheme('romantic'); // or 'dark', 'light'

// Get current theme
const theme = PreferencesManager.getTheme();
```

### Sound Controls
```javascript
// Toggle sound
const soundBtn = document.querySelector('.sound-toggle');
soundBtn.addEventListener('click', () => {
  const enabled = PreferencesManager.toggleSound();
  soundBtn.textContent = enabled ? '🔊' : '🔇';
});

// Check if sound is enabled
if (PreferencesManager.isSoundEnabled()) {
  // Play audio
  audio.play();
}
```

### Particle Effects
```javascript
// Toggle particles
const particlesBtn = document.querySelector('.particles-toggle');
particlesBtn.addEventListener('click', () => {
  const enabled = PreferencesManager.toggleParticles();
  
  // Particle system will automatically show/hide via subscription
});
```

### Animation Speed
```javascript
// Set animation speed
const speedSelect = document.querySelector('#animation-speed');
speedSelect.addEventListener('change', (e) => {
  PreferencesManager.setAnimationSpeed(e.target.value);
  // 'slow', 'normal', 'fast'
});
```

### Font Size (Accessibility)
```javascript
// Set font size
const fontBtns = document.querySelectorAll('.font-size-btn');
fontBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    PreferencesManager.setFontSize(btn.dataset.size);
    // 'small', 'medium', 'large'
  });
});
```

## 🎮 3. Game State Management

### Memory Card Game
```javascript
// Initialize game
function startMemoryGame() {
  GameStateManager.initMemoryGame();
  renderGameBoard();
}

// Update game state
function onCardMatch() {
  GameStateManager.updateMemoryGame({
    score: score + 10,
    matches: matches + 1
  });
}

// On card click
function onCardClick() {
  GameStateManager.updateMemoryGame({
    attempts: attempts + 1
  });
}

// Complete game
function onGameComplete() {
  const result = GameStateManager.completeMemoryGame();
  
  if (result.isNewRecord) {
    UIStateManager.showToast('🎉 New High Score!', 'success');
  }
  
  alert(`Score: ${result.score}\nTime: ${result.time}s`);
}
```

### Love Meter
```javascript
// Update love meter
function updateLoveMeter(percentage) {
  GameStateManager.updateLoveMeter(percentage);
  
  // Get highest score
  const highest = StateManager.getState('game.loveMeter.highest');
  document.querySelector('.highest-score').textContent = `Highest: ${highest}%`;
}
```

### Timeline Progress
```javascript
// Mark milestone as viewed
function viewMilestone(milestoneId) {
  GameStateManager.markTimelineViewed(milestoneId);
  
  // Update progress
  const progress = GameStateManager.getTimelineProgress();
  document.querySelector('.progress-bar').style.width = `${progress}%`;
  document.querySelector('.progress-text').textContent = `${progress}% Complete`;
}
```

## 🎨 4. UI State Management

### Modal Control
```javascript
// Show modal
function showLoveLetterModal(letter) {
  UIStateManager.showModal('love-letter', {
    title: 'Love Letter',
    content: letter.content,
    date: letter.timestamp
  });
}

// Close modal
const closeBtn = document.querySelector('.modal-close');
closeBtn.addEventListener('click', () => {
  UIStateManager.closeModal();
});
```

### Loading States
```javascript
// Show loading
async function generateLoveLetter() {
  UIStateManager.setLoading(true, 'Generating your love letter...');
  
  try {
    const result = await callAIAPI();
    AIContentManager.saveGeneratedLetter(result);
    UIStateManager.showToast('Letter generated!', 'success');
  } catch (error) {
    UIStateManager.showToast('Failed to generate letter', 'error');
  } finally {
    UIStateManager.setLoading(false);
  }
}
```

### Toast Notifications
```javascript
// Success toast
UIStateManager.showToast('❤️ Letter saved!', 'success');

// Error toast
UIStateManager.showToast('Failed to save', 'error', 5000);

// Info toast
UIStateManager.showToast('New feature available!', 'info');

// Warning toast
UIStateManager.showToast('Connection unstable', 'warning');
```

## 🔄 5. Reactive UI Updates

### Subscribe to State Changes
```javascript
// Auto-update UI when score changes
StateManager.subscribe('game.memory.score', (newScore) => {
  document.querySelector('.score-display').textContent = newScore;
  
  // Animate
  Animations.pulse(document.querySelector('.score-display'));
});

// Auto-update when favorite added
StateManager.subscribe('ai.generatedLetters', (letters) => {
  const favCount = letters.filter(l => l.isFavorite).length;
  document.querySelector('.fav-count').textContent = favCount;
});

// Auto-update theme
StateManager.subscribe('preferences.theme', (theme) => {
  document.body.className = `theme-${theme}`;
  console.log('Theme changed to:', theme);
});
```

### Unsubscribe
```javascript
// Save unsubscribe function
const unsubscribe = StateManager.subscribe('game.score', (score) => {
  console.log('Score:', score);
});

// Later, unsubscribe
unsubscribe();
```

## 💡 Complete Example: AI Generator Page

```javascript
// ai-generator-page.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize
  AIContentManager.init();
  PreferencesManager.init();
  PreferencesManager.apply();
  
  // Load saved letters
  displaySavedLetters();
  
  // Generate button
  document.querySelector('#generate-btn').addEventListener('click', async () => {
    const type = document.querySelector('#letter-type').value;
    const theme = document.querySelector('#theme-input').value;
    
    UIStateManager.setLoading(true, 'Creating magic...');
    
    try {
      // Simulate AI generation (replace with actual API call)
      await Utils.wait(2000);
      
      const letter = {
        content: `Dear Nandini, ${theme}... (AI generated content)`,
        type: type,
        theme: theme
      };
      
      // Save to state
      AIContentManager.saveGeneratedLetter(letter);
      
      // Show success
      UIStateManager.showToast('✨ Letter created!', 'success');
      
      // Update display
      displaySavedLetters();
      
    } catch (error) {
      UIStateManager.showToast('Generation failed', 'error');
    } finally {
      UIStateManager.setLoading(false);
    }
  });
});

function displaySavedLetters() {
  const letters = StateManager.getState('ai.generatedLetters') || [];
  const container = document.querySelector('#letters-container');
  
  container.innerHTML = '';
  
  letters.forEach(letter => {
    const card = document.createElement('div');
    card.className = 'letter-card';
    card.innerHTML = `
      <div class="letter-preview">${letter.content.substring(0, 150)}...</div>
      <div class="letter-meta">
        <span>${letter.type}</span>
        <span>${new Date(letter.timestamp).toLocaleDateString()}</span>
      </div>
      <div class="letter-actions">
        <button onclick="viewLetter(${letter.id})" class="btn">View</button>
        <button onclick="toggleFavorite(${letter.id})" class="btn-icon">
          ${letter.isFavorite ? '❤️' : '🤍'}
        </button>
        <button onclick="deleteLetter(${letter.id})" class="btn-icon">🗑️</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function viewLetter(letterId) {
  const letter = AIContentManager.getLetter(letterId);
  UIStateManager.showModal('letter-view', letter);
}

function toggleFavorite(letterId) {
  AIContentManager.toggleFavorite(letterId);
  displaySavedLetters();
}

function deleteLetter(letterId) {
  if (confirm('Delete this letter?')) {
    AIContentManager.deleteLetter(letterId);
    displaySavedLetters();
    UIStateManager.showToast('Letter deleted', 'info');
  }
}
```

## 📊 Debugging

```javascript
// View current state
console.log(StateManager.getState());

// View specific state
console.log(StateManager.getState('ai.generatedLetters'));

// Debug state manager
StateManager.debug();

// Clear all state (use carefully!)
StateManager.clearStorage();
StateManager.resetState();
```

## ✨ Best Practices

1. **Always initialize**: Call `.init()` on managers before use
2. **Subscribe wisely**: Unsubscribe when components unmount
3. **Use nested paths**: `user.name` instead of modifying entire `user` object
4. **Persist important data**: State automatically saves to localStorage
5. **Show feedback**: Use toasts/loading states for better UX
6. **Handle errors**: Always wrap async operations in try/catch
7. **Keep state flat**: Avoid deeply nested objects
8. **Use managers**: Don't access StateManager directly - use specialized managers

## 🎓 Next Steps

- Integrate with actual AI API (Gemini, OpenAI, etc.)
- Add backend sync for cross-device state
- Implement undo/redo functionality
- Add export/import for saved content
- Create state persistence strategies (session vs local)

---

**Made with 💝 for Nandini**
