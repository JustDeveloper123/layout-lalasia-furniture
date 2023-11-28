import Swiper from 'swiper';
import { Controller, Navigation, Pagination } from 'swiper/modules';
import { mainArticlesData, popularProductsData, testimonialsData } from './_home-loadData';

const sliders = {};

(async () => {
  await popularProductsData(); // Якщо дані продуктів завантажені, ініціалізується слайдер

  const popularSwiper = await new Swiper('.popular__slider', {
    modules: [Navigation],
    navigation: {
      nextEl: '.popular__slider .swiper-button-next',
      prevEl: '.popular__slider .swiper-button-prev',
    },
    centeredSlides: true,
    roundLengths: true,
    loop: true,
    lazyPreloadPrevNext: true,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
      },
      400: {
        slidesPerView: 2,
      },
      550: {
        slidesPerView: 2.25,
      },
      700: {
        slidesPerView: 2.4,
      },
      800: {
        slidesPerView: 2.6,
      },
      900: {
        slidesPerView: 2.8,
      },
      1100: {
        slidesPerView: 3.4,
      },
      1200: {
        slidesPerView: 3.9,
      },
      1350: {
        slidesPerView: 4.1,
      },
    },
  });
})();

(async () => {
  await testimonialsData();

  const testimonialsSwiper = new Swiper('.testimonials__slider', {
    modules: [Pagination],
    centeredSlides: true,
    lazyPreloadPrevNext: true,
    speed: 1000,
    pagination: {
      el: '.testimonials__slider .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 1.3,
      },
      600: {
        slidesPerView: 1.4,
      },
      700: {
        slidesPerView: 1.4,
      },
      800: {
        slidesPerView: 1.5,
      },
      900: {
        slidesPerView: 1.7,
      },
      1000: {
        slidesPerView: 1.9,
      },
      1100: {
        slidesPerView: 2.1,
      },
    },
  });
})();

(async () => {
  await mainArticlesData();

  const articlesMainSwiper = new Swiper('.articles__main-slider', {
    modules: [Pagination, Navigation, Controller],
    slidesPerGroup: 1,
    loop: true,
    speed: 800,
    pagination: {
      el: '.articles__main-slider .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.articles__main-slider .swiper-button-next',
      prevEl: '.articles__main-slider .swiper-button-prev',
    },
  });

  sliders.articlesMainSwiper = articlesMainSwiper;

  startArticlesArticleSwiper();
})();

function startArticlesArticleSwiper() {
  const articlesArticleSwiper = new Swiper('.articles__article-slider', {
    direction: 'vertical',
    allowTouchMove: false,
    slidesPerView: 3,
    slidesPerGroup: 1,
    loop: true,
    speed: 800,
    touchReleaseOnEdges: true,
    breakpoints: {
      0: {
        spaceBetween: 20,
      },
      768: {
        spaceBetween: 30,
      },
    },
  });

  //# Changing the slides of second swiper using first swiper index
  sliders.articlesMainSwiper.on('slideChangeTransitionStart', function () {
    const activeIndex = +document.querySelector('.articles__main-slider .swiper-slide-active').dataset.swiperSlideIndex;
    articlesArticleSwiper.slideToLoop(activeIndex);
  });
}
