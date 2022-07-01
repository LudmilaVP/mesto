import { openPopup, closePopup } from './index.js';

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup_image_zoom');

class Card {
    constructor(cardSelector, name, link) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.element-item').cloneNode(true)

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
    buttonDeleteElement.addEventListener('click', this._deleteCard);

    const likeElement = this._element.querySelector('.element__like');
    likeElement.addEventListener('click', this._elementLikeActive);

    imageElement.addEventListener('click', this._openPopupImage);
}
createCard() {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector('.element__image');
    const titleElement = this._element.querySelector('.element__title');
    imageElement.src = this._link;
    imageElement.alt = this._name;
    titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element
};
}
export {Card}

