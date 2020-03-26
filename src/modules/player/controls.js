import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const ACCEL = Config.player.accel,
  JUMP_FORCE = Config.player.jump.force;

const keyboard = Helpers.keyboard;

export default class Controls {
  constructor(player) {
    (this.left = keyboard("a")),
      (this.right = keyboard("d")),
      (this.jump = keyboard(" ")),
      (this.fireball = keyboard("Shift"));

    //Left
    this.left.press = () => {
      player.accel = -ACCEL;
    };

    this.left.release = () => {
      if (!this.right.isDown) {
        player.accel = 0;
      }
    };

    //Right
    this.right.press = () => {
      player.accel = ACCEL;
    };
    this.right.release = () => {
      if (!this.left.isDown) {
        player.accel = 0;
      }
    };

    //Jump
    this.jump.press = () => {
      if (player.onGround)
        Body.applyForce(player.body, player.body.position, {
          x: 0,
          y: -JUMP_FORCE
        });
    };

    //Fireball
    this.fireball.press = () => {
      if (player.state === "fire") player.spawnFireball();
    };
  }
}
