import math from 'mathjs';

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

// drawAxes();

// const func1 = x => Math.pow(Math.exp(1), 1 / x);
// ctx.strokeStyle = '#f00';
// plot(func1);

// const func2 = x => 1 / Math.exp(x);
// ctx.strokeStyle = '#0f0';
// plot(func2);

// const func3 = angle => 400 / (Math.cos(Math.exp(1) * angle) + 2);
// ctx.strokeStyle = '#00f';
// plot(func3, true);

// const func4 = t => [
//   90 * Math.cos(t) + 20 * Math.cos(9 * t),
//   90 * Math.sin(t) + 20 * Math.sin(9 * t)
// ];
// ctx.strokeStyle = '#f0f';
// plot(func4, false, true);


const POINTS = [
  [0.0, 70],
  [0.5, 101],
  [1.0, 64],
  [1.5, 5],
  [2.0, 34]
];

function interpolate(points) {
  const a = _.first(points)[0];
  const b = _.last(points)[0];
  const h = (b - a) / 4;
  const h1 = (b - a) / (5 * (points.length - 1));

  const aMatrix = math.matrix([
    [4, 1, 0],
    [1, 4, 1],
    [0, 1, 4]
  ]);

  const b0Matrix = math.matrix([
    [3 * (points[2][1] - 2 * points[1][1] + points[0][1])],
    [3 * (points[3][1] - 2 * points[2][1] + points[1][1])],
    [3 * (points[4][1] - 2 * points[3][1] + points[2][1])]
  ]);

  const dArray = points.map(point => point[1]);

  const aInverseMatrix = math.inv(aMatrix);

  const bArray = [0];
  math.multiply(aInverseMatrix, b0Matrix).forEach(element => {
    bArray.push(element);
  });
  bArray.push(0);

  const aArray = [];
  _.range(points.length - 1).forEach(index => {
    aArray.push(1 / 3 * (bArray[index + 1] - bArray[index]));
  });

  const cArray = [];
  _.range(points.length - 1).forEach(index => {
    cArray.push(points[index + 1][1] - points[index][1] - aArray[index] - bArray[index]);
  });

  const finalPoints = [];
  _.range(points.length - 1).forEach(i => {
    _.range(0, 1, 0.2).forEach((t, index) => {

      if (i === 0 && t === 0) {
        finalPoints.push(points[0]);
      } else {
        finalPoints.push([
          _.last(finalPoints)[0] + h1,
          aArray[i] * Math.pow(t, 3) +
            bArray[i] * Math.pow(t, 2) +
            cArray[i] * t +
            dArray[i]
        ]);
      }

    });
  });

  finalPoints.push(_.last(points));

  return finalPoints;
}

const scaleX = 300;
const scaleY = 3;

function drawPlot2(xyArray) {
  let noDraw = false;

  ctx.beginPath();
  ctx.moveTo(canvasXCenter + xyArray[0][0] * zoom, canvasYCenter - xyArray[0][1] * zoom);

  xyArray.forEach(coordinates => {
    console.log(coordinates);
    if (Number.isFinite(coordinates[0]) && Number.isFinite(coordinates[1])) {
      if (noDraw) {
        ctx.stroke();
        ctx.beginPath();
        noDraw = false;
      } else {
        ctx.lineTo(canvasXCenter + coordinates[0] * scaleX, canvasYCenter - coordinates[1] * scaleY);
      }
    } else {
      noDraw = true;
    }
  });

  ctx.stroke();
}

// ctx.strokeStyle = '#f00';
// drawPlot2(POINTS);

// ctx.strokeStyle = '#00f';
// drawPlot2(interpolate(POINTS));

// LAB 8

const POINT1 = [canvasXCenter - 350, canvasYCenter + 150];
const POINT2 = [canvasXCenter + 350, canvasYCenter + 150];
const POINT3 = [canvasXCenter, canvasYCenter - 350];
const ITERATIONS = 5; // Number(prompt('Enter number of iterations: '));

function fractal(point1, point2, point3, iterations) {
  if (iterations > 0) {

    // средняя треть отрезка
    const p4 = [(point2[0] + 2 * point1[0]) / 3, (point2[1] + 2 * point1[1]) / 3];
    const p5 = [(2 * point2[0] + point1[0]) / 3, (point1[1] + 2 * point2[1]) / 3];

    // координаты вершины угла
    const ps = [(point2[0] + point1[0]) / 2, (point2[1] + point1[1]) / 2];
    const pn = [(4 * ps[0] - point3[0]) / 3, (4 * ps[1] - point3[1]) / 3];

    // рисуем его
    ctx.beginPath();
    ctx.moveTo(...p4);
    ctx.lineTo(...pn);
    ctx.moveTo(...p5);
    ctx.lineTo(...pn);
    ctx.moveTo(...p4);
    ctx.lineTo(...p5);
    ctx.stroke();

    // рекурсивно вызываем функцию нужное число раз
    fractal(p4, pn, p5, iterations - 1);
    fractal(pn, p5, p4, iterations - 1);
    fractal(point1, p4, [(2 * point1[0] + point3[0]) / 3, (2 * point1[1] + point3[1]) / 3], iterations - 1);
    fractal(p5, point2, [(2 * point2[0] + point3[0]) / 3, (2 * point2[1] + point3[1]) / 3], iterations - 1);
  }

  return iterations;
}

function drawFractal(point1, point2, point3, iterations) {
  ctx.beginPath();
  ctx.moveTo(...point1);
  ctx.lineTo(...point2);
  ctx.lineTo(...point3);
  ctx.lineTo(...point1);
  ctx.stroke();

  fractal(point1, point2, point3, iterations);
  fractal(point2, point3, point1, iterations);
  fractal(point3, point1, point2, iterations);
}

drawFractal(POINT1, POINT2, POINT3, ITERATIONS);
