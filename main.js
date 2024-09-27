import { Game } from "./Game/classic/Game.js";
import { GameGod } from "./Game/god/GameGod.js";
import { GameSpeed } from "./Game/speed/GameSpeed.js";
import { GamePortals } from "./Game/portals/GamePortals.js"
import { GameWalls } from "./Game/walls/GameWalls.js";

(async() => {
  
  
  const play = document.getElementById("play");
  const exit = document.getElementById("exit");
  const menu = document.getElementById("menu");
  const gameField = document.getElementById("game");

  const app = new PIXI.Application({
    width: 700,
    height: 700,
  });


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
        break;
      }
      case("portals") : {
        game = new GamePortals(app, "portals");
        break;
      }
      case("walls") : {
        game = new GameWalls(app, "walls");
        break;
      }
    }
    game.start();
    document.getElementById("wrapper_menu").style.display = "block";
    document.getElementById("wrapper_buttons").style.display = "none";
  });

  exit.addEventListener("click", () => {
    close();
  });

  menu.addEventListener("click", () => {
    document.getElementById("wrapper_menu").style.display = "none";
    document.getElementById("wrapper_buttons").style.display = "flex";
    app.stage.removeChildren();
    }
  )
  
  gameField.appendChild(app.view);
})();