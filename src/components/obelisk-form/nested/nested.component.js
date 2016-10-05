import module from '../../../app.module';

import template from './nested.component.html';

const NESTED_RATIO = 1.3;
const NESTED_MIN_SIZE = 5;

class NestedController {
  constructor($interval, Obelisk) {
    this.$interval = $interval;
    this.figure = Obelisk;
  }

  drawNested() {
    // this.figure.x0 = Math.round(maxWidth + (Math.random() - 0.5) * 200);
    // this.figure.y0 = Math.round(maxHeight + (Math.random() - 0.5) * 200);
    while (this.figure.a1 > NESTED_MIN_SIZE &&
           this.figure.b1 > NESTED_MIN_SIZE &&
           this.figure.a2 > NESTED_MIN_SIZE &&
           this.figure.b2 > NESTED_MIN_SIZE &&
           this.figure.h > NESTED_MIN_SIZE) {
      this.figure.a1 = Math.round(this.figure.a1 / NESTED_RATIO);
      this.figure.b1 = Math.round(this.figure.b1 / NESTED_RATIO);

      this.figure.a2 = Math.round(this.figure.a2 / NESTED_RATIO);
      this.figure.b2 = Math.round(this.figure.b2 / NESTED_RATIO);

      this.figure.h = Math.round(this.figure.h / NESTED_RATIO);

      this.figure.draw();
    }
  }
}

module.component('cgNested', {
  template: template,
  controller: NestedController
});
