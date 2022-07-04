import { openPopup } from './index.js';

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

class Card {
    constructor(cardSelector, name, link) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link
        this._popupImageZoom = document.querySelector('.popup_image_zoom');
    }
    _getTemplate() {
            const itemContent = document.querySelector(this._cardSelector).content
            const cardElement = itemContent.querySelector('.element__item').cloneNode(true);
            return cardElement
        }
        //функция открытия попапа изображения
    _openPopupImage() {
        openPopup(this._popupImageZoom);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
    }

    //функция удаления карточки
    _deleteCard() {
        this._element.remove(); 
    };

    //функция активного лайка
    _elementLikeActive(e) {
        e.target.classList.toggle('element__like_active');
    };
    _setEventListeners() {
        const buttonDeleteElement = this._element.querySelector('.element__delete');
        buttonDeleteElement.addEventListener('click', () => this._deleteCard());

        const likeElement = this._element.querySelector('.element__like');
        likeElement.addEventListener('click', (e) => this._elementLikeActive(e));

        this._imageElement.addEventListener('click', () => this._openPopupImage());
    }
    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__image');
        const titleElement = this._element.querySelector('.element__title');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        titleElement.textContent = this._name;
        this._setEventListeners();

        return this._element
    };
}
export { Card }