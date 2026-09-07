/**
 * ==========================================================================
 * FORNO & FIAMMA - SCROLL REVEALS & SENSORY ANIMATIONS
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * IntersectionObserver for Scroll Reveals
   */
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /**
   * Number Counters Animation
   */
  function initCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetStr = el.getAttribute('data-count');
          const suffix = el.getAttribute('data-suffix') || '';
          const target = parseFloat(targetStr);
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * target);

            el.textContent = `${current}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => observer.observe(el));
  }

  /**
   * Flavor Profile Progress Bar Fill
   */
  function initProfileBars() {
    const bars = document.querySelectorAll('.profile-progress-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-fill') || '90%';
          bar.style.width = width;
          obs.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    bars.forEach(bar => observer.observe(bar));
  }

  // Active nav tracking is managed comprehensively by initPageActiveNav in main.js


  // Document Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveals();
      initCounters();
      initProfileBars();
    });
  } else {
    initScrollReveals();
    initCounters();
    initProfileBars();
  }
})();
