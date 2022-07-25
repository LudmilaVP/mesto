export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._buttonClose = this._popupSelector.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(e) {
        if (e.target === e.currentTarget)
            this.close();
    }
    setEventListeners() {
        this._buttonClose.addEventListener('mousedown', () => this.close())
        this._popupSelector.addEventListener('mousedown', (e) => this._handleOverlayClose(e))
    }
}