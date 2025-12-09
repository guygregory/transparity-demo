import { Game } from './game.js';
import { setupInput } from './input.js';
import { createUI } from './ui.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const ui = createUI();
const input = setupInput(canvas);
const game = new Game(ctx, ui, input);

function fitCanvas() {
  const holder = canvas.parentElement;
  const width = holder.clientWidth;
  const height = Math.max(420, Math.min(640, holder.clientWidth * 0.62));
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  game.resize(canvas.width, canvas.height);
}

fitCanvas();
window.addEventListener('resize', () => {
  fitCanvas();
});

ui.startBtn.addEventListener('click', () => {
  if (!game.running) {
    game.start();
    ui.setButtonsPlaying(true);
    return;
  }
  game.togglePause();
});

ui.resetBtn.addEventListener('click', () => {
  game.start();
  ui.setButtonsPlaying(true);
});

let last = performance.now();
function tick(now) {
  const delta = Math.min(0.05, (now - last) / 1000);
  last = now;
  game.update(delta);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
