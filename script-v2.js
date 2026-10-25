(function() {
    'use strict';

    // =========== NAV ===========
    var nav = document.getElementById('mainNav');
    var burger = document.getElementById('burger');
    var overlay = document.getElementById('navOverlay');
    var navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    burger.addEventListener('click', function() {
        burger.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
        burger.setAttribute('aria-expanded', overlay.classList.contains('open'));
    });

    overlay.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active section tracking
    var sections = document.querySelectorAll('.section, .hero');
    var sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var id = entry.target.id;
                navLinks.forEach(function(link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.2, rootMargin: '-80px 0px' });

    sections.forEach(function(s) { sectionObserver.observe(s); });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =========== CURSOR GLOW ===========
    var cursorGlow = document.getElementById('cursorGlow');
    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;
    var rafId;

    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function updateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            rafId = requestAnimationFrame(updateGlow);
        }
        updateGlow();
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // =========== REVEAL ===========
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '-20px' });

    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });

    // Fallback
    setTimeout(function() {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el) {
            el.classList.add('is-visible');
        });
    }, 5000);

    // =========== PROJECT PHONE ANIMATIONS ===========
    var projObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('is-animated')) {
                entry.target.classList.add('is-animated');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.proj').forEach(function(proj) {
        projObserver.observe(proj);
    });

    // =========== PHONE 3D TILT ===========
    document.querySelectorAll('[data-tilt]').forEach(function(el) {
        var phone = el.querySelector('.phone');
        if (!phone || !window.matchMedia('(pointer: fine)').matches) return;

        el.addEventListener('mousemove', function(e) {
            var rect = el.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            var tiltX = (y - 0.5) * 8;
            var tiltY = (x - 0.5) * -8;
            phone.style.transform = 'perspective(1200px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
        });

        el.addEventListener('mouseleave', function() {
            phone.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            phone.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
            setTimeout(function() { phone.style.transition = 'transform 0.1s linear'; }, 600);
        });
    });

    // =========== TERMINAL ANIMATION ===========
    var terminalLines = [
        { id: 'tl1', textId: 'tc1', text: 'deploy resadz.com --production', typed: true, delay: 600 },
        { id: 'tl2', textId: 'tc2', text: '  ✓ Building Laravel 11 + Livewire 3...', typed: false, delay: 800 },
        { id: 'tl3', textId: 'tc3', text: '  ✓ Multi-tenant setup (Stancl/Tenancy)...', typed: false, delay: 700 },
        { id: 'tl4', textId: 'tc4', text: '  ✓ Filament admin panel ready', typed: false, delay: 600 },
        { id: 'tl5', textId: 'tc5', text: '  ✔ Deployed successfully — resadz.com is live', typed: false, delay: 500 },
        { id: 'tl6', textId: null, text: null, typed: false, delay: 300 }
    ];

    var terminalStarted = false;

    function startTerminal() {
        if (terminalStarted) return;
        terminalStarted = true;

        var lineIndex = 0;

        function processLine() {
            if (lineIndex >= terminalLines.length) {
                setTimeout(function() {
                    var actions = document.getElementById('heroActions');
                    if (actions) actions.classList.add('visible');
                }, 400);
                return;
            }

            var config = terminalLines[lineIndex];
            var lineEl = document.getElementById(config.id);
            var textEl = config.textId ? document.getElementById(config.textId) : null;

            setTimeout(function() {
                lineEl.classList.add('visible');

                if (config.typed && textEl && config.text) {
                    typeText(textEl, config.text, 0, function() {
                        var cursor = document.getElementById('cursor1');
                        if (cursor) cursor.style.display = 'none';
                        lineIndex++;
                        processLine();
                    });
                } else {
                    if (textEl && config.text) {
                        textEl.textContent = config.text;
                    }
                    if (config.id === 'tl6') {
                        var cursor2 = document.getElementById('cursor2');
                        if (cursor2) cursor2.style.display = 'inline-block';
                    }
                    lineIndex++;
                    processLine();
                }
            }, config.delay);
        }

        setTimeout(processLine, 500);
    }

    function typeText(el, text, i, callback) {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            setTimeout(function() {
                typeText(el, text, i + 1, callback);
            }, 25 + Math.random() * 28);
        } else {
            if (callback) callback();
        }
    }

    var terminalEl = document.querySelector('.terminal');
    if (terminalEl) {
        var termObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                startTerminal();
                termObserver.disconnect();
            }
        }, { threshold: 0.4 });
        termObserver.observe(terminalEl);
    }

    // =========== NUMBER COUNTING ===========
    var statsCounted = false;
    var statsObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !statsCounted) {
            statsCounted = true;
            document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
                var target = parseInt(el.getAttribute('data-target'), 10);
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(step);
            });
        }
    }, { threshold: 0.5 });

    var statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        statsObserver.observe(statsStrip);
    }

    // =========== FORM ===========
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function() {
            var btn = form.querySelector('.btn--primary');
            if (btn) {
                btn.textContent = 'Envoi en cours...';
                btn.disabled = true;
                btn.style.opacity = '0.7';
            }
        });
    }

})();
