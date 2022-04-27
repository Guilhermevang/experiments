function Linear(a, b, t) {
  if (!a || !b) return [ 0, 0 ];
  const value = n => (1 - t) * a[n] + t * b[n]; // Can also be written as "a + (b - a) * t"
  const axles = [ value(0), value(1) ];
  return axles;
}

function Quadratic(a, b, c, t) {
  const p0 = Linear(a, b, t);
  const p1 = Linear(b, c, t);
  return Linear(p0, p1, t);
}

function Cubic(a, b, c, d, t) {
  const p0 = Quadratic(a, b, c, t);
  const p1 = Quadratic(b, c, d, t);
  return Linear(p0, p1, t);
}

function CreateSegments(anchors) {
  let path = [];
  let segments = [];

  if (anchors.length < 2) return {
    path,
    segments,
  };

  anchors.reduce((acc, cur, i) => {
    path.push(acc);
    let ANCHOR_SEGMENT = path[(i-1)*4-2] || acc;
    let SEGMENT_1 = [
      acc[0] * 2 - ANCHOR_SEGMENT[0],
      acc[1] * 2 - ANCHOR_SEGMENT[1]
    ];
    let SEGMENT_2 = [
      (cur[0] + SEGMENT_1[0]) / 2,
      (cur[1] + SEGMENT_1[1]) / 2
    ]
    segments.push([SEGMENT_1, acc], [SEGMENT_2, cur]);
    path.push(SEGMENT_1, SEGMENT_2, cur);
    return cur;
  });
  
  return {
    path,
    segments,
  };
}

function calcArr(arr = [], method = '+') {
  const methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }
  return arr.reduce((acc, val) => acc.map((n, i) => methods[method](n, val[i])));
}

function getPointsDistance(a, b) {
  return Math.hypot(...getCoordsDistance(a, b));
}

function getCoordsDistance(a, b) {
  return a.map((n, i) => n - b[i]);
}

export default {
  Linear,
  Quadratic,
  Cubic,
  CreateSegments,
  calcArr,
  getPointsDistance,
  getCoordsDistance,
};