import { Sprite, Container } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";

import Block from "./block";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  MAP_WIDTH = Config.map.width,
  FLOOR_Y = Config.map.floorY,
  BLOCKS = Config.map.blocks;

export default class Map {
  constructor(textures) {
    this.textures = textures;
    this.spriteContainer = new Container();
    this.spriteContainer.addChild(new Sprite(textures["map.png"]));
    this.composite = Composite.create();
    this.blocks = [];
    BLOCKS.forEach(block => {
      const newBlock = new Block(block.x, block.y, block.type, this);

      this.blocks.push(newBlock);
      this.spriteContainer.addChild(newBlock.sprite);
      Composite.add(this.composite, newBlock.body);
    });
    this.spriteContainer.scale.set(SCALE);

    Composite.add(
      this.composite,
      Bodies.rectangle(
        0,
        BLOCK_SIZE * FLOOR_Y,
        BLOCK_SIZE * MAP_WIDTH,
        BLOCK_SIZE,
        {
          isStatic: true
        }
      )
    );
  }

  update() {
    this.blocks.forEach(block => {
      block.update();
    });
  }
}
