import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const WIDTH = Config.enemy.goomba.w,
  HEIGHT = Config.enemy.goomba.h,
  TEXTURES_DIR = Config.enemy.goomba.texturesDir,
  DELTA_FRAMES = Config.enemy.goomba.dFrames,
  VEL = Config.enemy.vel,
  GameObject = Helpers.GameObject();

export default class Goomba extends GameObject {
  constructor(x, y, map) {
    super(
      x,
      y,
      WIDTH,
      HEIGHT,
      TEXTURES_DIR,
      map.textures[TEXTURES_DIR[0]],
      "enemy",
      false,
      DELTA_FRAMES
    );

    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.slop = 0;

    this.map = map;
    this.accel = 0;
    Body.setVelocity(this.body, { x: -VEL, y: 0 });
  }
}
