export default {
  // height of map is 224 pixels
  scale: window.innerHeight / 224,
  blockSize: window.innerHeight / 14,
  map: {
    // in blocks
    height: 14,
    width: 212,
    floorY: 12.5,
    blocks: [
      { x: 17, y: 8.5, type: "qBlock" },
      { x: 20, y: 8.5, type: "brickBlock" },
      { x: 21, y: 8.5, type: "qBlock" },
      { x: 22, y: 8.5, type: "brickBlock" },
      { x: 23, y: 8.5, type: "qBlock" },
      { x: 24, y: 8.5, type: "brickBlock" },
      { x: 22, y: 5.5, type: "qBlock" }
    ],
    pipes: [{ x: 26, y: 11.5, dir: "up" }],
    dFrames: 10
  },
  physics: {
    // gravity scale proportional to window height
    gravityScale: window.innerHeight / 273200,
    frictionAir: 0.1,
    //acceleration changes linearly with window height
    accel: window.innerHeight / 1500,
    //F=ma, m=area*density, default density = 0.001
    jumpForce:
      (window.innerHeight / 14) ** 2 * 0.001 * (window.innerHeight / 5000)
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
      dPos: 1,
      //Margin of error in pixels, check which side of the block was hit
      moe: {
        x: (window.innerHeight / 14) * (3 / 4),
        y: window.innerHeight / 14 / 2
      }
    }
  }
};
