import * as PIXI from "pixi.js";
import { Application, Loader } from "pixi.js";
import { Engine, World, Events } from "matter-js";
import Config from "config";

import { Player, Enemy, Map } from "./modules";

//Constants
const GRAVITY_SCALE = Config.physics.gravityScale;

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//PIXI Setup
const renderer = new Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0x000000
});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(renderer.view);
const loader = Loader.shared;

//Matter Engine
const engine = Engine.create();

//Game Setup
let player, enemy, map, textures, state;
loader.add("images/custom.json").load(() => {
  textures = loader.resources["images/custom.json"].textures;

  map = new Map(textures);
  renderer.stage.addChild(map.spriteContainer);

  player = new Player(textures);
  renderer.stage.addChild(player.sprite);

  World.add(engine.world, [player.body, map.composite]);

  state = play;

  renderer.ticker.add(delta => gameLoop(delta));
});

const gameLoop = delta => {
  state(delta);
};

const play = delta => {
  player.update();
  map.update();
};

Events.on(engine, "collisionStart", event => {
  var i,
    pair,
    length = event.pairs.length;
  for (i = 0; i < length; i++) {
    pair = event.pairs[i];
    if (!(pair.bodyA.label === "qBlock" || pair.bodyB.label === "qBlock")) {
      continue;
    }
    const { block } = pair.bodyA.label === "qBlock" ? pair.bodyA : pair.bodyB;
    block.hit();
  }
});

engine.world.gravity.scale = GRAVITY_SCALE;

Engine.run(engine);
