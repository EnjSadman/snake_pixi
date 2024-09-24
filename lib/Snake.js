import { Graphics } from "pixi.js";

export class Snake {
  snakeSegments = [];
  direction = "up";

  constructor(app, snakeWidth, snakeHeight, blockSize) {
    this.app = app;
    this.snakeHeight = snakeHeight;
    this.snakeWidth = snakeWidth;
    this.blockSize = blockSize,
    this.createSnake();
  }

  createSnake() {
    for (let i = 0; i < this.snakeHeight; i++) {
        let snakeBlock = new Graphics()
        .rect(0, 0, this.blockSize, this.blockSize)
        .fill({
          color: 0xFF0000
        })     
        snakeBlock.x = (this.app.canvas.width / 2) - this.blockSize / 2 * Math.floor(this.snakeWidth / 2);
        snakeBlock.y = (this.app.canvas.height / 2) - this.blockSize / 2 * Math.floor(this.snakeHeight / 2) + i * this.blockSize;
        this.app.stage.addChild(snakeBlock);
        this.snakeSegments.push(snakeBlock);
    }
  }

  move() {
    const head = this.snakeSegments[0];
    let newX = head.x;
    let newY = head.y;

    if (this.direction === 'down') newY += this.blockSize;
    else if (this.direction === 'up') newY -= this.blockSize;
    else if (this.direction === 'left') newX -= this.blockSize;
    else if (this.direction === 'right') newX += this.blockSize;

    
    for (let i = this.snakeSegments.length - 1; i > 0; i--) {
        this.snakeSegments[i].x = this.snakeSegments[i - 1].x;
        this.snakeSegments[i].y = this.snakeSegments[i - 1].y;
    }

    head.x = newX;
    head.y = newY;
  }

  setDirection(newDirection) {
    if (this.direction === 'up' && newDirection === 'down') return;
    if (this.direction === 'down' && newDirection === 'up') return;
    if (this.direction === 'left' && newDirection === 'right') return;
    if (this.direction === 'right' && newDirection === 'left') return;
    this.direction = newDirection;
  }

  checkCollision(newX, newY, foodX, foodY) {
    if (newX < this.blockSize 
      || newX >= this.app.canvas.width - this.blockSize 
      || newY < this.blockSize 
      || newY >= this.app.canvas.height - this.blockSize) 
      {
        console.log(this.snakeSegments);
        return true;
      }
    for (let i = 1; i < this.snakeSegments.length; i++) {
      if (newX === this.snakeSegments[i].x && newY === this.snakeSegments[i].y) {
          return true;
      }
    }

    if (newX === foodX && foodY === newY) {
      return true;
    }

    return false;
  }

  growSnake() {
    const newSegment = new Graphics()
    .rect(0, 0, this.blockSize, this.blockSize)
    .fill({
      color: 0xFF0000
    });

    this.app.stage.addChild(newSegment);
    this.snakeSegments.push(newSegment);
  }

  getSpeed() {
    return this.speed;
  }
}