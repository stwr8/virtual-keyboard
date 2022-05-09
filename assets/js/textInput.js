import Control from './control.js';

class TextInput extends Control {
  constructor(parent) {
    super(parent, 'form', 'form');
    this.txtInput = new Control(this.element, 'textarea', 'input');
    this.txtInput.element.readonly = true;
  }
}

const createInput = () => new TextInput(document.querySelector('.container'));

export default createInput;
