import { openPopup, closePopup } from './index.js';

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup_image_zoom');
const buttonCloseImage = document.querySelector('.popup__close_image')

class Card {
    constructor(cardSelector, name, link) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link
    }
    _getTemplate() {
            const itemContent = this._cardSelector.content
            const cardElement = itemContent.cloneNode(true);
            return cardElement
        }
        //функция открытия попапа изображения
    _openPopupImage() {
            openPopup(popupImageZoom);
            popupImage.src = this._link;
            popupImage.alt = this._name;
            popupCaption.textContent = this._name;
            buttonCloseImage.addEventListener('click', () => {
                closePopup(popupImageZoom);
            });
        }
        //функция удаления карточки
    _deleteCard(e) {
        e.target.closest('.element__item').remove();
    };

    //функция активного лайка
    _elementLikeActive(e) {
        e.target.classList.toggle('element__like_active');
    };
    _setEventListeners() {
        const buttonDeleteElement = this._element.querySelector('.element__delete');
        buttonDeleteElement.addEventListener('click', (e) => this._deleteCard(e));

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