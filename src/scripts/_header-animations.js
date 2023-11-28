import { gsap } from 'gsap';

const tl = gsap.timeline();

tl.fromTo(
  '.header__logo svg',
  {
    x: -50,
  },
  {
    x: 0,
  },
);
tl.fromTo(
  '.header__link span',
  {
    y: -50,
  },
  {
    y: 0,
    stagger: 0.15,
  },
);
