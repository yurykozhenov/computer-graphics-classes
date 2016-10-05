import appModule from '../../app.module';

import template from './obeliskForm.component.html';

class ObeliskFormController {
  constructor(Obelisk) {
    this.figure = Obelisk;
  }
}

appModule.component('cgObeliskForm', {
  template: template,
  controller: ObeliskFormController
});
