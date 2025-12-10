import { Game } from './game.js';
import { UI } from './ui.js';
import { Input } from './input.js';

document.addEventListener('DOMContentLoaded', async () => {
  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const messageEl = document.getElementById('message');
  const gameArea = document.getElementById('game-area');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  const ui = new UI({ scoreEl, livesEl, messageEl, startBtn, gameArea });
  const game = new Game({ area: gameArea, ui });

  const input = new Input({
    area: gameArea,
    onMove: (x) => game.setPointerTarget(x),
    onDirectionChange: (dir) => game.setDirection(dir),
    onStart: () => {
      if (!game.running) {
        game.start();
      }
    },
  });

  startBtn.addEventListener('click', () => game.start());
  resetBtn.addEventListener('click', () => game.reset());

  // Prevent context menu interference on touch devices
  gameArea.addEventListener('contextmenu', (e) => e.preventDefault());

  // Make sure keyboard focus works on the player element for accessibility
  const playerEl = document.getElementById('player');
  if (playerEl) {
    playerEl.addEventListener('focus', () => {
      if (!game.running) {
        game.start();
      }
    });
  }

  // Expose for debugging in console if needed
  window.catchSnowflake = { game, ui, input };
});
