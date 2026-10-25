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
    }, { threshold: 0.3, rootMargin: '-80px 0px' });

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

    // =========== REVEAL ===========
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '-30px' });

    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });

    // Fallback: make everything visible after 4s
    setTimeout(function() {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el) {
            el.classList.add('is-visible');
        });
    }, 4000);

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
        var totalDelay = 400;

        function processLine() {
            if (lineIndex >= terminalLines.length) {
                // Show hero actions after terminal completes
                setTimeout(function() {
                    document.getElementById('heroActions').classList.add('visible');
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

        setTimeout(processLine, totalDelay);
    }

    function typeText(el, text, i, callback) {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            setTimeout(function() {
                typeText(el, text, i + 1, callback);
            }, 28 + Math.random() * 30);
        } else {
            if (callback) callback();
        }
    }

    // Start terminal when the terminal becomes visible
    var terminalEl = document.querySelector('.terminal');
    if (terminalEl) {
        var termObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                startTerminal();
                termObserver.disconnect();
            }
        }, { threshold: 0.5 });
        termObserver.observe(terminalEl);
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
