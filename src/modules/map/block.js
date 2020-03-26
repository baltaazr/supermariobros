import { Composite } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

import Powerup from "./powerup";

const TEXTURES_DIR = Config.block.texturesDir,
  DELTA_FRAMES = Config.block.dFrames,
  HIT_FRAMES = Config.block.hit.frames,
  HIT_DELTA_POS = Config.block.hit.dPos,
  HIT_MOE = Config.block.hit.moe,
  GameObject = Helpers.GameObject();

export default class Block extends GameObject {
  constructor(x, y, type, map, item) {
    super(
      x,
      y,
      1,
      1,
      TEXTURES_DIR[type],
      map.textures[TEXTURES_DIR[type][0]],
      "block",
      true,
      DELTA_FRAMES
    );

    this.item = item;
    this.map = map;
    this.type = type;
    this.hitDFrames = 0;
  }

  hit(body) {
    if (body.label === "player") {
      const { player } = body;
      if (
        (this.type === "qBlock" || this.type === "brickBlock") &&
        Math.abs(
          body.position.y - this.body.position.y - (this.h / 2 + player.h / 2)
        ) < HIT_MOE.y &&
        Math.abs(body.position.x - this.body.position.x) < HIT_MOE.x
      ) {
        this.hitBool = true;
        if (this.type === "qBlock") {
          this.type = "hitBlock";
          this.textures = TEXTURES_DIR[this.type];
          if (this.item === "coin") {
          } else this.spawnPowerup(this.item);
        } else if (this.type === "brickBlock" && player.state !== "small")
          this.delete();
      }
    }
  }

  updatePos() {
    super.updatePos();

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
