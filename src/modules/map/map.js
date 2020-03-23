import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import Config from "config";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  MAP_WIDTH = Config.map.width,
  FLOOR_Y = Config.map.floorY;

let Sprite = PIXI.Sprite,
  Bodies = Matter.Bodies;

export default class Map {
  constructor(textures) {
    this.textures = textures;
    this.sprite = new Sprite(textures["map.png"]);
    this.sprite.scale.set(SCALE);

    this.floor = Bodies.rectangle(
      0,
      BLOCK_SIZE * FLOOR_Y,
      BLOCK_SIZE * MAP_WIDTH,
      BLOCK_SIZE,
      {
        isStatic: true
      }
    );
  }
}