import { Sprite, Container } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize,
  WIDTH = Config.pipe.width;

export default class Pipe {
  constructor(x, y, h, dir, map) {
    this.map = map;

    this.composite = Composite.create();
    this.container = new Container();

    let sprite;
    switch (dir) {
      case "up":
        sprite = new Sprite(this.map.textures["pipe_up.png"]);
        sprite.position.set(x * BLOCK_SIZE, (y - h) * BLOCK_SIZE);
        sprite.scale.set(SCALE);
        break;
      case "left":
        sprite = new Sprite(this.map.textures["pipe_left.png"]);
        sprite.position.set((x - 1) * BLOCK_SIZE, y * BLOCK_SIZE);
        sprite.scale.set(SCALE);
        break;
      default:
        break;
    }
    this.container.addChild(sprite);

    for (let i = 0; i < h; i++) {
      sprite = new Sprite(this.map.textures["pipe.png"]);
      sprite.position.set(x * BLOCK_SIZE, (y - i) * BLOCK_SIZE);
      sprite.scale.set(SCALE);
      this.container.addChild(sprite);
    }

    Composite.add(
      this.composite,
      Bodies.rectangle(x + 0.5, y - h / 2, WIDTH, h + 1, {
        isStatic: true
      })
    );
  }
}
