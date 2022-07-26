export default class Card {
    constructor(cardSelector, data, handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._data = data;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const itemContent = document.querySelector(this._cardSelector).content
        const cardElement = itemContent.querySelector('.element__item').cloneNode(true);
        return cardElement
    }

    //функция удаления карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
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

        this._imageElement.addEventListener('click', () => this._handleCardClick(this._data));
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