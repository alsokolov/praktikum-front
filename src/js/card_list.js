export class CardList {
	constructor(container, card, cardForm, api) {
		this.container = container;
		this.card = card;
		this.api = api;
		this.cardsArr = [];
		this.cardForm = cardForm;
		this.name = this.cardForm.elements.name;
		this.link = this.cardForm.elements.link;
	}

	render(container, result) {
		this.cardsArr = result;
		this.api.getInitialCards().then((result) => {
			this.cardsArr = result;
			console.log(result, 'result');
			if (this.cardsArr && Array.isArray(this.cardsArr) && this.cardsArr.length) {
				this.cardsArr.forEach((item) => {
					if (item.name && item.link) {
						//let isMyCard = (item.owner._id === this.api.ownerId ? true : false); 
						this.card.create(item, this.container, this.api.ownerId);
					}
				});
			}
		})
		.catch((err) => {
			console.log(err, 'Произошла ошибка! Не удалось звгрузить данные (карточики)')
		});
	}
	addCard(name, link) {
		console.log(link, 'link');
		this.api.addCard(name, link).then((result) => {
			this.card.create(result, this.container);
		})
		.catch((err) => {
			this.card.create({name, link}, this.container);
			console.log(err, 'Что-то пошло не так! Карточка не была сохранена =(')
		});
	}
}
