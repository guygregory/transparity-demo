export function createUI() {
  const scoreEl = document.getElementById('score');
  const missesEl = document.getElementById('misses');
  const timerEl = document.getElementById('timer');
  const announcementEl = document.getElementById('announcement');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  const announce = text => {
    announcementEl.textContent = text;
  };

  return {
    startBtn,
    resetBtn,
    setScore: score => {
      scoreEl.textContent = score;
      announce(`Score ${score}`);
    },
    setMisses: (misses, limit) => {
      missesEl.textContent = `${misses} / ${limit}`;
    },
    setTimer: seconds => {
      timerEl.textContent = `${Math.max(0, Math.ceil(seconds))}s`;
    },
    announce,
    setButtonsPlaying: playing => {
      startBtn.textContent = playing ? 'Pause' : 'Start';
    }
  };
}
