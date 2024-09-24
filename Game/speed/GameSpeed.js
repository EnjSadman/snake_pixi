import { Game } from "../classic/Game";

export class GameSpeed extends Game {
  gameLoop() {
    setTimeout(() => {
        this.snake.move();
        if (!this.handleCollision()) {
          if (this.checkFood()) {
            this.speed -= (this.speed / 100) * 10
          }
            this.gameLoop();
        } else {
            this.end();
        }
    }, this.speed);
}
}