const qs = el => document.querySelector(el);

// classes
const clss = {
  burger: '.burger',
  burgerBtn: '.burger__btn',
  burgerActive: '_active',
  overlay: '.overlay',
  overlayActive: '_hidden',
  header: '.header',
  headerLink: '.header__link',
  headerPageActive: '_active-page',
  totalProducts: '.total__products',
  filterBtn: '.total__filter',
  filterOverlay: '.filter-popup',
  filterCloseBtn: '.filter-popup__close',
  filterOptionsContainer: '.filter-popup__options',
  productsNum: '.total__total-products-num',
  productsTitleRow: '.total__title-row',
  productsFilteredSearchLabel: '.total__filtered-search',
  productsFilteredSearch: '.total__filtered-search > .search',
  productsFilteredCategoryLabel: '.total__filtered-category',
  productsFilteredCategory: '.total__filtered-category > .category',
  searchInput: '.total__search-input',
  searchItemsContainer: '.total__search-items',
  searchContainer: '.total__search',
  searchFindBtn: '.total__search-btn',
  productsEmptyMessage: '.total__products-empty-message',
};

// selectors
const sels = {};
for (const [key, value] of Object.entries(clss)) {
  if (qs(value) !== null) sels[key] = qs(value);
}

export { clss, sels };
