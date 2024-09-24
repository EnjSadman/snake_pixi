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
    let block = new Graphics();
    for (let i = 0; i < this.width; i++) {
      block.rect(
        i * this.tileSize, 0, this.tileSize , this.tileSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 0; i < this.width; i++) {
      block.rect(
        i * this.tileSize, (this.height - 1) * this.tileSize, this.tileSize , this.tileSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.rect(
        0, i * this.tileSize, this.tileSize, this.tileSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.rect(
        (this.width * this.tileSize) - this.tileSize, i * this.tileSize, this.tileSize, this.tileSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
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