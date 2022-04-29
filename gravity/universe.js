import calc from "../src/calc.js";
import CanvasStyle from "../src/CanvasStyle.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


export default {
  G: 6.67408 * Math.pow(10, 1),
  dt: 0.1,
  Gravity(body1, body2) {
    let distance = calc.distance(body1.axles, body2.axles);
    let g = (this.G * body2.mass) / Math.pow(distance, 2);
    return g;
  },
  Body(body) {
    ctx.beginPath();
    ctx.arc(...body.axles, body.radius, 0, 2 * Math.PI);
    let prevColor = [ctx.fillStyle, ctx.strokeStyle];
    ctx.fillStyle = body.fill || '#ffffff';
    ctx.strokeStyle = body.stroke || '#000000';
    ctx.fill();
    body.stroke ? ctx.stroke() : null;
    ctx.fillStyle = prevColor[0];
    ctx.strokeStyle = prevColor[1];
    body.gravity = (this.G * body.mass) / Math.pow(body.radius, 2);
  },
  Move(body) {
    body.axles[0] += body.velocity[0] * this.dt;
    body.axles[1] += body.velocity[1] * this.dt;
  },
  Accelerate(body1, body2) {
    let arrBodies = [body1, body2]
    arrBodies.forEach((body, bi) => {
      bi = Math.abs(bi - 1);
      let g = this.Gravity(body, arrBodies[bi]);
      let axleDistance = calc.axleDistance(arrBodies[bi].axles, body.axles);
      let arctg = Math.atan2(axleDistance[1], axleDistance[0]);
      let [ vx, vy ] = [
        Math.cos(arctg) * g * this.dt,
        Math.sin(arctg) * g * this.dt
      ]

      let [ ax2, ay2 ] = [
        body.axles[0] + vx * this.dt,
        body.axles[1] + vy * this.dt
      ]
      
      body.velocity = calc.vectors([body.velocity, [vx, vy]], '+');
    });
  },
  AccelerateAll(bodies) {
    let bodiesCopy = bodies.slice();
    while (bodiesCopy.length > 0) {
      let body1pos = bodies.length - bodiesCopy.length
      for (let i = 1; i < bodiesCopy.length; i++) {
        this.Accelerate(bodies[body1pos], bodies[body1pos + i]);
        this.drawDistance(bodies[body1pos], bodies[body1pos + i]);
      }
      bodiesCopy.shift();
    }
  },
  drawDistance(body1, body2, maxDistance = 500) {
    let distance = calc.distance(body1.axles, body2.axles);
    if (distance > body1.radius + body2.radius && distance < maxDistance) {
      CanvasStyle.Line(body1.axles, body2.axles, '#f00', 1);
      CanvasStyle.Text(
        `${Math.round(distance)}`,
        [
          (body1.axles[0] + body2.axles[0]) / 2,
          (body1.axles[1] + body2.axles[1]) / 2
        ],
        '#f00',
        '12px Arial'
      );
    }
  },
}