const Drawer = require('../classes/drawer');
const Point = require('../classes/point');

module.exports = function drawCube(x0, y0, a1, b1, a2, b2, h, visibleColor, invisibleColor) {
  const drawer = new Drawer(window.ctx, x0, y0);

  const bottomUp = new Point(x0, y0);
  const bottomRight = new Point(bottomUp.x + a1, bottomUp.y);
  const bottomLeft = new Point(bottomUp.x - a1 / 2, bottomUp.y + b1 / 2);
  const bottomDown = new Point(bottomLeft.x + a1, bottomLeft.y);

  const topUp = new Point(bottomUp.x, bottomUp.y - h);
  const topRight = new Point(topUp.x + a2, topUp.y);
  const topLeft = new Point(topUp.x - a2 / 2, topUp.y + b2 / 2);
  const topDown = new Point(topLeft.x + a2, topLeft.y);

  // const pyramidTopLeft = new Point(bottomUp.x, bottomUp.y - h);
  // const pyramidTopRight = new Point(pyramidTopLeft.x +  (bottomDown.x - pyramidTopLeft.x), pyramidTopLeft.y);

  drawer.changeColor(invisibleColor);

  // Draw axes

  drawer.moveTo(bottomUp);
  drawer.lineTo(topUp, null, true);

  drawer.moveTo(bottomUp);
  drawer.lineTo(bottomRight, null, true);

  drawer.moveTo(bottomUp);
  drawer.lineTo(bottomLeft, null, true);

  // Draw pyramid invisibles

  // drawer.moveTo(bottomUp);
  // drawer.lineTo(pyramidTopLeft);

  // drawer.moveTo(bottomLeft);
  // drawer.lineTo(pyramidTopLeft);

  // drawer.moveTo(bottomDown);
  // drawer.lineTo(pyramidTopRight);

  // drawer.moveTo(bottomRight);
  // drawer.lineTo(pyramidTopRight);

  // drawer.moveTo(pyramidTopLeft);
  // drawer.lineTo(pyramidTopRight);

  // Draw obelisk

  drawer.changeColor(visibleColor);

  drawer.moveTo(bottomLeft);
  drawer.lineTo(bottomDown);
  drawer.lineTo(bottomRight);

  drawer.moveTo(bottomDown);
  drawer.lineTo(topDown);

  drawer.moveTo(bottomLeft);
  drawer.lineTo(topLeft);

  drawer.moveTo(bottomRight);
  drawer.lineTo(topRight);

  drawer.moveTo(topUp);
  drawer.lineTo(topRight);
  drawer.lineTo(topDown);
  drawer.lineTo(topLeft);
  drawer.lineTo(topUp);
};
