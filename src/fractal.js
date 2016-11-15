import { ctx } from './canvas';

export function fractal(point1, point2, point3, iterations) {
  if (iterations > 0) {

    // средняя треть отрезка
    const p4 = [(point2[0] + 2 * point1[0]) / 3, (point2[1] + 2 * point1[1]) / 3];
    const p5 = [(2 * point2[0] + point1[0]) / 3, (point1[1] + 2 * point2[1]) / 3];

    // координаты вершины угла
    const ps = [(point2[0] + point1[0]) / 2, (point2[1] + point1[1]) / 2];
    const pn = [(4 * ps[0] - point3[0]) / 3, (4 * ps[1] - point3[1]) / 3];

    // рисуем его
    if (iterations === 1) {
      ctx.beginPath();
      ctx.moveTo(...p4);
      ctx.lineTo(...pn);
      ctx.lineTo(...p5);
      ctx.lineTo(...p4);
      ctx.stroke();
    }

    // рекурсивно вызываем функцию нужное число раз
    fractal(p4, pn, p5, iterations - 1);
    fractal(pn, p5, p4, iterations - 1);
    fractal(point1, p4, [(2 * point1[0] + point3[0]) / 3, (2 * point1[1] + point3[1]) / 3], iterations - 1);
    fractal(p5, point2, [(2 * point2[0] + point3[0]) / 3, (2 * point2[1] + point3[1]) / 3], iterations - 1);
  }

  return iterations;
}

export function drawFractal(point1, point2, point3, iterations) {
  // ctx.beginPath();
  // ctx.moveTo(...point1);
  // ctx.lineTo(...point2);
  // ctx.lineTo(...point3);
  // ctx.lineTo(...point1);
  // ctx.stroke();

  fractal(point1, point2, point3, iterations);
  fractal(point2, point3, point1, iterations);
  fractal(point3, point1, point2, iterations);
}
