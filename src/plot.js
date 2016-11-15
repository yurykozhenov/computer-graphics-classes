import { canvas, ctx, canvasXCenter, canvasYCenter } from './canvas';

export function drawAxes(xCenter, yCenter) {
  ctx.beginPath();
  ctx.moveTo(xCenter, 0);
  ctx.lineTo(xCenter, canvas.height);
  ctx.moveTo(0, yCenter);
  ctx.lineTo(canvas.width, yCenter);
  ctx.closePath();
  ctx.stroke();
}

export function plot(func, polar, param, zoom) {
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

  drawPlot(xyArray, zoom);
}

export function drawPlot(xyArray, zoom) {
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
