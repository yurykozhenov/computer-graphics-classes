import { ctx } from '../canvas';

export default class Figure {
  constructor(x0 = 0, y0 = 0, visibleColor, invisibleColor) {
    this.ctx = ctx;

    this.x0 = x0;
    this.y0 = y0;
    this.visibleColor = visibleColor;
    this.invisibleColor = invisibleColor;
  }
}
