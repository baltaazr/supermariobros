import * as PIXI from "pixi.js";
import { Application, Loader } from "pixi.js";
import { Engine, World, Events, Composite } from "matter-js";
import Config from "config";

import { Player, Map } from "./modules";

//Constants
const GRAVITY_SCALE = Config.physics.gravityScale,
  JUMP_MOE = Config.player.jump.moe,
  FRICTION = Config.physics.friction,
  FRICTION_AIR = Config.physics.frictionAir,
  FRICTION_STATIC = Config.physics.frictionStatic,
  SLOP = Config.physics.slop;

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
let player, map, textures, state;
loader.add("images/custom.json").load(() => {
  textures = loader.resources["images/custom.json"].textures;

  map = new Map(textures);
  renderer.stage.addChild(map.spriteContainer);

  player = new Player(textures, engine.world);
  renderer.stage.addChild(player.sprite);

  World.add(engine.world, [player.body, map.composite]);

  //Applying all physics constants to all bodies
  const bodies = Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    body.friction = FRICTION;
    body.frictionAir = FRICTION_AIR;
    body.frictionStatic = FRICTION_STATIC;
    body.slop = SLOP;
  }

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

const labels = ["player", "block", "powerup", "fireball", "goomba", "koopa"];
Events.on(engine, "collisionStart", event => {
  var i,
    pair,
    length = event.pairs.length;
  for (i = 0; i < length; i++) {
    pair = event.pairs[i];
    for (let j = 0; j < labels.length; j++) {
      const label = labels[j];
      if (pair.bodyA.label === label || pair.bodyB.label === label) {
        let gameObject, body;
        if (pair.bodyA.label === label) {
          gameObject = pair.bodyA[label];
          body = pair.bodyB;
        } else {
          gameObject = pair.bodyB[label];
          body = pair.bodyA;
        }
        gameObject.hit(body);
      }
    }
  }
});

Events.on(engine, "collisionEnd", event => {
  var i,
    pair,
    length = event.pairs.length;
  for (i = 0; i < length; i++) {
    pair = event.pairs[i];
    if (pair.bodyA.label === "player" || pair.bodyB.label === "player") {
      if (Math.abs(player.body.velocity.y) > JUMP_MOE) {
        player.onGround = false;
      }
    }
  }
});

engine.world.gravity.scale = GRAVITY_SCALE;

Engine.run(engine);
