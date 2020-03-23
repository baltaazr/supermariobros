export default {
  // height of map is 224 pixels
  scale: window.innerHeight / 224,
  blockSize: window.innerHeight / 14,
  map: {
    // in blocks
    height: 14,
    width: 212,
    floorY: 12.5
  },
  controls: {
    accel: 1,
    //F=ma, m=area*density, default density = 0.001
    //acceleration changes linearly with window height
    jumpForce:
      (window.innerHeight / 14) ** 2 * 0.001 * (window.innerHeight / 10000)
  },
  physics: {
    gravityScale: 0.005,
    frictionAir: 0.1
  }
};
