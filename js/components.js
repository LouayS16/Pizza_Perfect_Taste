/**
 * ==========================================================================
 * PIZZA PERFECT TASTE - UNIFIED COMPONENT SYSTEM
 * ==========================================================================
 * Auto-discovers and mounts:
 * 1. <site-navbar> or <div id="navbar-mount"> or existing #main-navbar
 * 2. <interactive-hero> or <div id="hero-mount"> or existing #hero-scroll-track
 */

(function () {
  'use strict';

  function autoInitComponents() {
    window.PizzaComponents = window.PizzaComponents || {};

    // 1. Auto-mount Navbar if placeholder exists
    const navbarMount = document.getElementById('navbar-mount') || document.querySelector('[data-component="navbar"]');
    if (navbarMount && window.PizzaComponents.createNavbar) {
      const active = navbarMount.getAttribute('data-active') || 'auto';
      window.PizzaComponents.createNavbar(navbarMount, { active });
    }

    // 2. Auto-mount Hero if placeholder exists
    const heroMount = document.getElementById('hero-mount') || document.querySelector('[data-component="hero"]');
    if (heroMount && window.PizzaComponents.createInteractiveHero) {
      const videoSrc = heroMount.getAttribute('data-video') || 'Assets/hero.mp4';
      const ctaLink = heroMount.getAttribute('data-cta-link') || '#menu';
      const ctaText = heroMount.getAttribute('data-cta-text') || 'ORDER NOW';
      window.PizzaComponents.createInteractiveHero(heroMount, {
        videoSrc,
        ctaLink,
        ctaText
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitComponents);
  } else {
    autoInitComponents();
  }
})();
