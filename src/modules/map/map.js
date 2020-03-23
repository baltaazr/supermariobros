import { Sprite, Container } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  MAP_WIDTH = Config.map.width,
  FLOOR_Y = Config.map.floorY,
  Q_BLOCKS = Config.map.qBlocks;

export default class Map {
  constructor(textures) {
    this.textures = textures;
    this.spriteContainer = new Container();
    this.spriteContainer.addChild(new Sprite(textures["map.png"]));
    this.composite = Composite.create();
    Q_BLOCKS.forEach(qBlock => {
      const newSprite = new Sprite(textures["q_block.png"]);
      newSprite.position.set(
        (qBlock.x * BLOCK_SIZE) / SCALE,
        (qBlock.y * BLOCK_SIZE) / SCALE
      );
      this.spriteContainer.addChild(newSprite);

      const newBody = Bodies.rectangle(
        qBlock.x * BLOCK_SIZE,
        qBlock.y * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE,
        {
          isStatic: true
        }
      );
      newBody.label = "qBlock";
      newBody.sprite = newSprite;
      Composite.add(this.composite, newBody);
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
}
