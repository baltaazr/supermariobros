import { Body, Composite, Bodies } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const WIDTH = Config.enemy.koopa.w,
  HEIGHT_MOVE = Config.enemy.koopa.hM,
  HEIGHT_SHELL = Config.enemy.koopa.hS,
  TEXTURES_DIR = Config.enemy.koopa.texturesDir,
  DELTA_FRAMES = Config.enemy.dFrames,
  VEL_MOVE = Config.enemy.vel,
  VEL_SHELL = Config.enemy.koopa.velS,
  GameObject = Helpers.GameObject();

export default class Koopa extends GameObject {
  constructor(x, y, map) {
    super(
      x,
      y,
      WIDTH,
      HEIGHT_MOVE,
      TEXTURES_DIR.move,
      map.textures[TEXTURES_DIR.move[0]],
      "koopa",
      false,
      DELTA_FRAMES
    );

    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.slop = 0;

    this.state = "move";
    this.map = map;
    this.accel = 0;
    Body.setVelocity(this.body, { x: -VEL_MOVE, y: 0 });
  }

  update() {
    super.update();
    // if (this.state === "move") Body.setVelocity(this.body, { x: -VEL, y: 0 });
  }

  hit(body) {
    if (body.label === "fireball") {
      this.delete();
      return;
    }
    if (this.state === "move") {
      if (body.label === "player") {
        if (
          body.position.y < this.body.position.y &&
          Math.abs(this.body.position.x - body.position.x) <
            body.player.w / 2 + this.w / 2
        ) {
          Composite.remove(this.map.composite, this.body);
          this.w = WIDTH;
          this.h = HEIGHT_SHELL;
          this.body = Bodies.rectangle(
            this.body.position.x,
            this.body.position.y + 0.5,
            this.w,
            this.h,
            {
              label: "koopa",
              mass: this.body.mass,
              friction: this.body.friction,
              frictionAir: this.body.frictionAir,
              slop: this.body.slop
            }
          );
          this.body["koopa"] = this;
          Composite.add(this.map.composite, this.body);

          this.state = "shell";
          this.textures = TEXTURES_DIR.shell;
        } else body.player.hurt();
      } else
        Body.setVelocity(this.body, {
          x: this.body.velocity.x > 0 ? -VEL_MOVE : VEL_MOVE,
          y: 0
        });
    } else {
      if (Math.abs(this.body.velocity.x) < 0.1) {
        if (body.label === "player")
          Body.setVelocity(this.body, {
            x: this.body.position.x < body.position.x ? -VEL_SHELL : VEL_SHELL,
            y: 0
          });
        else
          Body.setVelocity(this.body, {
            x: 0,
            y: 0
          });
      } else {
        if (body.label === "player") body.player.hurt();
        else
          Body.setVelocity(this.body, {
            x: this.body.velocity.x > 0 ? -VEL_SHELL : VEL_SHELL,
            y: 0
          });
      }
    }
  }
}
