const editButton = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup');
let usernameInput = document.querySelector('.popup__input_type_username');
let jobInput = document.querySelector('.popup__input_type_job');
let username = document.querySelector('.profile__title');
let job = document.querySelector('.profile__description');
let form = document.querySelector('.popup__form');

function openPopup() {
    formElement.classList.add('popup_opened');
    usernameInput.value = username.textContent;
    jobInput.value = job.textContent;
}

function closePopup() {
    formElement.classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault();
    username.textContent = usernameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);
form.addEventListener('submit', savePopup);