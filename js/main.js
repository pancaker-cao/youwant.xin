;(function () {
  'use strict';

  /* ---- Header scroll ---- */
  const header = document.getElementById('site-header');
  const isHome = document.body.classList.contains('home-page') || window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';

  function onScroll() {
    if (window.scrollY > 48) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Nav ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('active');
      if (isOpen) {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll Reveal ---- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var header = item.querySelector('.faq-header');
    var body = item.querySelector('.faq-body');
    if (!header || !body) return;
    header.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('active');
        faq.querySelector('.faq-body').style.maxHeight = '0';
      });
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---- Portfolio Filter ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-category');
      portfolioItems.forEach(function (item) {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = '';
          setTimeout(function () {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          setTimeout(function () { item.style.display = 'none'; }, 320);
        }
      });
      // Re-trigger scroll reveal for newly visible items
      setTimeout(function () {
        observer.disconnect();
        document.querySelectorAll('.animate-on-scroll').forEach(function (el) { observer.observe(el); });
      }, 400);
    });
  });

  /* ---- Modal ---- */
  var overlay = document.getElementById('modal-overlay');
  var modalImg = document.getElementById('modal-img');
  var modalTitle = document.getElementById('modal-title');
  var modalDesc = document.getElementById('modal-desc');
  var modalClose = document.getElementById('modal-close');

  if (overlay) {
    document.querySelectorAll('[data-modal]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var card = trigger.closest('.portfolio-item') || trigger;
        var img = card.querySelector('img');
        var title = card.querySelector('h3');
        var desc = card.querySelector('p');
        if (img) modalImg.src = img.src;
        if (title) modalTitle.textContent = title.textContent;
        if (desc) modalDesc.textContent = desc.textContent;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) closeModal();
    });
  }

  /* ---- Nav current-page highlight ---- */
  var path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (path.endsWith(href) || (path === '/' && href === 'index.html'))) {
      link.classList.add('text-gray-900');
      link.classList.remove('text-gray-500');
      link.querySelector('::after');
    }
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Hero Parallax ---- */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          heroBg.style.transform = 'translateY(' + window.scrollY * 0.35 + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
