import { Sprite } from "pixi.js";
import { Bodies, Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

import Controls from "./controls";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  FRICTION_AIR = Config.physics.frictionAir,
  STARTING_POS = Config.player.startingPos,
  DELTA_FRAMES = Config.player.dFrames;

export default class Player {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["mario_standing.png"]);
    this.sprite.scale.set(SCALE);

    this.accel = 0;

    this.body = Bodies.rectangle(STARTING_POS.x, STARTING_POS.y, 1, 1);
    this.body.frictionAir = FRICTION_AIR;
    this.body.label = "player";

    this.controls = new Controls(this);

    this.backwards = false;

    this.dFrames = -1;
  }

  update() {
    if (
      this.sprite.getGlobalPosition().x > window.innerWidth / 2 &&
      !this.backwards
    )
      this.sprite.parent.x -=
        this.sprite.getGlobalPosition().x - window.innerWidth / 2;
    this.updateTexture();
    this.updatePos();
  }

  updatePos() {
    this.sprite.x =
      (this.body.position.x + (this.backwards ? 1 : 0)) * BLOCK_SIZE;
    this.sprite.y = this.body.position.y * BLOCK_SIZE;

    Body.setVelocity(this.body, {
      x: (this.body.velocity.x += this.accel),
      y: this.body.velocity.y
    });

    Body.setAngularVelocity(this.body, 0);
  }

  updateTexture() {
    if (this.accel > 0) {
      this.sprite.scale.x = SCALE;
      this.backwards = false;
    } else if (this.accel < 0) {
      this.sprite.scale.x = -SCALE;
      this.backwards = true;
    }

    if (Math.round(this.body.velocity.y) !== 0) {
      this.sprite.texture = this.textures["mario_jump.png"];
    } else {
      if (this.accel !== 0) {
        if (this.body.velocity.x * this.accel < 0) {
          this.sprite.texture = this.textures["mario_turn.png"];
        } else {
          this.sprite.texture = this.textures[this.getNextMovingTexture()];
        }
      } else {
        this.dFrames = -1;
        this.sprite.texture = this.textures["mario_standing.png"];
      }
    }
  }

  getNextMovingTexture() {
    this.dFrames += 1;
    if (this.dFrames % DELTA_FRAMES !== 0)
      return this.sprite.texture.textureCacheIds[0];

    const movingTextures = [
      "mario_moving1.png",
      "mario_moving2.png",
      "mario_moving3.png"
    ];

    return Helpers.getNextTexture(
      movingTextures,
      this.sprite.texture.textureCacheIds[0]
    );
  }
}
