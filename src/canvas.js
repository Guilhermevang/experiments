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

let onLoadObj = {};
let onLoadList = [];
const addToInit = (...funcs) => onLoadList.push(...funcs);
function renderInitList() {
  for (let i = 0; i < onLoadList.length; i++) {
    let item = onLoadList[i];
    onLoadObj[item[0]] = item[1]();
  }
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
const update = (...funcs) => {
  let pos = -1
  for (let i = 0; i < funcs.length; i++) {
    pos = renderList.indexOf(funcs[i]);
    pos ? renderList[pos] = funcs[i] : add(funcs[i]);
  }
}
const clear = _ => renderList = [];

window.onload = function init() {
  setCanvasDimensions();
  setStyle();
  ctx.imageSmoothingQuality = 'high';
  updateScreen();
  renderInitList();
}

export default {
  add,
  remove,
  update,
  clear,
  setStyle,
  addToInit,
  getRenderedList: prop => prop ? onLoadList[prop] : onLoadList,
};