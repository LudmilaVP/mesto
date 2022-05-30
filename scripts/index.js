//переменные profile
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
//переменные elements
const sectionElements = document.querySelector('.elements');
const ulElement = sectionElements.querySelector('.element');
//переменные popup
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup');
const usernameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const form = document.querySelector('.popup__form');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image-zoom');
const popupAddElement = document.querySelector('.popup__add-element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupFormAdd = document.querySelector('.popup__form_add');


function openPopup(popup) {
    formElement.classList.add('popup_opened');
}

function openPopupProfile(e) {
    openPopup(e);
    usernameInput.value = username.textContent;
    jobInput.value = job.textContent;
}


function closePopup(e) {
    e.target.closest('.popup').classList.remove('popup_opened');
}

function savePopup(e) {
    e.preventDefault();
    username.textContent = usernameInput.value;
    job.textContent = jobInput.value;
    closePopup(e);
}

editButton.addEventListener('click', openPopupProfile);
form.addEventListener('submit', savePopup);

closeButtons.forEach((item) => {
    item.addEventListener('click', closePopup);
});

//Добавление карточек на страницу
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function renderList(data) {
    data.forEach(item => renderItem(item));
}

function renderItem(data) {
    const cardTemplate = document.querySelector('.element__template').content;
    const itemElement = cardTemplate.querySelector('.element__item');
    const cardElement = itemElement.cloneNode(true);
    const imageElement = cardElement.querySelector('.element__image');
    const titleElement = cardElement.querySelector('.element__title');
    imageElement.src = data.link;
    imageElement.alt = data.name;
    titleElement.textContent = data.name;
    
    const deleteElementButton = cardElement.querySelector('.element__delete');
    deleteElementButton.addEventListener('click', deleteCard);

    const likeElement = cardElement.querySelector('.element__like');
    likeElement.addEventListener('click', elementLikeActive);

    imageElement.addEventListener('click', openPopupImage);
    ulElement.append(cardElement);
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
    popupImageZoom.classList.add('popup_opened');
    popupImage.src = `${e.target.src}`;
    popupImage.alt = `${e.target.alt}`;
    popupCaption.textContent = `${e.target.alt}`;
}

//функция открытия попапа добавления карточки
function openPopupAddElement(e) {
    popupAddElement.classList.add('popup_opened');
    titleInput.value = '';
    linkInput.value = '';
}

//функция добавления карточки на страницу
function createElement(e) {
    e.preventDefault();
    let name = titleInput.value;
    let link = linkInput.value;
    renderItem({ name, link });
    const popupAdd = document.querySelector('.popup__add-element')
    popupAdd.classList.remove("popup_opened")
}

addButton.addEventListener('click', openPopupAddElement);
popupFormAdd.addEventListener('submit', createElement);