export class UserInfo {
	constructor(event, userInfoElement, myForm, api) {
		this.userInfo = {};
		this.event = event;
		this.form = myForm;
		this.api = api;
		this.nameField = userInfoElement.querySelector('.user-info__name');
		this.jobField = userInfoElement.querySelector('.user-info__job');
		this.avatarElement = userInfoElement.querySelector('.user-info__photo');
		this.name = this.form.elements.name;
		this.about = this.form.elements.about;
	}

	setUserInfo(event) {
		this.api.setUserInfo()
		.then((result) => {
			this.userInfo = result;
			console.log('userInfo', this.userInfo);
			this.avatarElement.style.backgroundImage = `url(${this.userInfo.avatar})`;
			this.name.value = this.userInfo.name;
			this.about.value = this.userInfo.about;
			this.nameField.textContent = this.name.value;
			this.jobField.textContent = this.about.value;
		}).catch((err) => {
			console.log(err, 'Произошла ошибка! Не удалось получить информацию о пользователе')
		});
	}

	updateUserInfo(event) {
		event.preventDefault();
		const isUpdated = (this.name.value != this.userInfo.name || this.about.value != this.userInfo.about);
		//не отправляем запрос, если пользователь не изменял данные
		if (isUpdated) {
			this.api.updateUserInfo(this.name.value, this.about.value)
			.then((result) => {
				this.userInfo = result;
				this.nameField.textContent = result.name;
				this.jobField.textContent = result.about;
			})
			.catch((err) => {
				console.log(err, 'Произошла ошибка! Не удалось обновить информацию о пользователе');
				this.nameField.textContent = this.name.value;
				this.jobField.textContent = this.about.value;
			});
		}
	}
}
