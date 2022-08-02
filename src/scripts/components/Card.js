export default class Card {
    constructor(cardSelector, data, handleCardClick, handleCardDelete, handleCardLike, userId) {
        this._cardSelector = cardSelector;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
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
    handleLikeActive(likes) { 
        this._likes = likes;
        this._likeElement.classList.toggle('element__like_active');
        this._element.querySelector('.element__like-counter').textContent =
        this._likes.length;
      }

    _setEventListeners() {
        const buttonDeleteElement = this._element.querySelector('.element__delete');
        const likeElement = this._element.querySelector('.element__like');
        likeElement.addEventListener('click', () => {
            this._handleCardLike(this);
        });
        if (this._owner._id === this._userId) {
            buttonDeleteElement.addEventListener('click', () => {
              this._handleCardDelete(this);
            });
          } else {
            buttonDeleteElement.remove();
          }
          buttonDeleteElement.addEventListener('click', () => {
            this._handleCardDelete(this);
          });
          this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._data);
          });
    }
    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__image');
        const titleElement = this._element.querySelector('.element__title');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        titleElement.textContent = this._name;
    if (this._likes.some((item) => { return this._userId === item._id; })) {
        handleLikeActive(likes);
    }
        this._setEventListeners();

        return this._element
    };
}