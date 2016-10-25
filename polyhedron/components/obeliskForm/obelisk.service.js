import appModule from '../../app.module';

import { canvasXCenter, canvasYCenter, setCanvasSize } from '../../canvas';
import Drawer from '../../classes/drawer';
import Obelisk from '../../classes/figures/obelisk';

class ObeliskService {
  constructor() {
    this.x0 = canvasXCenter; // Початкова горизонтальна точка
    this.y0 = canvasYCenter * 1.2; // Початкова вертикальна точка

    this.a1 = 250; // Довжина нижньої основи
    this.b1 = 300; // Ширина нижньої основи

    this.a2 = 130; // Довжина верхьної основи
    this.b2 = 170; // Ширина верхньої основи

    this.h = 200; //  Висота

    this.visibleColor = '#0000ff';
    this.invisibleColor = '#bbbbff';

    this.drawer = new Drawer();

    this.obelisk = new Obelisk(
      this.x0,
      this.y0,
      this.a1,
      this.b1,
      this.a2,
      this.b2,
      this.h,
      this.visibleColor,
      this.invisibleColor
    );

    this.draw();

    window.addEventListener('resize', () => {
      setCanvasSize();
      this.redraw();
    });
  }

  changeObelisk() {
    this.obelisk.x0 = this.x0;
    this.obelisk.y0 = this.y0;
    this.obelisk.a1 = this.a1;
    this.obelisk.b1 = this.b1;
    this.obelisk.a2 = this.a2;
    this.obelisk.b2 = this.b2;
    this.obelisk.h = this.h;
    this.obelisk.visibleColor = this.visibleColor;
    this.obelisk.invisibleColor = this.invisibleColor;
  }

  draw() {
    this.changeObelisk();

    this.obelisk.render();
  }

  redraw() {
    this.drawer.clearCanvas();

    this.changeObelisk();

    this.obelisk.render();
  }
}

appModule.service('Obelisk', ObeliskService);
