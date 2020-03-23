export default {
  // height of map is 224 pixels
  scale: window.innerHeight / 224,
  blockSize: window.innerHeight / 14,
  map: {
    // in blocks
    height: 14,
    width: 212,
    floorY: 12.5,
    qBlocks: [{ x: 17, y: 8.5 }]
  },
  controls: {
    //acceleration changes linearly with window height
    accel: window.innerHeight / 1500,
    //F=ma, m=area*density, default density = 0.001
    jumpForce:
      (window.innerHeight / 14) ** 2 * 0.001 * (window.innerHeight / 8000)
  },
  physics: {
    // gravity scale proportional to window height
    gravityScale: window.innerHeight / 273200,
    frictionAir: 0.1
  },
  player: {
    startingPos: { x: 2.5, y: 11.5 },
    dFrames: 5
  },
  block: {
    texturesDir: {
      qBlock: ["q_block.png"]
    }
  }
};
