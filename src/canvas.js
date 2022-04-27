const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

function setCanvasDimensions() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
}

const setStyle = (fill = '#999999', stroke = '#333333', width = 4) => {
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  ctx.lineWidth = width
}

window.onload = function init() {
  setCanvasDimensions();
  setStyle();
  ctx.imageSmoothingQuality = 'high';
  updateScreen();
}

let renderList = [];
function updateScreen() {
  window.requestAnimationFrame(updateScreen);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < renderList.length; i++) {
    renderList[i]();
  }
}

const add = (...funcs) => renderList.push(...funcs);
const remove = func => renderList.splice(renderList.indexOf(func), 1);
const clear = _ => renderList = [];

export default { add, remove, clear }