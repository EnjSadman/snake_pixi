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
    const coords = [
      randomNumberGenerator(this.baseSize, this.width * this.baseSize, this.baseSize),
      randomNumberGenerator(this.baseSize, this.height * this.baseSize, this.baseSize)
    ]
    const foodBlock = new Graphics()
    .rect(coords[0], coords[1], this.baseSize, this.baseSize)
    .fill({
      color: 0x00FF00
    });

    if (this.foodCoords.length === 0) {
      this.foodCoords.push(coords);
      this.foodGraphic = foodBlock;
      this.app.stage.addChild(foodBlock);
    }
  }

  checkFood() {
    const snakeHeadX = this.snake.snakeSegments[0].position.x;
    const snakeHeadY = this.snake.snakeSegments[0].position.y;
    if (this.foodCoords[0] === undefined) {
      this.placeFood();
    } else {
      if (this.snake.checkCollision(snakeHeadX, snakeHeadY, this.foodCoords[0][0], this.foodCoords[0][1])) {
        this.app.stage.removeChild(this.foodGraphic);
        this.foodCoords.pop();
        this.snake.growSnake();
      }
    }
  }


}