export class Card {
	constructor(popupImageElement, popupImage, api) {
		this.popupImageElement = popupImageElement;
		this.popupImage = popupImage;
		this.api = api;
	}

	_setEventListeners(card) {
		card.addEventListener('click', () => {
			this.like(event);
			this.remove(event);
			this.setSrc(event);
		});
	}

	//Отрисовка карточки
	create(data, container, userID) {
		data = data || {}; //
		const card = document.createElement('div');
		card.classList.add('place-card');
		card.innerHTML = `
			<div class="place-card__image"></div>
			<div class="place-card__description">
				<h3 class="place-card__name"></h3>
				<button class="place-card__like-icon"></button>
			</div>`;
		const cardImage = card.querySelector('.place-card__image');
		cardImage.setAttribute('style', `background-image: url(${data.link});`);
		if (data.owner && userID == data.owner._id) {
			const deleteButton = card.querySelector('.place-card__image');
			deleteButton.innerHTML = '<button class="place-card__delete-icon"></button>';
		}
		const cardName = card.querySelector('.place-card__name');
		const cardLike = card.querySelector('.place-card__like-icon');
		//Находим 'свои' лайки
		const likesArr = data.likes || [];
		const isLiked = (JSON.stringify(likesArr).indexOf(userID) > -1) ? true : false;
		if (isLiked) { 
			cardLike.classList.add('place-card__like-icon_liked');
		} else {
			cardLike.classList.remove('place-card__like-icon_liked');
		}
		cardName.textContent = data.name;
		cardLike.dataset.likes = likesArr.length;
		card.dataset.uid = data._id;

		container.appendChild(card);
		this._setEventListeners(card);
	}

	like(event) {
		if (event.target.classList.contains('place-card__like-icon')) {
			const cardId = event.target.closest('.place-card').dataset.uid;
			if (event.target.classList.contains('place-card__like-icon_liked')) {
				this.api.like(cardId, false)
				.then((result) => {
					event.target.dataset.likes = result.likes.length;
				});
				event.target.classList.remove('place-card__like-icon_liked');
			} else {
				this.api.like(cardId, true)
				.then((result) => {
					event.target.dataset.likes = result.likes.length;
				});
				event.target.classList.add('place-card__like-icon_liked');
			}
			console.log(cardId);
		}
	}

	remove(event) {
		if (event.target.classList.contains('place-card__delete-icon')) {
			const isConfirmed = window.confirm('Удалить безвозвратно?');
			if(isConfirmed) {
				const cardId = event.target.closest('.place-card').dataset.uid;
				this.api.remove(cardId);
				const card = event.target.closest('.place-card');
				card.removeEventListener('click', this.like);
				card.removeEventListener('click', this.remove);
				card.removeEventListener('click', this.setSrc);
				card.parentNode.removeChild(card);
			}
		}
	}
	//Получение ссылки на изображение
	setSrc(event) {
		if (event.target.classList.contains('place-card__image')) {
			//удаляем url('') вокруг ссылки
			const src = event.target.style.backgroundImage.slice(3, -1).replace(/["'()]/g, "");
			this.showPopup(src);
		}
	}
	showPopup(src) {
		const img = this.popupImageElement.querySelector('.popup__image');
		img.setAttribute('src', src);
		this.popupImage.open();
	}
}
