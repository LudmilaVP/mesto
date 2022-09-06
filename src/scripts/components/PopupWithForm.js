import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._popupSelector.querySelector('button[type="submit"]');
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
        this._form.reset();
        super.close();
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    setUserUX(loading) {
        this._button.textContent = loading ? 'Сохранение...' : this._buttonDefaultText;
      }
}