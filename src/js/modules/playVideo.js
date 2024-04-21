export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const path = btn.getAttribute('data-url');
        if (!this.player) this.createPlayer(path);
        else this.overlay.style.display = 'flex';
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.player.stopVideo();
      this.overlay.style.display = 'none';
    });

    this.overlay.addEventListener('click', () => {
      this.player.stopVideo();
      this.overlay.style.display = 'none';
    });
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '360',
      width: '640',
      videoId: `${url}`,
    });
    console.log(this.player);

    this.overlay.style.display = 'flex';
  }

  init() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}
