import { clamp, randomRange } from './utils.js';

export class Game {
  constructor({ area, ui }) {
    this.area = area;
    this.ui = ui;
    this.snowflakes = [];
    this.running = false;
    this.lastTime = 0;
    this.spawnTimer = 0;
    this.spawnDelay = 1.1;
    this.difficulty = 1;
    this.inputDirection = 0;
    this.player = {
      x: 0,
      targetX: 0,
      width: 120,
      y: 0,
    };

    this.boundLoop = this.loop.bind(this);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.reset();
  }

  resize() {
    this.width = this.area.clientWidth;
    this.height = this.area.clientHeight;
    this.player.width = clamp(this.width * 0.14, 96, 150);
    this.player.y = this.height * 0.88;
    if (!this.player.x) {
      this.player.x = this.width / 2;
      this.player.targetX = this.player.x;
    }
    this.updatePlayerVisual();
  }

  setDirection(dir) {
    this.inputDirection = clamp(dir, -1, 1);
  }

  setPointerTarget(x) {
    const clamped = clamp(x, this.player.width / 2, this.width - this.player.width / 2);
    this.player.targetX = clamped;
  }

  start() {
    if (this.running) return;
    this.resetState();
    this.running = true;
    this.lastTime = performance.now();
    this.ui.showMessage('');
    this.ui.setStartLabel('Restart the snowfall');
    requestAnimationFrame(this.boundLoop);
  }

  stop() {
    this.running = false;
  }

  reset() {
    this.stop();
    this.resetState();
    this.ui.showMessage('Press Start or tap the snow globe to begin');
    this.ui.setStartLabel('Start the snowfall');
  }

  resetState() {
    this.clearSnowflakes();
    this.score = 0;
    this.lives = 3;
    this.spawnDelay = 1.1;
    this.spawnTimer = 0.3;
    this.difficulty = 1;
    this.player.x = this.width / 2;
    this.player.targetX = this.player.x;
    this.ui.updateScore(this.score);
    this.ui.updateLives(this.lives);
    this.updatePlayerVisual();
  }

  loop(timestamp) {
    if (!this.running) return;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;
    this.update(dt, timestamp / 1000);
    requestAnimationFrame(this.boundLoop);
  }

  update(dt, timeSeconds) {
    this.updatePlayer(dt);
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnSnowflake();
      const minDelay = 0.35;
      this.spawnDelay = clamp(this.spawnDelay * 0.985, minDelay, 2);
      this.spawnTimer = this.spawnDelay;
    }

    const fallBoost = 18 * this.difficulty;
    this.difficulty += dt * 0.02;

    for (let i = this.snowflakes.length - 1; i >= 0; i -= 1) {
      const flake = this.snowflakes[i];
      flake.y += (flake.speed + fallBoost) * dt;
      flake.x += Math.sin(timeSeconds * flake.wobbleSpeed + flake.phase) * flake.drift * dt;
      flake.x = clamp(flake.x, flake.size / 2, this.width - flake.size / 2);
      const left = flake.x - flake.size / 2;
      flake.el.style.setProperty('--tx', `${left}px`);
      flake.el.style.setProperty('--ty', `${flake.y}px`);

      if (this.checkCatch(flake)) {
        this.removeFlakeAt(i);
        continue;
      }

      if (flake.y > this.height + flake.size) {
        this.removeFlakeAt(i);
        this.loseLife();
      }
    }
  }

  updatePlayer(dt) {
    const keyboardSpeed = 420;
    if (this.inputDirection !== 0) {
      this.player.targetX += this.inputDirection * keyboardSpeed * dt;
    }
    const half = this.player.width / 2;
    this.player.targetX = clamp(this.player.targetX, half, this.width - half);
    const blend = 1 - Math.exp(-dt * 12);
    this.player.x += (this.player.targetX - this.player.x) * blend;
    this.updatePlayerVisual();
  }

  updatePlayerVisual() {
    if (!this.area) return;
    const playerEl = this.area.querySelector('#player');
    if (!playerEl) return;
    const percent = (this.player.x / this.width) * 100;
    playerEl.style.left = `${percent}%`;
  }

  spawnSnowflake() {
    const size = randomRange(12, 26);
    const flake = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      x: randomRange(size / 2, this.width - size / 2),
      y: -size,
      size,
      speed: randomRange(70, 140),
      drift: randomRange(18, 36),
      wobbleSpeed: randomRange(0.9, 2.1),
      phase: randomRange(0, Math.PI * 2),
    };
    const el = document.createElement('div');
    el.className = 'flake';
    el.style.setProperty('--size', `${flake.size}px`);
    el.style.setProperty('--tx', `${flake.x - flake.size / 2}px`);
    el.style.setProperty('--ty', `${flake.y}px`);
    this.area.appendChild(el);
    flake.el = el;
    this.snowflakes.push(flake);
  }

  checkCatch(flake) {
    const playerTop = this.player.y - 20;
    if (flake.y + flake.size < playerTop) return false;
    const playerLeft = this.player.x - this.player.width / 2;
    const playerRight = this.player.x + this.player.width / 2;
    const flakeCenter = flake.x;
    if (flakeCenter >= playerLeft && flakeCenter <= playerRight) {
      this.score += 1;
      this.ui.updateScore(this.score);
      this.ui.pulseScore();
      this.ui.createCatchFx(flakeCenter, this.player.y - 30);
      this.raiseDifficulty();
      return true;
    }
    return false;
  }

  raiseDifficulty() {
    this.difficulty = Math.min(this.difficulty + 0.015, 3.5);
    this.spawnDelay = clamp(this.spawnDelay * 0.99, 0.28, 2);
  }

  removeFlakeAt(index) {
    const flake = this.snowflakes[index];
    if (flake?.el) flake.el.remove();
    this.snowflakes.splice(index, 1);
  }

  clearSnowflakes() {
    this.snowflakes.forEach((f) => f.el?.remove());
    this.snowflakes = [];
  }

  loseLife() {
    this.lives -= 1;
    this.ui.updateLives(this.lives);
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.stop();

    const message = `Out of lives! Final score: ${this.score}`;
    this.ui.showMessage(message);
  }
}
