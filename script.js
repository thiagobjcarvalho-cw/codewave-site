/* ============================================
   Code Wave Landing Page — behavior
   ============================================ */

function setCurrentYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
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

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
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
  const viewer = document.querySelector('[data-portfolio-viewer]');
  const prev = document.querySelector('[data-portfolio-prev]');
  const next = document.querySelector('[data-portfolio-next]');
  const projetos = document.getElementById('projetos');

  if (!slides.length) return;

  let active = 0;

  function show(index) {
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
  }

  if (prev) {
    prev.addEventListener('click', function() { show(active - 1); });
  }

  if (next) {
    next.addEventListener('click', function() { show(active + 1); });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      if (viewer) viewer.removeAttribute('hidden');
      show(i);
    });
  });

  cards.forEach(function(card, i) {
    card.addEventListener('click', function() {
      if (viewer) {
        viewer.removeAttribute('hidden');
        scrollToViewer(viewer);
      }
      show(i);
    });
  });

  function scrollToViewer(el) {
    const header = document.querySelector('.site-header');
    const offset = header ? header.offsetHeight + 14 : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  document.addEventListener('keydown', function(event) {
    if (!projetos || !isElementVisible(projetos)) return;

    if (event.key === 'ArrowLeft') show(active - 1);
    if (event.key === 'ArrowRight') show(active + 1);
  });

  function isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
}

setCurrentYear();
setupMobileMenu();
setupSmoothScroll();
setupPortfolio();
