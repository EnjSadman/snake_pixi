import { Game } from "../classic/Game.js";
export class GamePortals extends Game {

  checkFood() {
    const snakeHeadX = this.snake.snakeSegments[0].position.x;
    const snakeHeadY = this.snake.snakeSegments[0].position.y;
    if (this.food.foodCoords[0] === undefined) {
      this.food.placeFood();
      this.food.placeFood();
    } else {
      if (
        this.snake.checkCollision([], snakeHeadX, snakeHeadY, this.food.foodCoords[0][0], this.food.foodCoords[0][1])
        || this.snake.checkCollision([], snakeHeadX, snakeHeadY, this.food.foodCoords[1][0], this.food.foodCoords[1][1])
      ) {
        this.setCurrentScore()
        this.repositionHead(this.food.foodCoords[0][0], this.food.foodCoords[0][1], this.food.foodCoords[1][0], this.food.foodCoords[1][1]);
        this.food.foodGraphic.forEach(element => {     
          this.app.stage.removeChild(element);
        });
        this.food.foodGraphic = []
        this.food.foodCoords = [];
        this.snake.growSnake();
        return true;
      } else {
        return false;
      }
    }
  }
}