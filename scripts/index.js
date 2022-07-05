import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

//переменные profile
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
//переменные elements
const cardsContainer = document.querySelector('.elements');
const listElement = cardsContainer.querySelector('.element');
//переменные popup
const popupAvatar = document.querySelector('.popup_type_avatar');
const buttonCloseAvatar = popupAvatar.querySelector('.popup__close');
const buttonCloseCard = document.querySelector('.popup__close_card')
const userNameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const formAvatar = document.querySelector('.popup__form_avatar');
const popupAddElement = document.querySelector('.popup_add_element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupFormAdd = document.querySelector('.popup__form_add');
const buttonCloseImage = document.querySelector('.popup__close_image')
const popupImageZoom = document.querySelector('.popup_image_zoom');
const formValidateAvatar = new FormValidator(formSettings, formAvatar);
const formValidateCard = new FormValidator(formSettings, popupFormAdd);

//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    popup.addEventListener('mousedown', handleOverlay);
}
//общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    popup.removeEventListener('mousedown', handleOverlay);
}

// функции попапа редактирования профиля
function openPopupProfile(e) {
    addPopupValue(e);
    formValidateAvatar.validatePopup();
    openPopup(popupAvatar);
}

function addPopupValue() {
    userNameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

function handleSavePopup(e) {
    e.preventDefault();
    username.textContent = userNameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupAvatar);
}

//функции добавления карточек на страницу
initialCards.forEach((item) => {
    renderCard(item.name, item.link);
});

function renderCard(name, link) {
    const newCard = createElement(name, link)
    listElement.prepend(newCard);
}

function createElement(name, link) {
    return new Card('#template-card', name, link).createCard();
}
//функции попапа добавления карточки
function openPopupAddElement() {
    popupFormAdd.reset()
    formValidateCard.validatePopup();
    openPopup(popupAddElement);
}

function addElement(e) {
    e.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    renderCard(name, link);
    closePopup(popupAddElement);

}

//слушатели открытия, отправки и закрытия попапа редактирования профиля
buttonEdit.addEventListener('click', openPopupProfile);
formAvatar.addEventListener('submit', handleSavePopup);
buttonCloseAvatar.addEventListener('click', () => {
    closePopup(popupAvatar);
});

//слушатели открытия, отправки и закрытия попапа добавления карточки
buttonAdd.addEventListener('click', openPopupAddElement);
popupFormAdd.addEventListener('submit', addElement);
buttonCloseCard.addEventListener('click', () => {
    closePopup(popupAddElement);
});

//слушатель попапа изображения
buttonCloseImage.addEventListener('click', () => {
    closePopup(popupImageZoom);
});

//закрытие попапа через Esc
function handleEscape(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

//закрытие попапа через оверлей
function handleOverlay(e) {
    if (e.target === e.currentTarget)
        closePopup(e.target.closest('.popup'));
}

formValidateAvatar.enableValidation();
formValidateCard.enableValidation();

export { openPopup };