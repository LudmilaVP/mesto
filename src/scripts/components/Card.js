export default class Card {
    constructor({ cardSelector, data, userId, handleCardClick, handleCardDelete, handleLikeClick, handleLikeDelete }) {
        this._cardSelector = cardSelector;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._myId = userId._id;
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeClick = handleLikeClick;
        this._handleLikeDelete = handleLikeDelete;
    }
    _getTemplate() {
        const itemContent = document.querySelector(this._cardSelector).content
        const cardElement = itemContent.querySelector('.element__item').cloneNode(true);
        return cardElement
    }

    getCurrentCard() {
        return this._data;
    }

    //функция удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    };

    //функция активного лайка
    handleLike(data) {
        this._likes = data.likes;
        this._likeCounter.textContent = data.likes.length;
        if (this._checkMyLike()) {
            this._elementLike.classList.add('element__like_active');
        } else {
            this._elementLike.classList.remove('element__like_active');
        }
    }

    _checkMyLike() {
        return Boolean(this._likes.find((data) => data._id == this._myId));
    }
    _renderButtons() {
        if (this._ownerId == this._myId)
            this._buttonDelete.classList.add('element__delete_active');
        if (this._checkMyLike()) {
            this._elementLike.classList.add('element__like_active');
        }
    }
    _setEventListeners() {
        this._imageElement.addEventListener("click", () => this._handleCardClick(this._data));

        this._buttonDelete.addEventListener("click", () => this._handleCardDelete(this._data._id));

        this._elementLike.addEventListener("click", () => {
            if (this._checkMyLike()) {
                this._handleLikeDelete();
            } else {
                this._handleLikeClick();
            }
        });

    }
    createCard() {
        this._element = this._getTemplate();
        this._likeCounter = this._element.querySelector('.element__like_counter');
        this._elementLike = this._element.querySelector('.element__like');
        this._imageElement = this._element.querySelector('.element__image');
        this._buttonDelete = this._element.querySelector('.element__delete');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._likeCounter.textContent = this._likes.length;
        this._renderButtons();
        this._setEventListeners();

        return this._element;
    };
}