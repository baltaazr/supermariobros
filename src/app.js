import * as PIXI from "pixi.js";
import * as Matter from "matter-js";

const canvas = document.getElementById("canvas");
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const engine = Matter.Engine.create({
  render: {
    element: document.body,
    canvas: canvas,
    options: {
      width: innerWidth,
      height: innerHeight
    }
  }
});

const renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, {
  backgroundColor: 0x000000
});
const stage = new PIXI.Container();
document.body.appendChild(renderer.view);

Matter.Engine.run(engine);
