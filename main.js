import { Application, Graphics } from "pixi.js";
import { APP_CONSTANTS } from "./appConstants/constants";
import { describeBorders } from "./lib/describeBorders";
import { drawSnake } from "./lib/drawSnake";


(async() => {
  const app = new Application();

  await app.init({
    width: APP_CONSTANTS.WIDTH,
    height: APP_CONSTANTS.HEIGHT
  });

  const borders = describeBorders(APP_CONSTANTS.GAME_WIDTH, APP_CONSTANTS.GAME_HEIGHT, APP_CONSTANTS.BASE_TILE_WIDTH);

  for (let i = 0; i < borders.length; i++) {
    const rectangle = new Graphics()
    .rect(
      borders[i][0],
      borders[i][1],
      APP_CONSTANTS.BASE_TILE_WIDTH,
      APP_CONSTANTS.BASE_TILE_WIDTH,
    )
    .fill({
      color: 0x00000
    })
    .stroke({
      width: 1,
      color: 0xffffff
    })

    app.stage.addChild(rectangle);
  }

  console.log(drawSnake(null));

  document.body.appendChild(app.canvas);
})();