import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const WIDTH = Config.enemy.goomba.w,
  HEIGHT = Config.enemy.goomba.h,
  TEXTURES_DIR = Config.enemy.goomba.texturesDir,
  DELTA_FRAMES = Config.enemy.dFrames,
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
      "goomba",
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

  hit(body) {
    if (body.label === "fireball") {
      this.delete();
      return;
    }
    if (body.label === "player") {
      if (
        body.position.y < this.body.position.y &&
        Math.abs(this.body.position.x - body.position.x) <
          body.player.w / 2 + this.w / 2
      )
        this.delete();
      else body.player.hurt();
    } else
      Body.setVelocity(this.body, {
        x: this.body.velocity.x > 0 ? -VEL : VEL,
        y: 0
      });
  }
}
