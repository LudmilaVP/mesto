import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor({ popupType, handleFormSubmit }) {
        super(popupType);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupType.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._popupType.querySelector('button[type="submit"]');
        this._buttonDefaultText = this._button.textContent;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    close() {
        super.close();
        this._form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupType.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    renderLoading(loading) {
        this._button.textContent = loading ? 'Сохранение...' : this._buttonDefaultText;
    }
}