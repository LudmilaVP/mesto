import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector('.popup__image');
        this._popupCaption = document.querySelector('.popup__caption');
    }
    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    }
}