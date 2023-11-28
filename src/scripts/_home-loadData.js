import Product from '../modules/Product.module';

const bigFirstLetter = str => str[0].toUpperCase() + str.slice(1);

const popularProductsData = async function () {
  const products = await fetch('/layout-lalasia-furniture/data/popularProducts.json').then(res => res.json());

  const display = function () {
    const productsEl = products.map(
      productData =>
        new Product(productData, {
          html: `<div class="swiper-lazy-preloader"></div>    
              <div class="popular__product-img product-item-img">
                <img src="${productData.imgPath}" alt="${productData.name}" loading="lazy" />
              </div>
              <p class="popular__product-prefix product-item-prefix">${bigFirstLetter(productData.category)}</p>
              <h3 class="popular__product-name product-item-name">${productData.name}</h3>
              <p class="popular__product-description product-item-description">${productData.description}</p>
              <p class="popular__product-price product-item-price">$${productData.price}</p>`,
          parentEl: '.popular__slider .swiper-wrapper',
          attributes: [
            ['class', 'swiper-slide product-item'],
            ['href', `/layout-lalasia-furniture/src/pages/product-item/?id=${productData.id}`],
            ['data-product-id', productData.id],
          ],
          tag: 'a',
        }),
    );

    return productsEl;
  };
  display();
  display();
  // дублювання кілька разів функції для подальшої коректної роботи loop слайдеру
  return display();
};

const testimonialsData = async function () {
  const testimonials = await fetch('/layout-lalasia-furniture/data/testimonialsToSee.json').then(res => res.json());

  const fixRating = rating => (+rating).toFixed(1);

  const testimonialsEl = testimonials.map(
    testimonialData =>
      new Product(testimonialData, {
        html: `<div class="testimonials__item-icon">
              <img src="/layout-lalasia-furniture/img/icons/quote-up.svg" alt="" />
              </div>
              <p class="testimonials__item-description description">${testimonialData.text}</p>
              <div class="testimonials__item-review-wrap">
                <div class="testimonials__item-user-wrap">
                  <div class="testimonials__item-user-img">
                    <img src="${testimonialData.userImgPath}" alt="${testimonialData.name}" loading="lazy" />
                    <div class="swiper-lazy-preloader"></div>
                  </div>
                  <p class="testimonials__item-user-name">${testimonialData.name}</p>
                </div>
                <div class="testimonials__item-rate-wrap">
                  <svg class="testimonials__item-rate-img">
                    <use xlink:href="/layout-lalasia-furniture/img/sprites.svg#star"></use>
                  </svg>
                  <p class="testimonials__item-rate-num">${fixRating(testimonialData.rating)}</p>
                </div>
              </div>`,
        className: 'swiper-slide',
        parentEl: '.testimonials__slider .swiper-wrapper',
      }),
  );

  return testimonialsEl;
};

const mainArticlesData = async function () {
  const articles = await fetch('/layout-lalasia-furniture/data/mainArticles.json').then(res => res.json());
  const formattedArticles = [articles[1], ...articles.slice(2, articles.length), articles[0]];

  const displayMainArticles = function () {
    const articlesEl = articles.map(
      articleData =>
        new Product(articleData, {
          html: `<img class="articles__main-img" src="${articleData.imgPath}" alt="${articleData.title}" />
            <div class="articles__main-slide">
              <h5 class="articles__main-prefix article-prefix">${articleData.category}</h5>
              <a href="##" class="articles__main-title">${articleData.title}</a>
              <p class="articles__main-description description">
                ${articleData.description}
              </p>
              <a href="##" class="articles__main-link">Read More</a>`,
          tag: 'article',
          parentEl: '.articles__main-slider .swiper-wrapper',
          className: 'swiper-slide',
        }),
    );

    return articlesEl;
  };

  const displayOtherArticles = function () {
    const articlesEl = formattedArticles.map(
      articleData =>
        new Product(articleData, {
          html: `<div class="articles__article-img">
              <div class="articles__article-img-block img-block">
                <a href="##" class="img-block__link">Read More</a>
              </div>
              <img src="${articleData.imgPath}" alt="${articleData.title}" />
            </div>
            <div class="articles__article-info">
              <h5 class="articles__article-prefix article-prefix">${articleData.category}</h5>
              <a href="##" class="articles__article-title">${articleData.title}</a>
              <p class="articles__article-description description">${articleData.description}</p>
              <div class="articles__article-user-post">
                <div class="articles__article-user-info">
                  <div class="articles__article-user-img">
                    <img src="${articleData.userImgPath}" alt="${articleData.by}" />
                  </div>
                  <p class="articles__article-user-name">By ${articleData.by}</p>
                </div>
                <time class="articles__article-date">${articleData.publishDate}</time>
              </div>
            </div>`,
          tag: 'article',
          className: 'swiper-slide',
          parentEl: '.articles__article-slider .swiper-wrapper',
        }),
    );

    return articlesEl;
  };
  displayOtherArticles();

  return displayMainArticles();
};

export { mainArticlesData, popularProductsData, testimonialsData };
