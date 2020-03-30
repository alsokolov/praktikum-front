export class NewsCard {
  constructor(data) {
    this.data = data;
  }
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const day =  date.getDate();
    const year = date.getFullYear();
    const months = {
      'январь'  : 'января',
      'февраль' : 'февраля',
      'март'    : 'марта',
      'апрель'  : 'апреля',
      'май'     : 'мая',
      'июнь'    : 'июня',
      'июль'    : 'июля',
      'август'  : 'августа',
      'сентябрь': 'сентября',
      'октябрь' : 'октября',
      'ноябрбрь': 'ноября',
      'декабрь' : 'декабря'
    }
    const monthName = date.toLocaleString('ru-RU', { month: "long" });
    const month = months[monthName] ? months[monthName] : date.getMonth() + 1;

    this.data.formatedDate = `${day} ${month}, ${year}`
  }
  addCard(data) {
    this.data = data;
    const container = document.querySelector('.cards');
		const card = document.createElement('div');
		card.classList.add('card','cards__item');
		card.innerHTML = `
        <div class="card__image"></div>
        <p class="card__date"></p>
        <h3 class="card__title caption"><a target="_blank" class="card__link link link_inherit link_no-underline"></a></h3>
        <p class="card__lead"></p>
        <p class="card__source"></p>
    `;
    const image = card.querySelector('.card__image');
    const date = card.querySelector('.card__date');
    const link = card.querySelector('.card__link');
    const lead = card.querySelector('.card__lead');
    const source = card.querySelector('.card__source');

    image.setAttribute('style', `background-image: url(${this.data.urlToImage});`);
    this.formatDate(this.data.publishedAt)
    date.textContent = this.data.formatedDate;
    link.textContent = this.data.title;
    link.setAttribute('href', this.data.url);
    lead.textContent = this.data.description;
    source.textContent = this.data.source.name;
    //Ввыводим название в title, на тот случай если придется обрезать с помощью elipsis
    source.setAttribute('title', this.data.source.name);
    container.appendChild(card);
  }
}
