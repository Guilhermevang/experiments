import canvasRender from './../src/canvas.js';
import Bezier from './Bezier.js';

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

function log(...args) {
  console.log(...args);
}

function Line(x1, y1, x2, y2, pathColor = false, pathWidth = false) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  let prevPathColor = ctx.strokeStyle;
  pathColor ? ctx.strokeStyle = pathColor : null;
  let prevPathWidth = ctx.lineWidth;
  pathWidth ? ctx.lineWidth = pathWidth : null;
  ctx.stroke();
  ctx.strokeStyle = prevPathColor;
  ctx.lineWidth = prevPathWidth;
  return { x1, y1, x2, y2 };
}

function Points(points, round = true, color = '#f47471', radius = 6) {
  if (!points) return;
  const arrPoints = [];
  const add = (x, y) => arrPoints.push([x, y]);
  points.forEach(point => {
    add(...point)
    ctx.beginPath();
    round
      ? ctx.arc(...point, 6, 0, 2 * Math.PI)
      : ctx.rect(...Bezier.calcArr([point, [radius,radius]], '-'), 2*radius, 2*radius);
    let prevFillStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = prevFillStyle;
  });
  return arrPoints;
}

function Path(points, pathColor = false, pointFill = false) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  let prevPathColor = ctx.strokeStyle;
  pathColor ? ctx.strokeStyle = pathColor : null;
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.stroke();
  ctx.strokeStyle = prevPathColor;
  if (pointFill) Points(points);
  return {
    len_lines: points.length - 1,
    len_points: points.length,
    points,
  };
}

const params = {
  points: [],
  segments: [],
  path: [],
  mousePosition: [0, 0],
}

canvas.addEventListener('dblclick', _ => params.points = []);
canvas.addEventListener('click', e => {
  params.points.push([e.offsetX, e.offsetY]);
})
canvas.addEventListener('mousemove', e => {
  params.mousePosition = [e.offsetX, e.offsetY];
})

function draw() {
  let { path, segments } = Bezier.CreateSegments(params.points);
  params.path = path;
  params.segments = segments;
  
  let bezierPath = [];
  for (let p = 0; p < (path.length - 1) / 4; p++) {
    for (let t = 0; t < 1; t += 0.01) {
      bezierPath.push(Bezier.Cubic(...path.slice(p*4, p*4+4), t));
    }
  }
  Path(bezierPath, '#096', false);

  for (let s = 0; s < segments.length; s++) {
    Line(...segments[s][0], ...segments[s][1], '#fafafa', 2);
  }

  Points(params.path, true, '#f00', 5);
}

canvasRender.add(draw)