class Control {
  // append an element to specific node
  constructor(parent, tag, name) {
    this.element = document.createElement(tag);
    this.element.className = name;
    parent.append(this.element);
  }

  // remove and element from DOM
  destroy() {
    this.node.remove();
  }
}

export default Control;
