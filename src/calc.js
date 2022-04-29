const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

export default {
  vectors(arr = [], method = '+') {
    const methods = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '^': (a, b) => a ** b,
      '%': (a, b) => a % b,
    }
    return arr.reduce((acc, val) => acc.map((n, i) => methods[method](n, val[i])));
  },
  axleDistance(a, b) {
    return this.vectors([a, b], '-');
  },
  distance(a, b) {
    return Math.hypot(...this.axleDistance(a, b));
  },
  kineticEnergy(mass, velocity) {
    return mass * Math.pow(velocity, 2) / 2;
  },
  MetricConverter(value, from, to) {
    const metric = {
      'm': 1,
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001,
      'mi': 1609.34,
      'yd': 0.9144,
      'ft': 0.3048,
      'in': 0.0254,
    }
    return (value * metric[from]) / metric[to];
  },
  // Convert [m,km] to Pixels
  mk2p(value, from) {
    return value * 3779.5275590551 * (from === 'km' ? 1000 : 1);
  },
}