/* ========================================
   Cafe Aurora - Script
   ======================================== */

(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  var header = document.getElementById('header');

  /* Mobile nav toggle */
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    var navLinks = mainNav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    }
  }

  /* Header shrink on scroll */
  function handleScroll() {
    if (window.scrollY > 60) {
      header.style.background = 'rgba(26, 20, 16, 0.97)';
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.15)';
    } else {
      header.style.background = 'rgba(26, 20, 16, 0.92)';
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Active nav link on scroll */
  var sections = document.querySelectorAll('section[id]');
  var allNavLinks = document.querySelectorAll('.main-nav a');

  function highlightNav() {
    var scrollY = window.scrollY + 100;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        for (var j = 0; j < allNavLinks.length; j++) {
          allNavLinks[j].style.color = '';
          if (allNavLinks[j].getAttribute('href') === '#' + id) {
            allNavLinks[j].style.color = '#e8a96a';
          }
        }
      }
    }
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* Intersection Observer for fade-in */
  if ('IntersectionObserver' in window) {
    var fadeEls = document.querySelectorAll(
      '.about-grid, .menu-card, .gallery-item, .reviews-info-card, .contact-grid, .cta-content'
    );

    for (var k = 0; k < fadeEls.length; k++) {
      fadeEls[k].style.opacity = '0';
      fadeEls[k].style.transform = 'translateY(30px)';
      fadeEls[k].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    for (var k = 0; k < fadeEls.length; k++) {
      observer.observe(fadeEls[k]);
    }
  }

})();
