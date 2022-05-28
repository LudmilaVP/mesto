const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup');
const usernameInput = document.querySelector('.popup__input_type_username');
const jobInput = document.querySelector('.popup__input_type_job');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const form = document.querySelector('.popup__form');



function openPopup() {
    formElement.classList.add('popup_opened');
    usernameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

function closePopup(event) {
    event.target.closest('.popup').classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault();
    username.textContent = usernameInput.value;
    job.textContent = jobInput.value;
    closePopup(event);
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', savePopup);

closeButtons.forEach((item) => {
    item.addEventListener('click', closePopup);
});

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
const sectionElements = document.querySelector('.elements');
const ulElement = sectionElements.querySelector('.element');


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



    return cardElement

};
renderList(initialCards);

function deleteCard(evt) {
    evt.target.closest('.element__item').remove();
};

function elementLikeActive(evt) {
    evt.target.classList.toggle('element__like_active');
};