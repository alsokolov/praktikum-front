export class Popup {
	constructor(popup, myForm, validatorConstructor) {
		this.popup = popup;
		this.form = myForm;
		this.cross = popup.querySelector('.popup__close');
		this.submitButton = this.popup.querySelector('.popup__button');
	}
	setEventListeners(validatorConstructor, userInfoContructor) {
		const popupAddOpen = document.querySelector('.user-info__button');
		const popupEditOpen = document.querySelector('.user-info__edit');

		//кнопка добавления карточки
		if (this.popup.classList.contains('popup_add-card')) {
			popupAddOpen.addEventListener('click', () => {
				validatorConstructor.checkInputValidity(true);
				this.open();
			});
		}
		if (this.popup.classList.contains('popup_edit-profile')) {
			//кнопка открытия редактирования профиля
			popupEditOpen.addEventListener('click', () => {
				validatorConstructor.checkInputValidity(true);
				this.open();
			});
		}
		//Закрытие попапа
		if (this.form) {
			this.form.addEventListener('submit', () => {
				event.preventDefault();
				validatorConstructor.sendForm(event, this.form);
				this.close();
			});
		}
		if (this.cross) this.cross.addEventListener('click', () => this.close());
	}
	open() {
		this.popup.classList.add('popup_is-opened');
	}
	close() {
		this.popup.classList.remove('popup_is-opened');
	}
}

