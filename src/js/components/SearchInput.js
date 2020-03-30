export class SearchInput {
  constructor(formElement, newsCardsList) {
    this.form = formElement;
    this.newsCardsList = newsCardsList;
  }
  setEventListener() {
    this.form.addEventListener('submit', () => {
      event.preventDefault();
      this.value = this.form.search.value;
      this.newsCardsList.getNews(this.value);
    });
  }
}
