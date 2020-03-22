import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import Config from "config";

import Player from "./modules/player/player";

const SCALE = Config.scale;

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared;

const renderer = new Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0x000000
});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(renderer.view);

let player, textures, state;
loader.add("images/custom.json").load(() => {
  textures = loader.resources["images/custom.json"].textures;
  player = new Player(textures);
  renderer.stage.addChild(player.sprite);

  state = play;

  renderer.ticker.add(delta => gameLoop(delta));
});

const gameLoop = delta => {
  state(delta);
};

const play = delta => {
  player.sprite.x += player.sprite.vx;
  player.sprite.y += player.sprite.vy;
};

console.log();
