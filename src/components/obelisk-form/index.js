import module from '../../app.module';

import template from './obelisk-form.html';

import drawObelisk from '../../functions/draw-obelisk';

class ObeliskForm {
  constructor() {
    this.x0 = 300; // Початкова горизонтальна точка
    this.y0 = 400; // Початкова вертикальна точка
    
    this.a1 = 250; // Ширина нижньої основи
    this.b1 = 300; // Довжина нижньої основи

    this.a2 = 130; // Ширина верхьної основи
    this.b2 = 170; // Довжина верхньої основи

    this.h = 300; //  Верхня основа трапеції

    this.visibleColor = '#0000ff';
    this.invisibleColor = '#bbbbff';
  }

  draw() {
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

module.component('cgObeliskForm', {
  template: template,
  controller: ObeliskForm
});
