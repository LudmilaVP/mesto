import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupType }) {
        super(popupType);
        this._popupImage = this._popupType.querySelector('.popup__image');
        this._popupCaption = this._popupType.querySelector('.popup__caption');
    }
    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    }
}