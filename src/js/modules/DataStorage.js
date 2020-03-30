export class DataStorage {
  setNewsData(data) {
    this.data = JSON.stringify(data);
    localStorage.setItem('newsApi', this.data);
  }
  getNewsData() {
    this.data = localStorage.getItem('newsApi');
    this.data = typeof this.data === 'string' ? JSON.parse(this.data) : this.data;
    return this.data;
  }
}
