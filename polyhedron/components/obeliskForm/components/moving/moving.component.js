import appModule from '../../../../app.module';

import { INTERVAL_DELAY } from '../../../../config';

import template from './moving.component.html';

class MovingController {
  constructor($interval, Obelisk) {
    this.$interval = $interval;
    this.figure = Obelisk;

    this.actionsList = [
      'up',
      'right',
      'down',
      'left',
      'upLeft',
      'upRight',
      'downLeft',
      'downRight'
    ];
  }

  startMoving(action) {
    this.moving = this.$interval(
      this.move.bind(this, action), INTERVAL_DELAY);
  }

  stopMoving() {
    this.$interval.cancel(this.moving);
    this.moving = null;
  }

  move(direction) {
    switch (direction) {
      case 'up':
        this.figure.y0 -= 1;
        break;
      case 'right':
        this.figure.x0 += 1;
        break;
      case 'down':
        this.figure.y0 += 1;
        break;
      case 'left':
        this.figure.x0 -= 1;
        break;

      case 'upLeft':
        this.figure.y0 -= 1;
        this.figure.x0 -= 1;
        break;
      case 'upRight':
        this.figure.y0 -= 1;
        this.figure.x0 += 1;
        break;
      case 'downLeft':
        this.figure.y0 += 1;
        this.figure.x0 -= 1;
        break;
      case 'downRight':
        this.figure.y0 += 1;
        this.figure.x0 += 1;
        break;
    }

    if (direction === 'upLeft' ||
        direction === 'upRight' ||
        direction === 'downLeft' ||
        direction === 'downRight') {
      this.figure.a1 = this.figure.a1 > 0 ? this.figure.a1 - 1 : 0;
      this.figure.a2 = this.figure.a2 > 0 ? this.figure.a2 - 1 : 0;
      this.figure.b1 = this.figure.b1 > 0 ? this.figure.b1 - 1 : 0;
      this.figure.b2 = this.figure.b2 > 0 ? this.figure.b2 - 1 : 0;
      this.figure.h = this.figure.h > 0 ? this.figure.h - 1 : 0;
    }

    this.figure.redraw();
  }
}

appModule.component('cgMoving', {
  template: template,
  controller: MovingController
});
