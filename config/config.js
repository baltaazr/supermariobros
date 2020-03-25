export default {
  // height of map is 224 pixels
  scale: window.innerHeight / 224,
  blockSize: window.innerHeight / 14,
  map: {
    // in blocks
    height: 14,
    width: 212,
    floorY: 12.5,
    floors: [
      { x: 0, w: 69 },
      { x: 71, w: 15 }
    ],
    blocks: [
      { x: 17, y: 8.5, type: "qBlock" },
      { x: 20, y: 8.5, type: "brickBlock" },
      { x: 21, y: 8.5, type: "qBlock" },
      { x: 22, y: 8.5, type: "brickBlock" },
      { x: 23, y: 8.5, type: "qBlock" },
      { x: 24, y: 8.5, type: "brickBlock" },
      { x: 22, y: 5.5, type: "qBlock" }
    ],
    pipes: [
      { x: 28, y: 11.5, h: 1, dir: "up" },
      { x: 38, y: 11.5, h: 2, dir: "up" }
    ],
    dFrames: 10
  },
  physics: {
    gravityScale: 0.0001,
    frictionAir: 0.1,
    friction: 0,
    accel: 0.02,
    jump: {
      force: 0.000003,
      //Margin of error of velocity y to detect whether player is jumping or not
      moe: 0.1
    }
  },
  player: {
    startingPos: { x: 2.5, y: 11.5 },
    dFrames: 5
  },
  block: {
    texturesDir: {
      qBlock: ["q_block1.png", "q_block2.png", "q_block3.png"],
      brickBlock: ["brick_block.png"],
      hitBlock: ["hit_block.png"]
    },
    hit: {
      frames: 30,
      dPos: 0.01,
      moe: {
        x: 3 / 4,
        y: 1 / 2
      }
    }
  },
  pipe: {
    width: 1.5
  }
};
