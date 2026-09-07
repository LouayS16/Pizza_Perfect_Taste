/**
 * ==========================================================================
 * PIZZA PERFECT TASTE - REUSABLE NAVBAR COMPONENT
 * ==========================================================================
 * Modular, Accessible, and Reactive Navbar & Mobile Drawer Component.
 * Supports programmatic creation, custom elements (<site-navbar>),
 * and container mounting (<div id="navbar-mount" data-active="home"></div>).
 */

(function () {
  'use strict';

  const DEFAULT_LINKS = [
    { label: 'Home', href: 'index.html', id: 'home', icon: 'fa-solid fa-house' },
    { label: 'About Us', href: 'about.html', id: 'about', icon: 'fa-solid fa-fire-burner' },
    { label: 'Menu', href: 'menu.html', id: 'menu', icon: 'fa-solid fa-pizza-slice' },
    { label: 'Special', href: 'offers.html', id: 'offers', icon: 'fa-solid fa-tags' }
  ];

  class SiteNavbar {
    constructor(options = {}) {
      this.options = Object.assign({
        brandLogo: 'Assets/images/logo-perfect-taste.png',
        brandAlt: 'Pizza Perfect Taste Artisanal Logo',
        brandHref: 'index.html',
        active: 'home',
        links: DEFAULT_LINKS,
        showCart: true,
        showLogin: true,
        reservationHref: 'index.html#reservation',
        mountTarget: null
      }, options);

      this.element = null;
      this.drawerElement = null;
      this.overlayElement = null;
      this.isOpen = false;
    }

    /**
     * Determine active page identifier based on current URL or passed active prop
     */
    detectActiveId() {
      if (this.options.active && this.options.active !== 'auto') {
        return this.options.active.toLowerCase();
      }
      const path = window.location.pathname.toLowerCase();
      if (path.includes('about.html') || path.includes('/about')) return 'about';
      if (path.includes('menu.html') || path.includes('/menu')) return 'menu';
      if (path.includes('offers.html') || path.includes('/offers')) return 'offers';
      if (path.includes('product.html') || path.includes('/product')) return 'menu';
      return 'home';
    }

    /**
     * Generate Navbar HTML Template
     */
    renderHTML() {
      const activeId = this.detectActiveId();

      const desktopLinksHtml = this.options.links.map(link => {
        const isActive = link.id === activeId || (activeId === 'home' && (link.id === 'home' || link.href === 'index.html'));
        return `<a href="${link.href}" class="nav-link ${isActive ? 'active' : ''}" data-nav-id="${link.id}">${link.label}</a>`;
      }).join('\n          ');

      const mobileLinksHtml = this.options.links.map(link => {
        const isActive = link.id === activeId || (activeId === 'home' && (link.id === 'home' || link.href === 'index.html'));
        return `<a href="${link.href}" class="mobile-nav-link ${isActive ? 'active' : ''}" data-nav-id="${link.id}"><i class="${link.icon}"></i> ${link.label}</a>`;
      }).join('\n      ');

      return `
        <header class="luxury-navbar" id="main-navbar" aria-label="Main Website Navigation">
          <div class="nav-container">
            <!-- Brand Logo -->
            <a href="${this.options.brandHref}" class="brand-logo" aria-label="Pizza Perfect Taste Home">
              <img src="${this.options.brandLogo}" alt="${this.options.brandAlt}" class="nav-brand-logo-img" />
            </a>

            <!-- Desktop Centered Navigation Pill -->
            <nav class="nav-links-wrapper" aria-label="Main Navigation">
              <div class="nav-center-pill">
                ${desktopLinksHtml}
              </div>
            </nav>

            <!-- Right Actions: Cart, Login, Mobile Hamburger -->
            <div class="nav-actions">
              ${this.options.showCart ? `
                <button class="btn-icon nav-cart-btn" id="cart-trigger-btn" aria-label="Open Order Cart" title="View Orders">
                  <i class="fa-solid fa-bag-shopping"></i>
                  <span class="cart-count-badge" id="cart-badge" style="display: none;"></span>
                </button>
              ` : ''}

              ${this.options.showLogin ? `
                <a href="#" class="btn-icon nav-login-btn" id="nav-login-btn" aria-label="Sign In / VIP Login" title="Sign In">
                  <i class="fa-solid fa-user"></i>
                </a>
              ` : ''}

              <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle Mobile Navigation Menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </header>

        
      `;
    }

    /**
     * Mount into DOM and attach events
     */
    mount(target) {
      const container = typeof target === 'string' ? document.querySelector(target) : target;
      if (!container) return this;

      container.innerHTML = this.renderHTML();
      this.element = container.querySelector('.luxury-navbar');
      this.drawerElement = container.querySelector('.mobile-nav-drawer') || document.getElementById('mobile-drawer');
      this.overlayElement = container.querySelector('.mobile-nav-overlay') || document.getElementById('mobile-nav-overlay');

      this.bindEvents();
      return this;
    }

    /**
     * Bind Mobile Drawer, Cart, and Active Link Events
     */
    bindEvents() {
      const hamburger = document.getElementById('nav-hamburger');
      const drawer = this.drawerElement || document.getElementById('mobile-drawer');
      const overlay = this.overlayElement || document.getElementById('mobile-nav-overlay');
      const closeBtn = document.getElementById('mobile-nav-close');
      const mobileLinks = document.querySelectorAll('.mobile-nav-link');

      const toggleDrawer = (open) => {
        const nextState = typeof open === 'boolean' ? open : !this.isOpen;
        this.isOpen = nextState;

        if (hamburger) hamburger.classList.toggle('active', this.isOpen);
        if (drawer) drawer.classList.toggle('open', this.isOpen);
        if (overlay) overlay.classList.toggle('active', this.isOpen);
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
      };

      if (hamburger) {
        hamburger.addEventListener('click', () => toggleDrawer());
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleDrawer(false));
      }

      if (overlay) {
        overlay.addEventListener('click', () => toggleDrawer(false));
      }

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
      });

      // Attach View Orders / Cart Trigger Button listener
      const cartBtn = document.getElementById('cart-trigger-btn') || document.querySelector('.nav-cart-btn');
      if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.toggleCartDrawer) {
            window.toggleCartDrawer(true);
          }
        });
      }

      // Synchronize Cart Badge with menu-data.js if available
      if (window.updateCartUI) {
        window.updateCartUI();
      }
    }

    /**
     * Programmatically update active navigation item
     */
    setActive(activeId) {
      this.options.active = activeId;
      const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
      links.forEach(link => {
        const id = link.getAttribute('data-nav-id');
        link.classList.toggle('active', id === activeId);
      });
    }
  }

  // Factory function
  function createNavbar(mountSelector, options = {}) {
    const navbar = new SiteNavbar(options);
    if (mountSelector) {
      navbar.mount(mountSelector);
    }
    return navbar;
  }

  // Web Component definition: <site-navbar active="home"></site-navbar>
  if (typeof customElements !== 'undefined' && !customElements.get('site-navbar')) {
    class SiteNavbarElement extends HTMLElement {
      connectedCallback() {
        const active = this.getAttribute('active') || 'auto';
        const brandLogo = this.getAttribute('logo') || 'Assets/images/logo-perfect-taste.png';
        const brandHref = this.getAttribute('brand-href') || 'index.html';
        const showCart = this.getAttribute('show-cart') !== 'false';
        const showLogin = this.getAttribute('show-login') !== 'false';

        const navbar = new SiteNavbar({
          active,
          brandLogo,
          brandHref,
          showCart,
          showLogin
        });

        navbar.mount(this);
      }
    }
    customElements.define('site-navbar', SiteNavbarElement);
  }

  // Global namespace exports
  window.PizzaComponents = window.PizzaComponents || {};
  window.PizzaComponents.Navbar = SiteNavbar;
  window.PizzaComponents.createNavbar = createNavbar;
  window.renderNavbar = createNavbar;
})();
