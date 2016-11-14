import Figure from '../figure';

import Drawer from '../drawer';
import Point from '../point';

export default class Obelisk extends Figure {
  constructor(x0, y0, a1, b1, a2, b2, h, visibleColor, invisibleColor) {
    super(x0, y0, visibleColor, invisibleColor);

    this.a1 = a1;
    this.b1 = b1;
    this.a2 = a2;
    this.b2 = b2;
    this.h = h;

    this.points = {};

    this.calculatePoints();
  }

  calculatePoints() {
    this.points.bottomUp = new Point(this.x0, this.y0);
    this.points.bottomRight = new Point(this.points.bottomUp.x + this.a1, this.points.bottomUp.y);
    this.points.bottomLeft = new Point(this.points.bottomUp.x - this.a1 / 2, this.points.bottomUp.y + this.b1 / 2);
    this.points.bottomDown = new Point(this.points.bottomLeft.x + this.a1, this.points.bottomLeft.y);

    this.points.topUp = new Point(this.points.bottomUp.x, this.points.bottomUp.y - this.h);
    this.points.topRight = new Point(this.points.topUp.x + this.a2, this.points.topUp.y);
    this.points.topLeft = new Point(this.points.topUp.x - this.a2 / 2, this.points.topUp.y + this.b2 / 2);
    this.points.topDown = new Point(this.points.topLeft.x + this.a2, this.points.topLeft.y);
  }

  render() {
    this.calculatePoints();

    const drawer = new Drawer(this.x0, this.y0);

    drawer.changeColor(this.invisibleColor);

    // Draw axes

    drawer.moveTo(this.points.bottomUp);
    drawer.dashedLineTo(this.points.topUp);

    drawer.moveTo(this.points.bottomUp);
    drawer.dashedLineTo(this.points.bottomRight);

    drawer.moveTo(this.points.bottomUp);
    drawer.dashedLineTo(this.points.bottomLeft);

    // Draw obelisk

    drawer.changeColor(this.visibleColor);

    drawer.moveTo(this.points.bottomLeft);
    drawer.lineTo(this.points.bottomDown);
    drawer.lineTo(this.points.bottomRight);

    drawer.moveTo(this.points.bottomDown);
    drawer.lineTo(this.points.topDown);

    drawer.moveTo(this.points.bottomLeft);
    drawer.lineTo(this.points.topLeft);

    drawer.moveTo(this.points.bottomRight);
    drawer.lineTo(this.points.topRight);

    drawer.moveTo(this.points.topUp);
    drawer.lineTo(this.points.topRight);
    drawer.lineTo(this.points.topDown);
    drawer.lineTo(this.points.topLeft);
    drawer.lineTo(this.points.topUp);
  }
}
