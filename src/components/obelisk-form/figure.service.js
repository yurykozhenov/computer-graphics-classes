import module from '../../app.module';
import { canvas, ctx, setCanvasSize } from '../../canvas';

import drawObelisk from '../../functions/draw-obelisk';

class FigureService {
  constructor() {
    this.x0 = 300; // Початкова горизонтальна точка
    this.y0 = 400; // Початкова вертикальна точка

    this.a1 = 250; // Довжина нижньої основи
    this.b1 = 300; // Ширина нижньої основи

    this.a2 = 130; // Довжина верхьної основи
    this.b2 = 170; // Ширина верхньої основи

    this.h = 300; //  Висота

    this.visibleColor = '#0000ff';
    this.invisibleColor = '#bbbbff';

    this.draw();

    window.addEventListener('resize', () => {
      setCanvasSize();
      this.redraw();
    });
  }

  draw() {
    drawObelisk(
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
  }

  redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawObelisk(
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
  }
}

module.service('figure', FigureService);
