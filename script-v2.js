(function() {
    'use strict';

    var sections = document.querySelectorAll('.imm-section');
    var navDots = document.querySelectorAll('.imm-nav-dot');
    var mobileDots = document.querySelectorAll('#mobileDots span');

    // --- Scroll to section on dot click ---
    navDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            var target = document.getElementById(dot.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Active section tracking ---
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var id = entry.target.id;
                updateActiveDot(id);
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(function(section) {
        observer.observe(section);
    });

    function updateActiveDot(activeId) {
        var sectionIds = ['hero', 'resadz', 'marvelous', 'laformule', 'services', 'realisations', 'contact'];
        var idx = sectionIds.indexOf(activeId);
        if (idx === -1) {
            var section = document.getElementById(activeId);
            if (section && section.closest('.imm-about')) idx = -1;
        }

        navDots.forEach(function(dot, i) {
            dot.classList.toggle('active', dot.dataset.target === activeId);
        });

        mobileDots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === idx);
        });
    }

    // --- Reveal animations ---
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '-40px' });

    document.querySelectorAll('.imm-project, .imm-reveal, .imm-svc-card, .imm-real-card').forEach(function(el) {
        revealObserver.observe(el);
    });

    // --- Form submit feedback ---
    var form = document.querySelector('.imm-form');
    if (form) {
        form.addEventListener('submit', function() {
            var btn = form.querySelector('.imm-form-submit');
            if (btn) {
                btn.textContent = 'Envoi en cours...';
                btn.disabled = true;
                btn.style.opacity = '0.7';
            }
        });
    }

    // --- Smooth anchor scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Noscript fallback ---
    document.querySelectorAll('.imm-reveal, .imm-svc-card, .imm-real-card').forEach(function(el) {
        setTimeout(function() {
            if (!el.classList.contains('is-visible')) {
                el.classList.add('is-visible');
            }
        }, 3000);
    });

})();
