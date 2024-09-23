export function describeBorders(width, height, tileSize) {
  const borderBox = [];

  for (let x = 0; x < width; x++) {
    borderBox.push([(x * tileSize), 0]);
  }
  for (let x = 0; x < width; x++) {
    borderBox.push([x * tileSize, (height - 1) * tileSize]);
  }
  for (let y = 1; y < height - 1; y++) {
    borderBox.push([0, y * tileSize]);
  }
  for (let y = 1; y < height - 1; y++) {
    borderBox.push([(width - 1)* tileSize, y * tileSize]);
  }

  return borderBox;
}