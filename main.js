import { Application } from "pixi.js";
import { APP_CONSTANTS } from "./appConstants/constants";
import { Game } from "./lib/Game";

(async() => {
  const app = new Application();

  
  const play = document.getElementById("play");
  const exit = document.getElementById("exit");
  const gameField = document.getElementById("game");


  play.addEventListener("click", () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    let game;

    switch(mode) {
      case ("classic") : {
        game = new Game(app);
      }
    }
    game.start();
    document.getElementById("wrapper_menu").style.display = "block";
    document.getElementById("wrapper_buttons").style.display = "none";
  });

  exit.addEventListener("click", () => {
    close();
  });


  await app.init({
    width: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_WIDTH + APP_CONSTANTS.BASE_TILE_WIDTH,
    height: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_HEIGHT + APP_CONSTANTS.BASE_TILE_WIDTH
  });

  
  gameField.appendChild(app.canvas);
})();