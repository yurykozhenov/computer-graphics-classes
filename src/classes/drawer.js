import { ctx } from '../canvas';

export default class Drawer {
  constructor(x0 = 0, y0 = 0) {
    this.ctx = ctx;

    this.x = x0;
    this.y = y0;
  }

  moveTo(x, y) {
    if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }

    this.ctx.moveTo(this.x, this.y);
  }

  moveRel(x, y) {
    if (typeof x === 'object') {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y;
    }

    this.ctx.moveTo(this.x, this.y);
  }

  lineTo(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);

    if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }

    this.ctx.lineTo(this.x, this.y);

    this.ctx.stroke();
  }

  dashedLineTo(x, y) {
    // TODO: Implement
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);

    if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }

    this.ctx.lineTo(this.x, this.y);

    this.ctx.stroke();
  }

  lineRel(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);

    if (typeof x === 'object') {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y;
    }

    this.ctx.lineTo(this.x, this.y);

    this.ctx.stroke();
  }

  dashedRelLineTo(x, y) {
    // TODO: Implement
  }

  changeColor(color) {
    this.ctx.strokeStyle = color;
  }
}
