import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor({ popupType }) {
        super(popupType);
    }
    setSubmit(submit) {
        this._handleSubmit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupType.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit();
        });
    }
}