import { Game } from "../classic/Game.js";

export class GameGod extends Game {
  gameLoop() {
    setTimeout(() => {
      this.snake.move();
      if (!this.handleCollision()) {
        this.checkFood();
        this.gameLoop();
      } else {
        this.repositionHead();
        this.gameLoop();
      }
  }, this.speed);
  }

  repositionHead() {
    const snakeHead = this.snake.snakeSegments[0].position;
    if (snakeHead.x < 1 * this.walls.baseSize) {
      snakeHead.set((this.walls.width - 2) * this.walls.baseSize, snakeHead.y);
    } else if (snakeHead.x > (this.walls.width - 2) * this.walls.baseSize) {
      snakeHead.set(1 * this.walls.baseSize, snakeHead.y);
    }

    if (snakeHead.y < 1 * this.walls.baseSize) {
      snakeHead.set(snakeHead.x, (this.walls.height - 2) * this.walls.baseSize)
    } else if (snakeHead.y > (this.walls.height - 2) * this.walls.baseSize) {
      snakeHead.set(snakeHead.x, 1 * this.walls.baseSize);
    }
  }
}