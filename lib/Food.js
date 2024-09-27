import { randomNumberGenerator } from "./RandomGen.js";

export class Food {
  app;
  snake;
  foodCoords = [];
  foodGraphic = [];
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
    if (snakeSegments.some(el => el.position.x === coords[0] && el.position.y === coords[1])
    || this.wallsCoords.some(element => element[0] === coords[0] && element[1] === coords[1])
    ) {
      this.placeFood()
    } else {
      const foodBlock = new PIXI.Graphics();
      foodBlock.beginFill(0x00FF00);
      console.log(coords);  
      foodBlock.drawRect(coords[0], coords[1], this.baseSize, this.baseSize); 
      foodBlock.endFill();

      this.foodCoords.push(coords);
      this.foodGraphic.push(foodBlock);
      this.app.stage.addChild(foodBlock);
      
    }
    
  }
}