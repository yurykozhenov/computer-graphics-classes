import module from '../../app.module';

import template from './obelisk-form.template.html';

import './figure.service';

import './random-generation';
import './moving';

class ObeliskFormController {
  constructor(figure) {
    this.figure = figure;
  }
}

module.component('cgObeliskForm', {
  template: template,
  controller: ObeliskFormController
});
