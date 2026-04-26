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

        // Run the effect
        var effectFn = effects[effect] || effects.shatter;
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
       TRANSITION EFFECTS
       ============================================ */
    var effects = {
        shatter: fxShatter,
        tear: fxTear,
        particles: fxParticles,
        burn: fxBurn,
        glitch: fxGlitch
    };

    /* --- SHATTER: image breaks into grid fragments that explode outward --- */
    function fxShatter(layer, imgSrc, done) {
        var rows = 5, cols = 7;
        var frags = [];

        layer.style.backgroundImage = 'none';

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var f = document.createElement('div');
                f.style.position = 'absolute';
                f.style.left = (c / cols * 100) + '%';
                f.style.top = (r / rows * 100) + '%';
                f.style.width = (100 / cols + 0.5) + '%';
                f.style.height = (100 / rows + 0.5) + '%';

                if (imgSrc) {
                    f.style.backgroundImage = 'url(' + imgSrc + ')';
                    f.style.backgroundSize = (cols * 100) + '% ' + (rows * 100) + '%';
                    var bpx = cols > 1 ? (c / (cols - 1) * 100) : 50;
                    var bpy = rows > 1 ? (r / (rows - 1) * 100) : 50;
                    f.style.backgroundPosition = bpx + '% ' + bpy + '%';
                }

                f.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.6)';
                f.style.border = '1px solid rgba(200,168,75,0.06)';

                var delay = Math.random() * 0.25;
                f.style.transition = 'transform 0.9s ' + delay + 's cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.7s ' + delay + 's ease-out';

                layer.appendChild(f);
                frags.push(f);
            }
        }

        // Force layout
        layer.offsetHeight;

        requestAnimationFrame(function () {
            frags.forEach(function (f) {
                var tx = (Math.random() - 0.5) * window.innerWidth * 1.2;
                var ty = (Math.random() - 0.5) * window.innerHeight * 1.2;
                var rot = (Math.random() - 0.5) * 200;
                f.style.transform = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + rot + 'deg) scale(0.2)';
                f.style.opacity = '0';
            });
        });

        setTimeout(done, 1200);
    }

    /* --- TEAR: splits vertically with jagged edge, halves slide apart --- */
    function fxTear(layer, imgSrc, done) {
        layer.style.backgroundImage = 'none';

        var left = document.createElement('div');
        var right = document.createElement('div');

        var jagPoints = 12;
        var lpoly = '0% 0%';
        var rpoly = '';

        for (var i = 0; i <= jagPoints; i++) {
            var y = (i / jagPoints * 100);
            var x = 48 + Math.random() * 6;
            lpoly += ', ' + x + '% ' + y + '%';
            rpoly += (rpoly ? ', ' : '') + x + '% ' + y + '%';
        }
        lpoly += ', 0% 100%';
        rpoly += ', 100% 100%, 100% 0%';

        var jaggedL = 'polygon(' + lpoly + ')';
        var jaggedR = 'polygon(' + rpoly + ')';

        [left, right].forEach(function (half) {
            half.style.position = 'absolute';
            half.style.inset = '0';
            if (imgSrc) {
                half.style.backgroundImage = 'url(' + imgSrc + ')';
                half.style.backgroundSize = 'cover';
                half.style.backgroundPosition = 'center';
            }
            half.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.6)';
            half.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease-out';
        });

        left.style.clipPath = jaggedL;
        left.style.webkitClipPath = jaggedL;
        right.style.clipPath = jaggedR;
        right.style.webkitClipPath = jaggedR;

        // Gold tear line
        var tearLine = document.createElement('div');
        tearLine.style.cssText = 'position:absolute;left:49%;top:0;width:2px;height:100%;background:linear-gradient(to bottom,transparent,rgba(200,168,75,0.4),rgba(200,168,75,0.6),rgba(200,168,75,0.4),transparent);z-index:5;transition:opacity 0.5s 0.3s;';

        layer.appendChild(left);
        layer.appendChild(right);
        layer.appendChild(tearLine);

        layer.offsetHeight;

        requestAnimationFrame(function () {
            left.style.transform = 'translateX(-110%) rotate(-2deg)';
            left.style.opacity = '0';
            right.style.transform = 'translateX(110%) rotate(2deg)';
            right.style.opacity = '0';
            tearLine.style.opacity = '0';
        });

        setTimeout(done, 1000);
    }

    /* --- PARTICLES: golden embers rise as overlay dissolves --- */
    function fxParticles(layer, imgSrc, done) {
        // Dark overlay that fades
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;inset:0;transition:opacity 1s 0.3s ease-out;';
        if (imgSrc) {
            overlay.style.backgroundImage = 'url(' + imgSrc + ')';
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
        }
        overlay.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.7)';
        layer.appendChild(overlay);

        layer.style.backgroundImage = 'none';

        // Create particles
        var count = 90;
        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            var size = 2 + Math.random() * 7;
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = (40 + Math.random() * 60) + '%';
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.borderRadius = '50%';
            p.style.background = 'radial-gradient(circle, rgba(200,168,75,0.9), rgba(200,168,75,0.3))';
            p.style.boxShadow = '0 0 ' + (size * 2) + 'px rgba(200,168,75,0.3)';
            p.style.opacity = '0';
            var delay = Math.random() * 0.5;
            var dur = 0.8 + Math.random() * 0.8;
            p.style.transition = 'transform ' + dur + 's ' + delay + 's ease-out, opacity ' + dur + 's ' + delay + 's ease-out';
            layer.appendChild(p);
        }

        layer.offsetHeight;

        // Animate particles upward
        var allParticles = layer.querySelectorAll('div:not(:first-child)');
        allParticles.forEach(function (p) {
            p.style.opacity = '0.8';
            setTimeout(function () {
                p.style.transform = 'translateY(' + (-200 - Math.random() * 500) + 'px) scale(0)';
                p.style.opacity = '0';
            }, 50);
        });

        // Fade overlay
        setTimeout(function () {
            overlay.style.opacity = '0';
        }, 200);

        setTimeout(done, 1500);
    }

    /* --- BURN: iris circle shrinks with golden glow --- */
    function fxBurn(layer, imgSrc, done) {
        layer.style.backgroundImage = 'none';

        var inner = document.createElement('div');
        inner.style.cssText = 'position:absolute;inset:0;';
        if (imgSrc) {
            inner.style.backgroundImage = 'url(' + imgSrc + ')';
            inner.style.backgroundSize = 'cover';
            inner.style.backgroundPosition = 'center';
        }
        inner.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.65)';
        inner.style.clipPath = 'circle(100% at 50% 50%)';
        inner.style.webkitClipPath = 'circle(100% at 50% 50%)';
        inner.style.transition = 'clip-path 1.1s ease-in-out, -webkit-clip-path 1.1s ease-in-out';
        layer.appendChild(inner);

        // Gold glow ring
        var ring = document.createElement('div');
        ring.style.cssText = 'position:absolute;top:50%;left:50%;width:120vmax;height:120vmax;transform:translate(-50%,-50%);border-radius:50%;box-shadow:inset 0 0 100px 30px rgba(200,168,75,0.25);transition:all 1.1s ease-in-out;pointer-events:none;';
        layer.appendChild(ring);

        layer.offsetHeight;

        requestAnimationFrame(function () {
            inner.style.clipPath = 'circle(0% at 50% 50%)';
            inner.style.webkitClipPath = 'circle(0% at 50% 50%)';
            ring.style.width = '0';
            ring.style.height = '0';
            ring.style.boxShadow = 'inset 0 0 200px 100px rgba(200,168,75,0.6)';
        });

        setTimeout(done, 1200);
    }

    /* --- GLITCH: RGB splits + slice displacement + flicker --- */
    function fxGlitch(layer, imgSrc, done) {
        layer.style.backgroundImage = 'none';

        // Create 3 color channel layers
        var channels = [
            { color: 'rgba(200,168,75,0.15)', blend: 'normal' },
            { color: 'rgba(255,0,60,0.12)', blend: 'screen' },
            { color: 'rgba(0,80,255,0.12)', blend: 'screen' }
        ];

        var channelEls = [];
        channels.forEach(function (ch) {
            var el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.inset = '0';
            if (imgSrc) {
                el.style.backgroundImage = 'url(' + imgSrc + ')';
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
            }
            el.style.boxShadow = 'inset 0 0 0 2000px rgba(10,10,10,0.65)';
            el.style.mixBlendMode = ch.blend;
            layer.appendChild(el);
            channelEls.push(el);
        });

        // Overlay tint on channels
        channelEls[1].style.backgroundColor = 'rgba(255,0,60,0.08)';
        channelEls[2].style.backgroundColor = 'rgba(0,80,255,0.08)';

        var duration = 900;
        var start = Date.now();
        var glitchTimer;

        function glitchStep() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);

            if (progress >= 1) {
                layer.style.opacity = '0';
                layer.style.transition = 'opacity 0.15s';
                setTimeout(done, 180);
                return;
            }

            var intensity = 1 - progress;

            channelEls.forEach(function (el, i) {
                var offset = (Math.random() - 0.5) * 50 * intensity;
                el.style.transform = 'translateX(' + offset + 'px)';

                // Random horizontal slice
                if (Math.random() > 0.4) {
                    var y1 = Math.random() * 100;
                    var h = 3 + Math.random() * 15;
                    el.style.clipPath = 'inset(' + y1 + '% 0 ' + Math.max(0, 100 - y1 - h) + '% 0)';
                    el.style.webkitClipPath = el.style.clipPath;
                } else {
                    el.style.clipPath = 'none';
                    el.style.webkitClipPath = 'none';
                }
            });

            // Flicker
            layer.style.opacity = Math.random() > 0.25 ? '1' : (0.4 + Math.random() * 0.3) + '';

            glitchTimer = setTimeout(glitchStep, 40 + Math.random() * 30);
        }

        glitchStep();

        // Safety timeout
        setTimeout(function () {
            clearTimeout(glitchTimer);
            layer.style.opacity = '0';
            layer.style.transition = 'opacity 0.15s';
            setTimeout(done, 180);
        }, duration + 200);
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
