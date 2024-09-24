import { Graphics } from "pixi.js";
import { randomNumberGenerator } from "./RandomGen";

export class Food {
  app;
  snake;
  foodCoords = [];
  foodGraphic;
  wallsCoords = [];
  width;
  height;
  baseSize;
  constructor(app, snake, wallsCoords, baseSize, width, height) {
    this.app = app;
    this.snake = snake;
    this.wallsCoords = wallsCoords;
    this.baseSize = baseSize;
    this.width = width - 2;
    this.height = height - 2;
  }

  placeFood() {
    const snakeSegments = this.snake.snakeSegments;
    const coords = [
      randomNumberGenerator(this.baseSize, this.width * this.baseSize, this.baseSize),
      randomNumberGenerator(this.baseSize, this.height * this.baseSize, this.baseSize)
    ]
    if (snakeSegments.some(el => el.position.x === coords[0] && el.position.y === coords[1])) {
      this.placeFood()
    } else {
      const foodBlock = new Graphics()
      .rect(coords[0], coords[1], this.baseSize, this.baseSize)
      .fill({
        color: 0x00FF00
      });

      this.foodCoords.push(coords);
      this.foodGraphic = foodBlock;
      this.app.stage.addChild(foodBlock);
      
    }
    
  }
}