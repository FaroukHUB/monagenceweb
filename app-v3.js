/* mon-agenceweb.fr — comportements « application » : onglets, section active, carrousels */
(function () {
    'use strict';

    // ---------- Sélecteur segmenté des tarifs ----------
    document.querySelectorAll('.seg').forEach(function (seg) {
        var btns = Array.prototype.slice.call(seg.querySelectorAll('.seg-btn'));
        var thumb = seg.querySelector('.seg-thumb');
        function place(btn) {
            if (!thumb || !btn) return;
            thumb.style.width = btn.offsetWidth + 'px';
            thumb.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
        }
        function select(btn, focus) {
            btns.forEach(function (b) {
                var on = b === btn;
                b.classList.toggle('is-on', on);
                b.setAttribute('aria-selected', String(on));
                b.tabIndex = on ? 0 : -1;
                var panel = document.getElementById(b.getAttribute('aria-controls'));
                if (panel) panel.hidden = !on;
            });
            place(btn);
            if (focus) btn.focus();
        }
        btns.forEach(function (b, i) {
            b.addEventListener('click', function () { select(b); });
            b.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    var n = btns[(i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length];
                    select(n, true);
                }
            });
        });
        select(btns[0]);
        window.addEventListener('resize', function () { place(seg.querySelector('.seg-btn.is-on')); });
        if (document.fonts) document.fonts.ready.then(function () { place(seg.querySelector('.seg-btn.is-on')); });
    });

    // ---------- Section active : nav (ordinateur) et barre d'onglets (mobile) ----------
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabbar .tab[data-tab]'));
    // Sections regroupées sous chaque onglet
    var tabOf = { top: 'top', hero: 'top', realisations: 'realisations', direct: 'realisations',
        pourqui: 'tarifs', resultats: 'tarifs', services: 'tarifs', tarifs: 'tarifs', methode: 'tarifs',
        apropos: 'faq', faq: 'faq', blog: 'faq', contact: 'faq' };
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    function setActive(id) {
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
        var t = tabOf[id] || 'top';
        tabs.forEach(function (a) { a.classList.toggle('is-active', a.dataset.tab === t); });
    }
    var isHome = !document.body.classList.contains('tp-page');
    if (isHome && 'IntersectionObserver' in window && sections.length) {
        var visible = {};
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
            var cur = 'hero';
            sections.forEach(function (s) { if (visible[s.id]) cur = cur === 'hero' && s.id !== 'hero' ? s.id : cur; });
            // Prend la première section visible dans l'ordre de la page
            for (var i = 0; i < sections.length; i++) { if (visible[sections[i].id]) { cur = sections[i].id; break; } }
            setActive(cur);
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { io.observe(s); });
    }
    if (isHome) setActive('hero');



    // ---------- Animation d'entrée : « Ils nous ont fait confiance » ----------
    (function () {
        var sec = document.getElementById('realisations');
        if (!sec) return;
        var cards = sec.querySelectorAll('.r-card');
        Array.prototype.forEach.call(cards, function (c, i) { c.style.setProperty('--i', Math.min(i, 5)); });
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { sec.classList.add('is-in'); return; }
        sec.classList.add('will-in');
        var io = new IntersectionObserver(function (e) {
            if (e[0].isIntersecting) { sec.classList.add('is-in'); io.disconnect(); }
        }, { threshold: 0.2 });
        io.observe(sec.querySelector('.carousel') || sec);
        // filet de sécurité : jamais de cartes invisibles
        setTimeout(function () { sec.classList.add('is-in'); }, 6000);
    })();

    // ---------- Carrousels avec flèches ----------
    document.querySelectorAll('[data-carousel]').forEach(function (car) {
        var track = car.querySelector('.real-grid');
        var prev = car.querySelector('[data-dir="-1"]');
        var next = car.querySelector('[data-dir="1"]');
        var cur = car.querySelector('[data-car-cur]');
        var total = car.querySelector('[data-car-total]');
        if (!track) return;
        var items = track.children;
        if (total) total.textContent = items.length;
        function step() { var c = items[0]; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20) : track.clientWidth; }
        function update() {
            var max = track.scrollWidth - track.clientWidth - 2;
            prev.disabled = track.scrollLeft <= 2;
            next.disabled = track.scrollLeft >= max;
            if (cur) cur.textContent = Math.min(items.length, Math.round(track.scrollLeft / step()) + 1);
        }
        [prev, next].forEach(function (b) {
            b.addEventListener('click', function () { track.scrollBy({ left: step() * +b.dataset.dir, behavior: 'smooth' }); });
        });
        track.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); (e.key === 'ArrowRight' ? next : prev).click(); }
        });
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    });

    // ---------- Points sous le carrousel des projets ----------
    var swipe = document.getElementById('projSwipe');
    var dots = document.querySelectorAll('#projDots i');
    if (swipe && dots.length) {
        var cards = swipe.children;
        function paint() {
            var best = 0, bestD = 1e9, mid = swipe.scrollLeft + swipe.clientWidth / 2;
            for (var i = 0; i < cards.length; i++) {
                var c = cards[i], d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
                if (d < bestD) { bestD = d; best = i; }
            }
            for (var j = 0; j < dots.length; j++) dots[j].classList.toggle('on', j === best);
        }
        swipe.addEventListener('scroll', paint, { passive: true });
        paint();
    }
})();
