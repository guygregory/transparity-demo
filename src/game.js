import { clamp, randomRange, lerp } from './utils.js';

export class Game {
  constructor(ctx, ui, input) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.ui = ui;
    this.input = input;
    this.running = false;
    this.paused = false;
    this.maxMisses = 5;
    this.duration = 60;
    this.playerWidth = 110;
    this.playerHeight = 28;
    this.snowflakes = [];
    this.spawnTimer = 0;
    this.spawnInterval = 0.8;
    this.playerX = this.canvas.width * 0.5;
    this.movementSpeed = 420;
  }

  start() {
    this.running = true;
    this.paused = false;
    this.snowflakes = [];
    this.score = 0;
    this.misses = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 0.8;
    this.timeLeft = this.duration;
    this.ui.setScore(this.score);
    this.ui.setMisses(this.misses, this.maxMisses);
    this.ui.setTimer(this.timeLeft);
    this.ui.announce('Game started');
  }

  togglePause() {
    if (!this.running) return;
    this.paused = !this.paused;
    this.ui.announce(this.paused ? 'Paused' : 'Resumed');
    this.ui.setButtonsPlaying(!this.paused);
  }

  stop(reason) {
    this.running = false;
    this.paused = false;
    if (reason) this.ui.announce(reason);
  }

  resize(width, height) {
    const ratioX = width / this.canvas.width;
    this.canvas.width = width;
    this.canvas.height = height;
    this.playerX *= ratioX;
    this.input.resetPointer(this.canvas.width);
  }

  spawnSnowflake() {
    const size = randomRange(10, 26);
    const speed = randomRange(70, 140);
    const wiggle = randomRange(6, 18);
    this.snowflakes.push({
      x: randomRange(size, this.canvas.width - size),
      y: -size,
      size,
      speed,
      wiggle,
      phase: Math.random() * Math.PI * 2,
      wiggleSpeed: randomRange(1, 2.5)
    });
  }

  update(delta) {
    if (!this.running) return;
    if (this.paused) {
      this.draw(true);
      return;
    }

    this.timeLeft = Math.max(0, this.timeLeft - delta);
    this.ui.setTimer(this.timeLeft);
    this.spawnTimer += delta;
    const targetInterval = lerp(0.8, 0.35, Math.min(1, this.score / 50));
    this.spawnInterval = lerp(this.spawnInterval, targetInterval, 0.1);
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnSnowflake();
      this.spawnTimer = 0;
    }

    this.updatePlayer(delta);
    this.updateSnowflakes(delta);

    if (this.timeLeft <= 0) {
      this.stop('Time up!');
    }
    if (this.misses >= this.maxMisses) {
      this.stop('Too many missed flakes');
    }

    this.draw(false);
  }

  updatePlayer(delta) {
    const targetX = this.input.hasPointer()
      ? this.input.getPointerX()
      : this.playerX;

    let moveX = this.playerX;
    if (this.input.isLeftPressed()) moveX -= this.movementSpeed * delta;
    if (this.input.isRightPressed()) moveX += this.movementSpeed * delta;

    this.playerX = lerp(moveX, targetX, this.input.hasPointer() ? 0.35 : 0.08);
    const half = this.playerWidth * 0.5;
    this.playerX = clamp(this.playerX, half, this.canvas.width - half);
  }

  updateSnowflakes(delta) {
    const playerY = this.canvas.height - this.playerHeight - 18;
    const half = this.playerWidth * 0.5;

    for (let i = this.snowflakes.length - 1; i >= 0; i -= 1) {
      const f = this.snowflakes[i];
      f.phase += delta * f.wiggleSpeed;
      f.x += Math.sin(f.phase) * f.wiggle * delta;
      f.y += f.speed * delta;

      if (f.y + f.size >= playerY && Math.abs(f.x - this.playerX) <= half + f.size * 0.6) {
        this.snowflakes.splice(i, 1);
        this.score += 1;
        this.ui.setScore(this.score);
        continue;
      }

      if (f.y - f.size > this.canvas.height) {
        this.snowflakes.splice(i, 1);
        this.misses += 1;
        this.ui.setMisses(this.misses, this.maxMisses);
      }
    }
  }

  draw(paused) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackdrop();
    this.drawSnowflakes();
    this.drawPlayer();

    if (paused) {
      ctx.fillStyle = 'rgba(14,27,44,0.6)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = '#f7fbff';
      ctx.font = '32px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  drawBackdrop() {
    const { ctx } = this;
    const grad = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    grad.addColorStop(0, 'rgba(16,37,66,0.05)');
    grad.addColorStop(1, 'rgba(16,37,66,0.25)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 3; i += 1) {
      const y = this.canvas.height - 60 - i * 12;
      ctx.beginPath();
      ctx.ellipse(this.canvas.width * (0.2 + i * 0.3), y, 140 + i * 30, 28, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawSnowflakes() {
    const { ctx } = this;
    ctx.lineWidth = 2;
    for (const f of this.snowflakes) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.fillStyle = '#f7fbff';
      ctx.strokeStyle = 'rgba(247,251,255,0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, f.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-f.size * 0.6, 0);
      ctx.lineTo(f.size * 0.6, 0);
      ctx.moveTo(0, -f.size * 0.6);
      ctx.lineTo(0, f.size * 0.6);
      ctx.moveTo(-f.size * 0.4, -f.size * 0.4);
      ctx.lineTo(f.size * 0.4, f.size * 0.4);
      ctx.moveTo(-f.size * 0.4, f.size * 0.4);
      ctx.lineTo(f.size * 0.4, -f.size * 0.4);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawPlayer() {
    const { ctx } = this;
    const y = this.canvas.height - this.playerHeight - 12;
    const x = this.playerX - this.playerWidth * 0.5;
    const radius = 14;

    ctx.fillStyle = '#d62839';
    ctx.beginPath();
    ctx.roundRect(x, y, this.playerWidth, this.playerHeight, radius);
    ctx.fill();

    ctx.fillStyle = '#f08c42';
    ctx.fillRect(x, y + this.playerHeight - 10, this.playerWidth, 10);

    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.playerX - this.playerWidth * 0.2, y + 6);
    ctx.quadraticCurveTo(this.playerX, y - 12, this.playerX + this.playerWidth * 0.2, y + 6);
    ctx.stroke();
  }
}
