export class NewsCardsList {
  constructor(newsApi, dataStorage, newsCard) {
    this.api = newsApi;
    this.card = newsCard;
    this.dataStorage = dataStorage
    this.container = document.querySelector('.cards');
    this.cardsCounter = 0;
    this.isLoading = null;
    this._setEventListener();
  }
  getNews(theme) {
    this.isLoading = true;
    this.loader();
    this.api.getNews(theme).then((result) => {
      this.result = result || {};
      this.result.theme = theme || null;
      this.dataStorage.setNewsData(this.result);
      this.data = result.articles || [];
      this.addCards();
    }).finally(() => {
      this.isLoading = false;
      this.loader();
    });
  }
  loader(toggle){
    const loader = document.querySelector('.search-in-progress');
    loader.classList.toggle('section_hidden', toggle || !this.isLoading);
    if (this.isLoading === false) {
      if (this.data && this.data.length) {
        document.querySelector('.section_cards').classList.remove('section_hidden');
        document.querySelector('.nothiing-found').classList.add('section_hidden');
      } else {
        document.querySelector('.nothiing-found').classList.remove('section_hidden');
        document.querySelector('.section_cards').classList.add('section_hidden');
      }
    }
  }
  addCards() {
    const storage = (this.dataStorage.getNewsData() || {}).articles || [];
    if (storage && storage.length) {
      this.data = storage;
      this.isLoading = false;
      this.loader(true);
    }
    if (this.data && this.data.length) {
      for (let i = this.cardsCounter; i < this.data.length; i++) {
        this.card.addCard(this.data[i]);
        this.cardsCounter++;
        if (this.cardsCounter === this.data.length) event.target.classList.add('section__add_hidden');
        if (this.cardsCounter % 3 === 0) break;
      }
    }
  }
  _setEventListener() {
    const addMoreButton = document.querySelector('.section__add');
    addMoreButton.addEventListener('click', () => {
      this.addCards();
    });
  }
}
