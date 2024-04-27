import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  toggleActiveClass() {
    for (const slide of this.slides) {
      slide.classList.remove(this.activeClass);
      try {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      } catch (e) {}
    }
    try {
      this.slides[0].querySelector('.card__title').style.opacity = 1;
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
    } catch (e) {}

    this.slides[0].classList.add(this.activeClass);
  }

  bindTriggers() {
    this.next.addEventListener('click', () => {
      if (this.slides[1].tagName === 'BUTTON')
        Array.from(this.slides).find(slide => {
          if (slide.tagName === 'BUTTON') this.container.appendChild(slide);
        });
      this.container.appendChild(this.slides[0]);
      this.toggleActiveClass();
    });
    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.toggleActiveClass();
          break;
        }
      }
    });
  }

  autoSlide() {
    if (this.autoplay) {
      this.interval = setInterval(() => {
        this.container.appendChild(this.slides[0]);
        this.toggleActiveClass();
      }, 2000);

      this.btnContainer = document.querySelector('.modules__info-btns');
      this.stopAutoscroll(this.container, 'mouseenter');
      this.stopAutoscroll(this.container, 'mouseleave');
      this.stopAutoscroll(this.btnContainer, 'mouseenter');
      this.stopAutoscroll(this.btnContainer, 'mouseleave');
    }
  }

  stopAutoscroll(elem, event) {
    elem.addEventListener(event, () => {
      if (event === 'mouseenter') clearInterval(this.interval);
      else if (event === 'mouseleave') {
        this.interval = setInterval(() => {
          this.container.appendChild(this.slides[0]);
          this.toggleActiveClass();
        }, 2000);
      }
    });
  }

  init() {
    this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
    `;
    this.bindTriggers();
    this.toggleActiveClass();
    this.autoSlide();
  }
}
