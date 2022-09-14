export default class Popup {
    constructor(popupType) {
        this._popupType = document.querySelector(popupType);
        this._buttonClose = this._popupType.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupType.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupType.classList.remove('popup_opened');
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
        this._buttonClose.addEventListener('click', () => this.close())
        this._popupType.addEventListener('mousedown', (e) => this._handleOverlayClose(e))
    }
}