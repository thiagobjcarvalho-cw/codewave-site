/* ============================================
   Code Wave Landing Page — behavior
   ============================================ */

function setCurrentYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function trackEvent(eventName, params) {
  const payload = params || {};

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  window.dispatchEvent(new CustomEvent('codewave:track', {
    detail: { eventName, params: payload }
  }));
}

function setupTracking() {
  document.querySelectorAll('[data-track]').forEach(function(el) {
    el.addEventListener('click', function() {
      trackEvent(el.getAttribute('data-track'), {
        link_url: el.getAttribute('href') || '',
        link_text: el.textContent.trim()
      });
    });
  });

  document.querySelectorAll('form[data-track-submit]').forEach(function(form) {
    form.addEventListener('submit', function() {
      trackEvent(form.getAttribute('data-track-submit'), {
        form_id: form.getAttribute('id') || 'contact-form'
      });
    });
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }

  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  }

  toggle.addEventListener('click', function() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function(event) {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });
}

function setupSmoothScroll() {
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight + 14 : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(event) {
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
}

function setupPortfolio() {
  const slides = Array.from(document.querySelectorAll('[data-portfolio-slide]'));
  const dots = Array.from(document.querySelectorAll('[data-portfolio-dot]'));
  const cards = Array.from(document.querySelectorAll('[data-portfolio-card]'));
  const prev = document.querySelector('[data-portfolio-prev]');
  const next = document.querySelector('[data-portfolio-next]');
  const projetos = document.getElementById('projetos');

  if (!slides.length) return;

  let active = 0;

  function show(index, source) {
    active = (index + slides.length) % slides.length;

    slides.forEach(function(el, i) {
      el.classList.toggle('is-active', i === active);
    });

    dots.forEach(function(el, i) {
      el.classList.toggle('is-active', i === active);
    });

    cards.forEach(function(el, i) {
      el.classList.toggle('is-active', i === active);
    });

    trackEvent('select_content', {
      content_type: 'portfolio_case',
      item_id: String(active),
      method: source || 'unknown'
    });
  }

  if (prev) {
    prev.addEventListener('click', function() { show(active - 1, 'prev'); });
  }

  if (next) {
    next.addEventListener('click', function() { show(active + 1, 'next'); });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { show(i, 'dot'); });
  });

  cards.forEach(function(card, i) {
    card.addEventListener('click', function() {
      show(i, 'card');
      scrollToViewer();
    });
  });

  document.addEventListener('keydown', function(event) {
    if (!projetos || !isElementVisible(projetos)) return;

    if (event.key === 'ArrowLeft') show(active - 1, 'keyboard');
    if (event.key === 'ArrowRight') show(active + 1, 'keyboard');
  });

  function scrollToViewer() {
    const viewer = document.querySelector('[data-portfolio-viewer]');
    if (!viewer) return;

    const header = document.querySelector('.site-header');
    const offset = header ? header.offsetHeight + 14 : 0;
    const top = viewer.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  function isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
}

setCurrentYear();
setupTracking();
setupMobileMenu();
setupSmoothScroll();
setupPortfolio();
