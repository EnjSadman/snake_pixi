import { Graphics } from "pixi.js";

export class Walls {
  wallsCoords = [];
  app;
  height;
  width;
  tileSize;

  constructor(app, height, width, tileSize) {
    this.app = app;
    this.height = height;
    this.width = width;
    this.tileSize = tileSize;
  }

  initializeWalls() {
    let block = new Graphics()
    .rect(
      this.tileSize / 2, this.tileSize/ 2, this.height * this.tileSize , this.width * this.tileSize 
    )
    .stroke({
      width: this.tileSize,
      color: 0x0000FF
    })
    this.app.stage.addChild(block);
  }

  placeWall() {

  }
}

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