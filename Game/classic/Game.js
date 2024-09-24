import { APP_CONSTANTS } from '../../appConstants/constants';
import { Food } from '../../lib/Food';
import { Snake } from '../../lib/Snake';
import { Walls } from '../../lib/Walls';

export class Game {
    snake;
    walls;
    loop;
    food;

    constructor(app, mode) {
        this.snake = new Snake(app, 1, APP_CONSTANTS.SNAKE_WIDTH, APP_CONSTANTS.BASE_TILE_WIDTH);
        this.walls = new Walls(app, APP_CONSTANTS.GAME_HEIGHT, APP_CONSTANTS.GAME_WIDTH, APP_CONSTANTS.BASE_TILE_WIDTH);
        this.food = new Food(app, this.snake, this.walls, APP_CONSTANTS.BASE_TILE_WIDTH, APP_CONSTANTS.GAME_HEIGHT, APP_CONSTANTS.GAME_WIDTH);
    }

    start() {
        this.walls.initializeWalls()
        this.gameLoop();
        window.addEventListener('keydown', (event) => this.handleInput(event));
    }

    gameLoop() {
        this.loop = setTimeout(() => {
            this.snake.move();
            this.food.checkFood();
            if (!this.handleCollision()) {
                this.gameLoop();
            }
        }, APP_CONSTANTS.BASE_SPEED);
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
}
