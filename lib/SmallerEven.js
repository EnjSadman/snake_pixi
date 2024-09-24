export function SmallerEven(num) {
  return Math.floor(num) % 10 === 0 ? Math.floor(num) : SmallerEven(num - 1);
}