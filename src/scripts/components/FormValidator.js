export default class FormValidator {
    constructor(formSettings, formElement) {
        this._formSettings = formSettings;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
        this._buttonElement = formElement.querySelector(formSettings.submitButtonSelector);
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
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // Функция включения/выключения кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._formSettings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._formSettings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    // Функция для всех обработчиков 
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });
    };

    // Предвалидация
    resetValidation() {
        this._inputList.forEach(inputElement =>
            inputElement.classList.contains(this._inputErrorClass) &&
            this._hideInputError(this._formElement, inputElement, this._formSettings));
        this._toggleButtonState();
    };

    enableValidation() {
        this._setEventListeners();
    };
}