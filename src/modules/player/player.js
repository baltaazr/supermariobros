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

    this.accel = 0;

    this.body = Bodies.rectangle(
      0,
      BLOCK_SIZE * (FLOOR_Y - 1),
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.body.friction = 0.2;

    this.controls = new Controls(this);

    this.backwards = false;
  }

  updatePos() {
    this.updateSprite();

    this.sprite.x = this.body.position.x + (this.backwards ? BLOCK_SIZE : 0);
    this.sprite.y = this.body.position.y;

    Body.setVelocity(this.body, {
      x: (this.body.velocity.x += this.accel),
      y: this.body.velocity.y
    });

    Body.setAngularVelocity(this.body, 0);
  }

  updateSprite() {
    if (this.accel > 0) {
      this.sprite.scale.x = SCALE;
      this.backwards = false;
    } else if (this.accel < 0) {
      this.sprite.scale.x = -SCALE;
      this.backwards = true;
    }

    if (this.body.velocity.y < -1) {
      this.sprite.texture = this.textures["mario_jump.png"];
    } else if (this.body.velocity.y > 1) {
      this.sprite.texture = this.textures["mario_fall.png"];
    } else {
      if (this.accel !== 0) {
        this.sprite.texture = this.textures[this.getNextMovingSprite()];
      } else {
        this.dFrames = -1;
        this.sprite.texture = this.textures["mario_standing.png"];
      }
    }
  }

  getNextMovingSprite() {
    this.dFrames += 1;
    if (this.dFrames % 5 !== 0) return this.sprite.texture.textureCacheIds[0];

    const movingSprites = [
      "mario_moving1.png",
      "mario_moving2.png",
      "mario_moving3.png"
    ];

    const idx = movingSprites.indexOf(this.sprite.texture.textureCacheIds[0]);

    if (idx === -1) {
      return movingSprites[0];
    }

    if (idx === movingSprites.length - 1) {
      return movingSprites[0];
    } else return movingSprites[idx + 1];
  }
}
