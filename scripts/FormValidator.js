 class FormValidator {
    constructor(formSettings, formElement) {
        this._formSettings = formSettings;
        this._formElement = formElement;
    }

// Функция, которая добавляет класс с ошибкой
_showInputError(inputElement, errorMessage) {
    const { errorClass, inputErrorClass } = this._formSettings;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
_hideInputError(inputElement) {
    const { errorClass, inputErrorClass } = this._formSettings;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = ' ';
};

// Функция, которая проверяет валидность поля
_isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
};

// Функция проверки наличия невалидного поля
_hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Функция включения/выключения кнопки
_toggleButtonState() {
    if (this._hasInvalidInput(inputList)) {
        this._buttonElement.classList.add(this._formSettings.inactiveButtonClass);
        this._buttonElement.disabled = true;
    } else {
        this._buttonElement.classList.remove(this._formSettings.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
};

// Функция для всех обработчиков 
_setEventListeners() {
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState(inputList);
        });
    });
};

// Предвалидация
validatePopup (inputList, buttonElement) {
    inputList.forEach(inputElement =>
        inputElement.classList.contains(this._inputErrorClass) &&
        hideInputError(this._formElement, inputElement, this._formSettings));
    toggleButtonState(inputList, buttonElement, this._formSettings);
};

enableValidation() {
        this._formElement.addEventListener('submit', (e) => e.preventDefault());
        this._setEventListeners();
};
 }

export { FormValidator }