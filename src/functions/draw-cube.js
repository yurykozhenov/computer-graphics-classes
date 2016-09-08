const Drawer = require('../classes/drawer.js');

module.exports = function drawCube(x0, y0, size) {
  const drawer = new Drawer(window.ctx, x0, y0);

  const visibleColor = '#00f';
  const invisibleColor = '#bbf';

  const halfSize = size / 2;

  drawer.changeColor(invisibleColor);

  drawer.moveTo(x0, y0 + size);
  drawer.lineRel(halfSize, -halfSize);
  drawer.lineRel(0, -size);
  drawer.moveRel(0, size);
  drawer.lineRel(size, 0);

  drawer.changeColor(visibleColor);

  drawer.moveTo(x0, y0);
  drawer.lineRel(size, 0);
  drawer.lineRel(0, size);
  drawer.lineRel(-size, 0);
  drawer.lineRel(0, -size);
  drawer.lineRel(halfSize, -halfSize);
  drawer.lineRel(size, 0);
  drawer.lineRel(-halfSize, halfSize);
  drawer.moveRel(0, size);
  drawer.lineRel(halfSize, -halfSize);
  drawer.lineRel(0, -size);
};
