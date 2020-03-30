export class GitHubApi {
  constructor() {}
  getCommits() {
    //sha для branch level-1 пока нет коммитов в master
    return fetch('https://api.github.com/repos/alsokolov/praktikum-front/commits?sha=b25cc6b9b3fc018b1361d756c633ad92a5f858da')
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    })
  }
}
