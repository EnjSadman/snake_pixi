import { Application } from "pixi.js";
import { APP_CONSTANTS } from "./appConstants/constants";
import { Game } from "./lib/Game";

(async() => {
  const app = new Application();

  await app.init({
    width: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_WIDTH + APP_CONSTANTS.BASE_TILE_WIDTH,
    height: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_HEIGHT + APP_CONSTANTS.BASE_TILE_WIDTH
  });

  const game = new Game(app);
  game.start();

  document.body.appendChild(app.canvas);
})();