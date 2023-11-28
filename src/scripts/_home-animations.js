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

// # Benefits

gsap.from('.benefits', {
  scrollTrigger: {
    trigger: '.benefits',
    start: '-30% center',
  },
  opacity: 0,
  y: 300,
  duration: 1.2,
});
gsap.from('.benefits__block', {
  scrollTrigger: {
    trigger: '.benefits',
    start: 'top 55%',
  },
  opacity: 0,
  y: 100,
  duration: 0.8,
  stagger: 0.5,
});

//# Popular product

gsap.from('.popular__slider', {
  scrollTrigger: {
    trigger: '.popular',
    start: 'top bottom',
    end: 'center 10vh',
    scrub: true,
  },
  scale: 0.5,
  opacity: 0,
  transformOrigin: 'bottom center',
});

gsap.from('.popular .container', {
  scrollTrigger: {
    trigger: '.popular',
    start: 'top bottom',
    end: '+=80%',
    scrub: true,
  },
  transformOrigin: 'right bottom',
  rotate: '-45',
});

//# Our product

//# Testimonials

gsap.from('.testimonials .container', {
  scrollTrigger: {
    trigger: '.testimonials',
    start: '20% bottom',
    end: '80%',
    scrub: true,
  },
  x: '-50%',
});
gsap.from('.testimonials__slider', {
  scrollTrigger: {
    trigger: '.testimonials__slider',
    start: 'top bottom',
    end: '100%',
    scrub: true,
  },
  y: 400,
});

//# Articles

gsap.from('.articles__main-block', {
  scrollTrigger: {
    trigger: '.articles .container',
    start: 'center bottom',
    end: '80%',
    scrub: true,
  },
  x: -600,
});
gsap.from('.articles__article-slider', {
  scrollTrigger: {
    trigger: '.articles .container',
    start: 'center bottom',
    end: '80%',
    scrub: true,
  },
  x: 600,
});
