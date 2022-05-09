import keyData from './keydata.js';
import Control from './control.js';

class KeyBoard extends Control {
    constructor(parent) {
        super(parent, 'div', 'keyboard');
        keyData.forEach((e) => {
            this.row = new Control(this.element, 'div', 'row');
            for (let i = 0; i < e.length; i += 1) {
                this.btn = new Control(this.row.element, 'button', `${e[i].class}`);
                this.btn.element.textContent = `${e[i].key.en}`;
            }
        });
    }
}

const createKeyboard = () => new KeyBoard(document.querySelector('.container'));

export default createKeyboard;