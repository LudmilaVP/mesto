export default class Card {
    constructor({cardSelector, data, userId, handleCardClick, handleCardDelete, handleLikeClick, handleLikeDelete}) {
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
    _deleteCard() {
        this._element.remove();
        this._element = null;
    };

    //функция активного лайка
    handleLike(data) { 
      this._likes = data.likes;
      this._element.querySelector('.element__like_counter').textContent = data.likes.length;
      if (this._checkMyLike()) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      } else {
        this._element.querySelector('.element__like').classList.remove('element__like_active');
      }
      }

      _checkMyLike() {
        return Boolean(this._likes.find((data) => data._id == this._myId));
      }
      _renderButtons() {
        const buttonDelete = this._element.querySelector('.element__delete');
        if (this._ownerId == this._myId)
        buttonDelete.classList.add('element__delete_active');
        if (this._checkMyLike()) {
          this._element.querySelector('.element__like').classList.add('element__like_active');
        }
      }
    _setEventListeners() {
      this._element.querySelector('.element__image').addEventListener("click", () =>  this._handleCardClick(this._data));

      this._element.querySelector('.element__delete').addEventListener("click", () => this._handleCardDelete(this._data._id));

      this._element.querySelector('.element__like').addEventListener("click", () => {
        if (this._checkMyLike()) {
          this._handleLikeDelete();
        } else {
          this._handleLikeClick();
        }
      });
           
    }
    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__image');
        const titleElement = this._element.querySelector('.element__title');
        const likeCounter = this._element.querySelector('.element__like_counter');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        titleElement.textContent = this._name;
        likeCounter.textContent = this._likes.length;
        this._renderButtons();
        this._setEventListeners();

        return this._element;
    };
}