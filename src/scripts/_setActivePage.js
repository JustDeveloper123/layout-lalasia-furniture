import { clss, sels } from './selectors';
import setPageTitle from '/src/scripts/_setPageTitle.js';

const activePage = sels.header.dataset.activePage;

const headerLinks = Array.from(document.querySelectorAll(clss.headerLink));
const headerLinksValue = headerLinks.map(link => link.textContent);

const setActivePage = function () {
  const activePageResult = headerLinksValue.find(value => value.toLowerCase() === activePage);

  if (!activePageResult) return;

  //# Set page title
  setPageTitle(activePageResult);

  const activePageEl = headerLinks.find(link => link.textContent.toLowerCase() === activePageResult.toLowerCase());

  activePageEl.classList.add(clss.headerPageActive);
};
setActivePage();
