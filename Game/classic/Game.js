import { APP_CONSTANTS } from '../../appConstants/constants';
import { Food } from '../../lib/Food';
import { Snake } from '../../lib/Snake';
import { Walls } from '../../lib/Walls';

export class Game {
    score = 0;
    scoreField = document.getElementById("current");
    speed = APP_CONSTANTS.BASE_SPEED
    app;
    snake;
    walls;
    food;
    mode;

    constructor(app, mode) {
        this.app = app;
        this.snake = new Snake(
            app,
            1,
            APP_CONSTANTS.SNAKE_WIDTH,
            APP_CONSTANTS.BASE_TILE_WIDTH
        );
        this.walls = new Walls(
            app,
            APP_CONSTANTS.GAME_HEIGHT,
            APP_CONSTANTS.GAME_WIDTH,
            APP_CONSTANTS.BASE_TILE_WIDTH
        );
        this.food = new Food(app,
            this.snake,
            this.walls,
            APP_CONSTANTS.BASE_TILE_WIDTH,
            APP_CONSTANTS.GAME_HEIGHT,
            APP_CONSTANTS.GAME_WIDTH
        );
        this.mode = mode;
    }

    start() {
        this.walls.initializeWalls()
        this.gameLoop();
        window.addEventListener('keydown', (event) => this.handleInput(event));
    }

    end() {
        this.setFinalScore();
    }

    gameLoop() {
        setTimeout(() => {
            this.snake.move();
            if (!this.handleCollision()) {
                this.checkFood();
                this.gameLoop();
            } else {
                this.end();
            }
        }, this.speed);
    }

    handleInput(event) {
        switch (event.code) {
            case 'ArrowUp':
                this.snake.setDirection('up');
                break;
            case 'ArrowDown':
                this.snake.setDirection('down');
                break;
            case 'ArrowLeft':
                this.snake.setDirection('left');
                break;
            case 'ArrowRight':
                this.snake.setDirection('right');
                break;
        }
    }

    handleCollision() {
        const snakeHeadX = this.snake.snakeSegments[0].position.x;
        const snakeHeadY = this.snake.snakeSegments[0].position.y;

        return this.snake.checkCollision(snakeHeadX, snakeHeadY)
    }

    checkFood() {
        const snakeHeadX = this.snake.snakeSegments[0].position.x;
        const snakeHeadY = this.snake.snakeSegments[0].position.y;
        if (this.food.foodCoords[0] === undefined) {
          this.food.placeFood();
        } else {
          if (this.snake.checkCollision(snakeHeadX, snakeHeadY, this.food.foodCoords[0][0], this.food.foodCoords[0][1])) {
            this.setCurrentScore()
            this.app.stage.removeChild(this.food.foodGraphic);
            this.food.foodCoords.pop();
            this.snake.growSnake();
          }
        }
      }

    setCurrentScore() {
        this.score += 1;
        this.scoreField.innerHTML = this.score;
    }

    setFinalScore() {
        let prevScore;
        switch (this.mode) {
            default: {
                prevScore = localStorage.getItem("classic");
                if (prevScore === null || Number(prevScore) < this.score) { 
                    localStorage.setItem("classic", this.score);
                    document.getElementById("best").innerHTML(this.score);  
                }
            }
        }
    }
}
