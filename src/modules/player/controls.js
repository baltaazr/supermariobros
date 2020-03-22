import * as Matter from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const keyboard = Helpers.keyboard;

export default class Controls {
  constructor(player) {
    this.player = player;

    (this.left = keyboard("ArrowLeft")), (this.right = keyboard("ArrowRight"));

    //Left
    this.left.press = () => {
      Matter.Body.setVelocity(this.player.body, {
        x: -10,
        y: 0
      });
    };

    this.left.release = () => {
      if (!this.right.isDown) {
        Matter.Body.setVelocity(this.player.body, {
          x: 0,
          y: 0
        });
      }
    };

    //Right
    this.right.press = () => {
      Matter.Body.setVelocity(this.player.body, {
        x: 10,
        y: 0
      });
    };
    this.right.release = () => {
      if (!this.left.isDown) {
        Matter.Body.setVelocity(this.player.body, {
          x: 0,
          y: 0
        });
      }
    };
  }
}
