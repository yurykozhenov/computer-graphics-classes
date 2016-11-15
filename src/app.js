import { canvas, ctx, canvasXCenter, canvasYCenter } from './canvas';
import { drawAxes, plot } from './plot';
import { interpolate, drawPlot2 } from './spliteInterpolation';
import { drawFractal } from './fractal';
import { plotPolar } from './screensaver';

// window.addEventListener('resize', () => {
//   setCanvasSize();
//   drawAxes();
//   plot();
// });

// LAB 6

// const zoom = 100;

// drawAxes(canvasXCenter, canvasYCenter);

// const func1 = x => Math.pow(Math.exp(1), 1 / x);
// ctx.strokeStyle = '#f00';
// plot(func1, null, null, zoom);

// const func2 = x => 1 / Math.exp(x);
// ctx.strokeStyle = '#0f0';
// plot(func2, null, null, zoom);

// const func3 = angle => 400 / (Math.cos(Math.exp(1) * angle) + 2);
// ctx.strokeStyle = '#00f';
// plot(func3, true, null, zoom);

// const func4 = t => [
//   90 * Math.cos(t) + 20 * Math.cos(9 * t),
//   90 * Math.sin(t) + 20 * Math.sin(9 * t)
// ];
// ctx.strokeStyle = '#f0f';
// plot(func4, false, true, zoom);

// LAB 7

// const POINTS = [
//   [0.0, 70],
//   [0.5, 101],
//   [1.0, 64],
//   [1.5, 5],
//   [2.0, 34]
// ];

// const scale = {
//   x: 300,
//   y: 3
// };

// ctx.strokeStyle = '#f00';
// drawPlot2(POINTS, scale);

// ctx.strokeStyle = '#00f';
// drawPlot2(interpolate(POINTS), scale);

// LAB 8

// const POINT1 = [canvasXCenter - 350, canvasYCenter + 150];
// const POINT2 = [canvasXCenter + 350, canvasYCenter + 150];
// const POINT3 = [canvasXCenter, canvasYCenter - 350];
// const ITERATIONS = 6;

// drawFractal(POINT1, POINT2, POINT3, ITERATIONS);

// LAB 9

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const MAX_X = window.innerHeight > window.innertWidth ? window.innerWidth : window.innerHeight;
const zoom = MAX_X * 30;
const growth = 0.05;
const zoomGrowth = 1;

const funcPolar1 = angle => 1 / (Math.cos(Math.exp(1) * angle) + 2);
// const funcPolar1 = angle => 400 / (Math.cos(Math.exp(-3) * angle));
// const funcPolar1 = angle => Math.sin(Math.exp(1) * angle);
// const funcPolar1 = angle => Math.cos(Math.exp(1) * angle);

plotPolar(funcPolar1, zoom, growth, zoomGrowth, MAX_X);
