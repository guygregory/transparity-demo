import { clamp } from './utils.js';

export function setupInput(canvas) {
  let pointerX = canvas.width * 0.5;
  let pointerActive = false;
  const keys = new Set();

  const normalizeX = clientX => {
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / rect.width;
    return (clientX - rect.left) * ratio;
  };

  const onMove = event => {
    pointerX = normalizeX(event.clientX);
    pointerActive = true;
  };

  const onTouch = event => {
    if (event.touches && event.touches[0]) {
      pointerX = normalizeX(event.touches[0].clientX);
      pointerActive = true;
    }
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onTouch, { passive: true });
  window.addEventListener('touchstart', onTouch, { passive: true });

  window.addEventListener('keydown', e => keys.add(e.key.toLowerCase()));
  window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));

  return {
    getPointerX: () => pointerX,
    hasPointer: () => pointerActive,
    isLeftPressed: () => keys.has('arrowleft') || keys.has('a'),
    isRightPressed: () => keys.has('arrowright') || keys.has('d'),
    resetPointer: width => {
      pointerX = clamp(pointerX, 0, width);
      pointerActive = false;
    }
  };
}
