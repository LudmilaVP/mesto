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
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: '6d230dea-9c95-40e9-94e3-e33b18a30e51',
        'Content-Type': 'application/json'
    }
});

// Загрузка с сервера информации о пользователе
let userId
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData;
        userInfo.setUserInfo(userData);
        cardList.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });
// Инициализация класса по добалению данных пользователя
const userInfo = new UserInfo(
    '.profile__title',
    '.profile__description',
    '.profile__image'
);
const createElement = (data) => {
        const card = new Card({
            cardSelector: '.element-template',
            data: data,
            userId: userId,
            handleCardClick: (data) => popupImage.open(data),
            handleCardDelete: (dataId) => {
                popupDeleteCard.setSubmit(() => {
                    api.removeCard(dataId)
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
            cardList.addItemAppend(createElement(item));
        },
    },
    listElement
);

// Инициализация попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation({
    popupType: '.popup_delete_card',
});
popupDeleteCard.setEventListeners();

//Инициализация попапа профиля
const popupProfile = new PopupWithForm({
    popupType: '.popup_type_profile',
    handleFormSubmit: (data) => {
        popupProfile.renderLoading(true);

        api.setUserProfile(data)
            .then((dataItem) => {
                userInfo.setUserInfo(dataItem);
                popupProfile.close();
            })
            .catch((error) => console.log(error))
            .finally(() => popupProfile.renderLoading(false));
    },
});
popupProfile.setEventListeners();

//Инициализация попапа аватара
const popupAvatar = new PopupWithForm({
    popupType: '.popup_type_avatar',
    handleFormSubmit: (data) => {
        popupAvatar.renderLoading(true);

        api.updateUserAvatar(data)
            .then((object) => {
                userInfo.setUserInfo(object);
                popupAvatar.close();
            })
            .catch((error) => console.log(error))
            .finally(() => popupAvatar.renderLoading(false));
    },
});
popupAvatar.setEventListeners();

//Инициализация попапа добавления карточки
const popupCard = new PopupWithForm({
    popupType: '.popup_add_element',
    handleFormSubmit: (item) => {
        popupCard.renderLoading(true);

        api.addNewCard(item)
            .then((itemCard) => {
                cardList.addItem(createElement(itemCard));
                popupCard.close();
            })
            .catch((error) => console.log(error))
            .finally(() => popupCard.renderLoading(false));
    }
});

popupCard.setEventListeners();

//Инициализация попапа изображения
const popupImage = new PopupWithImage({
    popupType: '.popup_image_zoom'
});
popupImage.setEventListeners();

//слушатель попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    userNameInput.value = getUserInfo.name
    jobInput.value = getUserInfo.about
    formValidateProfile.resetValidation();
    popupProfile.open();
});

//слушатель попапа добавления карточки
buttonAdd.addEventListener('click', () => {
    formValidateCard.resetValidation();
    popupCard.open();
});

// слушатель для попапа аватара
buttonEditAvatar.addEventListener('click', () => {
    formValidateAvatar.resetValidation();
    popupAvatar.open();
});