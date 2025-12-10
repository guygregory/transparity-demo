import { formatNumber } from './utils.js';

export class UI {
  constructor({ scoreEl, bestEl, livesEl, messageEl, startBtn, gameArea }) {
    this.scoreEl = scoreEl;
    this.bestEl = bestEl;
    this.livesEl = livesEl;
    this.messageEl = messageEl;
    this.startBtn = startBtn;
    this.gameArea = gameArea;
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
}
