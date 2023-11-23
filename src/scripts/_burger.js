import { clss, sels } from './selectors.js';

const burger = sels.burger;
const burgerBtn = sels.burgerBtn;

const activeClass = clss.burgerActive;
const activeClassBtn = activeClass;

const open = function () {
  burger.classList.add(activeClass);
  burgerBtn.classList.add(activeClassBtn);
  sels.overlay.classList.remove(clss.overlayActive);
  document.body.classList.add('_scroll-lock');
  return burger;
};
const close = function () {
  burger.classList.remove(activeClass);
  burgerBtn.classList.remove(activeClassBtn);
  sels.overlay.classList.add(clss.overlayActive);
  document.body.classList.remove('_scroll-lock');
  return burger;
};
const toggle = () => (burger.classList.contains(activeClass) ? close() : open());

burgerBtn.addEventListener('click', toggle);

const clickOutside = function (e) {
  if (sels.burger.classList.contains(clss.activeClass)) return;

  const target = e.target;
  const isClickOnOverlay = target.closest(clss.overlay);

  if (isClickOnOverlay) close();

  return isClickOnOverlay;
};

window.addEventListener('click', clickOutside);
