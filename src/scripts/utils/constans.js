const arkhys = new URL('../../images/arkhys.jpg', import.meta.url);
const chelyabinskoblast = new URL('../../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../../images/kamchatka.jpg', import.meta.url);
const kholmogorskyrayon = new URL('../../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../../images/baikal.jpg', import.meta.url);

export const initialCards = [{
    name: 'Архыз',
    link: arkhys
},
{
    name: 'Челябинская область',
    link: chelyabinskoblast
},
{
    name: 'Иваново',
    link: ivanovo
},
{
    name: 'Камчатка',
    link: kamchatka
},
{
    name: 'Холмогорский район',
    link: kholmogorskyrayon
},
{
    name: 'Байкал',
    link: baikal
}
];

export const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const listElement = document.querySelector('.element');
export const userNameInput = document.querySelector('.popup__input_type_username');
export const jobInput = document.querySelector('.popup__input_type_job');
export const formAvatar = document.querySelector('.popup__form_avatar');
export const popupFormAdd = document.querySelector('.popup__form_add');
