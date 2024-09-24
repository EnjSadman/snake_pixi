import { Graphics } from "pixi.js";
import { randomNumberGenerator } from "./RandomGen";

export class Walls {
  wallsCoords = [];
  app;
  height;
  width;
  baseSize;
  snake;

  constructor(app, height, width, baseSize, snake) {
    this.app = app;
    this.height = height;
    this.width = width;
    this.baseSize = baseSize;
    this.snake = snake;
  }

  initializeWalls() {
    let block = new Graphics();
    for (let i = 0; i < this.width; i++) {
      block.rect(
        i * this.baseSize, 0, this.baseSize , this.baseSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 0; i < this.width; i++) {
      block.rect(
        i * this.baseSize, (this.height - 1) * this.baseSize, this.baseSize , this.baseSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.rect(
        0, i * this.baseSize, this.baseSize, this.baseSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.rect(
        (this.width * this.baseSize) - this.baseSize, i * this.baseSize, this.baseSize, this.baseSize 
      )
      .stroke({
        width: 1,
        color: 0xFFFFFF
      })
      this.app.stage.addChild(block);
    }
  }

  placeWall() {
    const snakeSegments = this.snake.snakeSegments;
    const coords = [
      randomNumberGenerator(this.baseSize, (this.width - 1) * this.baseSize, this.baseSize),
      randomNumberGenerator(this.baseSize, (this.height - 1) * this.baseSize, this.baseSize)
    ];
    console.log(this.wallsCoords);
    if (snakeSegments.some(el => el.position.x === coords[0] && el.position.y === coords[1])
      || this.wallsCoords.some(element => element[0] === coords[0] && element[1] === coords[1])
      ) {
        this.placeWall();
      } else {
        const wallBlock = new Graphics()
        .rect(coords[0], coords[1], this.baseSize, this.baseSize)
        .fill({
          color: 0x000000
        })
        .stroke({
          width: 1,
          color: 0xFFFFFF
        })

        this.wallsCoords.push(coords);
        console.log(coords)
        this.app.stage.addChild(wallBlock);
      }
  }
}

export function describeBorders(width, height, baseSize) {
  const borderBox = [];

  for (let x = 0; x < width; x++) {
    borderBox.push([(x * baseSize), 0]);
  }
  for (let x = 0; x < width; x++) {
    borderBox.push([x * baseSize, (height - 1) * baseSize]);
  }
  for (let y = 1; y < height - 1; y++) {
    borderBox.push([0, y * baseSize]);
  }
  for (let y = 1; y < height - 1; y++) {
    borderBox.push([(width - 1)* baseSize, y * baseSize]);
  }

  return borderBox;
}