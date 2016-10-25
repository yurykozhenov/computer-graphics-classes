import appModule from '../../../../app.module';

import { canvasXCenter, canvasYCenter } from '../../../../canvas';

import template from './randomGeneration.component.html';

const INTERVAL_DELAY = 500;
const MAX_GENERATIONS = 50;

class RandomGenerationController {
  constructor($interval, Obelisk) {
    this.$interval = $interval;
    this.figure = Obelisk;
    this.countGenerations = 0;
  }

  startRandomGeneration() {
    const fn = () => {
      if (this.countGenerations === MAX_GENERATIONS) {
        this.countGenerations = 0;
        this.stopRandomGeneration();
      } else {
        this.countGenerations += 1;
        this.generateRandom();
      }
    };

    this.randomGeneration = this.$interval(fn, INTERVAL_DELAY);
  }

  stopRandomGeneration() {
    this.$interval.cancel(this.randomGeneration);
    this.randomGeneration = null;

    this.countGenerations = 0;
  }

  generateRandom() {
    this.figure.x0 = Math.round(canvasXCenter + (Math.random() - 0.5) * 200);
    this.figure.y0 = Math.round(canvasYCenter + (Math.random() - 0.5) * 200);

    this.figure.a1 = Math.round(Math.random() * canvasXCenter);
    this.figure.b1 = Math.round(Math.random() * canvasYCenter);

    this.figure.a2 = Math.round(Math.random() * canvasXCenter);
    this.figure.b2 = Math.round(Math.random() * canvasYCenter);

    this.figure.h = Math.round(Math.random() * canvasYCenter);

    let r = Math.round(Math.random() * 255).toString(16);
    let g = Math.round(Math.random() * 255).toString(16);
    let b = Math.round(Math.random() * 255).toString(16);
    this.figure.visibleColor = `#${r}${g}${b}`;

    r = Math.round(Math.random() * 255).toString(16);
    g = Math.round(Math.random() * 255).toString(16);
    b = Math.round(Math.random() * 255).toString(16);
    this.figure.invisibleColor = `#${r}${g}${b}`;

    this.figure.redraw();
  }
}

appModule.component('cgRandomGeneration', {
  template: template,
  controller: RandomGenerationController
});
