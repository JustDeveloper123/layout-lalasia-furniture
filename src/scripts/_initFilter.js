import { findSearchedItems } from './_initSearch';
import { bigFirstLetter, displayProducts, getFilterOption, updateFilteredInfo } from './_productsFunctionality';
import { sels } from './selectors';

// Filter elements
const filterBtn = sels.filterBtn;
const filterOverlay = sels.filterOverlay;
const filterCloseBtn = sels.filterCloseBtn;
const filterOptionsContainer = sels.filterOptionsContainer;

// ===================================== //
// ===================================== //
// ===================================== //

// Opening popup
function openPopup() {
  filterOverlay.classList.add('_active');
  document.body.classList.add('_scroll-lock');

  if (!filterOverlay.hasAttribute('style')) {
    filterOverlay.style.transition = 'visibility 0.4s ease 0s, opacity 0.4s ease 0s'; // set appearance transition to fix style bugs
  }
}

// Closing popup
function closePopup() {
  filterOverlay.classList.remove('_active');
  document.body.classList.remove('_scroll-lock');
}

// Click outside
function clickOutside(e) {
  const overlayTarget = e.target.classList.contains('filter-popup');
  if (overlayTarget) closePopup();
}

// Scroll to the products container
function scrollToProductsContainer() {
  const headerHeight = sels.header.offsetHeight;
  const titleRowCoordsY = sels.productsTitleRow.offsetTop;
  const coordsY = titleRowCoordsY - headerHeight;

  window.scrollTo({
    top: coordsY,
    behavior: 'smooth',
  });

  return coordsY;
}

// Toggling active class for filter button
function toggleActiveFilterBtn(category) {
  if (category === 'none') filterBtn.classList.remove('_active-filter');
  else filterBtn.classList.add('_active-filter');

  return filterBtn;
}

// Filter changing
function changeFilter(target, products) {
  if (!target) return; // If category target exist

  // Changing active option
  document.querySelectorAll('.filter-popup__option').forEach(option => option.classList.remove('_active-option'));
  target.classList.add('_active-option');

  // Changing filter
  const filter = getFilterOption(target);
  closePopup();
  toggleActiveFilterBtn(filter);
  scrollToProductsContainer();

  // If filter equals 'none'
  if (filter === 'none') {
    return findSearchedItems(products);
  }

  // If filter does not equal 'none':
  const filteredProducts = products.map(product => (product.category === filter ? product : false)).filter(product => !!product);
  return findSearchedItems(filteredProducts);
}

// ===================================== //
// ===================================== //
// ===================================== //

// Filter initialization
const initFilter = async function (products) {
  const setFilterProperties = function () {
    const filterNames = products.map(product => product.category);
    const uniqueFilterNames = new Set(filterNames);

    // Display filter properties
    uniqueFilterNames.forEach(name => {
      filterOptionsContainer.innerHTML += `<div class="filter-popup__option">
        <p class="filter-popup__option-text">${bigFirstLetter(name)}</p>
      </div>`;
    });

    return uniqueFilterNames;
  };
  await setFilterProperties();

  // ===================================== //
  // ===================================== //
  // ===================================== //

  const setPropertiesChanging = function (e) {
    const target = e.target.closest('.filter-popup__option');
    if (!target) return; // return if target is wrong

    if (!target.classList.contains('_active-option')) {
      return changeFilter(target, products);
    }
  };

  // ===================================== //
  // ===================================== //
  // ===================================== //

  // Event delegation on filter options container
  filterOptionsContainer.addEventListener('click', setPropertiesChanging);

  // Filter popup events
  filterBtn.addEventListener('click', openPopup);
  filterCloseBtn.addEventListener('click', closePopup);
  window.addEventListener('click', clickOutside);

  window.addEventListener('keydown', e => {
    e.key === 'Escape' && closePopup();
  });

  // ===================================== //

  return filterOverlay;
};

export { changeFilter };
export default initFilter;
