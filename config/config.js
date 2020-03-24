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
    pipes: [{ x: 27, y: 11.5, h: 2, dir: "up" }],
    dFrames: 10
  },
  physics: {
    gravityScale: 0.001,
    frictionAir: 0.5,
    accel: 0.1,
    jumpForce: 0.00001
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
      moe: {
        x: 150,
        y: 100
      }
    }
  }
};
