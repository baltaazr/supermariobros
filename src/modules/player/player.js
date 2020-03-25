import Config from "config";
import Helpers from "../../utils/helpers";

import Controls from "./controls";

const SCALE = Config.scale,
  WIDTH = Config.player.width,
  STARTING_POS = Config.player.startingPos,
  DELTA_FRAMES = Config.player.dFrames,
  GameObject = Helpers.GameObject();

export default class Player extends GameObject {
  constructor(textures) {
    super(
      STARTING_POS.x,
      STARTING_POS.y,
      WIDTH,
      1,
      textures,
      textures["mario_standing.png"],
      "player",
      false,
      DELTA_FRAMES
    );

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
      this.sprite.texture = this.textures["mario_jump.png"];
    } else {
      if (this.accel !== 0) {
        if (this.body.velocity.x * this.accel < 0) {
          this.sprite.texture = this.textures["mario_turn.png"];
        } else {
          if (this.frames % this.dFrames === 0)
            this.sprite.texture = this.textures[
              Helpers.getNextTexture(
                ["mario_moving1.png", "mario_moving2.png", "mario_moving3.png"],
                this.sprite.texture.textureCacheIds[0]
              )
            ];
        }
      } else {
        this.frames = 0;
        this.sprite.texture = this.textures["mario_standing.png"];
      }
    }
  }
}
