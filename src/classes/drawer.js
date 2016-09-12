export default class Drawer {
  constructor(context, x0, y0) {
    this.ctx = context;

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

  lineTo(x, y, dashed) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);

    if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }

    if (dashed) {
      // TODO: Draw dashed line
      this.ctx.lineTo(this.x, this.y);
    } else {
      this.ctx.lineTo(this.x, this.y);
    }

    this.ctx.stroke();
  }

  lineRel(x, y, dashed) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);

    if (typeof x === 'object') {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y;
    }

    if (dashed) {
      // TODO: Draw dashed line
      this.ctx.lineTo(this.x, this.y);
    } else {
      this.ctx.lineTo(this.x, this.y);
    }

    this.ctx.stroke();
  }

  changeColor(color) {
    this.ctx.strokeStyle = color;
  }
}
