import { Sprite, Container } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";

import Block from "./block";
import Pipe from "./pipe";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  FLOOR_Y = Config.map.floorY,
  FLOORS = Config.map.floors,
  BLOCKS = Config.map.blocks,
  PIPES = Config.map.pipes;

export default class Map {
  constructor(textures) {
    this.textures = textures;
    this.spriteContainer = new Container();
    const backgroundSprite = new Sprite(textures["map.png"]);
    backgroundSprite.scale.set(SCALE);
    this.spriteContainer.addChild(backgroundSprite);
    this.composite = Composite.create();

    FLOORS.forEach(floor => {
      Composite.add(
        this.composite,
        Bodies.rectangle(
          floor.x + floor.w / 2 - 0.5,
          FLOOR_Y + 0.25,
          floor.w,
          1.5,
          {
            isStatic: true
          }
        )
      );
    });
    this.blocks = [];
    this.powerups = [];
    BLOCKS.forEach(block => {
      const newBlock = new Block(
        block.x,
        block.y,
        block.type,
        this,
        block.item
      );

      this.blocks.push(newBlock);
      this.spriteContainer.addChild(newBlock.sprite);
      Composite.add(this.composite, newBlock.body);
    });
    PIPES.forEach(pipe => {
      const newPipe = new Pipe(pipe.x, pipe.y, pipe.h, pipe.dir, this);

      this.spriteContainer.addChild(newPipe.container);
      Composite.add(this.composite, newPipe.composite);
    });
  }

  update() {
    this.blocks.forEach(block => {
      block.update();
    });
    this.powerups.forEach(powerup => {
      powerup.update();
    });
  }
}
