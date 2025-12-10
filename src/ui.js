import { formatNumber } from './utils.js';

export class UI {
  constructor({ scoreEl, bestEl, livesEl, messageEl, startBtn, gameArea }) {
    this.scoreEl = scoreEl;
    this.bestEl = bestEl;
    this.livesEl = livesEl;
    this.messageEl = messageEl;
    this.startBtn = startBtn;
    this.gameArea = gameArea;
    
    // High score modal elements
    this.modal = document.getElementById('highscore-modal');
    this.modalMessage = document.getElementById('highscore-message');
    this.highscoreForm = document.getElementById('highscore-form');
    this.playerNameInput = document.getElementById('player-name');
    this.skipButton = document.getElementById('skip-highscore');
    this.closeModalButton = document.getElementById('close-modal');
    this.highscoreTableBody = document.getElementById('highscore-tbody');
    
    this.bindModalEvents();
  }

  bindModalEvents() {
    // Close modal when clicking overlay
    if (this.modal) {
      const overlay = this.modal.querySelector('.modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => this.hideModal());
      }
    }
    
    // Close modal button
    if (this.closeModalButton) {
      this.closeModalButton.addEventListener('click', () => this.hideModal());
    }
    
    // Skip button
    if (this.skipButton) {
      this.skipButton.addEventListener('click', () => {
        this.hideModal();
        if (this.onSkipHighScore) {
          this.onSkipHighScore();
        }
      });
    }
  }

  updateScore(score) {
    this.scoreEl.textContent = formatNumber(score);
  }

  updateBest(best) {
    this.bestEl.textContent = formatNumber(best);
  }

  updateLives(lives) {
    this.livesEl.textContent = lives;
    this.livesEl.setAttribute('aria-label', `Lives remaining: ${lives}`);
    this.livesEl.classList.remove('warn');
    if (lives === 1) {
      this.livesEl.classList.add('warn');
    }
  }

  setStartLabel(text) {
    if (this.startBtn) {
      this.startBtn.textContent = text;
    }
  }

  showMessage(text) {
    if (!this.messageEl) return;
    this.messageEl.textContent = text;
    if (text) {
      this.messageEl.classList.add('visible');
    } else {
      this.messageEl.classList.remove('visible');
    }
  }

  pulseScore() {
    this.scoreEl.classList.remove('pop');
    void this.scoreEl.offsetWidth; // restart animation
    this.scoreEl.classList.add('pop');
  }

  createCatchFx(x, y) {
    if (!this.gameArea) return;
    const fx = document.createElement('div');
    fx.className = 'catch-fx';
    fx.style.left = `${x}px`;
    fx.style.top = `${y}px`;
    this.gameArea.appendChild(fx);
    window.setTimeout(() => fx.remove(), 400);
  }

  /**
   * Show high score modal
   * @param {number} score - The player's score
   * @param {Function} onSubmit - Callback when form is submitted with name
   * @param {Function} onSkip - Callback when skip is clicked
   */
  showHighScoreModal(score, onSubmit, onSkip) {
    if (!this.modal) return;
    
    this.onSkipHighScore = onSkip;
    
    // Update message
    if (this.modalMessage) {
      this.modalMessage.textContent = `You scored ${formatNumber(score)} points!`;
    }
    
    // Reset and focus input
    if (this.playerNameInput) {
      this.playerNameInput.value = '';
      setTimeout(() => this.playerNameInput.focus(), 100);
    }
    
    // Handle form submission
    if (this.highscoreForm) {
      const handleSubmit = (e) => {
        e.preventDefault();
        const name = this.playerNameInput.value.trim();
        if (name && onSubmit) {
          onSubmit(name);
        }
        this.highscoreForm.removeEventListener('submit', handleSubmit);
      };
      this.highscoreForm.addEventListener('submit', handleSubmit);
    }
    
    // Show modal
    this.modal.removeAttribute('hidden');
  }

  /**
   * Hide high score modal
   */
  hideModal() {
    if (this.modal) {
      this.modal.setAttribute('hidden', '');
    }
  }

  /**
   * Display high scores in the table
   * @param {Array} scores - Array of score objects
   * @param {number} currentScore - Optional current score to highlight
   */
  displayHighScores(scores, currentScore = null) {
    if (!this.highscoreTableBody) return;
    
    this.highscoreTableBody.innerHTML = '';
    
    scores.forEach((entry, index) => {
      const row = document.createElement('tr');
      const isCurrentScore = currentScore !== null && entry.score === currentScore;
      
      if (isCurrentScore) {
        row.classList.add('highlight');
      }
      
      // Rank
      const rankCell = document.createElement('td');
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);
      
      // Name
      const nameCell = document.createElement('td');
      nameCell.textContent = entry.name;
      row.appendChild(nameCell);
      
      // Score
      const scoreCell = document.createElement('td');
      scoreCell.textContent = formatNumber(entry.score);
      row.appendChild(scoreCell);
      
      // Date
      const dateCell = document.createElement('td');
      const date = new Date(entry.date);
      dateCell.textContent = date.toLocaleDateString();
      row.appendChild(dateCell);
      
      this.highscoreTableBody.appendChild(row);
    });
    
    // If no scores, show message
    if (scores.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.textContent = 'No high scores yet. Be the first!';
      cell.style.textAlign = 'center';
      cell.style.padding = '1.5rem';
      cell.style.color = 'rgba(249, 251, 255, 0.6)';
      row.appendChild(cell);
      this.highscoreTableBody.appendChild(row);
    }
  }
}
