import { Bodies, World } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

import Controls from "./controls";
import { TilingSprite } from "pixi.js";

const SCALE = Config.scale,
  WIDTH_S = Config.player.widthS,
  WIDTH_B = Config.player.widthB,
  STARTING_POS = Config.player.startingPos,
  TEXTURES_DIR = Config.player.texturesDir,
  DELTA_FRAMES = Config.player.dFrames,
  GameObject = Helpers.GameObject();

export default class Player extends GameObject {
  constructor(globalTextures, world) {
    super(
      STARTING_POS.x,
      STARTING_POS.y,
      WIDTH_S,
      1,
      TEXTURES_DIR.small,
      globalTextures["mario_standing.png"],
      "player",
      false,
      DELTA_FRAMES
    );
    this.world = world;
    this.globalTextures = globalTextures;

    this.controls = new Controls(this);
    this.accel = 0;
    this.backwards = false;
    this.onGround = true;
  }

  update() {
    if (
      this.sprite.getGlobalPosition().x > window.innerWidth / 2 &&
      !this.backwards
    )
      this.sprite.parent.x -=
        this.sprite.getGlobalPosition().x - window.innerWidth / 2;
    super.update();
  }

  updateTexture() {
    if (this.accel > 0) {
      this.sprite.scale.x = SCALE;
      this.backwards = false;
    } else if (this.accel < 0) {
      this.sprite.scale.x = -SCALE;
      this.backwards = true;
    }

    if (!this.onGround) {
      this.sprite.texture = this.globalTextures[this.textures.jump];
    } else {
      if (this.accel !== 0) {
        if (this.body.velocity.x * this.accel < 0) {
          this.sprite.texture = this.globalTextures[this.textures.turn];
        } else {
          if (this.frames % this.dFrames === 0)
            this.sprite.texture = this.globalTextures[
              Helpers.getNextTexture(
                this.textures.move,
                this.sprite.texture.textureCacheIds[0]
              )
            ];
        }
      } else {
        this.frames = 0;
        this.sprite.texture = this.globalTextures[this.textures.stand];
      }
    }
  }

  consumePowerup(powerup) {
    switch (powerup) {
      case "mushroom":
        this.textures = TEXTURES_DIR.big;

        World.remove(this.world, this.body);
        this.w = WIDTH_B;
        this.h = 2;
        this.body = Bodies.rectangle(
          this.body.position.x,
          this.body.position.y - 0.5,
          this.w,
          this.h,
          {
            label: this.body.label,
            mass: this.body.mass,
            friction: 0,
            frictionAir: 0.1,
            slop: 0
          }
        );
        World.add(this.world, this.body);
        break;
      default:
        break;
    }
  }
}
