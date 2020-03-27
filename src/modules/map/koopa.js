import { Body, Composite, Bodies } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const WIDTH = Config.enemy.koopa.w,
  HEIGHT_MOVE = Config.enemy.koopa.hM,
  HEIGHT_SHELL = Config.enemy.koopa.hS,
  TEXTURES_DIR = Config.enemy.koopa.texturesDir,
  DELTA_FRAMES = Config.enemy.dFrames,
  VEL = Config.enemy.vel,
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
    Body.setVelocity(this.body, { x: -VEL, y: 0 });
  }

  update() {
    super.update();
    if (this.state === "move") Body.setVelocity(this.body, { x: -VEL, y: 0 });
  }

  hit(body) {
    if (body.label === "player") {
      if (
        body.position.y < this.body.position.y &&
        Math.abs(this.body.position.x - body.position.x) <
          body.player.w / 2 + this.w / 2 &&
        this.state === "move"
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
      }
    }
  }
}
