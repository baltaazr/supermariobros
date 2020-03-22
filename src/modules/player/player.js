import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import Config from "config";

import Controls from "./controls";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize;

let Sprite = PIXI.Sprite,
  Bodies = Matter.Bodies;

export default class Player {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["mario_standing.png"]);
    this.sprite.scale.set(SCALE);

    this.accel = { x: 0, y: 0 };

    this.body = Bodies.rectangle(0, 0, BLOCK_SIZE, BLOCK_SIZE);

    this.controls = new Controls(this);
  }

  updatePos() {
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;

    Matter.Body.setVelocity(this.body, {
      x: (this.body.velocity.x += this.accel.x),
      y: (this.body.velocity.y += this.accel.y)
    });
  }
}
