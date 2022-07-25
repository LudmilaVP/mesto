import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
//import "./index.css";
import {
    formSettings,
    buttonEdit,
    buttonAdd,
    listElement,
    popupAvatar,
    userNameInput,
    jobInput,
    formAvatar,
    popupAddElement,
    popupFormAdd,
} from '../scripts/utils/constans.js';

//Валидация форм
const formValidateAvatar = new FormValidator(formSettings, formAvatar);
formValidateAvatar.enableValidation();
const formValidateCard = new FormValidator(formSettings, popupFormAdd);
formValidateCard.enableValidation();

// Инициализация класса по добалению данных пользователя
const userInfo = new UserInfo({
    usernameSelector: '.profile__title',
    jobSelector: '.profile__description',
});
const createElement = (item) => {
        return new Card('.element-template', item, (data) => {
            popupImage.open(data);
        }).createCard();
    }
    // Инициализация создания карточек
const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            createElement(item);
            cardList.addItem(createElement(item));
        },
    },
    listElement
);
cardList.renderItems();

//Инициализация попапа профиля
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
    }
});
popupProfile.setEventListeners();

//Инициализация попапа добавления карточки
const popupCard = new PopupWithForm({
    popupSelector: '.popup_add_element',
    handleFormSubmit: (item) => {
        createElement(item);
        cardList.addItem(createElement(item));
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
    formValidateAvatar.validatePopup();
});

//слушатель попапа добавления карточки
buttonAdd.addEventListener('click', () => {
    popupCard.open();
    formValidateCard.validatePopup();
});