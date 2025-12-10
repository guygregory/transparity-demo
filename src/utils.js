export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatNumber(value) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
