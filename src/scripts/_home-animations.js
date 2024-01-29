import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

//# Intro

const introTL = gsap.timeline();

introTL
  .fromTo(
    '.intro__title',
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.3,
    },
    0.2,
  )
  .fromTo(
    '.intro__title-decor',
    {
      y: 150,
      x: 100,
    },
    {
      y: 0,
      x: 0,
      duration: 1.3,
    },
    0.2,
  )
  .fromTo(
    '.intro__description',
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.7,
    },
    0.8,
  )
  .fromTo(
    '.intro__description-arrow',
    {
      scale: 1.3,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
    },
    1.5,
  )
  .fromTo(
    '.intro__search',
    {
      y: 100,
      opacity: 0,
      transformOrigin: 'right bottom',
      rotate: 350,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      rotate: 360,
    },
    0.4,
  )
  .fromTo(
    '.intro__img',
    {
      y: 100,
      opacity: 0,
      scale: 0.6,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
    },
    0.2,
  )
  .fromTo(
    '.header__icons',
    {
      y: -20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
    },
    0.5,
  );
gsap.fromTo(
  '.intro__search',
  {
    yPercent: 0,
  },
  {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      scrub: true,
    },
    yPercent: 500,
  },
);
gsap.fromTo(
  '.intro__img img',
  {
    scale: 1,
  },
  {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      scrub: true,
    },
    scale: 1.15,
  },
);
