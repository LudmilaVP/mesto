import Api from '../scripts/components/Api.js'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import "./index.css";
import {
    formSettings,
    buttonEdit,
    buttonAdd,
    buttonEditAvatar,
    listElement,
    userNameInput,
    jobInput,
    formProfile,
    popupFormAdd,
    formAvatar
} from '../scripts/utils/constans.js';

//Валидация форм
const formValidateProfile = new FormValidator(formSettings, formProfile);
formValidateProfile.enableValidation();
const formValidateCard = new FormValidator(formSettings, popupFormAdd);
formValidateCard.enableValidation();
const formValidateAvatar = new FormValidator(formSettings, formAvatar);
formValidateAvatar.enableValidation();

// Инициализация класса API
const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort-46",
    token: "b18ec7fb-817a-4a5f-9b54-853093aa3e48",
  });

  // Загрузка с сервера информации о пользователе
let userId 
Promise.all([api.getUserProfile(), api.getInitialCards()])
.then(([initialCards, userData]) => {
    userInfo.setUserInfo(initialCards);
    userId = initialCards;
    cardList.renderItems(userData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
// Инициализация класса по добалению данных пользователя
const userInfo = new UserInfo({
    usernameSelector: '.profile__title',
    jobSelector: '.profile__description',
    avatarSelector: '.profile__image'
});
const createElement = (data) => {
        const card = new Card({
          cardSelector:'.element-template', 
          data: data,
          userId: userId,
          handleCardClick: (data) => popupImage.open(data),
          handleCardDelete: (item) => {
            popupDeleteCard.setSubmit(() => {
              api.deleteCard(item)
                .then(() => {
                  card.deleteCard();
                  popupDeleteCard.close();
                })
                .catch(() => {
                  console.log('Ошибка удаления');
                });
            });
            popupDeleteCard.open();
          },
          handleLikeClick: () => {
            api.addLikeCard(card.getCurrentCard()._id)
              .then((item) => {
                card.handleLike(item);
              })
              .catch(() => console.log('Ошибка постановки лайка'));
          },
          handleLikeDelete: () => {
            api.deleteLikeCard(card.getCurrentCard()._id)
              .then((item) => {
                card.handleLike(item);
              })
              .catch(() => console.log('Ошибка снятия лайка'));
          },
        })
        return card.createCard();
    }
    // Инициализация создания карточек
const cardList = new Section({
        renderer: (item) => {
            createElement(item);
            cardList.addItem(createElement(item));
        },
    },
    listElement
);

// Инициализация попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation({
    popupSelector: '.popup_delete_card',
  });
  popupDeleteCard.setEventListeners();

//Инициализация попапа профиля
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (data) => {
         popupProfile.setUserUX(true);

    api.setUserProfile(data)
      .then((dataItem) => {
        userInfo.setUserInfo(dataItem);
        popupProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupProfile.setUserUX(false));
  },
});
popupProfile.setEventListeners();

//Инициализация попапа аватара
const popupAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (data) => {
        popupAvatar.setUserUX(true);

    api.updateUserAvatar(data)
      .then((object) => {
        userInfo.setUserInfo(object);
        popupAvatar.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupAvatar.setUserUX(false));
  },
});
popupAvatar.setEventListeners();

//Инициализация попапа добавления карточки
const popupCard = new PopupWithForm({
    popupSelector: '.popup_add_element',
    handleFormSubmit: (item) => {
        popupCard.setUserUX(true);
        
    api.addNewCard(item)
      .then((itemCard) => {
        cardList.addItem(createElement(itemCard));
        popupCard.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupCard.setUserUX(false));
    }
});

popupCard.setEventListeners();

//Инициализация попапа изображения
const popupImage = new PopupWithImage({
    popupSelector: '.popup_image_zoom'
});
popupImage.setEventListeners();

//слушатель попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    userNameInput.value = getUserInfo.username
    jobInput.value = getUserInfo.job
    popupProfile.open();
    formValidateProfile.validatePopup();
});

//слушатель попапа добавления карточки
buttonAdd.addEventListener('click', () => {
    popupCard.open();
    formValidateCard.validatePopup();
});

// слушатель для попапа аватара
buttonEditAvatar.addEventListener("click", () => {
    popupAvatar.open();
    formValidateAvatar.validatePopup();
  });