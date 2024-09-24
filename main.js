import { Application } from "pixi.js";
import { APP_CONSTANTS } from "./appConstants/constants";
import { Game } from "./Game/classic/Game";
import { GameGod } from "./Game/god/GameGod";
import { GameSpeed } from "./Game/speed/GameSpeed";
import { GamePortals } from "./Game/portals/GamePortals"

(async() => {
  const app = new Application();

  
  const play = document.getElementById("play");
  const exit = document.getElementById("exit");
  const gameField = document.getElementById("game");


  play.addEventListener("click", () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const bestField = document.getElementById("best");
    const bestScore = localStorage.getItem(mode);

    if (bestScore !== null) {
      bestField.innerHTML = bestScore;
    }

    let game;

    switch(mode) {
      case ("classic") : {
        game = new Game(app, "classic");
        break;
      }
      case ("god") : {
        game = new GameGod(app, "god");
        break;
      }
      case("speed") : {
        game = new GameSpeed(app, "speed")
      }
      case("portals") : {
        game = new GamePortals(app, "portals")
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
    width: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_WIDTH,
    height: APP_CONSTANTS.BASE_TILE_WIDTH * APP_CONSTANTS.GAME_HEIGHT
  });

  
  gameField.appendChild(app.canvas);
})();