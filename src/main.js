import { Game } from './game.js';
import { UI } from './ui.js';
import { Input } from './input.js';
import { HighScores } from './highscores.js';

document.addEventListener('DOMContentLoaded', async () => {
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const livesEl = document.getElementById('lives');
  const messageEl = document.getElementById('message');
  const gameArea = document.getElementById('game-area');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  const ui = new UI({ scoreEl, bestEl, livesEl, messageEl, startBtn, gameArea });
  
  // Initialize high scores
  const highScores = new HighScores();
  await highScores.initialize();
  
  const game = new Game({ area: gameArea, ui, highScores });

  const input = new Input({
    area: gameArea,
    onMove: (x) => game.setPointerTarget(x),
    onDirectionChange: (dir) => game.setDirection(dir),
    onStart: () => game.start(),
  });

  startBtn.addEventListener('click', () => game.start());
  resetBtn.addEventListener('click', () => game.reset());

  // Prevent context menu interference on touch devices
  gameArea.addEventListener('contextmenu', (e) => e.preventDefault());

  // Make sure keyboard focus works on the player element for accessibility
  const playerEl = document.getElementById('player');
  if (playerEl) {
    playerEl.addEventListener('focus', () => game.start());
  }

  // Expose for debugging in console if needed
  window.catchSnowflake = { game, ui, input, highScores };
});
