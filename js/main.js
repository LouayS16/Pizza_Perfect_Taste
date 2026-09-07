/**
 * ==========================================================================
 * FORNO & FIAMMA - MAIN APPLICATION SCRIPT
 * ==========================================================================
 */

(function () {
  'use strict';

  // DOM Elements
  const reservationForm = document.getElementById('reservation-form');
  const dateInput = document.getElementById('res-date');
  const newsletterForm = document.getElementById('newsletter-form');
  const toastContainer = document.getElementById('toast-container');

  /**
   * Toast Notification Dispatcher (Sleek Top-Center Dynamic Pill with Contextual Icons)
   */
  const ICON_MAP = [
    { match: /added|dish|slice|pizza/i, icon: 'fa-solid fa-pizza-slice' },
    { match: /cart is empty|empty/i, icon: 'fa-solid fa-basket-shopping' },
    { match: /received|success|confirmed/i, icon: 'fa-solid fa-circle-check' },
    { match: /table|reserved|reservation/i, icon: 'fa-solid fa-calendar-check' },
    { match: /vip|privilege|access/i, icon: 'fa-solid fa-crown' },
    { match: /reset|sent|link|joined|subscribed|email/i, icon: 'fa-solid fa-paper-plane' },
    { match: /please|enter|incomplete|warning|error/i, icon: 'fa-solid fa-circle-exclamation' }
  ];

  function getToastIcon(title, customIcon) {
    if (customIcon && customIcon.includes('fa-')) return customIcon;
    const found = ICON_MAP.find(m => m.match.test(title));
    return found ? found.icon : 'fa-solid fa-fire-flame-curved';
  }

  window.showToast = function (title, customIcon) {
    if (!toastContainer) return;

    // Clear any existing visible toasts for smooth single-pill dynamic island experience
    const activeToasts = toastContainer.querySelectorAll('.toast');
    activeToasts.forEach(t => {
      t.classList.remove('show');
      setTimeout(() => {
        if (t.parentNode) t.parentNode.removeChild(t);
      }, 200);
    });

    const iconClass = getToastIcon(title, customIcon);
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <i class="${iconClass}"></i>
      </div>
      <span class="toast-title">${title}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger entrance transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 2.8s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }, 2800);
  };

  /**
   * Table Reservation System
   */
  function initReservation() {
    if (!reservationForm) return;

    // Set today as minimum selectable date
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value.trim();
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;

      if (!name) {
        window.showToast('Please Enter Name', 'fa-solid fa-circle-exclamation');
        return;
      }

      window.showToast('Table Reserved', 'fa-solid fa-calendar-check');

      reservationForm.reset();
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    });
  }

  /**
   * Newsletter Subscription
   */
  function initNewsletter() {
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        window.showToast('Privilege Club Joined', 'fa-solid fa-crown');
        newsletterForm.reset();
      }
    });
  }

  /**
   * Set and maintain the active navbar button for the current page.
   * On Home page: Home remains the sole active highlighted button across all scroll depths.
   * On Subpages (About, Menu, Offers): the respective page is active.
   */
  function initPageActiveNav() {
    const path = window.location.pathname.toLowerCase();
    const isAbout = path.includes('about.html') || path.includes('/about');
    const isMenu = path.includes('menu.html') || path.includes('/menu') || path.includes('product.html') || path.includes('/product');
    const isOffers = path.includes('offers.html') || path.includes('/offers');

    let activePage = 'index.html';
    if (isAbout) activePage = 'about.html';
    else if (isMenu) activePage = 'menu.html';
    else if (isOffers) activePage = 'offers.html';

    const desktopLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    desktopLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (
        href === activePage ||
        (activePage === 'index.html' && (href === 'index.html' || href === '' || href === '/' || href === './'))
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (
        href === activePage ||
        (activePage === 'index.html' && (href === 'index.html' || href === '' || href === '/' || href === './'))
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Smooth scroll to top when clicking Home link on Home page
    if (activePage === 'index.html') {
      desktopLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === 'index.html' || href === './' || href === '/' || href === '') {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });

      mobileLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === 'index.html' || href === './' || href === '/' || href === '') {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });
    }
  }

  /**
   * VIP Member Login Modal Interaction
   */
  function initLoginHandler() {
    const loginModal = document.getElementById('login-modal');
    const loginModalBackdrop = document.getElementById('login-modal-backdrop');
    const loginCloseBtn = document.getElementById('login-modal-close');
    const loginForm = document.getElementById('vip-login-form');
    const pwToggle = document.getElementById('login-pw-toggle');
    const pwInput = document.getElementById('login-password');
    const pwIcon = document.getElementById('login-pw-icon');
    const forgotLink = document.getElementById('login-forgot-link');
    const joinLink = document.getElementById('login-join-link');
    const loginBtns = document.querySelectorAll('.nav-login-btn, #nav-login-btn');

    function openLoginModal() {
      if (!loginModal || !loginModalBackdrop) return;
      loginModalBackdrop.classList.add('open');
      loginModal.classList.add('open');
      loginModal.setAttribute('aria-hidden', 'false');
      loginModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const emailInput = document.getElementById('login-email');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 150);
      }
    }

    function closeLoginModal() {
      if (!loginModal || !loginModalBackdrop) return;
      loginModalBackdrop.classList.remove('open');
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
      loginModalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Expose login modal controllers globally
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;

    // Delegated click listener for all login buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-login-btn, #nav-login-btn, .mobile-login-btn, #mobile-drawer-login-btn, [data-open-login]');
      if (btn) {
        e.preventDefault();
        openLoginModal();
      }
    });

    if (loginCloseBtn) {
      loginCloseBtn.addEventListener('click', closeLoginModal);
    }

    if (loginModalBackdrop) {
      loginModalBackdrop.addEventListener('click', closeLoginModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal && loginModal.classList.contains('open')) {
        closeLoginModal();
      }
    });

    if (pwToggle && pwInput && pwIcon) {
      pwToggle.addEventListener('click', () => {
        const isPw = pwInput.type === 'password';
        pwInput.type = isPw ? 'text' : 'password';
        pwIcon.className = isPw ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      });
    }

    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.showToast('Reset Link Sent');
      });
    }

    if (joinLink) {
      joinLink.addEventListener('click', () => {
        closeLoginModal();
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeLoginModal();
        window.showToast('VIP Access Granted');
        loginForm.reset();
        if (pwInput && pwIcon) {
          pwInput.type = 'password';
          pwIcon.className = 'fa-solid fa-eye';
        }
      });
    }
  }

  /**
   * Smooth Scroll for In-Page Anchors
   */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') {
          // If it's a placeholder link that is not login, prevent jump
          if (!this.classList.contains('nav-login-btn')) {
            e.preventDefault();
          }
          return;
        }

        try {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const navOffset = 65;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        } catch (err) {
          // In case targetId is not a valid CSS selector
        }
      });
    });
  }

  /**
   * Back-to-Top Floating Button
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize all
  document.addEventListener('DOMContentLoaded', () => {
    initPageActiveNav();
    initLoginHandler();
    initReservation();
    initNewsletter();
    initSmoothAnchors();
    initBackToTop();
  });
})();

