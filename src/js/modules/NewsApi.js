export class NewsApi {
  getNews(theme) {
    const NEWS_API_KEY = '0849a17b9b234e1492aa513e31c72f22';
    const MAX_CARDS_NUMBER = 100;
    const DELTA_DATE = 7 * 24 * 60 * 60 * 1000; // 7 days
    const endDate = Date.now();
    const startDate = Date.now() - DELTA_DATE;
    this.endISODate = new Date(endDate).toISOString()
    this.startISODate = new Date(startDate).toISOString();
    return fetch(`http://newsapi.org/v2/everything?` +
      `apiKey=${NEWS_API_KEY}` +
      `&from=${this.startISODate}` +
      `&to=${this.endISODate}` +
      `&q=${theme}` +
      `&pageSize=${MAX_CARDS_NUMBER}` +
      `&language=en` +
      `&sortBy=relevancy`)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    })
  }
}
