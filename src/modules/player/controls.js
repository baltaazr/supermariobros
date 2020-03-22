import Config from "config";
import Helpers from "../../utils/helpers";

const keyboard = Helpers.keyboard;

export default class Controls {
  constructor(player) {
    this.player = player;

    (this.left = keyboard("ArrowLeft")),
      (this.up = keyboard("ArrowUp")),
      (this.right = keyboard("ArrowRight")),
      (this.down = keyboard("ArrowDown"));

    //Left
    this.left.press = () => {
      this.player.sprite.vx = -5;
      this.player.sprite.vy = 0;
    };

    this.left.release = () => {
      if (!this.right.isDown && this.player.sprite.vy === 0) {
        this.player.sprite.vx = 0;
      }
    };

    //Up
    this.up.press = () => {
      this.player.sprite.vy = -5;
      this.player.sprite.vx = 0;
    };
    this.up.release = () => {
      if (!this.down.isDown && this.player.sprite.vx === 0) {
        this.player.sprite.vy = 0;
      }
    };

    //Right
    this.right.press = () => {
      this.player.sprite.vx = 5;
      this.player.sprite.vy = 0;
    };
    this.right.release = () => {
      if (!this.left.isDown && this.player.sprite.vy === 0) {
        this.player.sprite.vx = 0;
      }
    };

    //Down
    this.down.press = () => {
      this.player.sprite.vy = 5;
      this.player.sprite.vx = 0;
    };
    this.down.release = () => {
      if (!this.up.isDown && this.player.sprite.vx === 0) {
        this.player.sprite.vy = 0;
      }
    };
  }
}
