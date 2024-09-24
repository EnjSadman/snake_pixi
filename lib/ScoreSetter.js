export function ScoreSetter(prev, curr, name) {
  if (prev !== null && curr > prev) {
    localStorage.setItem(name, curr);
    return true;
  }
  return false
}