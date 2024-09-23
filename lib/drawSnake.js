import { APP_CONSTANTS } from "../appConstants/constants";

export function drawSnake(snakeCoords, direction) {
  let result = []
  if (snakeCoords === null) {
    const center = Math.floor((APP_CONSTANTS.GAME_WIDTH / 2) * APP_CONSTANTS.BASE_TILE_WIDTH);
    const startY = Math.floor((APP_CONSTANTS.GAME_HEIGHT - APP_CONSTANTS.SNAKE_WIDTH) / 2);
    for (let y = startY; y < startY + APP_CONSTANTS.SNAKE_WIDTH; y++ ) {
      result.push([center, y * APP_CONSTANTS.BASE_TILE_WIDTH]);
    }
  return result;
  } else {
    
  }
}