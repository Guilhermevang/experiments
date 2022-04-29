import CanvasRender from "../src/canvas.js";
import Universe from "./universe.js";
import calc from "../src/calc.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const bodiesVector = [
  {
    name: "PX1",
    axles: [window.innerWidth / 2, window.innerHeight / 2 - 100],
    radius: 50,
    mass: 10000,
    velocity: [30,0],
    fill: "#069",
  },
  {
    name: "PY2",
    axles: [window.innerWidth / 2 - 50, window.innerHeight / 2 + 100],
    radius: 50,
    mass: 10000,
    velocity: [-30,0],
    fill: "#096",
  },
]

function draw() {
  Universe.AccelerateAll(bodiesVector);

  // Loop through all bodies and draw them
  for (let i = 0; i < bodiesVector.length; i++) {
    let body = bodiesVector[i];
    Universe.Move(body);
    Universe.Body(body);
  }
}

CanvasRender.add(draw);