(function () {
  'use strict';

  var nav = document.querySelector('.main-nav');
  var toggle = document.querySelector('.nav-toggle');
  var backdrop = null;

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-label', 'Menü öffnen');
    if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    backdrop = null;
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
    if (toggle) toggle.setAttribute('aria-label', 'Menü schließen');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', closeNav);
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeNav();
      else openNav();
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        closeNav();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && nav.classList.contains('is-open')) closeNav();
    });
  }

  // FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0';
    });
  });

  // VM-Article FAQ (OnlyFans Agentur Artikel)
  document.querySelectorAll('.vm-faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.vm-faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.vm-faq-item.open').forEach(function (el) { el.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Cookie-Banner (notwendige Cookies)
  var COOKIE_CONSENT_KEY = 'venus_cookie_consent';
  var banner = document.getElementById('cookie-banner');

  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Hinweis zu Cookies');
    var inner = document.createElement('div');
    inner.className = 'cookie-banner-inner';
    var text = document.createElement('p');
    text.className = 'cookie-banner-text';
    var datenschutzHref = (window.location.pathname || '').indexOf('leistungen') !== -1 ? '../datenschutz.html' : 'datenschutz.html';
    text.innerHTML = 'Wir setzen nur technisch notwendige Cookies ein, die für den Betrieb der Webseite erforderlich sind. Weitere Informationen findest du in unserer <a href="' + datenschutzHref + '">Datenschutzerklärung</a>.';
    var actions = document.createElement('div');
    actions.className = 'cookie-banner-actions';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn--primary';
    btn.textContent = 'Verstanden';
    btn.addEventListener('click', function () {
      try {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
      } catch (e) {}
      banner.classList.remove('is-visible');
    });
    actions.appendChild(btn);
    inner.appendChild(text);
    inner.appendChild(actions);
    banner.appendChild(inner);
    document.body.appendChild(banner);
  }

  try {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      banner.classList.add('is-visible');
    }
  } catch (e) {
    banner.classList.add('is-visible');
  }
})();
