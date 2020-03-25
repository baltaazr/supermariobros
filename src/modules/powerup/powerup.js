import { Sprite } from "pixi.js";
import { Bodies, Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  TEXTURES_DIR = Config.block.texturesDir;

export default class Powerup {
  constructor(x, y, type, map) {
    this.map = map;
    this.type = type;

    this.textures = TEXTURES_DIR[this.type];
    this.sprite = new Sprite(this.map.textures[this.textures[0]]);
    this.sprite.position.set(
      (x * BLOCK_SIZE) / SCALE,
      (y * BLOCK_SIZE) / SCALE
    );

    this.body = Bodies.rectangle(x, y, 1, 1, {
      label: type,
      powerup: this
    });
  }
}
