import Figure from '../figure';

import Drawer from '../drawer';
// import Point from '../point';

export default class Cube extends Figure {
  constructor(x0, y0, size, visibleColor, invisibleColor) {
    super(x0, y0, visibleColor, invisibleColor);

    this.size = size;
  }

  render() {
    const drawer = new Drawer(this.x0, this.y0);

    const halfSize = this.size / 2;

    drawer.changeColor(this.invisibleColor);

    drawer.moveTo(this.x0, this.y0 + this.size);
    drawer.lineRel(halfSize, -halfSize);
    drawer.lineRel(0, -this.size);
    drawer.moveRel(0, this.size);
    drawer.lineRel(this.size, 0);

    drawer.changeColor(this.visibleColor);

    drawer.moveTo(this.x0, this.y0);
    drawer.lineRel(this.size, 0);
    drawer.lineRel(0, this.size);
    drawer.lineRel(-this.size, 0);
    drawer.lineRel(0, -this.size);
    drawer.lineRel(halfSize, -halfSize);
    drawer.lineRel(this.size, 0);
    drawer.lineRel(-halfSize, halfSize);
    drawer.moveRel(0, this.size);
    drawer.lineRel(halfSize, -halfSize);
    drawer.lineRel(0, -this.size);
  }
}
