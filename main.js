import { Application } from "pixi.js";
import { Game } from "./Game/classic/Game";
import { GameGod } from "./Game/god/GameGod";
import { GameSpeed } from "./Game/speed/GameSpeed";
import { GamePortals } from "./Game/portals/GamePortals"
import { GameWalls } from "./Game/walls/GameWalls";
import { SmallerEven } from "./lib/SmallerEven";

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
        game = new GameSpeed(app, "speed");
      }
      case("portals") : {
        game = new GamePortals(app, "portals");
      }
      case("walls") : {
        game = new GameWalls(app, "walls");
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
    width: SmallerEven(gameField.offsetHeight),
    height: SmallerEven(gameField.offsetHeight),
  });

  
  gameField.appendChild(app.canvas);
})();