/* ============================================
   mon-agenceweb.fr — Panel Landing & FX Engine
   ============================================ */

(function () {
    'use strict';

    /* --- STATE --- */
    var state = 'landing';
    var activeSection = null;

    /* --- DOM REFS --- */
    var landing = document.getElementById('landing');
    var mainContent = document.getElementById('mainContent');
    var fxLayer = document.getElementById('fxLayer');
    var panels = document.querySelectorAll('.panel');
    var views = document.querySelectorAll('.view');
    var nav = document.getElementById('mainNav');
    var navLogo = document.getElementById('navLogo');
    var navLinksContainer = document.getElementById('navLinks');
    var navLinks = navLinksContainer ? navLinksContainer.querySelectorAll('a[data-panel]') : [];
    var footer = document.getElementById('siteFooter');
    var burger = document.querySelector('.nav-burger');
    var navOverlay = document.querySelector('.nav-overlay');

    /* --- INIT --- */
    document.body.classList.add('is-locked');

    /* --- CUSTOM CURSOR --- */
    var cursor = document.querySelector('.cursor');
    var cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        var mx = 0, my = 0;
        var cx = 0, cy = 0;

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

        function bindCursorHovers() {
            var interactives = document.querySelectorAll('a, button, input, select, textarea, .real-card, .panel');
            interactives.forEach(function (el) {
                el.addEventListener('mouseenter', function () {
                    cursor.classList.add('cursor--hover');
                });
                el.addEventListener('mouseleave', function () {
                    cursor.classList.remove('cursor--hover');
                });
            });
        }
        bindCursorHovers();
    }

    /* ============================================
       PANEL INTERACTIONS
       ============================================ */
    panels.forEach(function (panel) {
        panel.addEventListener('click', function () {
            if (state !== 'landing') return;
            openSection(panel);
        });
        panel.addEventListener('keydown', function (e) {
            if ((e.key === 'Enter' || e.key === ' ') && state === 'landing') {
                e.preventDefault();
                openSection(panel);
            }
        });
    });

    function openSection(panel) {
        state = 'transitioning';
        var target = panel.dataset.target;
        var effect = panel.dataset.effect;

        // Get panel image for fx layer
        var panelImg = panel.querySelector('.panel-bg img');
        var imgSrc = panelImg ? panelImg.src : '';

        // Prepare fx layer
        fxLayer.innerHTML = '';
        fxLayer.style.backgroundImage = imgSrc ? 'url(' + imgSrc + ')' : 'none';
        fxLayer.style.backgroundSize = 'cover';
        fxLayer.style.backgroundPosition = 'center';
        fxLayer.className = 'fx-layer fx-active';

        // Prepare section underneath
        landing.classList.add('is-hidden');
        mainContent.classList.add('is-visible');
        showView(target);
        if (footer) footer.classList.add('is-visible');

        // Run premium transition
        fxPremium(fxLayer, imgSrc, function () {
            fxLayer.className = 'fx-layer';
            fxLayer.innerHTML = '';
            fxLayer.style.backgroundImage = '';
            state = 'section';
            activeSection = target;
            document.body.classList.remove('is-locked');
            nav.classList.add('nav--section');
            updateActiveNav(target);
            initReveals();
        });
    }

    function showView(name) {
        views.forEach(function (v) {
            if (v.dataset.section === name) {
                v.classList.add('is-active');
            } else {
                v.classList.remove('is-active');
            }
        });
        window.scrollTo(0, 0);
    }

    function goHome() {
        if (state === 'transitioning') return;
        state = 'landing';
        activeSection = null;

        mainContent.classList.remove('is-visible');
        views.forEach(function (v) { v.classList.remove('is-active'); });
        if (footer) footer.classList.remove('is-visible');
        nav.classList.remove('nav--section');
        updateActiveNav(null);
        document.body.classList.add('is-locked');

        // Fade landing back in
        landing.classList.remove('is-hidden');
        landing.style.opacity = '0';
        requestAnimationFrame(function () {
            landing.style.transition = 'opacity 0.5s var(--ease)';
            landing.style.opacity = '1';
            setTimeout(function () {
                landing.style.transition = '';
            }, 500);
        });

        closeMobileMenu();
    }

    function switchSection(name) {
        if (state !== 'section') return;
        activeSection = name;
        showView(name);
        updateActiveNav(name);
        initReveals();
        closeMobileMenu();
    }

    function updateActiveNav(name) {
        navLinks.forEach(function (link) {
            if (link.dataset.panel === name) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
    }

    /* ============================================
       PREMIUM TRANSITION
       ============================================ */
    function fxPremium(layer, imgSrc, done) {
        if (imgSrc) {
            layer.style.backgroundImage = 'url(' + imgSrc + ')';
            layer.style.backgroundSize = 'cover';
            layer.style.backgroundPosition = 'center';
        }
        layer.style.opacity = '1';
        layer.style.transform = 'scale(1)';
        layer.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';

        // Dark overlay
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(10,10,10,0.6);';
        layer.appendChild(overlay);

        layer.offsetHeight;

        requestAnimationFrame(function () {
            layer.style.opacity = '0';
            layer.style.transform = 'scale(1.03)';
        });

        setTimeout(done, 850);
    }

    /* ============================================
       NAV INTERACTIONS
       ============================================ */

    // Logo → back to landing
    if (navLogo) {
        navLogo.addEventListener('click', function (e) {
            e.preventDefault();
            if (state === 'section') {
                goHome();
            }
        });
    }

    // Nav links → open panel or switch section
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = this.dataset.panel;

            if (state === 'landing') {
                var panel = document.querySelector('.panel[data-target="' + target + '"]');
                if (panel) openSection(panel);
            } else if (state === 'section') {
                switchSection(target);
            }

            closeMobileMenu();
        });
    });

    // View-next links (cross-navigation between sections)
    document.querySelectorAll('.view-next-link[data-panel]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = this.dataset.panel;
            if (state === 'section') {
                switchSection(target);
            }
        });
    });

    /* ============================================
       HAMBURGER MENU
       ============================================ */
    function closeMobileMenu() {
        if (burger) {
            burger.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
        }
        if (navLinksContainer) navLinksContainer.classList.remove('is-open');
        if (navOverlay) navOverlay.classList.remove('is-active');
    }

    if (burger && navLinksContainer) {
        burger.addEventListener('click', function () {
            if (state === 'section') {
                closeMobileMenu();
                goHome();
                return;
            }
            var isOpen = burger.classList.toggle('is-open');
            navLinksContainer.classList.toggle('is-open');
            if (navOverlay) navOverlay.classList.toggle('is-active');
            burger.setAttribute('aria-expanded', isOpen);
        });

        // Close on overlay click
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMobileMenu);
        }
    }

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

    /* ============================================
       NAV SCROLL EFFECT (in section view)
       ============================================ */
    window.addEventListener('scroll', function () {
        if (state !== 'section') return;
        var scrollY = window.pageYOffset;
        if (scrollY > 80) {
            nav.style.borderBottom = '1px solid rgba(200,168,75,0.08)';
        } else {
            nav.style.borderBottom = 'none';
        }
    }, { passive: true });

    /* ============================================
       HASH NAVIGATION (deep linking)
       ============================================ */
    var validSections = ['produits', 'realisations', 'services', 'apropos', 'contact'];
    var initialHash = window.location.hash.replace('#', '');

    if (initialHash && validSections.indexOf(initialHash) !== -1) {
        // Skip the effect, go straight to section
        state = 'section';
        activeSection = initialHash;
        landing.classList.add('is-hidden');
        mainContent.classList.add('is-visible');
        showView(initialHash);
        if (footer) footer.classList.add('is-visible');
        document.body.classList.remove('is-locked');
        nav.classList.add('nav--section');
        updateActiveNav(initialHash);
        setTimeout(initReveals, 100);
    }

})();
