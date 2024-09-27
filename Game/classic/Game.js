import { APP_CONSTANTS } from '../../appConstants/constants.js';
import { Food } from '../../lib/Food.js';
import { ScoreSetter } from '../../lib/ScoreSetter.js';
import { Snake } from '../../lib/Snake.js';
import { Walls } from '../../lib/Walls.js';

export class Game {
    score = 0;
    scoreField = document.getElementById("current");
    speed = APP_CONSTANTS.BASE_SPEED;
    gameGoing = true;
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
            Math.floor(app.view.width / APP_CONSTANTS.GAME_WIDTH),
        );
        this.walls = new Walls(
            app,
            APP_CONSTANTS.GAME_HEIGHT,
            APP_CONSTANTS.GAME_WIDTH,
            Math.floor(app.view.width / APP_CONSTANTS.GAME_WIDTH),
            this.snake
        );
        this.food = new Food(app,
            this.snake,
            this.walls.wallsCoords,
            Math.floor(app.view.width / APP_CONSTANTS.GAME_WIDTH),
            APP_CONSTANTS.GAME_HEIGHT,
            APP_CONSTANTS.GAME_WIDTH
        );
        this.mode = mode;

        document.getElementById("menu").addEventListener("click", () => {
            this.gameGoing = false;
        })
    }

    start() {
        this.walls.initializeWalls();
        this.gameLoop();
        window.addEventListener('keydown', (event) => this.handleInput(event));
    }

    end() {
        this.setFinalScore();
    }

    gameLoop() {
        setTimeout(() => {
            if (this.gameGoing) {
                this.snake.move();
                if (!this.handleCollision()) {
                    this.checkFood();
                    this.gameLoop();
                } else {
                    this.end();
                }
            } else {
                this.end()
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

        return this.snake.checkCollision(this.walls.wallsCoords, snakeHeadX, snakeHeadY)
    }

    checkFood() {
        const snakeHeadX = this.snake.snakeSegments[0].position.x;
        const snakeHeadY = this.snake.snakeSegments[0].position.y;
        if (this.food.foodCoords[0] === undefined) {
          this.food.placeFood();
        } else {
          if (this.snake.checkCollision([], snakeHeadX, snakeHeadY, this.food.foodCoords[0][0], this.food.foodCoords[0][1])) {
            this.setCurrentScore();
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

    setCurrentScore() {
        this.score += 1;
        this.scoreField.innerHTML = this.score;
    }

    setFinalScore() {
        let prevScore = localStorage.getItem(this.mode);
        const scoreBoard = document.getElementById("best");
        if (ScoreSetter(prevScore, this.score, this.mode)) {
            scoreBoard.innerHTML = this.score;
        }
    }

    repositionHead(x1, y1, x2, y2) {
        const snakeHead = this.snake.snakeSegments[0].position;
        switch (this.mode) {
            case ("god") : {
                if (snakeHead.x < 1 * this.walls.tileSize) {
                    snakeHead.set((this.walls.width - 2) * this.walls.tileSize, snakeHead.y);
                } else if (snakeHead.x > (this.walls.width - 2) * this.walls.tileSize) {
                    snakeHead.set(1 * this.walls.tileSize, snakeHead.y);
                }
              
                if (snakeHead.y < 1 * this.walls.tileSize) {
                    snakeHead.set(snakeHead.x, (this.walls.height - 2) * this.walls.tileSize)
                } else if (snakeHead.y > (this.walls.height - 2) * this.walls.tileSize) {
                    snakeHead.set(snakeHead.x, 1 * this.walls.tileSize);
                }
                break
            }
            case ("portals") : {
                if (snakeHead.x === x1) {
                    snakeHead.set(x2, y2);
                } else if (snakeHead.x === x2) {
                    snakeHead.set(x1, y1);
                }
            }
        }
        
      }
}
