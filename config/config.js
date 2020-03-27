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
    //All qBlocks have to have an item property
    blocks: [
      { x: 17, y: 8.5, type: "qBlock", item: "fireflower" },
      { x: 20, y: 8.5, type: "brickBlock" },
      { x: 21, y: 8.5, type: "qBlock", item: "mushroom" },
      { x: 22, y: 8.5, type: "brickBlock" },
      { x: 23, y: 8.5, type: "qBlock", item: "coin" },
      { x: 24, y: 8.5, type: "brickBlock" },
      { x: 22, y: 5.5, type: "qBlock", item: "coin" },
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
    ],
    goombas: [
      //{ x: 21, y: 11.5 }
    ],
    koopas: [{ x: 21, y: 11.5 }]
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
    //Height for big and small state
    wS: 12 / 16,
    wB: 1,
    accel: 0.02,
    jump: {
      force: 0.0000025,
      //Margin of error of velocity y to detect whether player is jumping or not
      moe: 0.1
    },
    //Grace period in frames after being hit
    graceP: 60,
    texturesDir: {
      small: {
        stand: "mario_stand.png",
        move: ["mario_move1.png", "mario_move2.png", "mario_move3.png"],
        jump: "mario_jump.png",
        turn: "mario_turn.png"
      },
      big: {
        stand: "big_mario_stand.png",
        move: [
          "big_mario_move1.png",
          "big_mario_move2.png",
          "big_mario_move3.png"
        ],
        jump: "big_mario_jump.png",
        turn: "big_mario_turn.png"
      },
      fire: {
        stand: "fire_mario_stand.png",
        move: [
          "fire_mario_move1.png",
          "fire_mario_move2.png",
          "fire_mario_move3.png"
        ],
        jump: "fire_mario_jump.png",
        turn: "fire_mario_turn.png"
      }
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
      //Margin of error of hit to detect whether or not it was hit from the bottom and near the same x-axis
      moe: {
        x: 1 / 2,
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
    vel: 0.1
  },
  fireball: {
    w: 0.5,
    h: 0.5,
    vel: 0.2
  },
  enemy: {
    goomba: {
      w: 1,
      h: 1,
      texturesDir: ["goomba1.png", "goomba2.png"]
    },
    koopa: {
      w: 1,
      //Height for move and shell state
      hM: 1.5,
      hS: 1,
      texturesDir: {
        move: ["koopa_move1.png", "koopa_move2.png"],
        shell: ["koopa_shell.png"],
        transition: ["koopa_shell_transition.png"]
      },
      //Velocity of shell
      velS: 0.5
    },
    dFrames: 10,
    vel: 0.05
  }
};
