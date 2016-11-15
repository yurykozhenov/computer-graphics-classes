import math from 'mathjs';

import { ctx, canvasXCenter, canvasYCenter } from './canvas';

export function interpolate(points) {
  const a = _.first(points)[0];
  const b = _.last(points)[0];
  // const h = (b - a) / 4;
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

export function drawPlot2(xyArray, scale) {
  let noDraw = false;

  ctx.beginPath();
  ctx.moveTo(canvasXCenter + xyArray[0][0] * scale.x, canvasYCenter - xyArray[0][1] * scale.y);

  xyArray.forEach(coordinates => {
    // console.log(coordinates);
    if (Number.isFinite(coordinates[0]) && Number.isFinite(coordinates[1])) {
      if (noDraw) {
        ctx.stroke();
        ctx.beginPath();
        noDraw = false;
      } else {
        ctx.lineTo(canvasXCenter + coordinates[0] * scale.x, canvasYCenter - coordinates[1] * scale.y);
      }
    } else {
      noDraw = true;
    }
  });

  ctx.stroke();
}
