export class FormValidator {
	constructor(myForm, myConstructor) {
		this.myConstructor = myConstructor;
		this.form = myForm;
		this.validateInputs = document.querySelectorAll('.popup__input');
		//Флаг визуального скрытия ошибок
		this.skipErrorText = true;
	}

	setEventListeners() {
		this.validateInputs.forEach((elem) => {
			elem.addEventListener('input', () => {
				//Сбрасываем флаг при вводе
				this.skipErrorText = false;
				this.validate(elem);
			});
		});
	}

	//Проверка всей формы
	checkInputValidity(skipErrorText) {
		const fileds = Array.from(this.form.elements);
		let isValidForm = true;
		fileds.forEach((elem) => {
			if (!elem.classList.contains('button')) {
				if (!this.validate(elem)) isValidForm = false;
			}
		});
		if (skipErrorText) this.skipErrorText = true;
		return isValidForm
	}

	//Валидация полей формы
	validate(element) {
		// передавайте этот объект в параметре
		const validationErrorMessages = {
			emptyField: 'Это обязательное поле',
			wrongLength: 'Должно быть от 2 до 30 символов',
			badUrl: '«Ссылка на картинку» не ссылка: «Здесь должна быть ссылка»'
		}

		const errorElement = element.parentNode.querySelector('.popup__error');
		if (!errorElement) return false;

		//emptyField
		if (element.validity.valueMissing) {
			this.errorToggle(element, errorElement, validationErrorMessages.emptyField);
			return false
		}
		//badUrl
		if (element.type == 'url') {
			if (element.validity.typeMismatch) {
				this.errorToggle(element, errorElement, validationErrorMessages.badUrl);
				return false
			}
		} else {
			//wrongLength
			// можно лучше: Для валидации используйте кастомный метод validation
			// https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity()
				//element.validity.tooLong c maxlength атрибутом не даст пользователю набрать строку больше чем необходимо 
				//и пользователь не увидит сообщение, но строка обрежется. 
				//Или тут речь про другое?
			if (element.validity.tooShort || element.value.length > 30) {
				this.errorToggle(element, errorElement, validationErrorMessages.wrongLength);
				return false
			}
		}
		this.errorToggle(element, errorElement, '')
		return true;
	}

	//Активация кнопки отправки формы
	setSubmitButtonState(element) {
		const myForm = this.form;
		const button = myForm.querySelector('.button');
		const totalErrors = myForm.querySelectorAll('.popup__error_active').length;
		if (totalErrors == 0) {
			button.classList.add('popup__button_active');
			button.removeAttribute('disabled');
		} else {
			button.classList.remove('popup__button_active');
			button.setAttribute('disabled', true);
		}
	}

	//Вывод текста об ошибке валидации
	errorToggle(element, errorElement, message) {
		//Не показываем текст, если открыли тултип
		if (this.skipErrorText !== true) errorElement.textContent = message;
		if (message) {
			errorElement.classList.add('popup__error_active');
		} else {
			errorElement.classList.remove('popup__error_active');
		}
		this.setSubmitButtonState(element, errorElement)
	}

	//Отправка формы
	sendForm(event, myForm) {
		event.preventDefault();
		const profileForm = document.forms.profile;
		const cardForm = document.forms.new;
		const currentForm = myForm;
		if (this.checkInputValidity(event, myForm)) {
			if (currentForm === profileForm) {
				this.myConstructor.updateUserInfo(event);
				//Не сбрасываем поля для профиля
			} else if (currentForm === cardForm) {
				this.myConstructor.addCard(cardForm.elements.name.value, cardForm.elements.link.value);
				currentForm.reset();
			}
		}
		//Возвращаем флаг в исходное состояние, если форма прошла валидацию
		this.skipErrorText = true;
	}

}
