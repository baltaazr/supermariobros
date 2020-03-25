import { Sprite } from "pixi.js";
import { Bodies, Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  TEXTURES_DIR = Config.powerup.texturesDir,
  ACCEL = Config.powerup.accel,
  DELTA_FRAMES = Config.powerup.dFrames;

export default class Powerup {
  constructor(x, y, type, map) {
    this.map = map;
    this.type = type;

    this.textures = TEXTURES_DIR[this.type];
    this.sprite = new Sprite(this.map.textures[this.textures[0]]);
    this.sprite.position.set(
      (x * BLOCK_SIZE) / SCALE,
      (y * BLOCK_SIZE) / SCALE
    );

    this.body = Bodies.rectangle(x, y, 1, 1, {
      label: "powerup",
      powerup: this,
      slop: 0
    });

    if (type === "mushroom") this.accel = ACCEL;
    else this.accel = 0;

    this.dFrames = -1;
  }

  hit(body) {
    if (Math.abs(this.body.velocity.x) < 0.1) this.accel *= -1;
  }

  update() {
    this.updateTexture();
    this.updatePos();
  }

  updatePos() {
    this.sprite.x = this.body.position.x * (BLOCK_SIZE / SCALE);
    this.sprite.y = this.body.position.y * (BLOCK_SIZE / SCALE);

    Body.setVelocity(this.body, {
      x: (this.body.velocity.x += this.accel),
      y: this.body.velocity.y
    });

    Body.setAngularVelocity(this.body, 0);
  }

  updateTexture() {
    this.dFrames += 1;
    if (this.dFrames % DELTA_FRAMES !== 0)
      return this.sprite.texture.textureCacheIds[0];
    this.sprite.texture = this.map.textures[
      Helpers.getNextTexture(
        this.textures,
        this.sprite.texture.textureCacheIds[0]
      )
    ];
  }
}
