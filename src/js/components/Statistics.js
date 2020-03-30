export class Statistics {
  addStatistic(dataStorage) {
    this.storage = dataStorage;
    this.rawData = this.storage.getNewsData() || {};
    this.rawData.articles = this.rawData.articles || [];
    this.data = {};

    this.data.theme = typeof this.rawData.theme === 'string' ? this.rawData.theme : 'Ничего';
    this.data.totalResults = this.rawData.totalResults || 0;
    this.data.totalInHeaders = this.rawData.articles.filter(o => o.title.toUpperCase().includes(this.data.theme.toUpperCase())).length || 0;
    this.data.chart = {};
    this.rawData.articles.forEach((item) => {
      const date = new Date(item.publishedAt);
      const dayString = date.getDate() + ', ' + date.toLocaleString('ru-RU', { weekday: 'short' });
      if (this.data.chart[dayString]) {
        this.data.chart[dayString]++;
      } else {
        this.data.chart[dayString] = 1;
      }
    });
    this._setResults();
  }
  _setResults() {
    const chart = this.data.chart;
    this.resultsEl = document.querySelector('.results');
    const chartEl = document.querySelector('.chart');
    const timelineEl = document.querySelector('.timeline_last');

    const resultThemeEl = this.resultsEl.querySelector('.results__theme');
    const resultTotalEl = this.resultsEl.querySelector('.results__val_total');
    const resultInHeadersEl = this.resultsEl.querySelector('.results__val_in-headers');
    resultThemeEl.textContent = this.data.theme;
    resultTotalEl.textContent = this.data.totalResults;
    resultInHeadersEl.textContent = this.data.totalInHeaders;

    Object.keys(chart).sort().reverse().forEach(function (key) {
      const chartItemEl = document.createElement('div');
      chartItemEl.classList.add('chart__item')
      chartItemEl.innerHTML = `
        <div class="chart__day"></div>
        <div class="chart__val"></div>
      `;
      const dayEl = chartItemEl.querySelector('.chart__day');
      const valEl = chartItemEl.querySelector('.chart__val');
      dayEl.textContent = key;
      valEl.textContent = chart[key];
      if (chart[key < 10]) valEl.classList.add('.chart__val_small');
      valEl.setAttribute('style', `
        --chart-value: ${chart[key]}; 
        --chart-max-value: 100;
      `);
      chartEl.insertBefore(chartItemEl, timelineEl);
    });
  }
}
