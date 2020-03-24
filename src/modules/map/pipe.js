import { Sprite, Container } from "pixi.js";
import { Bodies, Composite } from "matter-js";
import Config from "config";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize;

export default class Pipe {
  constructor(x, y, h, dir, map) {
    this.map = map;

    this.composite = Composite.create();
    this.container = new Container();

    let sprite;
    switch (dir) {
      case "up":
        sprite = new Sprite(this.map.textures["pipe_up.png"]);
        sprite.position.set(x, y + h);
      case "left":
        sprite = new Sprite(this.map.textures["pipe_left.png"]);
        sprite.position.set(x - 1, y);
    }
    this.container.addChild(sprite);

    for (let i = 0; i < h; i++)
      this.container.addChild(new Sprite("pipe.png").position.set(x, y + i));

    Composite.add(
      this.composite,
      Bodies.rectangle(x * BLOCK_SIZE, y * BLOCKSIZE, 1, h * BLOCKSIZE, {
        isStatic: true
      })
    );
  }
}
