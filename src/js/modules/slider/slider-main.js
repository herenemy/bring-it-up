import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(container, btns) {
    super(container, btns);
  }

  showSlides(n) {
    if (n > this.slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = this.slides.length;

    for (const slide of this.slides) {
      slide.style.display = 'none';
    }

    this.slides[this.slideIndex - 1].style.display = 'block';
    this.showPopup();
  }

  showPopup() {
    try {
      if (this.slideIndex === 3)
        setTimeout(() => {
          this.hanson.classList.add('animated', 'slideInUp');
          this.hanson.style.display = 'block';
        }, 3000);
    } catch (e) {}
  }

  plusSlide(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    try {
      this.hanson = document.querySelector('.hanson');
      this.hanson.style.display = 'none';
    } catch (e) {}

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => this.plusSlide(1));
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.showSlides(this.slides.length + 1);
      });
    });
    this.showSlides(this.slideIndex);
  }
}
