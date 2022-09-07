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
        this._popupSelector.addEventListener('submit', (e) => {
          e.preventDefault();
          this._handleSubmit();
        });
      }
}
