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
  MOE = Config.enemy.koopa.moe,
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

  hit(body) {
    if (body.label === "fireball") {
      this.delete();
      return;
    }
    if (this.state === "move") {
      if (body.label === "player") {
        if (
          Math.abs(
            this.body.position.y -
              body.position.y -
              (body.player.h / 2 + this.h / 2)
          ) < 0.75 &&
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
      } else if (body.label === "pipe") {
        this.backwards = this.body.velocity.x < 0;
        Body.setVelocity(this.body, {
          x: this.backwards ? VEL_MOVE : -VEL_MOVE,
          y: 0
        });
        this.sprite.scale.x = this.backwards ? -this.sprite.scale.x : this.sprite.scale.x;
      }
    } else {
      if (this.body.velocity.x === 0) {
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
