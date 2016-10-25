const canvas = document.getElementById('canvas');

let canvasXCenter = canvas.width / 2;
let canvasYCenter = canvas.width / 2;

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasXCenter = canvas.width / 2;
  canvasYCenter = canvas.height / 2;
}

setCanvasSize();

// window.addEventListener('resize', () => {
//   setCanvasSize();
//   drawAxes();
//   plot();
// });

const ctx = canvas.getContext('2d');

function drawAxes() {
  ctx.beginPath();
  ctx.moveTo(canvasXCenter, 0);
  ctx.lineTo(canvasXCenter, canvas.height);
  ctx.moveTo(0, canvasYCenter);
  ctx.lineTo(canvas.width, canvasYCenter);
  ctx.closePath();
  ctx.stroke();
}

const zoom = 100;

function plot(func, polar, param) {
  let xyArray;

  if (polar) {
    xyArray = _.range(0, Math.PI * 10, 0.01)
      .map(x => ({
        x: func(x) * Math.cos(x) / 100,
        y: func(x) * Math.sin(x) / 100
      }));
  } else if (param) {
    xyArray = _.range(-10, 10, 0.01)
      .map(x => ({
        x: func(x)[0] / 30,
        y: func(x)[1] / 30
      }));
  } else {
    xyArray = _.range(-10, 10, 0.08)
      .map(x => ({
        x: x,
        y: func(x)
      }));
  }


  drawPlot(xyArray);
}

function drawPlot(xyArray) {
  let noDraw = false;

  ctx.beginPath();
  ctx.moveTo(canvasXCenter + xyArray[0].x * zoom, canvasYCenter - xyArray[0].y * zoom);

  xyArray.forEach(coordinates => {
    if (Number.isFinite(coordinates.x) && Number.isFinite(coordinates.y)) {
      if (noDraw) {
        ctx.stroke();
        ctx.beginPath();
        noDraw = false;
      } else {
        ctx.lineTo(canvasXCenter + coordinates.x * zoom, canvasYCenter - coordinates.y * zoom);
      }
    } else {
      noDraw = true;
    }
  });

  ctx.stroke();
}

drawAxes();

const func1 = x => Math.pow(Math.exp(1), 1 / x);
ctx.strokeStyle = '#f00';
plot(func1);

const func2 = x => 1 / Math.exp(x);
ctx.strokeStyle = '#0f0';
plot(func2);

const func3 = angle => 400 / (Math.cos(Math.exp(1) * angle) + 2);
ctx.strokeStyle = '#00f';
plot(func3, true);

const func4 = t => [
  90 * Math.cos(t) + 20 * Math.cos(9 * t),
  90 * Math.sin(t) + 20 * Math.sin(9 * t)
];
ctx.strokeStyle = '#f0f';
plot(func4, false, true);
