import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import Config from "config";

import Controls from "./controls";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  FLOOR_Y = Config.map.floorY;

let Sprite = PIXI.Sprite,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

export default class Player {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["mario_standing.png"]);
    this.sprite.scale.set(SCALE);

    this.accel = { x: 0, y: 0 };

    this.body = Bodies.rectangle(
      0,
      BLOCK_SIZE * (FLOOR_Y - 1),
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.body.frictionAir = 0.1;

    this.controls = new Controls(this);
  }

  updatePos() {
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;

    Body.setVelocity(this.body, {
      x: (this.body.velocity.x += this.accel.x),
      y: (this.body.velocity.y += this.accel.y)
    });

    Body.setAngularVelocity(this.body, 0);
  }
}
