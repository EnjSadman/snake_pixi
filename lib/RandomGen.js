export function randomNumberGenerator(min, max, step) {
  const minStep = min / step;
  const maxStep = max / step;

  const randomNumber = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep

  return randomNumber * step
}