/* ============================================
   Code Wave Landing Page — behavior
   ============================================ */

/**
 * CodeWave — Application namespace.
 * All public functions and state live here to avoid polluting `window`.
 * @namespace
 */
const CodeWave = {};

/**
 * Sets the current year in the #year element for the footer copyright.
 * @returns {void}
 */
CodeWave.setCurrentYear = function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
};

/**
 * Fires a custom analytics event — pushes to gtag (if available) and
 * dispatches a `codewave:track` CustomEvent for downstream listeners.
 *
 * @param {string} eventName - Machine-readable event name.
 * @param {Object} [params] - Optional key/value payload.
 * @returns {void}
 */
CodeWave.trackEvent = function (eventName, params) {
  const payload = params || {};

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  window.dispatchEvent(new CustomEvent('codewave:track', {
    detail: { eventName, params: payload }
  }));
};

/**
 * Attaches click listeners to every `[data-track]` element and submit
 * listeners to every `[data-track-submit]` form.
 * @returns {void}
 */
CodeWave.setupTracking = function () {
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      CodeWave.trackEvent(el.getAttribute('data-track'), {
        link_url: el.getAttribute('href') || '',
        link_text: el.textContent.trim()
      });
    });
  });

  document.querySelectorAll('form[data-track-submit]').forEach(function (form) {
    form.addEventListener('submit', function () {
      CodeWave.trackEvent(form.getAttribute('data-track-submit'), {
        form_id: form.getAttribute('id') || 'contact-form'
      });
    });
  });
};

/**
 * Toggles the responsive mobile menu on/off.
 * Manages aria-expanded, aria-label, and closes on Escape / outside click.
 * @returns {void}
 */
CodeWave.setupMobileMenu = function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  /** Closes the mobile menu. */
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }

  /** Opens the mobile menu. */
  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  }

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (event) {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });
};

/**
 * Enables smooth anchor scrolling for all `href^="#"` links, offset by
 * the sticky header height.
 * @returns {void}
 */
CodeWave.setupSmoothScroll = function () {
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight + 14 : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const top = href === '#topo'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });

      if (history.pushState) history.pushState(null, '', href);
    });
  });
};

/**
 * Checks if an element is visible in the current viewport.
 * @param {Element} el - The DOM element to test.
 * @returns {boolean} `true` if any part of the element is visible.
 */
CodeWave.isElementVisible = function (el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Scrolls the page to the portfolio viewer, offset by the sticky header.
 * @returns {void}
 */
CodeWave.scrollToViewer = function () {
  const viewer = document.querySelector('[data-portfolio-viewer]');
  if (!viewer) return;

  const header = document.querySelector('.site-header');
  const offset = header ? header.offsetHeight + 14 : 0;
  const top = viewer.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
};

/**
 * Initialises the portfolio carousel (slides, dots, cards, prev/next,
 * keyboard navigation).
 * @returns {void}
 */
CodeWave.setupPortfolio = function () {
  const slides = Array.from(document.querySelectorAll('[data-portfolio-slide]'));
  const dots = Array.from(document.querySelectorAll('[data-portfolio-dot]'));
  const cards = Array.from(document.querySelectorAll('[data-portfolio-card]'));
  const prev = document.querySelector('[data-portfolio-prev]');
  const next = document.querySelector('[data-portfolio-next]');
  const projetos = document.getElementById('projetos');

  if (!slides.length) return;

  let active = 0;

  /**
   * Shows the slide at the given index, updating slides, dots and cards.
   * @param {number} index - Target slide index (will be wrapped).
   * @param {string} [source='unknown'] - Origin of the action for tracking.
   * @returns {void}
   */
  function show(index, source) {
    active = (index + slides.length) % slides.length;

    slides.forEach(function (el, i) {
      el.classList.toggle('is-active', i === active);
    });

    dots.forEach(function (el, i) {
      el.classList.toggle('is-active', i === active);
    });

    cards.forEach(function (el, i) {
      el.classList.toggle('is-active', i === active);
    });

    CodeWave.trackEvent('select_content', {
      content_type: 'portfolio_case',
      item_id: String(active),
      method: source || 'unknown'
    });
  }

  if (prev) {
    prev.addEventListener('click', function () { show(active - 1, 'prev'); });
  }

  if (next) {
    next.addEventListener('click', function () { show(active + 1, 'next'); });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i, 'dot'); });
  });

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      show(i, 'card');
      CodeWave.scrollToViewer();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (!projetos || !CodeWave.isElementVisible(projetos)) return;

    if (event.key === 'ArrowLeft') show(active - 1, 'keyboard');
    if (event.key === 'ArrowRight') show(active + 1, 'keyboard');
  });
};

/**
 * Sets up portfolio category filters.
 * @returns {void}
 */
CodeWave.setupPortfolioFilters = function () {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-portfolio-card]');
  if (!filters.length || !cards.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // Update active state on filter buttons
      filters.forEach(function (f) {
        f.classList.remove('is-active');
        f.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
};

/**
 * Sets up ticker button navigation — scrolls to relevant sections.
 * @returns {void}
 */
CodeWave.setupTicker = function () {
  const tickerBtns = document.querySelectorAll('.ticker-btn');
  if (!tickerBtns.length) return;

  tickerBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-scroll-to');
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight + 14 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  });
};

/* ---- Boot ---- */
CodeWave.setCurrentYear();
CodeWave.setupTracking();
CodeWave.setupMobileMenu();
CodeWave.setupSmoothScroll();
CodeWave.setupPortfolio();
CodeWave.setupPortfolioFilters();
CodeWave.setupTicker();
