import { Sprite } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

import Powerup from "../powerup/powerup";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  TEXTURES_DIR = Config.block.texturesDir,
  DELTA_FRAMES = Config.block.dFrames,
  HIT_FRAMES = Config.block.hit.frames,
  HIT_DELTA_POS = Config.block.hit.dPos,
  HIT_MOE = Config.block.hit.moe;

export default class Block {
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
      isStatic: true,
      label: "block",
      block: this
    });

    this.dFrames = -1;
    this.hitDFrames = 0;
  }

  hit(player) {
    if (
      (this.type === "qBlock" || this.type === "brickBlock") &&
      Math.abs(player.body.position.y - this.body.position.y - 1) < HIT_MOE.y &&
      Math.abs(player.body.position.x - this.body.position.x) < HIT_MOE.x
    ) {
      this.hitBool = true;
      if (this.type === "qBlock") {
        this.type = "hitBlock";
        this.textures = TEXTURES_DIR[this.type];
        this.spawnPowerup("mushroom");
      }
    }
  }

  delete() {
    this.sprite.parent.removeChild(this.sprite);
    Composite.remove(this.map.composite, this.body);
    this.map.blocks.splice(this.map.blocks.indexOf(this), 1);
  }

  update() {
    this.updateTexture();
    this.updatePos();
  }

  updateTexture() {
    this.dFrames += 1;
    if (this.dFrames % DELTA_FRAMES !== 0)
      return this.sprite.texture.textureCacheIds[0];
    this.sprite.texture = this.map.textures[
      Helpers.getNextTexture(
        this.textures,
        this.sprite.texture.textureCacheIds[0]
      )
    ];
  }

  updatePos() {
    this.sprite.x = this.body.position.x * (BLOCK_SIZE / SCALE);
    this.sprite.y = this.body.position.y * (BLOCK_SIZE / SCALE);

    if (this.hitBool) {
      this.hitDFrames += 1;
      if (this.hitDFrames === HIT_FRAMES) {
        this.hitBool = false;
        this.hitDFrames = 0;
        return;
      }

      if (this.hitDFrames < HIT_FRAMES / 2) {
        this.body.position.y -= HIT_DELTA_POS;
      } else if (this.hitDFrames > HIT_FRAMES / 2) {
        this.body.position.y += HIT_DELTA_POS;
      }
    }
  }

  spawnPowerup(type) {
    const newPowerup = new Powerup(
      this.body.position.x,
      this.body.position.y - 1,
      type,
      this.map
    );

    this.map.spriteContainer.addChild(newPowerup.sprite);
    Composite.add(this.map.composite, newPowerup.body);
    this.map.powerups.push(newPowerup);
  }
}
