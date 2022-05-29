const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup');
const usernameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const form = document.querySelector('.popup__form');
const sectionElements = document.querySelector('.elements');
const ulElement = sectionElements.querySelector('.element');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image-zoom');

//Общая функция открытия попапов
function openPopup(popup) {
    formElement.classList.add('popup_opened');
}

function openPopupProfile(e) {
    openPopup(e);
    usernameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

//Общая функция закрытия попапов
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
    ulElement.append(cardElement);

    const deleteElementButton = cardElement.querySelector('.element__delete');
    deleteElementButton.addEventListener('click', deleteCard);

    const likeElement = cardElement.querySelector('.element__like');
    likeElement.addEventListener('click', elementLikeActive);

    imageElement.addEventListener('click', imagePopup);

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
function imagePopup(e) {
    popupImageZoom.classList.add('popup_opened');
    popupImage.src = `${e.target.src}`;
    popupImage.alt = `${e.target.alt}`;
    popupCaption.textContent = `${e.target.alt}`;
}