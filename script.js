/* ============================================
   mon-agenceweb.fr — One-Page Scroll Engine
   ============================================ */

(function () {
    'use strict';

    /* --- DOM REFS --- */
    var nav = document.getElementById('mainNav');
    var burger = document.querySelector('.nav-burger');
    var navLinks = document.querySelector('.nav-links');
    var navOverlay = document.querySelector('.nav-overlay');
    var cursor = document.querySelector('.cursor');
    var cursorDot = document.querySelector('.cursor-dot');

    /* ============================================
       CUSTOM CURSOR
       ============================================ */
    if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        var mx = 0, my = 0;
        var cx = 0, cy = 0;

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            cursorDot.style.left = mx + 'px';
            cursorDot.style.top = my + 'px';
        });

        (function animateCursor() {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            cursor.style.left = cx + 'px';
            cursor.style.top = cy + 'px';
            requestAnimationFrame(animateCursor);
        })();

        document.querySelectorAll('a, button, input, select, textarea, .card, .svc-card, .stack-card').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursor.classList.add('cursor--hover'); });
            el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor--hover'); });
        });
    }

    /* ============================================
       NAV GLASS EFFECT ON SCROLL
       ============================================ */
    var scrollTicking = false;
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                if (window.pageYOffset > 60) {
                    nav.classList.add('is-scrolled');
                } else {
                    nav.classList.remove('is-scrolled');
                }
                updateActiveSection();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    function updateActiveSection() {
        var scrollY = window.pageYOffset;
        var navH = nav ? nav.offsetHeight : 0;
        var current = '';
        sections.forEach(function (s) {
            if (s.offsetTop - navH - 100 <= scrollY) {
                current = s.getAttribute('id');
            }
        });
        navAnchors.forEach(function (a) {
            if (a.getAttribute('href') === '#' + current) {
                a.setAttribute('aria-current', 'page');
            } else {
                a.removeAttribute('aria-current');
            }
        });
    }

    /* ============================================
       HAMBURGER MENU
       ============================================ */
    function closeMobile() {
        if (burger) {
            burger.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
        }
        if (navLinks) navLinks.classList.remove('is-open');
        if (navOverlay) navOverlay.classList.remove('is-active');
    }

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            var isOpen = burger.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
            if (navOverlay) navOverlay.classList.toggle('is-active');
            burger.setAttribute('aria-expanded', isOpen);
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobile);
    }

    /* ============================================
       SMOOTH SCROLL + CLOSE MENU ON LINK CLICK
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            closeMobile();

            var navHeight = nav ? nav.offsetHeight : 0;
            var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ============================================
       REVEAL ON SCROLL (IntersectionObserver)
       ============================================ */
    function initReveals() {
        var els = document.querySelectorAll('.reveal:not(.is-visible)');

        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        els.forEach(function (el) { obs.observe(el); });
    }

    initReveals();

    /* ============================================
       CONTACT FORM SUCCESS FEEDBACK
       ============================================ */
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            var btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Envoi en cours…';
            }
        });
    }

})();
