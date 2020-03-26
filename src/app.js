import * as PIXI from "pixi.js";
import { Application, Loader } from "pixi.js";
import { Engine, World, Events, Composite } from "matter-js";
import Config from "config";

import { Player, Enemy, Map } from "./modules";

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
let player, enemy, map, textures, state;
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

Events.on(engine, "collisionStart", event => {
  var i,
    pair,
    length = event.pairs.length;
  for (i = 0; i < length; i++) {
    pair = event.pairs[i];
    if (pair.bodyA.label === "block" || pair.bodyB.label === "block") {
      const { block } = pair.bodyA.label === "block" ? pair.bodyA : pair.bodyB;
      block.hit(player);
    }
    if (pair.bodyA.label === "player" || pair.bodyB.label === "player") {
      const body = pair.bodyA.label !== "player" ? pair.bodyA : pair.bodyB;
      if (body.position.y > player.body.position.y) {
        player.onGround = true;
      }
    }
    if (pair.bodyA.label === "powerup" || pair.bodyB.label === "powerup") {
      let powerup, body;
      if (pair.bodyA.label === "powerup") {
        powerup = pair.bodyA.powerup;
        body = pair.bodyB;
      } else {
        powerup = pair.bodyB.powerup;
        body = pair.bodyA;
      }
      if (body.label === "player") {
        player.consumePowerup(powerup.type);
        powerup.delete();
      } else powerup.hit(body);
    }
    if (pair.bodyA.label === "fireball" || pair.bodyB.label === "fireball") {
      let fireball, body;
      if (pair.bodyA.label === "fireball") {
        fireball = pair.bodyA.fireball;
        body = pair.bodyB;
      } else {
        fireball = pair.bodyB.fireball;
        body = pair.bodyA;
      }
      fireball.hit(body);
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
