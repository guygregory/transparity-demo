export class Input {
  constructor({ area, onMove, onDirectionChange, onStart }) {
    this.area = area;
    this.onMove = onMove;
    this.onDirectionChange = onDirectionChange;
    this.onStart = onStart;
    this.keys = { left: false, right: false };
    this.pointerActive = false;
    this.boundHandlers = [];
    this.bind();
  }

  bind() {
    const add = (target, event, handler) => {
      target.addEventListener(event, handler);
      this.boundHandlers.push(() => target.removeEventListener(event, handler));
    };

    add(this.area, 'pointerdown', (e) => {
      this.pointerActive = true;
      this.handlePointer(e);
    });

    add(window, 'pointermove', (e) => {
      if (!this.pointerActive) return;
      this.handlePointer(e);
    });

    add(window, 'pointerup', () => {
      this.pointerActive = false;
    });

    add(window, 'keydown', (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        this.keys.left = true;
        this.emitDirection();
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        this.keys.right = true;
        this.emitDirection();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (this.onStart) {
          this.onStart();
        }
      }
    });

    add(window, 'keyup', (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        this.keys.left = false;
        this.emitDirection();
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        this.keys.right = false;
        this.emitDirection();
      }
    });
  }

  emitDirection() {
    if (!this.onDirectionChange) return;
    const dir = (this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0);
    this.onDirectionChange(dir);
  }

  handlePointer(e) {
    if (!this.onMove || !this.area) return;
    const rect = this.area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    this.onMove(x);
  }

  destroy() {
    this.boundHandlers.forEach((unbind) => unbind());
    this.boundHandlers = [];
  }
}
