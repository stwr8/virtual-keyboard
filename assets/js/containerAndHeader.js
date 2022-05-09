import Control from './control.js';

class ContainerAndHeader extends Control {
    constructor(parent) {
        super(parent, 'div', 'container');
        this.titlle = new Control(this.element, 'h1', 'tittle');
        this.titlle.element.innerHTML = 'Virtual Keyboard For Windows';
        this.changeLang = new Control(this.element, 'p', 'description');
        this.changeLang.element.innerHTML = 'To change the language press the <div class="keyHelp">Alt</div> + <div class="keyHelp">Shift</div> combination';
    }
}

const createContainerAndHeader = () => new ContainerAndHeader(document.body);

export default createContainerAndHeader;