import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { productsSliderData } from './_products-loadData';

(async function () {
  await productsSliderData();

  const productsIntroSlider = new Swiper('.intro__slider.swiper', {
    modules: [Autoplay, Navigation, Pagination],
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      prevEl: '.intro__slider.swiper .swiper-button-prev',
      nextEl: '.intro__slider.swiper .swiper-button-next',
    },
    pagination: {
      el: '.intro__slider.swiper .swiper-pagination',
    },
  });
})();
