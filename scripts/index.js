import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//переменные profile
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
//переменные elements
const sectionElements = document.querySelector('.elements');
const listElement = sectionElements.querySelector('.element');
//переменные popup
const popupMajor = document.querySelector('.popup')
const buttonClose = document.querySelector('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const buttonCloseImage = document.querySelector('.popup__close_image')
const buttonCloseCard = document.querySelector('.popup__close_card')
const userNameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const formAvatar = document.querySelector('.popup__form_avatar');
const popupAddElement = document.querySelector('.popup_add_element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupFormAdd = document.querySelector('.popup__form_add');
const popupForm = popupMajor.querySelector('.popup__form');
const inputList = popupForm.querySelectorAll('.popup__input');
const buttonElement = popupForm.querySelector('.popup__button');
const buttonElementCard = popupFormAdd.querySelector('.popup__button');

//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);
}
//общая функция закрытия попапа
function closePopup(popupMajor) {
    popupMajor.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', handleOverlay);
}

// функции попапа редактирования профиля
function openPopupProfile(e) {
    addPopupValue(e);
    openPopup(popupAvatar);
    enableValidation(formSettings, popupAvatar);
}

function addPopupValue() {
    userNameInput.value = username.textContent;
    jobInput.value = job.textContent;
    const formValidateAvatar = new FormValidator (formSettings, formAvatar);
    formValidateAvatar.validatePopup([userNameInput, jobInput], buttonElement)
}

function handleSavePopup(e) {
    e.preventDefault();
    username.textContent = userNameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupAvatar);
}

const enableValidation = (formSettings, popup) => {
    const formValidator = new FormValidator(formSettings, popup);
    formValidator.enableValidation();
 }

//функции добавления карточек на страницу
    initialCards.forEach(function (item) {
        renderCard(item.name, item.link);
    });

function renderCard(name, link) {
    const newCard = new Card('.element-template', name, link);
    listElement.prepend(newCard.createCard());
}

//функции попапа добавления карточки
function openPopupAddElement() {
    popupFormAdd.reset()
    const formValidateCard = new FormValidator (formSettings, popupFormAdd);
    formValidateCard.validatePopup([titleInput, linkInput], buttonElementCard);
    openPopup(popupAddElement);
    enableValidation(formSettings, popupAddElement);
}

function addElement(e) {
    e.preventDefault();
    const name = titleInput.value;
    const link = linkInput.value;
    renderCard({ name, link });
    closePopup(popupAddElement);

}

//слушатели открытия, отправки и закрытия попапа редактирования профиля
buttonEdit.addEventListener('click', openPopupProfile);
formAvatar.addEventListener('submit', handleSavePopup);
buttonClose.addEventListener('click', () => {
    closePopup(popupAvatar);
    username.textContent = '';
    job.textContent = '';
});

//слушатели открытия, отправки и закрытия попапа добавления карточки
buttonAdd.addEventListener('click', openPopupAddElement);
popupFormAdd.addEventListener('submit', addElement);
buttonCloseCard.addEventListener('click', () => {
    closePopup(popupAddElement);
    titleInput.value = '';
    linkInput.value = '';
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
    const openedPopup = document.querySelector('.popup_opened');
    if (e.target === openedPopup)
        closePopup(openedPopup);
}

const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export {openPopup, closePopup};