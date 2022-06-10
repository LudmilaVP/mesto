// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, formSettings) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    inputElement.classList.add(formSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formSettings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, formSettings) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    inputElement.classList.remove(formSettings.inputErrorClass);
    errorElement.classList.remove(formSettings.errorClass);
    errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, formSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formSettings);
    } else {
        hideInputError(formElement, inputElement, formSettings);
    }
};

// Функция проверки наличия невалидного поля
const hasInvalidInput = inputList => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция включения/выключения кнопки
const toggleButtonState = (inputList, buttonElement, formSettings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formSettings.inactiveButtonClass);
    
    } else {
        buttonElement.classList.remove(formSettings.inactiveButtonClass);
       
    }
};

// Функция для всех обработчиков 
const setEventListeners = (formElement, formSettings) => {
    const inputList = Array.from(document.querySelectorAll(formSettings.inputSelector));
    const buttonElement = Array.from(formElement.querySelector(formSettings.submitButtonSelector));
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
        })
    })
}

