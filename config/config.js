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
      { x: 71, w: 15 },
      { x: 89, w: 64 },
      { x: 155, w: 57 }
    ],
    blocks: [
      { x: 17, y: 8.5, type: "qBlock" },
      { x: 20, y: 8.5, type: "brickBlock" },
      { x: 21, y: 8.5, type: "qBlock" },
      { x: 22, y: 8.5, type: "brickBlock" },
      { x: 23, y: 8.5, type: "qBlock" },
      { x: 24, y: 8.5, type: "brickBlock" },
      { x: 22, y: 5.5, type: "qBlock" },
      { x: 134, y: 11.5, type: "block" },
      { x: 135, y: 11.5, type: "block" },
      { x: 136, y: 11.5, type: "block" },
      { x: 137, y: 11.5, type: "block" },
      { x: 135, y: 10.5, type: "block" },
      { x: 136, y: 10.5, type: "block" },
      { x: 137, y: 10.5, type: "block" },
      { x: 136, y: 9.5, type: "block" },
      { x: 137, y: 9.5, type: "block" },
      { x: 137, y: 8.5, type: "block" },

      { x: 143, y: 11.5, type: "block" },
      { x: 142, y: 11.5, type: "block" },
      { x: 141, y: 11.5, type: "block" },
      { x: 140, y: 11.5, type: "block" },
      { x: 142, y: 10.5, type: "block" },
      { x: 141, y: 10.5, type: "block" },
      { x: 140, y: 10.5, type: "block" },
      { x: 141, y: 9.5, type: "block" },
      { x: 140, y: 9.5, type: "block" },
      { x: 140, y: 8.5, type: "block" }
    ],
    pipes: [
      { x: 28, y: 11.5, h: 1, dir: "up" },
      { x: 38, y: 11.5, h: 2, dir: "up" }
    ]
  },
  physics: {
    gravityScale: 0.0001,
    friction: 0,
    frictionAir: 0.1,
    frictionStatic: 0,
    //Amount a body can sink into another body
    slop: 0
  },
  player: {
    startingPos: { x: 2.5, y: 11.5 },
    dFrames: 5,
    width: 12 / 16,
    accel: 0.02,
    jump: {
      force: 0.0000025,
      //Margin of error of velocity y to detect whether player is jumping or not
      moe: 0.1
    }
  },
  block: {
    texturesDir: {
      block: ["block.png"],
      qBlock: ["q_block1.png", "q_block2.png", "q_block3.png"],
      brickBlock: ["brick_block.png"],
      hitBlock: ["hit_block.png"]
    },
    hit: {
      frames: 30,
      dPos: 0.01,
      moe: {
        x: 3 / 4,
        y: 3 / 4
      }
    },
    dFrames: 10
  },
  pipe: {
    width: 2
  },
  powerup: {
    texturesDir: {
      mushroom: ["mushroom.png"],
      fireflower: [
        "fireflower_1.png",
        "fireflower_2.png",
        "fireflower_3.png",
        "fireflower_4.png",
        "fireflower_5.png",
        "fireflower_6.png"
      ]
    },
    dFrames: 5,
    accel: 0.003
  }
};
