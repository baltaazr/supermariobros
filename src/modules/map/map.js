import * as PIXI from "pixi.js";
import Config from "config";

const SCALE = Config.scale;

let Sprite = PIXI.Sprite;

export default class Map {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["map.png"]);
    this.sprite.scale.set(SCALE);
  }
}
