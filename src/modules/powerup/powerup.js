import { Sprite } from "pixi.js";
import { Bodies, Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const TEXTURES_DIR = Config.powerup.texturesDir,
  ACCEL = Config.powerup.accel,
  DELTA_FRAMES = Config.powerup.dFrames,
  GameObject = Helpers.GameObject();

export default class Powerup extends GameObject {
  constructor(x, y, type, map) {
    super(
      x,
      y,
      1,
      1,
      TEXTURES_DIR[type],
      map.textures[TEXTURES_DIR[type][0]],
      "block",
      false,
      DELTA_FRAMES
    );

    this.map = map;
    this.type = type;
    if (type === "mushroom") this.accel = ACCEL;
    else this.accel = 0;
  }

  hit(body) {
    if (Math.abs(this.body.velocity.x) < 0.1) this.accel *= -1;
  }
}
