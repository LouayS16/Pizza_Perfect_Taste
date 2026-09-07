/**
 * ==========================================================================
 * PIZZA PERFECT TASTE - PRODUCT DETAILS CONTROLLER
 * ==========================================================================
 */

(function () {
  'use strict';

  function initProductPage() {
    const items = window.MENU_ITEMS || [];
    if (!items.length) {
      setTimeout(initProductPage, 50);
      return;
    }

    // 1. Get Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'pizza-tartufo';

    // 2. Find Item in Database
    let product = items.find(i => i.id === productId);
    if (!product) {
      product = items[0] || {
        id: 'pizza-tartufo',
        category: 'signature',
        title: 'Tartufo Reale and Burrata',
        price: 28.50,
        badge: "Chef's Pick",
        badgeIcon: 'fa-solid fa-crown',
        badgeType: '',
        description: 'Umbrian black truffle shavings, creamy Pugliese burrata, Fior di Latte, aged parmigiano and cold-pressed white truffle oil.',
        tags: 'Truffle • Burrata • 48h Fermented',
        image: 'Assets/images/pizza-tartufo.jpg'
      };
    }

    // 3. Update Document Title
    document.title = 'Pizza Perfect Taste';

    // 4. Update Breadcrumb
    const breadcrumbEl = document.getElementById('breadcrumb-current-item');
    if (breadcrumbEl) breadcrumbEl.textContent = product.title;

    // 5. Update Photography & Single Badge
    const masterImg = document.getElementById('product-master-img');
    if (masterImg) {
      masterImg.src = product.image;
      masterImg.alt = product.title;
    }

    const badgeEl = document.getElementById('product-badge');
    const badgeIconEl = document.getElementById('product-badge-icon');
    const badgeTextEl = document.getElementById('product-badge-text');
    if (badgeEl) {
      if (product.badge) {
        badgeEl.className = `card-badge ${product.badgeType || ''}`;
        badgeEl.style.display = 'inline-flex';
        if (badgeIconEl) badgeIconEl.className = product.badgeIcon || 'fa-solid fa-crown';
        if (badgeTextEl) badgeTextEl.textContent = product.badge;
      } else {
        const prepMap = window.PREP_LABELS || {};
        badgeEl.className = 'card-badge';
        badgeEl.style.display = 'inline-flex';
        if (badgeIconEl) badgeIconEl.className = 'fa-solid fa-fire';
        if (badgeTextEl) badgeTextEl.textContent = prepMap[product.category] || '48H BIGA';
      }
    }

    // 6. Update Meta & Header
    const categoryEl = document.getElementById('product-category');
    if (categoryEl) {
      const catMap = window.CATEGORY_LABELS || {};
      categoryEl.textContent = catMap[product.category] || 'NEAPOLITAN MASTERPIECE';
    }

    const titleEl = document.getElementById('product-title');
    if (titleEl) titleEl.textContent = product.title;

    const priceValEl = document.getElementById('product-price-val');
    if (priceValEl) priceValEl.textContent = product.price.toFixed(2);

    const descEl = document.getElementById('product-description');
    if (descEl) {
      descEl.textContent = product.description;
    }

    // 7. Render Visual Ingredient Chips
    const chipsContainer = document.getElementById('product-chips-container');
    if (chipsContainer) {
      const tagList = (product.tags || '').split('•').map(t => t.trim()).filter(Boolean);
      const getIcon = window.getChipIcon || (() => 'fa-solid fa-circle-check');

      chipsContainer.innerHTML = tagList.map(tag => `
        <div class="product-chip-card">
          <i class="${getIcon(tag)}"></i>
          <span>${tag}</span>
        </div>
      `).join('');
    }

    // 8. Dynamic Sommelier Pairing
    const pairingTextEl = document.getElementById('product-pairing-text');
    if (pairingTextEl) {
      if (product.category === 'signature' || product.category === 'classic') {
        pairingTextEl.textContent = 'Expert Sommelier Pairing: Chianti Classico DOCG Riserva 2021 or Birra Baladin Nazionale Italian Craft Ale.';
      } else if (product.category === 'antipasti') {
        pairingTextEl.textContent = 'Expert Sommelier Pairing: Blood Orange & Amaro Spritz or chilled Prosecco Superiore DOCG Valdobbiadene.';
      } else if (product.category === 'dolci') {
        pairingTextEl.textContent = 'Expert Sommelier Pairing: Double Illy Espresso, Disaronno Amaretto, or Limoncello di Sorrento Ghiacciato.';
      } else {
        pairingTextEl.textContent = 'Expert Sommelier Pairing: Chef’s trio of wood-fired slices and artisanal Ligurian olive tapenade.';
      }
    }

    // 9. Quantity Selector & Master Order Action
    let currentQty = 1;
    const qtyDisplay = document.getElementById('qty-display');
    const qtyDecBtn = document.getElementById('qty-decrement');
    const qtyIncBtn = document.getElementById('qty-increment');
    const addBtn = document.getElementById('product-add-to-cart-btn');
    const addBtnText = document.getElementById('product-add-btn-text');

    function updateActionPrice() {
      if (qtyDisplay) qtyDisplay.textContent = currentQty;
      if (addBtnText) {
        const total = (product.price * currentQty).toFixed(2);
        addBtnText.textContent = `ADD TO ORDER • $${total}`;
      }
    }

    if (qtyDecBtn) {
      qtyDecBtn.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty -= 1;
          updateActionPrice();
        }
      });
    }

    if (qtyIncBtn) {
      qtyIncBtn.addEventListener('click', () => {
        if (currentQty < 20) {
          currentQty += 1;
          updateActionPrice();
        }
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (window.addItemToCart) {
          window.addItemToCart(product.id, currentQty);
        }
        if (window.toggleCartDrawer) {
          setTimeout(() => window.toggleCartDrawer(true), 350);
        }
      });
    }

    updateActionPrice();

    // 10. Render Related / Recommended Dishes
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
      const relatedItems = items
        .filter(i => i.id !== product.id)
        .slice(0, 2);

      const catMap = window.CATEGORY_LABELS || {};
      const prepMap = window.PREP_LABELS || {};
      const getIcon = window.getChipIcon || (() => 'fa-solid fa-circle-check');

      relatedGrid.innerHTML = relatedItems.map(item => {
        const tagList = (item.tags || '').split('•').map(t => t.trim()).filter(Boolean);
        const chipsHtml = tagList.map(tag => `
          <span class="menu-chip" title="${tag}">
            <i class="${getIcon(tag)}"></i>
            <span>${tag}</span>
          </span>
        `).join('');

        return `
          <article class="menu-card reveal-on-scroll revealed" data-id="${item.id}" role="button" tabindex="0" aria-label="View details for ${item.title}">
            <div class="card-image-wrap">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <div class="card-image-gradient-overlay" aria-hidden="true"></div>
              ${item.badge ? `
                <span class="card-badge ${item.badgeType || ''}">
                  <i class="${item.badgeIcon}"></i>
                  <span>${item.badge}</span>
                </span>
              ` : `
                <span class="card-badge">
                  <i class="fa-solid fa-fire"></i>
                  <span>${prepMap[item.category] || '48H BIGA'}</span>
                </span>
              `}
            </div>
            <div class="card-body">
              <div class="card-header-group">
                <span class="card-category-tag">${catMap[item.category] || 'ARTISANAL'}</span>
                <h3 class="card-title">${item.title}</h3>
              </div>
              
              <div class="menu-chips-grid">
                ${chipsHtml}
              </div>

              <div class="card-footer">
                <div class="card-price-lockup">
                  <span class="card-price-cur">$</span>
                  <span class="card-price-val">${item.price.toFixed(2)}</span>
                </div>
                <button class="btn-add-order" data-add="${item.id}" aria-label="Add ${item.title} to order">
                  <i class="fa-solid fa-plus"></i>
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Add click listeners to related cards
      relatedGrid.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-add-order')) return;
          const id = card.getAttribute('data-id');
          if (id) {
            window.location.href = `product.html?id=${encodeURIComponent(id)}`;
          }
        });
      });

      relatedGrid.querySelectorAll('.btn-add-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-add');
          if (window.addItemToCart) window.addItemToCart(id);
        });
      });
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
  } else {
    initProductPage();
  }
})();
