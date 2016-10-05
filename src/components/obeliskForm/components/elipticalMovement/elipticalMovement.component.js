import appModule from '../../../../app.module';

import { INTERVAL_DELAY } from '../../../../config';
import { canvasXCenter, canvasYCenter } from '../../../../canvas';

import template from './elipticalMovement.component.html';

const ELIPSIS_WIDTH = 200;
const ELIPSIS_HEIGHT = 100;

class ElipticalMovementController {
  constructor($interval, Obelisk) {
    this.$interval = $interval;
    this.figure = Obelisk;
  }

  startElipticalMovement() {
    // Get initial values
    this.a1 = this.figure.a1;
    this.a2 = this.figure.a2;
    this.b1 = this.figure.b1;
    this.b2 = this.figure.b2;
    this.h = this.figure.h;

    this.degree = 0;

    const fn = () => {
      this.moveElipticaly();
    };

    this.elipticalMovement = this.$interval(fn, INTERVAL_DELAY);
  }

  stopElipticalMovement() {
    this.$interval.cancel(this.elipticalMovement);
    this.elipticalMovement = null;

    // Return initial values
    this.figure.a1 = this.a1;
    this.figure.a2 = this.a2;
    this.figure.b1 = this.b1;
    this.figure.b2 = this.b2;
    this.figure.h = this.h;
  }

  moveElipticaly() {
    this.degree = this.degree >= 360 ? 0 : this.degree + 1;
    this.rad = this.degToRad(this.degree);

    this.figure.x0 = canvasXCenter + Math.floor(ELIPSIS_WIDTH * Math.cos(this.rad));
    this.figure.y0 = canvasYCenter - Math.floor(ELIPSIS_HEIGHT * Math.sin(this.rad));

    const ratio = 75 * Math.cos(3 * Math.PI / 2 + this.rad);

    this.figure.a1 = this.negativeToZero(this.a1 - ratio);
    this.figure.a2 = this.negativeToZero(this.a2 - ratio);

    this.figure.b1 = this.negativeToZero(this.b1 - ratio);
    this.figure.b2 = this.negativeToZero(this.b2 - ratio);

    this.figure.h = this.negativeToZero(this.h - ratio);

    this.figure.redraw();
  }

  degToRad(deg) {
    return deg * Math.PI / 180;
  }

  negativeToZero(num) {
    return num > 0 ? num : 0;
  }
}

appModule.component('cgElipticalMovement', {
  template: template,
  controller: ElipticalMovementController
});
