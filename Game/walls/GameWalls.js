import { Game } from "../classic/Game";

export class GameWalls extends Game {
  gameLoop() {
    setTimeout(() => {
        this.snake.move();
        if (!this.handleCollision()) {
          if (this.checkFood()) {
            this.walls.placeWall();
          } 
          this.gameLoop();
        } else {
          this.end();
        }
    }, this.speed);
}
}