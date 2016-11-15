import { ctx, canvasXCenter, canvasYCenter } from './canvas';

export function plotPolar(func, zoom, growth, zoomGrowth, maxX) {
  let x = 0;
  const coordinates = {};

  let r = 255;
  let g = 255;
  let b = 0;

  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

  ctx.beginPath();

  let draw = setInterval(() => {
    coordinates.x = func(x) * Math.cos(x) / 100;
    coordinates.y = func(x) * Math.sin(x) / 100;
    ctx.lineTo(canvasXCenter + coordinates.x * zoom, canvasYCenter - coordinates.y * zoom);
    ctx.stroke();
    x += growth;
    zoom += zoomGrowth;

    if (x >= maxX) {
      clearInterval(draw);
      draw = null;
    }

  }, 1);

  let changeColor = setInterval(() => {
    if (g >= 255 && b <= 255) {
      r -= 1;
      b += 1;
    } else if (b >= 255 && r <= 255) {
      g -= 1;
      r += 1;
    } else if (r >= 255 && g <= 255) {
      b -= 1;
      g += 1;
    }

    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    if (!draw) {
      ctx.stroke();
    }
  }, 10);
}
