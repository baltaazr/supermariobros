import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const WIDTH = Config.fireball.w,
  HEIGHT = Config.fireball.h,
  VEL = Config.fireball.vel,
  GameObject = Helpers.GameObject();

export default class Fireball extends GameObject {
  constructor(x, y, player) {
    super(
      x,
      y,
      WIDTH,
      HEIGHT,
      null,
      player.globalTextures["fireball.png"],
      "fireball",
      false,
      null
    );

    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.slop = 0;

    this.map = player;
    this.accel = 0;
    Body.setVelocity(this.body, { x: VEL, y: VEL });
  }

  updateTexture() {}

  hit() {
    Body.setVelocity(this.body, {
      x: VEL,
      y: this.body.velocity.y > 0 ? -VEL : VEL
    });
  }
}
