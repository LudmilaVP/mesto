//переменные profile
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
//переменные elements
const sectionElements = document.querySelector('.elements');
const listElement = sectionElements.querySelector('.element');
//переменные popup
const buttonsClose = document.querySelectorAll('.popup__close');
const popupAvatar = document.querySelector('.popup_type_avatar');
const userNameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const formAvatar = document.querySelector('.popup__form_avatar');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup_image_zoom');
const popupAddElement = document.querySelector('.popup_add_element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupFormAdd = document.querySelector('.popup__form_add');
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelectorAll('.popup__input');
const buttonElement = formElement.querySelector('.popup__button')


//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openPopupProfile(e) {
    addPopupValue(e);
    openPopup(popupAvatar);
    enableValidation(formSettings, popupAvatar);
}

function addPopupValue() {
    userNameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

//общая функция закрытия попапа
function closePopup(e) {
    e.target.closest('.popup').classList.remove('popup_opened');
}
function handleSavePopup(e) {
    e.preventDefault();
    username.textContent = userNameInput.value;
    job.textContent = jobInput.value;
    closePopup(e);
}

buttonEdit.addEventListener('click', openPopupProfile);
formAvatar.addEventListener('submit', handleSavePopup);

buttonsClose.forEach((item) => {
    item.addEventListener('click', closePopup);
});


//Добавление карточек на страницу
function renderList(data) {
    data.forEach(item => renderCard(item));
}

function renderCard(data) {
    const newCard = createCard(data);
    listElement.prepend(newCard);
}

function createCard(data) {
    const cardTemplate = document.querySelector('.element-template').content;
    const itemElement = cardTemplate.querySelector('.element__item');
    const cardElement = itemElement.cloneNode(true);
    const imageElement = cardElement.querySelector('.element__image');
    const titleElement = cardElement.querySelector('.element__title');
    imageElement.src = data.link;
    imageElement.alt = data.name;
    titleElement.textContent = data.name;

    const buttonDeleteElement = cardElement.querySelector('.element__delete');
    buttonDeleteElement.addEventListener('click', deleteCard);

    const likeElement = cardElement.querySelector('.element__like');
    likeElement.addEventListener('click', elementLikeActive);

    imageElement.addEventListener('click', openPopupImage);

    return cardElement
};
renderList(initialCards);


//функция удаления карточки
function deleteCard(e) {
    e.target.closest('.element__item').remove();
};

//функция активного лайка
function elementLikeActive(e) {
    e.target.classList.toggle('element__like_active');
};

//функция открытия попапа изображения
function openPopupImage(e) {
    openPopup(popupImageZoom);
    popupImage.src = `${e.target.src}`;
    popupImage.alt = `${e.target.alt}`;
    popupCaption.textContent = `${e.target.alt}`;
}

//функция открытия попапа добавления карточки
function openPopupAddElement() {
    openPopup(popupAddElement);
    titleInput.value = '';
    linkInput.value = '';
}

//функция добавления карточки на страницу
function addElement(e) {
    e.preventDefault();
    let name = titleInput.value;
    let link = linkInput.value;
    renderCard({ name, link });
    closePopup(e);
}

buttonAdd.addEventListener('click', () => {
    openPopupAddElement();
    formInput.forEach((input) => {
        input.addEventListener('keydown', () => {
            enableValidation(formSettings);
        })
    })
});
popupFormAdd.addEventListener('submit', addElement);


//закрытие попапа через Esc
function handleEscape(e) {
    if (e.key === 'Escape') {
        closePopup(e);
    }
};

//закрытие попапа через оверлей
function handleOverlay(e) {
    const openedPopup = document.querySelector('.popup_opened');
    if (e.target === openedPopup) {
        closePopup(e);
    }
}

document.addEventListener('keydown', handleEscape);
document.addEventListener('mousedown', handleOverlay);

const enableValidation = formSettings => {
    const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        setEventListeners(formElement, formSettings);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});









