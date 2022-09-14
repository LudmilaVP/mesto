export default class Section {
    constructor({ renderer }, containerType) {
        this._renderer = renderer;
        this._containerType = containerType;
    }
    renderItems(items) {
        items.forEach((item) => this._renderer(item));
    }
    addItem(item) {
        this._containerType.prepend(item);
    }
    addItemAppend(item) {
        this._containerType.append(item);
    }
}