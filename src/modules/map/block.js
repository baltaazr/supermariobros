import { Sprite } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  TEXTURES_DIR = Config.block.texturesDir,
  DELTA_FRAMES = Config.map.dFrames;

export default class Block {
  constructor(x, y, type, map) {
    this.map = map;

    this.textures = TEXTURES_DIR[type];
    this.sprite = new Sprite(this.map.textures[this.textures[0]]);
    this.sprite.position.set(
      (x * BLOCK_SIZE) / SCALE,
      (y * BLOCK_SIZE) / SCALE
    );

    this.body = Bodies.rectangle(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE,
      {
        isStatic: true
      }
    );
    this.body.label = type;
    this.body.block = this;

    this.dFrames = -1;
  }

  hit() {}

  delete() {
    this.sprite.parent.removeChild(this.sprite);
    Composite.remove(this.map.composite, this.body);
    this.map.blocks.splice(this.map.blocks.indexOf(this), 1);
  }

  update() {
    this.updateTexture();
  }

  updateTexture() {
    this.dFrames += 1;
    if (this.dFrames % DELTA_FRAMES !== 0)
      return this.sprite.texture.textureCacheIds[0];
    this.sprite.texture = this.map.textures[this.getNextTexture()];
  }

  getNextTexture() {
    return Helpers.getNextTexture(
      this.textures,
      this.sprite.texture.textureCacheIds[0]
    );
  }
}
