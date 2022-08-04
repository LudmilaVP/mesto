export default class Api{
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }
    //Загрузка информации о пользователе с сервера
    getUserProfile() {
        return fetch(`${this._address}/users/me`, {
          method: 'GET',
          headers: {
            authorization: this._token
          }
        })
        .then(this._getResponse)
      }
      //Загрузка карточек с сервера
      getInitialCards() {
        return fetch(`${this._address}/cards`, {
          method: 'GET',
          headers: {
            authorization: this._token
          }
        })
        .then(this._getResponse)
      }
      //Редактирование профиля
      setUserProfile(data) {
        return fetch(`${this._address}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: data.username,
            about: data.job
          })
        })
        .then(this._getResponse)
      }
      //Добавление новой карточки
      addNewCard(data) {
        return fetch(`${this._address}/cards`, {
          method: 'POST',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(this._getResponse)
      }
      //Удаление карточки
      deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
          method: 'DELETE',
          headers: {
            authorization: this._token
          }
        })
        .then(this._getResponse)
      }
      //Постановка и снятие лайка
      addLikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
          method: 'PUT',
          headers: {
            authorization: this._token
          }
        })
        .then(this._getResponse)
      }
     
      deleteLikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
          method: 'DELETE',
          headers: {
            authorization: this._token
          }
        })
        .then(this._getResponse)
      }
      //Обновление аватара пользователя
      updateUserAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: data.avatar,
          })
        })
        .then(this._getResponse)
      }
}