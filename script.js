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

        // Run transition effect
        var effectFn = effects[effect] || effects.crt;
        effectFn(fxLayer, imgSrc, function () {
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
       TRANSITION EFFECTS (sober & premium)
       ============================================ */
    var effects = {
        crt: fxCrt,
        wipe: fxWipe,
        zoom: fxZoom,
        split: fxSplit,
        iris: fxIris
    };

    function applyBg(el, imgSrc) {
        if (imgSrc) {
            el.style.backgroundImage = 'url(' + imgSrc + ')';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        }
        el.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.55)';
    }

    /* --- CRT TV OFF: compress vertical → line → dot → gone --- */
    function fxCrt(layer, imgSrc, done) {
        var screen = document.createElement('div');
        screen.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;';
        applyBg(screen, imgSrc);
        layer.appendChild(screen);
        layer.style.background = '#000';

        // Brightness flash on compress
        var flash = document.createElement('div');
        flash.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0);transition:background 0.3s;pointer-events:none;z-index:2;';
        layer.appendChild(flash);

        layer.offsetHeight;

        // Phase 1: compress vertically
        screen.style.transition = 'transform 0.4s cubic-bezier(0.7,0,1,1), filter 0.4s';
        screen.style.transformOrigin = 'center center';
        flash.style.background = 'rgba(255,255,255,0.08)';
        screen.style.transform = 'scaleY(0.008)';
        screen.style.filter = 'brightness(2)';

        // Phase 2: compress horizontally
        setTimeout(function () {
            screen.style.transition = 'transform 0.3s cubic-bezier(0.7,0,1,1), opacity 0.3s';
            screen.style.transform = 'scaleY(0.008) scaleX(0)';
            screen.style.opacity = '0';
            flash.style.transition = 'opacity 0.3s';
            flash.style.opacity = '0';
        }, 420);

        setTimeout(done, 750);
    }

    /* --- WIPE: horizontal bar sweeps top to bottom --- */
    function fxWipe(layer, imgSrc, done) {
        var screen = document.createElement('div');
        screen.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;';
        applyBg(screen, imgSrc);
        layer.appendChild(screen);
        layer.style.background = 'transparent';

        layer.offsetHeight;

        screen.style.transition = 'clip-path 0.8s cubic-bezier(0.65,0,0.35,1), -webkit-clip-path 0.8s cubic-bezier(0.65,0,0.35,1)';
        screen.style.clipPath = 'inset(0 0 0 0)';
        screen.style.webkitClipPath = 'inset(0 0 0 0)';

        requestAnimationFrame(function () {
            screen.style.clipPath = 'inset(0 0 100% 0)';
            screen.style.webkitClipPath = 'inset(0 0 100% 0)';
        });

        setTimeout(done, 850);
    }

    /* --- ZOOM OUT: cinematic pull-back with fade --- */
    function fxZoom(layer, imgSrc, done) {
        var screen = document.createElement('div');
        screen.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;';
        applyBg(screen, imgSrc);
        layer.appendChild(screen);
        layer.style.background = 'transparent';

        layer.offsetHeight;

        screen.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease-out, filter 0.9s';
        requestAnimationFrame(function () {
            screen.style.transform = 'scale(0.92)';
            screen.style.opacity = '0';
            screen.style.filter = 'blur(4px)';
        });

        setTimeout(done, 900);
    }

    /* --- SPLIT: top half goes up, bottom half goes down --- */
    function fxSplit(layer, imgSrc, done) {
        var top = document.createElement('div');
        var bot = document.createElement('div');
        layer.style.background = 'transparent';

        [top, bot].forEach(function (half) {
            half.style.cssText = 'position:absolute;left:0;right:0;';
            applyBg(half, imgSrc);
            half.style.transition = 'transform 0.7s cubic-bezier(0.65,0,0.35,1), opacity 0.5s 0.2s ease-out';
        });

        top.style.top = '0';
        top.style.height = '50%';
        top.style.clipPath = 'inset(0 0 0 0)';
        top.style.backgroundPosition = 'center top';

        bot.style.bottom = '0';
        bot.style.height = '50%';
        bot.style.clipPath = 'inset(0 0 0 0)';
        bot.style.backgroundPosition = 'center bottom';

        // Thin gold line at the split
        var line = document.createElement('div');
        line.style.cssText = 'position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(200,168,75,0.4);transform:translateY(-50%);z-index:2;transition:opacity 0.4s 0.3s;';

        layer.appendChild(top);
        layer.appendChild(bot);
        layer.appendChild(line);

        layer.offsetHeight;

        requestAnimationFrame(function () {
            top.style.transform = 'translateY(-100%)';
            top.style.opacity = '0';
            bot.style.transform = 'translateY(100%)';
            bot.style.opacity = '0';
            line.style.opacity = '0';
        });

        setTimeout(done, 800);
    }

    /* --- IRIS: circle closes to center, classic cinema --- */
    function fxIris(layer, imgSrc, done) {
        var screen = document.createElement('div');
        screen.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;';
        applyBg(screen, imgSrc);
        layer.appendChild(screen);
        layer.style.background = 'transparent';

        screen.style.clipPath = 'circle(100% at 50% 50%)';
        screen.style.webkitClipPath = 'circle(100% at 50% 50%)';

        layer.offsetHeight;

        screen.style.transition = 'clip-path 0.9s cubic-bezier(0.65,0,0.35,1), -webkit-clip-path 0.9s cubic-bezier(0.65,0,0.35,1)';
        requestAnimationFrame(function () {
            screen.style.clipPath = 'circle(0% at 50% 50%)';
            screen.style.webkitClipPath = 'circle(0% at 50% 50%)';
        });

        setTimeout(done, 950);
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
