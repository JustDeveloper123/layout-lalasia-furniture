import Product from '../modules/Product.module';
import initFilter from './_initFilter';
import initSearch from './_initSearch';
import { displayProducts } from './_productsFunctionality';

const productsSliderData = async function () {
  const productsSlides = await fetch('/layout-lalasia-furniture/data/products-slider.json').then(res => res.json());

  const display = function () {
    const productsSlidesEl = productsSlides.map(
      productSlideData =>
        new Product(productSlideData, {
          html: `<img class="intro__slider-img" src="${productSlideData.imgPath}" alt="${productSlideData.title}" draggable="false" loading="lazy" />
            <div class="swiper-lazy-preloader"></div>
            <a href="##" class="intro__slider-body">
              ${productSlideData.discount ? '<p class="intro__slider-discount">Discount</p>' : ''}
              <h3 href="##" class="intro__slider-title">${productSlideData.title}</h3>
              <p class="intro__slider-text">${productSlideData.description}</p>
            </a>`,
          className: 'swiper-slide',
          parentEl: '.intro__slider .swiper-wrapper',
        }),
    );

    return productsSlidesEl;
  };

  return display();
};

// ===================================== //

const productsData = async function () {
  const products = await fetch('/layout-lalasia-furniture/data/products.json').then(res => res.json());

  // Filter initialization
  initFilter(products);

  // Search initialization
  initSearch(products);

  return displayProducts(products);
};

const totalProductsObserver = function () {
  const target = document.querySelector('.total > .container');

  const callback = function (entries, observer) {
    if (!entries[0].isIntersecting) return;
    productsData();
    observer.unobserve(target);
  };
  const observer = new IntersectionObserver(callback, {
    root: null,
  });

  observer.observe(target);
};
totalProductsObserver();

export { productsData, productsSliderData };
