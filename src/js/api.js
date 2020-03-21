export class Api {
	constructor(options) {
		this.options = options;
	}

	getInitialCards() {
		return fetch(`${this.options.baseUrl}/cards/`, {
			headers: this.options.headers
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
	}
	addCard(name, link) {
		return fetch(`${this.options.baseUrl}/cards`, {
			method: 'POST',
			headers: this.options.headers,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
	}
	setUserInfo(){
		return fetch(`${this.options.baseUrl}/users/me/`, {
			headers: this.options.headers
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
		.then(result => {
			//Запоминаем свой ID
			this.ownerId = result._id
			return result;
		});
	}
	updateUserInfo(name, about){
		return fetch(`${this.options.baseUrl}/users/me/`, {
			method: 'PATCH',
			headers: this.options.headers,
			body: JSON.stringify({
				name: name,
				about: about
			})
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
	}
	like(cardID, isLiked) {
		return fetch(`${this.options.baseUrl}/cards/like/${cardID}`, {
			method: isLiked ? 'PUT' : 'DELETE',
			headers: this.options.headers
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
	}
	remove(cardID) {
		return fetch(`${this.options.baseUrl}/cards/${cardID}`, {
			method: 'DELETE',
			headers: this.options.headers
		})
		.then(result => {
			if (result.ok) {
				return result.json();
			}
			return Promise.reject(`Ошибка: ${result.status}`);
		})
	}
}
