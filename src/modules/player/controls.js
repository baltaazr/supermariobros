import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const ACCEL = Config.physics.accel,
  JUMP_FORCE = Config.physics.jump.force;

const keyboard = Helpers.keyboard;

export default class Controls {
  constructor(player) {
    this.player = player;

    (this.left = keyboard("a")),
      (this.right = keyboard("d")),
      (this.jump = keyboard(" "));

    //Left
    this.left.press = () => {
      this.player.accel = -ACCEL;
    };

    this.left.release = () => {
      if (!this.right.isDown) {
        this.player.accel = 0;
      }
    };

    //Right
    this.right.press = () => {
      this.player.accel = ACCEL;
    };
    this.right.release = () => {
      if (!this.left.isDown) {
        this.player.accel = 0;
      }
    };

    //Jump
    this.jump.press = () => {
      if (Math.round(this.player.body.velocity.y) === 0)
        Body.applyForce(this.player.body, this.player.body.position, {
          x: 0,
          y: -JUMP_FORCE
        });
    };
  }
}
