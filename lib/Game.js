import { APP_CONSTANTS } from '../appConstants/constants';
import { Snake } from './Snake';
import { Walls } from './Walls';

export class Game {
    snake;
    walls;

    constructor(app) {
        this.snake = new Snake(app, 1, APP_CONSTANTS.SNAKE_WIDTH, APP_CONSTANTS.BASE_TILE_WIDTH);
        this.walls = new Walls(app, APP_CONSTANTS.GAME_HEIGHT, APP_CONSTANTS.GAME_WIDTH, APP_CONSTANTS.BASE_TILE_WIDTH);
    }

    start() {
        this.walls.initializeWalls()
        this.gameLoop();
        window.addEventListener('keydown', (event) => this.handleInput(event));
    }

    gameLoop() {
        setTimeout(() => {
            this.snake.move();
            this.gameLoop();
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
}
