import Product from '../modules/Product.module';
import { bigFirstLetter, loadProductItem } from './_productsFunctionality';

(async function () {
  await loadProductItem();

  const loadRelatedItems = await async function () {
    const products = await fetch('/layout-lalasia-furniture/data/products.json').then(res => res.json());

    const createRandomProducts = qty => {
      const randomProducts = [];

      for (let i = 0; i < +qty; i++) {
        const randomNum = Math.trunc(Math.random() * products.length);
        randomProducts.push(products[randomNum]);
      }

      return randomProducts;
    };

    const relatedItems = createRandomProducts(3);

    return relatedItems.map(
      product =>
        new Product(product, {
          html: `<div class="related-items__item-loader product-item-loader"></div>
              <div class="related-items__item-img product-item-img">
                <img src="${product.imgPath}" alt="${product.name}" />
              </div>
              <p class="related-items__item-prefix product-item-prefix">${bigFirstLetter(product.category)}</p>
              <h3 class="related-items__item-name product-item-name">${product.name}</h3>
              <p class="related-items__item-description product-item-description">${product.material}</p>
              <p class="related-items__item-price product-item-price">$${product.price}</p>`,
          tag: 'a',
          attributes: [
            ['class', 'related-items__item product-item'],
            ['href', `/layout-lalasia-furniture/src/pages/product-item/?id=${product.id}`],
            ['data-product-id', product.id],
          ],
          loader: {
            loaderEl: '.related-items__item-loader',
            imgEl: '.related-items__item-img  img ',
          },
          parentEl: '.related-items__items',
        }),
    );
  };
  loadRelatedItems();
})();
