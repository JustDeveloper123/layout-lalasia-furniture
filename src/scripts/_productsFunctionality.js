import Product from '../modules/Product.module';
import { clss, sels } from './selectors';

export const bigFirstLetter = str => str[0].toUpperCase() + str.slice(1);

export const productsToSee = products => products.slice(0, 9);

export const setSumOfItems = (items, element) => {
  const sum = items.length;
  const parentEl = document.querySelector(element);
  parentEl.innerHTML = sum;
};

export const getFilterOption = target => target.querySelector('.filter-popup__option-text').textContent.toLowerCase();

// Display products function
export const displayProducts = function (products) {
  const filteredProducts = productsToSee(products); // filtered products
  const createdProducts = filteredProducts.map(
    productData =>
      new Product(productData, {
        html: `<span class="total__product-loader product-item-loader"></span>
            <div class="total__product-img product-item-img">
              <img src="${productData.imgPath}" alt="${productData.name}" />
            </div>
            <p class="total__product-prefix product-item-prefix">${bigFirstLetter(productData.category)}</p>
            <h3 class="total__product-name product-item-name">${productData.name}</h3>
            <p class="total__product-description product-item-description">${productData.material}</p>
            <p class="total__product-price product-item-price">$${productData.price}</p>`,
        tag: 'a',
        loader: {
          imgEl: '.product-item-img > img',
          loaderEl: '.total__product-loader',
        },
        attributes: [
          ['href', '/layout-lalasia-furniture/src/pages/product-item/'],
          ['class', 'total__product product-item'],
          ['data-product-id', productData.id],
        ],
        parentEl: clss.totalProducts,
      }),
  );

  // clearing the container
  sels.totalProducts.innerHTML = '';

  // displaying filtered products
  createdProducts.forEach(product => sels.totalProducts.appendChild(product.productEl));

  // setting a number of the items
  setSumOfItems(products, clss.productsNum);

  return createdProducts;
};

export function updateFilteredInfo(search, category) {
  if (search === '') {
    sels.productsFilteredSearchLabel.classList.add('_hidden');
    sels.productsFilteredSearch.textContent = 'None';
  }
  if (search !== '') {
    sels.productsFilteredSearchLabel.classList.remove('_hidden');
    sels.productsFilteredSearch.textContent = sels.searchInput.value;
  }
  if (category === 'none') {
    sels.productsFilteredCategoryLabel.classList.add('_hidden');
    sels.productsFilteredCategory.textContent = bigFirstLetter(category);
  }
  if (category !== 'none') {
    sels.productsFilteredCategoryLabel.classList.remove('_hidden');
    sels.productsFilteredCategory.textContent = bigFirstLetter(category);
  }
}

export function openProduct(containerClass) {
  const container = document.querySelector(String(containerClass));
  if (!container) return;

  const open = function (e) {
    e.preventDefault();

    const target = e.target.closest('.product-item');
    if (!target) return;

    const url = target.href;
    const id = target.dataset.productId;
    const newUrl = `${url}?id=${id}`;

    window.open(newUrl, '_self');
  };

  // Event delegation
  container.addEventListener('click', open);
}

export function textLoadMore(parent, len) {
  const parentEl = document.querySelector(parent);
  const fullStr = parentEl.innerText;

  const shortStr = fullStr.slice(0, +len) + '... ' + '<button class="read-more">Read More</button>';
  parentEl.innerHTML = shortStr;

  const loadMore = function () {
    parentEl.textContent = fullStr;
  };

  const btn = parentEl.querySelector('.read-more');

  btn.addEventListener('click', loadMore);
}

export async function loadProductItem() {
  const products = await fetch('/layout-lalasia-furniture/data/products.json').then(res => res.json());

  const pageURL = new URL(window.location.href);
  const pageProductId = pageURL.searchParams.get('id');

  const product = products.find(product => product.id === pageProductId);
  if (!product) return;

  document.title = `${product.name}`;

  const completedProduct = await new Product(product, {
    html: `<div class="product__img">
          <div class="product-item-loader"></div>
          <img src="${product.imgPath}" alt="${product.name}" />
        </div>
        <div class="product__info">
          <h1 class="product__name title-2">${product.name}</h1>
          <p class="product__material">${product.material}</p>
          <p class="product__description description">
            ${product.description}
          </p>
          <p class="product__price title-2">$${product.price}</p>
          <div class="product__btns">
            <button class="product__btn product__btn-buy">Buy Now</button>
            <button class="product__btn product__btn-add">Add to Chart</button>
          </div>
        </div>`,
    className: 'product__wrap',
    parentEl: '.product .container',
    loader: {
      loaderEl: '.product-item-loader',
      imgEl: '.product__img img',
    },
  });

  textLoadMore('.product__description', 250);

  return completedProduct;
}
