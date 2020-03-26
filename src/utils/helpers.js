import { Sprite } from "pixi.js";
import { Bodies, Body, Composite } from "matter-js";
import Config from "config";

const SCALE = Config.scale,
  BLOCK_SIZE = Config.blockSize;

export default class Helpers {
  static keyboard = value => {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    return key;
  };

  static getNextTexture(textures, curSprite) {
    const idx = textures.indexOf(curSprite);

    if (idx === -1) {
      return textures[0];
    }

    if (idx === textures.length - 1) {
      return textures[0];
    } else return textures[idx + 1];
  }

  static GameObject() {
    return class GameObject {
      constructor(x, y, w, h, textures, texture, label, isStatic, dFrames) {
        this.w = w;
        this.h = h;
        this.textures = textures;
        this.sprite = new Sprite(texture);
        this.sprite.position.set(x * BLOCK_SIZE, y * BLOCK_SIZE);
        this.sprite.scale.set(SCALE);

        this.body = Bodies.rectangle(x, y, w, h, {
          label,
          isStatic
        });
        this.body[label] = this;
        this.frames = 0;
        this.dFrames = dFrames;
      }

      update() {
        this.updateTexture();
        this.updatePos();
        this.frames += 1;
      }

      updateTexture() {
        if (this.frames % this.dFrames === 0)
          this.sprite.texture = this.map.textures[
            Helpers.getNextTexture(
              this.textures,
              this.sprite.texture.textureCacheIds[0]
            )
          ];
      }

      updatePos() {
        //Account for the width and height of GameObject
        this.sprite.x =
          (this.body.position.x +
            (this.backwards ? 0.5 + this.w / 2 : 0.5 - this.w / 2)) *
          BLOCK_SIZE;
        this.sprite.y = (this.body.position.y + 0.5 - this.h / 2) * BLOCK_SIZE;

        if (!this.body.isStatic) {
          Body.setVelocity(this.body, {
            x: (this.body.velocity.x += this.accel),
            y: this.body.velocity.y
          });

          Body.setAngularVelocity(this.body, 0);
        }
      }

      delete() {
        this.sprite.parent.removeChild(this.sprite);
        Composite.remove(this.map.composite, this.body);
        const listName = `${this.body.label}s`;
        this.map[listName].splice(this.map[listName].indexOf(this), 1);
      }
    };
  }
}
