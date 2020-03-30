export class CommitCardList {
  constructor(gitHubApi, commitCard, glide) {
    this.gitHubApi = gitHubApi;
    this.commitCard = commitCard;
    this.glide = glide;
  }
  render() {
    const container = document.createElement('div');
    container.classList.add('glide');
    container.innerHTML = `
      <div class="glide section__glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides"></ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow_left glide__arrow--left" data-glide-dir="<">prev</button>
          <button class="glide__arrow glide__arrow_right glide__arrow--right" data-glide-dir=">">next</button>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]"></div>
      </div>
    `;
    const wrapper = document.querySelector('.section__glide');
    this.glideElements = {
      wrapper: wrapper,
      glide: container,
      slides: container.querySelector('.glide__slides'),
      bullets: container.querySelector('.glide__bullets')
    }
    wrapper.append(container);
    this.getCommits();
  }
  getCommits() {
    this.gitHubApi.getCommits().then(result => {
      this.data = result || [];
      this._addSlides();
    });
  }
  _addSlides() {
    for (let i = 0; i < this.data.length; i++) {
      this.commitCard.render(this.data[i], this.glideElements, i);
    }
    this.glide.mount();
  }
}
