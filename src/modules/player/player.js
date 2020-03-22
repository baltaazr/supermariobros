import * as PIXI from "pixi.js";
import Config from "config";

import Controls from "./controls";

const SCALE = Config.scale;

let Sprite = PIXI.Sprite;

export default class Player {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["mario_standing.png"]);
    this.sprite.scale.set(SCALE);
    this.sprite.vx = 0;
    this.sprite.vy = 0;

    this.controls = new Controls(this);
  }
}
