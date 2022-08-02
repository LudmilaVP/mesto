import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
      }
      setSubmit(submit) {
        this._handleSubmit = submit;
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._handleSubmit();
        });
      }
}
export { PopupWithConfirmation };