import { randomNumberGenerator } from "./RandomGen.js";

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
    let block = new PIXI.Graphics();
    for (let i = 0; i < this.width; i++) {
      block.beginFill(0xFFFFFF);  
      block.drawRect(i * this.baseSize, 0, this.baseSize, this.baseSize); 
      block.endFill();

      this.app.stage.addChild(block);
    }
    for (let i = 0; i < this.width; i++) {
      block.beginFill(0xFFFFFF);  
      block.drawRect(i * this.baseSize, (this.height - 1) * this.baseSize, this.baseSize, this.baseSize); 
      block.endFill();
      
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.beginFill(0xFFFFFF);  
      block.drawRect(0, i * this.baseSize, this.baseSize, this.baseSize); 
      block.endFill();
      
      this.app.stage.addChild(block);
    }
    for (let i = 1; i < this.height; i++) {
      block.beginFill(0xFFFFFF);  
      block.drawRect((this.width * this.baseSize) - this.baseSize, i * this.baseSize, this.baseSize, this.baseSize); 
      block.endFill();
      
      this.app.stage.addChild(block);
    }
  }

  placeWall() {
    const snakeSegments = this.snake.snakeSegments;
    const coords = [
      randomNumberGenerator(this.baseSize, (this.width - 1) * this.baseSize, this.baseSize),
      randomNumberGenerator(this.baseSize, (this.height - 1) * this.baseSize, this.baseSize)
    ];
    if (snakeSegments.some(el => el.position.x === coords[0] && el.position.y === coords[1])
      || this.wallsCoords.some(element => element[0] === coords[0] && element[1] === coords[1])
      ) {
        this.placeWall();
      } else {
        const wallBlock = new PIXI.Graphics()
        wallBlock.beginFill(0xFFFFFF);  
        wallBlock.drawRect(coords[0], coords[0], this.baseSize, this.baseSize); 
        wallBlock.endFill();

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