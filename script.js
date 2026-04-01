/* ============================================
   mon-agenceweb.fr — Interactions & Animations
   ============================================ */

(function () {
    'use strict';

    /* --- CUSTOM CURSOR --- */
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        let mx = 0, my = 0;
        let cx = 0, cy = 0;

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            cursorDot.style.left = mx + 'px';
            cursorDot.style.top = my + 'px';
        });

        function animateCursor() {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            cursor.style.left = cx + 'px';
            cursor.style.top = cy + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        var interactives = document.querySelectorAll('a, button, input, select, textarea, .real-card');
        interactives.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.classList.add('cursor--hover');
            });
            el.addEventListener('mouseleave', function () {
                cursor.classList.remove('cursor--hover');
            });
        });
    }

    /* --- REVEAL ON SCROLL (IntersectionObserver) --- */
    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        reveals.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* --- HAMBURGER MENU --- */
    var burger = document.querySelector('.nav-burger');
    var navLinks = document.querySelector('.nav-links');
    var navOverlay = document.querySelector('.nav-overlay');

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            var isOpen = burger.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
            if (navOverlay) navOverlay.classList.toggle('is-active');
            burger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('is-open');
                navLinks.classList.remove('is-open');
                if (navOverlay) navOverlay.classList.remove('is-active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function () {
                burger.classList.remove('is-open');
                navLinks.classList.remove('is-open');
                navOverlay.classList.remove('is-active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        }
    }

    /* --- SMOOTH SCROLL for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- NAV background on scroll --- */
    var nav = document.querySelector('.nav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var scrollY = window.pageYOffset;
        if (scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.webkitBackdropFilter = 'none';
        }
        lastScroll = scrollY;
    }, { passive: true });

})();
