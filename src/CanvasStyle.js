const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

export default {
  Line(a0, a1, color, width) {
    ctx.beginPath();
    ctx.moveTo(...a0);
    ctx.lineTo(...a1);
    ctx.strokeStyle = color || '#999999';
    ctx.lineWidth = width || 1;
    ctx.stroke();
  },
  Text(text, pos, color, font) {
    ctx.fillStyle = color || '#999999';
    ctx.font = font || '12px Arial';
    ctx.fillText(text, ...pos);
  },
  Arrow(a0, a1, color, width) {
    ctx.beginPath();
    ctx.moveTo(...a0);
    ctx.lineTo(...a1);
    ctx.strokeStyle = color || '#999999';
    ctx.lineWidth = width || 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...a1);
    ctx.lineTo(...[a1[0] + 10, a1[1]]);
    ctx.lineTo(...[a1[0] - 10, a1[1]]);
    ctx.fillStyle = color || '#999999';
    ctx.fill();
  }
}