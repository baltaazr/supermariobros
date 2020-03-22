import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import Config from "config";

import { Player, Enemy, Map } from "./modules";

const SCALE = Config.scale;

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared;
let Engine = Matter.Engine,
  World = Matter.World;

//PIXI Setup
const renderer = new Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0x000000
});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(renderer.view);

//Matter Engine
const engine = Engine.create();

// Game Setup
let player, enemy, map, textures, state;
loader.add("images/custom.json").load(() => {
  textures = loader.resources["images/custom.json"].textures;

  map = new Map(textures);
  renderer.stage.addChild(map.sprite);

  player = new Player(textures);
  renderer.stage.addChild(player.sprite);

  World.add(engine.world, [player.body, map.floor]);

  state = play;

  renderer.ticker.add(delta => gameLoop(delta));
});

const gameLoop = delta => {
  state(delta);
};

const play = delta => {
  player.updatePos();
};

Engine.run(engine);
