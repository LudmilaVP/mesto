export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector('.popup');
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (e) => this._handleEscClose(e));
    }
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this._close();
        }
    }
    _handleOverlayClose(e) {
        if (e.target === e.currentTarget)
            this._close();
    }
    setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('mousedown', () => this._close())
        this._popupSelector.addEventListener('mousedown', (e) => this._handleOverlayClose(e))
    }
}