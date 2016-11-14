import appModule from '../../../../app.module';

import { canvasXCenter, canvasYCenter } from '../../../../canvas';
import Drawer from '../../../../classes/drawer';

import template from './randomLocation.component.html';

const INTERVAL_DELAY = 500;
const MAX_GENERATIONS = 50;

const LOCATION_RADIUS = 100;

class RandomLocationController {
  constructor($interval, Obelisk) {
    this.$interval = $interval;
    this.figure = Obelisk;
    this.countGenerations = 0;

    this.drawer = new Drawer();

    this.figureDistanceToLeft = this.figure.x0 - this.figure.obelisk.points.bottomLeft.x;
    this.figureHeight = this.figure.h + (this.figure.obelisk.points.bottomLeft.y - this.figure.y0);
    this.figureWidth = this.figureDistanceToLeft + this.figure.b1;
  }

  startRandomLocation() {
    const fn = () => {
      if (this.countGenerations === MAX_GENERATIONS) {
        this.countGenerations = 0;
        this.stopRandomLocation();
      } else {
        this.countGenerations += 1;
        this.generateRandomLocation();
      }
    };

    this.generator = this.$interval(fn, INTERVAL_DELAY);
  }

  stopRandomLocation() {
    this.$interval.cancel(this.generator);
    this.generator = null;

    this.countGenerations = 0;
  }

  generateRandomLocation() {
    this.figure.x0 = Math.round(canvasXCenter + (Math.random() - 0.5) * LOCATION_RADIUS * 2);
    this.figure.y0 = Math.round(canvasYCenter + (Math.random() - 0.5) * LOCATION_RADIUS * 2);

    this.figure.redraw();

    this.drawBorder();
  }

  drawBorder() {
    this.drawer.changeColor('#000');
    this.drawer.strokeRect(
      canvasXCenter - LOCATION_RADIUS - this.figureDistanceToLeft,
      canvasYCenter - LOCATION_RADIUS - this.figure.h,
      LOCATION_RADIUS * 2.3 + this.figureHeight,
      LOCATION_RADIUS * 1.3 + this.figureWidth
    );
  }
}

appModule.component('cgRandomLocation', {
  template: template,
  controller: RandomLocationController
});
