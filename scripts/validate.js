let config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    // Функция, которая добавляет класс с ошибкой
    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    // Функция, которая удаляет класс с ошибкой
    const hideInputError = (formElement, inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = ' ';
    };

    // Функция, которая проверяет валидность поля
    const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    };

    // Функция проверки наличия невалидного поля
    const hasInvalidInput = inputList => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    // Функция включения/выключения кнопки
    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add('popup__button_disabled');
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove('popup__button_disabled');
            buttonElement.disabled = false;
        }
    };

    // Функция для всех обработчиков 
    const setEventListeners = (formElement) => {
        const inputList = Array.from(document.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement)
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        setEventListeners(formElement);
    });


};

enableValidation(config);

//const resetForm = (buttonElement) => {
//   buttonElement.classList.add('popup__button_disabled');
//};