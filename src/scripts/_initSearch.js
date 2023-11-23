import { changeFilter } from './_initFilter';
import { displayProducts, getFilterOption, updateFilteredInfo } from './_productsFunctionality';
import { sels } from './selectors';

// ! ADD EMPTY MESSAGE

const searchInput = sels.searchInput;
const searchContainer = sels.searchContainer;
const searchItemsContainer = sels.searchItemsContainer;
const searchFindBtn = sels.searchFindBtn;

// =============================== //
// =============================== //
// =============================== //

//? (products data)
function setSearchOptions(products) {
  const productsEl = products.map(
    product =>
      (searchItemsContainer.innerHTML += `
        <a href="/layout-lalasia-furniture/src/pages/product-item/" class="total__search-item" data-product-id="${product.id}">${product.name}</a>
      `),
  );

  const openProduct = function (e) {
    e.preventDefault();
    const target = e.target.closest('.total__search-item');
    if (!target) return;

    const url = target.href;
    const id = target.dataset.productId;
    const newUrl = `${url}?id=${id}`;

    window.open(newUrl, '_self');
  };

  searchItemsContainer.addEventListener('click', openProduct);

  return productsEl;
}

function searchActivity(action = 'remove') {
  return searchContainer.classList[String(action)]('_active-search');
}

function inputOperations() {
  const inputValue = this.value.trim().toLowerCase();

  // Function for updating options
  const updateOptions = function (options) {
    options.forEach(option => {
      const searchedValue = option.textContent.toLowerCase().search(inputValue);
      // If searched option
      if (searchedValue !== -1) {
        option.classList.remove('_hidden');
        option.innerHTML = insertMark(option.textContent, searchedValue, inputValue.length);
      }
      // If not searched option
      else {
        option.classList.add('_hidden');
      }
    });
  };

  // Updating options
  const searchOptions = Array.from(document.querySelectorAll('.total__search-item')); // all search items
  updateOptions(searchOptions);

  function insertMark(str, hitPos, inputValLen) {
    return str.slice(0, hitPos) + '<mark>' + str.slice(hitPos, hitPos + inputValLen) + '</mark>' + str.slice(hitPos + inputValLen);
  }
}

export function findSearchedItems(products, isChangeFilter = false) {
  // Value of the search input
  const inputValue = searchInput.value.trim().toLowerCase();

  // Filtered products
  const filteredProducts = products
    .map(product => {
      return product.name.toLowerCase().search(inputValue) !== -1 ? product : undefined;
    })
    .filter(value => value !== undefined);

  // Filtering products
  const activeFilter = sels.filterOptionsContainer.querySelector('._active-option');

  // Set filtered info
  const filter = getFilterOption(activeFilter);
  updateFilteredInfo(inputValue, filter);

  // If we need to filter products with filter options
  if (isChangeFilter) {
    changeFilter(activeFilter, filteredProducts);
    return filteredProducts;
  }
  // Displaying products
  if (!isChangeFilter) displayProducts(filteredProducts);

  // Empty message
  if (filteredProducts.length === 0) {
    sels.productsEmptyMessage.classList.remove('_hidden');
  }
  if (filteredProducts.length !== 0) {
    sels.productsEmptyMessage.classList.add('_hidden');
  }

  // Blur input
  sels.searchInput.blur();

  return filteredProducts;
}

// =============================== //
// =============================== //
// =============================== //

const initSearch = function (products) {
  const searchOptions = setSearchOptions(products);

  searchInput.addEventListener('input', inputOperations);
  searchInput.addEventListener('focus', () => searchActivity('add'));
  searchInput.addEventListener('blur', () => searchActivity('remove'));
  searchFindBtn.addEventListener('click', () => findSearchedItems(products, true));
  window.addEventListener('keydown', e => {
    if (e.key === 'Enter') findSearchedItems(products, true);
  });

  return searchOptions;
};

export default initSearch;
