export class CommitCard {

  render(data, glideElements, index) {
    this.data = data;
    this.glideElements = glideElements;
    this.index = index;
		const slide = document.createElement('li');
		slide.classList.add('post','glide__item');
    slide.innerHTML = `
      <p class="post__date">14 августа, 2019</p>
      <div class="post__info">
        <img src="../../images/git-avatar.png" alt="" class="post__avatar">
        <div class="post__meta">
          <h3 class="caption">Антон Долинин</h3>
          <p class="post__contact">anton@yandex.ru</p>
        </div>
      </div>
      <p class="post__content">
        Emmet (formerly Zen Coding) is a web- developer’s toolkit that can greatly improve your HTML & CSS workflow
      </p>
    `;
    const avatar = slide.querySelector('.post__avatar');
    const date = slide.querySelector('.post__date');
    const title = slide.querySelector('.caption');
    const contact = slide.querySelector('.post__contact');
    const content = slide.querySelector('.post__content');

    avatar.setAttribute('src', this.data.author.avatar_url);
    date.textContent = new Date(this.data.commit.committer.date).toLocaleDateString();
    title.textContent = this.data.commit.committer.name;
    contact.textContent = this.data.commit.committer.email;
    content.textContent = this.data.commit.message;


    glideElements.slides.append(slide);
    this._addBullet(index);
  }
  _addBullet(index) {
    const bullet = document.createElement('button');
    bullet.classList.add('glide__bullet');
    bullet.setAttribute('data-glide-dir', index || 0);
    this.glideElements.bullets.bullet;
  }
}
