import module from '../../app.module';

import template from './obelisk-form.template.html';

import './obelisk.service';

import './random-generation';
import './moving';

import './nested/nested.component';
import './randomLocation/randomLocation.component';
import './elipticalMovement/elipticalMovement.component';

class ObeliskFormController {
  constructor(Obelisk) {
    this.figure = Obelisk;
  }
}

module.component('cgObeliskForm', {
  template: template,
  controller: ObeliskFormController
});
