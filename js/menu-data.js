/**
 * ==========================================================================
 * PIZZA PERFECT TASTE - MENU DATA AND CART MANAGEMENT
 * ==========================================================================
 */

(function () {
  'use strict';

  // Menu database with rich icon badges
  const MENU_ITEMS = [
    {
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
    },
    {
      id: 'pizza-margherita',
      category: 'classic',
      title: 'Margherita D.O.P. Verace',
      price: 19.00,
      badge: 'Traditional',
      badgeIcon: 'fa-solid fa-leaf',
      badgeType: 'veg',
      description: 'San Marzano Solania D.O.P. crushed tomatoes, Buffalo Mozzarella Campana, fresh sweet basil and extra virgin olive oil.',
      tags: 'Vegetarian • San Marzano • D.O.P.',
      image: 'Assets/images/pizza-margherita.jpg'
    },
    {
      id: 'pizza-diavola',
      category: 'signature',
      title: 'Diavola Calabrese Piccante',
      price: 24.00,
      badge: 'Spicy',
      badgeIcon: 'fa-solid fa-pepper-hot',
      badgeType: 'spicy',
      description: 'Artisanal Calabrian spicy soppressata cups, roasted chili flakes, hot wildflower honey drizzle, Fior di Latte and smoked provola.',
      tags: 'Spicy • Hot Honey • Smoked Provola',
      image: 'Assets/images/pizza-diavola.jpg'
    },
    {
      id: 'pizza-prosciutto',
      category: 'signature',
      title: 'Prosciutto di Parma and Rucola',
      price: 26.50,
      badge: 'Aged 24 Mo',
      badgeIcon: 'fa-solid fa-award',
      badgeType: '',
      description: '24-month aged Prosciutto di Parma ribbons, organic baby arugula, shaved Parmigiano-Reggiano curls and 12-year Modena balsamic glaze.',
      tags: 'Parma Prosciutto • Arugula • Balsamic',
      image: 'Assets/images/pizza-prosciutto.jpg'
    },
    {
      id: 'antipasto-burrata',
      category: 'antipasti',
      title: 'Burrata Pugliese and Crostini',
      price: 18.00,
      badge: 'Antipasti',
      badgeIcon: 'fa-solid fa-cheese',
      badgeType: 'veg',
      description: 'Hand-tied fresh Italian burrata with sweet blistered heirloom tomatoes, Ligurian basil pesto and wood-fired garlic crostini.',
      tags: 'Puglia • Heirloom Tomatoes • Pesto',
      image: 'Assets/images/antipasto-burrata.jpg'
    },
    {
      id: 'dessert-tiramisu',
      category: 'dolci',
      title: 'Pistacchio Bronte Tiramisù',
      price: 14.00,
      badge: 'Handcrafted',
      badgeIcon: 'fa-solid fa-cookie-bite',
      badgeType: 'veg',
      description: 'Sicilian Bronte pistachio cream, delicate Savoiardi biscuits soaked in Illy espresso, velvety mascarpone and dark Dutch cocoa.',
      tags: 'Sicilian Pistachio • Illy Espresso • Dolci',
      image: 'Assets/images/dessert-tiramisu.jpg'
    },
    {
      id: 'cocktail-spritz',
      category: 'drinks',
      title: 'Blood Orange and Amaro Spritz',
      price: 16.00,
      badge: 'Signature',
      badgeIcon: 'fa-solid fa-martini-glass-citrus',
      badgeType: '',
      description: 'Select Aperitivo, Sicilian blood orange reduction, Prosecco Superiore Valdobbiadene, sparkling soda and fresh garden rosemary.',
      tags: 'Aperitivo • Blood Orange • Craft Spritz',
      image: 'Assets/images/cocktail-spritz.jpg'
    },
    {
      id: 'offer-banchetto',
      category: 'signature',
      title: 'Il Banchetto Reale Experience',
      price: 78.00,
      badge: 'Tasting Set',
      badgeIcon: 'fa-solid fa-champagne-glasses',
      badgeType: '',
      description: 'Truffle and Burrata Pizza, Prosciutto Pizza, Pugliese Burrata starter, 2x Pistachio Tiramisù and 2x crystal glasses of Chianti Classico.',
      tags: 'Full Feast • For Two • Sommelier Paired',
      image: 'Assets/images/offer-feast.jpg'
    },
    {
      id: 'pizza-quattro-formaggi',
      category: 'classic',
      title: 'Quattro Formaggi D.O.P.',
      price: 25.00,
      badge: '4 Cheeses',
      badgeIcon: 'fa-solid fa-cheese',
      badgeType: 'veg',
      description: 'Fior di Latte, Gorgonzola Dolce D.O.P., smoked provola, aged 24-month Parmigiano-Reggiano and wildflower honey drizzle.',
      tags: 'Gorgonzola • Parmigiano 24Mo • Honey',
      image: 'Assets/images/pizza-margherita.jpg'
    },
    {
      id: 'pizza-capricciosa',
      category: 'signature',
      title: 'Capricciosa Rustica al Forno',
      price: 24.50,
      badge: 'Artisanal',
      badgeIcon: 'fa-solid fa-fire',
      badgeType: '',
      description: 'San Marzano tomatoes, wood-fired mushrooms, grilled artichoke hearts, Taggiasca olives, Fior di Latte and Prosciutto Cotto.',
      tags: 'Artichokes • Wild Mushrooms • Olives',
      image: 'Assets/images/pizza-prosciutto.jpg'
    },
    {
      id: 'pizza-calzone-napoletano',
      category: 'antipasti',
      title: 'Calzone Tradizionale Napoletano',
      price: 23.00,
      badge: 'Stuffed Hearth',
      badgeIcon: 'fa-solid fa-bread-slice',
      badgeType: '',
      description: 'Folded sourdough crust stuffed with sweet sheep ricotta, smoked provola, spicy salame napoli and San Marzano reduction.',
      tags: 'Ricotta • Salame Napoli • Smoked Provola',
      image: 'Assets/images/pizza-diavola.jpg'
    },
    {
      id: 'pizza-marinara',
      category: 'classic',
      title: 'Marinara Verace Antica',
      price: 16.50,
      badge: 'Authentic 1734',
      badgeIcon: 'fa-solid fa-seedling',
      badgeType: 'veg',
      description: 'San Marzano Solania D.O.P., sliced garlic cloves, wild Sicilian mountain oregano and cold-pressed extra virgin olive oil.',
      tags: 'San Marzano • Wild Oregano • Garlic',
      image: 'Assets/images/pizza-margherita.jpg'
    },
    {
      id: 'antipasto-arancini',
      category: 'antipasti',
      title: 'Arancini al Tartufo and Mozzarella',
      price: 17.00,
      badge: 'Crispy Antipasto',
      badgeIcon: 'fa-solid fa-star',
      badgeType: 'veg',
      description: 'Golden saffron risotto spheres with a molten Fior di Latte core, shaved summer truffle and creamy black garlic aioli.',
      tags: 'Saffron • Black Truffle Aioli • Mozzarella',
      image: 'Assets/images/antipasto-burrata.jpg'
    },
    {
      id: 'dessert-cannoli',
      category: 'dolci',
      title: 'Cannoli Siciliani Artigianali',
      price: 13.50,
      badge: 'Handcrafted',
      badgeIcon: 'fa-solid fa-cookie',
      badgeType: 'veg',
      description: 'Crispy Marsala pastry tubes filled with fresh Sicilian sheep ricotta, candied orange peel, dark chocolate pearls and Bronte pistachios.',
      tags: 'Sicilian Ricotta • Candied Orange • Pistachio',
      image: 'Assets/images/dessert-tiramisu.jpg'
    },
    {
      id: 'cocktail-negroni',
      category: 'drinks',
      title: 'Negroni Sbagliato Riserva',
      price: 17.50,
      badge: 'Cocktail',
      badgeIcon: 'fa-solid fa-glass-water',
      badgeType: '',
      description: 'Bitter Campari, Carpano Antica Formula sweet vermouth, topped with Prosecco Superiore DOCG and flamed orange peel.',
      tags: 'Campari • Carpano Vermouth • Prosecco DOCG',
      image: 'Assets/images/cocktail-spritz.jpg'
    },
    {
      id: 'drink-limoncello',
      category: 'drinks',
      title: 'Limoncello di Sorrento Ghiacciato',
      price: 12.00,
      badge: 'Digestivo',
      badgeIcon: 'fa-solid fa-lemon',
      badgeType: 'veg',
      description: 'Artisanal organic Sorrento lemon digestivo, cold-infused for 40 days, served ice-frosted in crystal tasting flutes.',
      tags: 'Sorrento Lemons • Cold-Infused • Digestivo',
      image: 'Assets/images/cocktail-spritz.jpg'
    },
    {
      id: 'pizza-bufalina',
      category: 'classic',
      title: 'Bufalina Campana D.O.P.',
      price: 22.00,
      badge: 'Buffalo Mozzarella',
      badgeIcon: 'fa-solid fa-medal',
      badgeType: 'veg',
      description: 'Campania Buffalo Mozzarella D.O.P., San Marzano tomatoes, fresh sweet basil leaves and organic extra virgin olive oil.',
      tags: 'Buffalo D.O.P. • Sweet Basil • Classic',
      image: 'Assets/images/pizza-margherita.jpg'
    },
    {
      id: 'pizza-boscaiola',
      category: 'signature',
      title: 'Boscaiola al Tartufo and Salsiccia',
      price: 25.50,
      badge: 'Wood Smoked',
      badgeIcon: 'fa-solid fa-tree',
      badgeType: '',
      description: 'Tuscan fennel sausage, wild porcini mushrooms, Fior di Latte, black truffle cream drizzle and fresh thyme.',
      tags: 'Porcini • Fennel Sausage • Truffle Cream',
      image: 'Assets/images/pizza-tartufo.jpg'
    },
    {
      id: 'antipasto-polpette',
      category: 'antipasti',
      title: 'Polpette al Sugo di San Marzano',
      price: 16.50,
      badge: 'Heritage',
      badgeIcon: 'fa-solid fa-utensils',
      badgeType: '',
      description: 'Slow-simmered veal and prime beef meatballs in rich San Marzano D.O.P. sauce with salted sheep ricotta and grilled focaccia.',
      tags: 'Veal and Beef • San Marzano • Sheep Ricotta',
      image: 'Assets/images/antipasto-burrata.jpg'
    },
    {
      id: 'antipasto-carpaccio',
      category: 'antipasti',
      title: 'Carpaccio di Manzo and Parmigiano',
      price: 19.50,
      badge: 'Prime Beef',
      badgeIcon: 'fa-solid fa-gem',
      badgeType: '',
      description: 'Paper-thin beef tenderloin, baby wild arugula, shaved 24-month Parmigiano-Reggiano, caper berries and white truffle citronette.',
      tags: 'Beef Tenderloin • Truffle Citronette • 24Mo Parmigiano',
      image: 'Assets/images/pizza-prosciutto.jpg'
    },
    {
      id: 'dessert-affogato',
      category: 'dolci',
      title: 'Affogato al Caffè and Amaretto',
      price: 11.50,
      badge: 'Illy Espresso',
      badgeIcon: 'fa-solid fa-mug-hot',
      badgeType: 'veg',
      description: 'Velvety artisanal Fior di Latte gelato drowned in freshly pulled double Illy espresso and Disaronno Amaretto liqueur.',
      tags: 'Fior di Latte Gelato • Illy Espresso • Amaretto',
      image: 'Assets/images/dessert-tiramisu.jpg'
    },
    {
      id: 'dessert-pannacotta',
      category: 'dolci',
      title: 'Panna Cotta alla Vaniglia del Madagascar',
      price: 12.50,
      badge: 'Handcrafted',
      badgeIcon: 'fa-solid fa-heart',
      badgeType: 'veg',
      description: 'Silky Madagascar vanilla bean panna cotta served with wild mountain blackberry compote and mint crystals.',
      tags: 'Madagascar Vanilla • Mountain Berries • Dolci',
      image: 'Assets/images/dessert-tiramisu.jpg'
    },
    {
      id: 'cocktail-espressomartini',
      category: 'drinks',
      title: 'Espresso Martini all’Amaretto',
      price: 18.00,
      badge: 'Signature',
      badgeIcon: 'fa-solid fa-martini-glass',
      badgeType: '',
      description: 'Vodka, freshly brewed double espresso, Kahlúa, Disaronno Amaretto and whole roasted espresso beans.',
      tags: 'Double Espresso • Vodka • Amaretto',
      image: 'Assets/images/cocktail-spritz.jpg'
    },
    {
      id: 'cocktail-bellini',
      category: 'drinks',
      title: 'Bellini Reale alla Pesca di Verona',
      price: 16.50,
      badge: 'Venetian',
      badgeIcon: 'fa-solid fa-wine-glass',
      badgeType: 'veg',
      description: 'White Verona peach purée, wild raspberry float, topped with cold Prosecco Superiore DOCG Valdobbiadene.',
      tags: 'Verona White Peach • Prosecco DOCG • Bellini',
      image: 'Assets/images/cocktail-spritz.jpg'
    }
  ];

  const CART_STORAGE_KEY = 'forno_fiamma_cart_v2';

  // Page detection
  const isMenuPage = window.location.pathname.toLowerCase().includes('menu.html') || !!document.getElementById('menu-search-input');

  // Cart & Filter State
  let cart = loadCart();
  let currentCategory = 'all';
  let searchQuery = '';

  // DOM Elements
  const menuGrid = document.getElementById('menu-grid');
  const catButtons = document.querySelectorAll('.menu-cat-btn');
  const searchInput = document.getElementById('menu-search-input');
  const searchClearBtn = document.getElementById('menu-search-clear');
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsContainer = document.getElementById('cart-items-body');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTriggerBtn = document.getElementById('cart-trigger-btn');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // Storage unavailable or quota exceeded
    }
  }

  const ITEMS_PER_PAGE = 8;
  let currentPage = 1;

  const CATEGORY_LABELS = {
    signature: 'Signature Pizza',
    classic: 'Classic D.O.P.',
    antipasti: 'Artisan Antipasti',
    dolci: 'Haute Dolci',
    drinks: 'Craft Aperitivo'
  };

  const PREP_LABELS = {
    signature: '48H BIGA',
    classic: 'D.O.P. VERACE',
    antipasti: 'ARTISANAL',
    dolci: 'HANDMADE',
    drinks: 'CRAFT INFUSED'
  };

  function getChipIcon(tagText) {
    const t = tagText.toLowerCase();
    if (t.includes('truffle') || t.includes('tartufo')) return 'fa-solid fa-gem';
    if (t.includes('burrata') || t.includes('mozzarella') || t.includes('cheese') || t.includes('ricotta') || t.includes('gorgonzola') || t.includes('parmigiano') || t.includes('provola') || t.includes('fior di latte')) return 'fa-solid fa-cheese';
    if (t.includes('ferment') || t.includes('biga') || t.includes('wood') || t.includes('fired') || t.includes('hearth') || t.includes('crust')) return 'fa-solid fa-fire-flame-curved';
    if (t.includes('spicy') || t.includes('chili') || t.includes('diavola') || t.includes('soppressata') || t.includes('hot')) return 'fa-solid fa-pepper-hot';
    if (t.includes('honey') || t.includes('sauce') || t.includes('reduction') || t.includes('oil') || t.includes('balsamic')) return 'fa-solid fa-droplet';
    if (t.includes('basil') || t.includes('oregano') || t.includes('herb') || t.includes('veg') || t.includes('rucola') || t.includes('arugula') || t.includes('pesto') || t.includes('thyme') || t.includes('artichoke') || t.includes('mushroom') || t.includes('olive') || t.includes('porcini')) return 'fa-solid fa-leaf';
    if (t.includes('prosciutto') || t.includes('parma') || t.includes('beef') || t.includes('veal') || t.includes('salame') || t.includes('sausage') || t.includes('meat') || t.includes('cotto') || t.includes('meatball') || t.includes('carpaccio')) return 'fa-solid fa-drumstick-bite';
    if (t.includes('pistachio') || t.includes('tiramis') || t.includes('cannoli') || t.includes('vanilla') || t.includes('dolci') || t.includes('gelato') || t.includes('panna cotta') || t.includes('chocolate') || t.includes('pastry') || t.includes('cookie')) return 'fa-solid fa-cookie-bite';
    if (t.includes('spritz') || t.includes('martini') || t.includes('cocktail') || t.includes('campari') || t.includes('bellini') || t.includes('aperitivo') || t.includes('vodka') || t.includes('prosecco')) return 'fa-solid fa-martini-glass-citrus';
    if (t.includes('espresso') || t.includes('coffee') || t.includes('illy') || t.includes('caffè')) return 'fa-solid fa-mug-hot';
    if (t.includes('lemon') || t.includes('orange') || t.includes('peach') || t.includes('citrus') || t.includes('limoncello') || t.includes('berries') || t.includes('blackberry')) return 'fa-solid fa-lemon';
    if (t.includes('wine') || t.includes('chianti') || t.includes('bottle') || t.includes('docg')) return 'fa-solid fa-wine-bottle';
    if (t.includes('d.o.p') || t.includes('aged') || t.includes('verace') || t.includes('heritage') || t.includes('san marzano') || t.includes('campana') || t.includes('puglia') || t.includes('sicil')) return 'fa-solid fa-award';
    return 'fa-solid fa-circle-check';
  }

  /**
   * Render Menu Items
   */
  function renderMenu(category = currentCategory) {
    if (!menuGrid) return;
    currentCategory = category;

    // Filter by category
    let items = category === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === category);

    // Filter by search query if on menu page
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.toLowerCase().includes(q)
      );
    }

    const totalFiltered = items.length;

    // On home page, display the first page (8 products) with the same products as menu page 1
    if (!isMenuPage && items.length > ITEMS_PER_PAGE) {
      items = items.slice(0, ITEMS_PER_PAGE);
    }

    // On menu page, paginate items
    if (isMenuPage) {
      const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      items = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }

    if (totalFiltered === 0) {
      menuGrid.innerHTML = `
        <div class="menu-no-results-state">
          <i class="fa-solid fa-magnifying-glass fa-2x"></i>
          <h3>No Dishes Found</h3>
          <p>We couldn't find any dishes matching "${searchQuery}". Try searching for truffles, burrata, spritz, or view all creations.</p>
        </div>
      `;
      if (isMenuPage) renderPagination(0);
      if (window.updateMenuSliderArrows) window.updateMenuSliderArrows();
      return;
    }

    menuGrid.innerHTML = items.map(item => {
      const tagList = (item.tags || '').split('•').map(t => t.trim()).filter(Boolean);
      const categoryName = CATEGORY_LABELS[item.category] || 'Artisanal';
      const prepLabel = PREP_LABELS[item.category] || 'Neapolitan';

      const chipsHtml = tagList.map(tag => `
        <span class="menu-chip" title="${tag}">
          <i class="${getChipIcon(tag)}"></i>
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
                <span>${prepLabel}</span>
              </span>
            `}
          </div>
          <div class="card-body">
            <div class="card-header-group">
              <span class="card-category-tag">${categoryName}</span>
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

    // Reset horizontal scroll position on slider
    menuGrid.scrollLeft = 0;

    // Attach card click to open product details
    menuGrid.querySelectorAll('.menu-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-order')) return;
        const id = card.getAttribute('data-id');
        if (id) {
          window.location.href = `product.html?id=${encodeURIComponent(id)}`;
        }
      });
    });

    // Attach order button listeners
    menuGrid.querySelectorAll('.btn-add-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add');
        addToCart(id);
      });
    });

    // Render pagination controls if on dedicated menu page
    if (isMenuPage) {
      renderPagination(totalFiltered);
    }

    // Update slider arrow states if on home page
    if (window.updateMenuSliderArrows) {
      setTimeout(window.updateMenuSliderArrows, 50);
    }
  }

  /**
   * Render Pagination Navigation (Menu Page)
   */
  function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('menu-pagination');
    const paginationWrapper = document.getElementById('menu-pagination-container');
    if (!paginationContainer || !isMenuPage) return;

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

    if (totalItems === 0 || totalPages <= 1) {
      if (totalPages <= 1 && totalItems > 0) {
        if (paginationWrapper) paginationWrapper.style.display = 'flex';
        paginationContainer.innerHTML = `
          <button class="pagination-btn pagination-prev disabled" aria-label="Previous Page" disabled>
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="pagination-btn pagination-num active" data-page="1">1</button>
          <button class="pagination-btn pagination-next disabled" aria-label="Next Page" disabled>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        `;
      } else {
        if (paginationWrapper) paginationWrapper.style.display = 'none';
        paginationContainer.innerHTML = '';
      }
      return;
    }

    if (paginationWrapper) paginationWrapper.style.display = 'flex';

    let html = `
      <button class="pagination-btn pagination-prev ${currentPage === 1 ? 'disabled' : ''}" 
        aria-label="Previous Page" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      html += `
        <button class="pagination-btn pagination-num ${p === currentPage ? 'active' : ''}" 
          data-page="${p}" aria-label="Page ${p}">
          ${p}
        </button>
      `;
    }

    html += `
      <button class="pagination-btn pagination-next ${currentPage === totalPages ? 'disabled' : ''}" 
        aria-label="Next Page" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    paginationContainer.innerHTML = html;

    // Attach page button clicks
    paginationContainer.querySelectorAll('.pagination-num').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page'), 10);
        if (page !== currentPage) {
          currentPage = page;
          renderMenu(currentCategory);
          scrollToMenuTop();
        }
      });
    });

    const prevBtn = paginationContainer.querySelector('.pagination-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderMenu(currentCategory);
          scrollToMenuTop();
        }
      });
    }

    const nextBtn = paginationContainer.querySelector('.pagination-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderMenu(currentCategory);
          scrollToMenuTop();
        }
      });
    }
  }

  function scrollToMenuTop() {
    const catalogue = document.getElementById('menu-catalogue');
    if (catalogue) {
      const topOffset = catalogue.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }

  /**
   * Horizontal Menu Slider Navigation (Home Page)
   */
  function initMenuSlider() {
    const track = document.getElementById('menu-grid');
    const prevBtn = document.getElementById('menu-slider-prev');
    const nextBtn = document.getElementById('menu-slider-next');

    if (!track || !prevBtn || !nextBtn) return;

    function updateArrowStates() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 5) {
        prevBtn.classList.add('disabled');
        nextBtn.classList.add('disabled');
        return;
      }
      if (track.scrollLeft <= 10) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }

      if (track.scrollLeft >= maxScroll - 10) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }
    }

    function getScrollStep() {
      const card = track.querySelector('.menu-card');
      if (card) {
        return card.offsetWidth + 28;
      }
      return 520;
    }

    prevBtn.addEventListener('click', () => {
      const step = getScrollStep();
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const step = getScrollStep();
      track.scrollBy({ left: step, behavior: 'smooth' });
    });

    track.addEventListener('scroll', () => {
      updateArrowStates();
    }, { passive: true });

    // Drag-to-scroll support for mouse
    let isDown = false;
    let startX, scrollLeftVal;

    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('.btn-add-order') || e.target.closest('button')) return;
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeftVal = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('dragging');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeftVal - walk;
    });

    // Expose updater
    window.updateMenuSliderArrows = updateArrowStates;

    // Initial check
    setTimeout(updateArrowStates, 100);
    window.addEventListener('resize', updateArrowStates);
  }

  /**
   * Category Filter Navigation
   */
  function initCategoryFilters() {
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        currentPage = 1;
        renderMenu(cat);
      });
    });
  }

  /**
   * Dedicated Menu Page Search
   */
  function initMenuSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
      }
      renderMenu(currentCategory);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        currentPage = 1;
        searchClearBtn.style.display = 'none';
        renderMenu(currentCategory);
        searchInput.focus();
      });
    }
  }

  /**
   * Cart Management
   */
  function addToCart(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(i => i.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Show feedback toast
    if (window.showToast) {
      window.showToast('Added to Order');
    }
  }

  function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    updateCartUI();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Dynamic badge resolution: Only show when count > 0, completely hide when 0
    const badges = document.querySelectorAll('#cart-badge, .cart-count-badge');
    badges.forEach(badge => {
      if (totalCount > 0) {
        badge.textContent = totalCount;
        badge.style.display = 'flex';
      } else {
        badge.textContent = '';
        badge.style.display = 'none';
      }
    });

    const subtotalEl = document.getElementById('cart-subtotal') || cartSubtotalEl;
    if (subtotalEl) {
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    const itemsContainer = document.getElementById('cart-items-body') || cartItemsContainer;
    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping fa-3x" style="color: var(--text-dim); margin-bottom: 1rem; display: block;"></i>
          <p>Your order is currently empty.</p>
          <small style="color: var(--text-dim); display:block; margin-top:0.4rem;">Select dishes from our menu to begin.</small>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <h5>${item.title}</h5>
            <span>${item.quantity} × $${item.price.toFixed(2)}</span>
          </div>
          <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove ${item.title}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('');

      itemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove');
          removeFromCart(id);
        });
      });
    }
  }

  function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      if (open) {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  function initCartEvents() {
    // Delegated click listener for View Orders / Cart Trigger buttons across any page
    document.addEventListener('click', (e) => {
      const cartBtn = e.target.closest('#cart-trigger-btn, .nav-cart-btn, [data-open-cart]');
      if (cartBtn) {
        e.preventDefault();
        toggleCartDrawer(true);
      }
    });

    // Delegated close listener
    document.addEventListener('click', (e) => {
      if (e.target.closest('#cart-close-btn') || e.target.closest('.cart-close-btn') || e.target.id === 'cart-overlay') {
        e.preventDefault();
        toggleCartDrawer(false);
      }
    });

    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          if (window.showToast) {
            window.showToast('Your Cart is Empty');
          }
          return;
        }
        toggleCartDrawer(false);
        if (window.showToast) {
          window.showToast('Order Received');
        }
        cart = [];
        saveCart();
        updateCartUI();
      });
    }

    // Direct add signature pizza buttons
    document.querySelectorAll('[data-direct-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-direct-add');
        addToCart(id);
      });
    });
  }

  // Init
  renderMenu('all');
  initCategoryFilters();
  initMenuSearch();
  initMenuSlider();
  initCartEvents();
  updateCartUI();

  // Expose global helpers and data
  window.MENU_ITEMS = MENU_ITEMS;
  window.addItemToCart = addToCart;
  window.updateCartUI = updateCartUI;
  window.toggleCartDrawer = toggleCartDrawer;
  window.getChipIcon = getChipIcon;
  window.CATEGORY_LABELS = CATEGORY_LABELS;
  window.PREP_LABELS = PREP_LABELS;
})();


