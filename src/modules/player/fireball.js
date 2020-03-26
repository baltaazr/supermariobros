import { Body, World } from "matter-js";
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

    this.player = player;

    this.accel = 0;
    Body.setVelocity(this.body, { x: VEL, y: VEL });
  }

  updateTexture() {}

  hit(body) {
    if (body.position.y > this.body.position.y)
      Body.setVelocity(this.body, {
        x: VEL,
        y: this.body.velocity.y > 0 ? -VEL : VEL
      });
    else this.delete();
  }

  delete() {
    this.sprite.parent.removeChild(this.sprite);
    World.remove(this.player.world, this.body);
    const listName = `${this.body.label}s`;
    this.player[listName].splice(this.player[listName].indexOf(this), 1);
  }
}
