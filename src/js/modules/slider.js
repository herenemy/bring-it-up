export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = Array.from(this.page.children);
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }

  showSlides(n) {
    console.log(this.slides);

    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slideIndex.length;
    }

    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });
    this.slides[this.slideIndex - 1].style.display = 'block';

    try {
      this.hanson.style.display = 'none';
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
    } catch (e) {}

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlide(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}
