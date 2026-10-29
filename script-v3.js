/* mon-agenceweb.fr — V3 interactions (GSAP + ScrollTrigger + Lenis) */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Si GSAP n'a pas chargé, on affiche tout sans animation
    if (!window.gsap || !window.ScrollTrigger) {
        root.classList.remove('js');
        startTerminal();
        return;
    }

    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    // ---------- Défilement doux ----------
    var lenis = null;
    if (window.Lenis && !reduce) {
        lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
        lenis.on('scroll', ST.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
    }

    // Ancres internes
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = a.getAttribute('href');
            var target = id === '#top' || id === '#' ? document.body : document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            if (lenis) lenis.scrollTo(target === document.body ? 0 : target, { offset: -20 });
            else window.scrollTo({ top: target === document.body ? 0 : target.getBoundingClientRect().top + window.scrollY - 20, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    // ---------- Navigation ----------
    var nav = document.getElementById('nav');
    var burger = document.querySelector('.nav-burger');
    var menu = document.getElementById('mobileMenu');
    var lastY = 0;
    window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (!document.body.classList.contains('nav-open')) {
            nav.classList.toggle('is-hidden', y > lastY && y > 300);
        }
        lastY = y;
    }, { passive: true });

    function closeMenu() {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start();
    }
    burger.addEventListener('click', function () {
        var open = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', open);
        burger.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
        if (lenis) open ? lenis.stop() : lenis.start();
    });

    // ---------- Curseur ----------
    if (finePointer && !reduce) {
        root.classList.add('has-cursor');
        var cur = document.querySelector('.cursor');
        var dot = document.querySelector('.cursor-dot');
        var cx = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' });
        var cy = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
        var dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
        var dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
        window.addEventListener('mousemove', function (e) { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); }, { passive: true });
        document.querySelectorAll('a, button, [data-tilt]').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cur.classList.add('is-hover'); });
            el.addEventListener('mouseleave', function () { cur.classList.remove('is-hover'); });
        });

        // Boutons magnétiques
        document.querySelectorAll('[data-magnetic]').forEach(function (el) {
            var mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            var my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                mx((e.clientX - r.left - r.width / 2) * 0.3);
                my((e.clientY - r.top - r.height / 2) * 0.4);
            });
            el.addEventListener('mouseleave', function () { mx(0); my(0); });
        });

        // Cartes inclinables en 3D
        document.querySelectorAll('[data-tilt]').forEach(function (el) {
            var rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
            var ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
            gsap.set(el, { transformPerspective: 1000 });
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                var px = (e.clientX - r.left) / r.width - 0.5;
                var py = (e.clientY - r.top) / r.height - 0.5;
                ry(px * 5); rx(-py * 5);
            });
            el.addEventListener('mouseleave', function () { rx(0); ry(0); });
        });

        // Terminal qui suit la souris
        var term = document.getElementById('terminal');
        var tx = gsap.quickTo(term, 'rotationY', { duration: 1, ease: 'power3' });
        var tyy = gsap.quickTo(term, 'rotationX', { duration: 1, ease: 'power3' });
        gsap.set(term, { rotationY: -14, rotationX: 8 });
        window.addEventListener('mousemove', function (e) {
            var px = e.clientX / window.innerWidth - 0.5;
            var py = e.clientY / window.innerHeight - 0.5;
            tx(-14 + px * 18); tyy(8 - py * 14);
        }, { passive: true });
    }

    // Halo lumineux qui suit la souris sur les cartes en verre
    document.querySelectorAll('.spot').forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
            var r = el.getBoundingClientRect();
            el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });

    // ---------- Découpage des titres en mots ----------
    function splitWords(el) {
        var nodes = Array.prototype.slice.call(el.childNodes);
        nodes.forEach(function (n) {
            if (n.nodeType === 3) {
                var parts = n.textContent.split(/(\s+)/);
                var frag = document.createDocumentFragment();
                parts.forEach(function (p) {
                    if (!p) return;
                    if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
                    var w = document.createElement('span'); w.className = 'word';
                    var i = document.createElement('span'); i.textContent = p;
                    w.appendChild(i); frag.appendChild(w);
                });
                n.parentNode.replaceChild(frag, n);
            } else if (n.nodeType === 1 && n.tagName !== 'BR') {
                // Les mots en dégradé : on garde le dégradé sur chaque mot
                if (n.classList.contains('grad-text') || n.classList.contains('grad-hot')) {
                    var cls = n.className;
                    n.className = '';
                    var txt = n.textContent; n.textContent = '';
                    txt.split(/(\s+)/).forEach(function (p) {
                        if (!p) return;
                        if (/^\s+$/.test(p)) { n.appendChild(document.createTextNode(' ')); return; }
                        var w = document.createElement('span'); w.className = 'word';
                        var i = document.createElement('span'); i.className = cls; i.textContent = p;
                        w.appendChild(i); n.appendChild(w);
                    });
                } else {
                    splitWords(n);
                }
            }
        });
    }
    document.querySelectorAll('.split').forEach(splitWords);

    // ---------- Intro du hero ----------
    var heroWords = document.querySelectorAll('.hero-title .word > span');
    var intro = gsap.timeline({ delay: 0.15 });
    intro.to(heroWords, { y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07 })
        .to('.hero .reveal', { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 }, 0.35)
        .add(startTerminal, 0.9);

    // ---------- Révélations au scroll ----------
    document.querySelectorAll('.split').forEach(function (el) {
        if (el.closest('.hero')) return;
        gsap.to(el.querySelectorAll('.word > span'), {
            y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });
    ST.batch('.reveal:not(.hero .reveal)', {
        start: 'top 90%',
        onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }); }
    });

    // ---------- Compteurs ----------
    function fmt(n, sep) { return sep ? n.toLocaleString('fr-FR').replace(/ | /g, ' ') : String(n); }
    document.querySelectorAll('[data-count]').forEach(function (el) {
        var to = +el.dataset.count;
        var from = +(el.dataset.from || 0);
        var obj = { v: from };
        ST.create({
            trigger: el, start: 'top 92%', once: true,
            onEnter: function () {
                gsap.to(obj, { v: to, duration: 2, ease: 'power3.out', onUpdate: function () { el.textContent = fmt(Math.round(obj.v), el.dataset.sep); } });
            }
        });
    });

    // ---------- SERP : votre site grimpe en position 1 ----------
    var serpItems = Array.prototype.slice.call(document.querySelectorAll('.serp-item'));
    var youItem = document.querySelector('.serp-item.you');
    var posEl = document.getElementById('serpPos');
    function rowH() { return window.innerWidth <= 640 ? 80 : 84; }
    function layoutSerp(p) {
        var you = 4 * (1 - p);
        serpItems.forEach(function (it) {
            var i = +it.dataset.i;
            var slot = it === youItem ? you : i + gsap.utils.clamp(0, 1, i + 1 - you);
            it.style.transform = 'translateY(' + (slot * rowH()) + 'px)' + (it === youItem ? ' scale(' + (1 + 0.03 * Math.sin(p * Math.PI)) + ')' : '');
        });
        posEl.textContent = Math.max(1, Math.round(9 - p * 8));
    }
    layoutSerp(0);
    var serpState = { p: 0 };
    gsap.to(serpState, {
        p: 1, ease: 'none',
        scrollTrigger: { trigger: '#serp', start: 'top 75%', end: 'bottom 45%', scrub: 0.8 },
        onUpdate: function () { layoutSerp(serpState.p); }
    });

    // ---------- Courbe & jauge ----------
    var line = document.getElementById('chartLine');
    var len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    gsap.timeline({ scrollTrigger: { trigger: line, start: 'top 85%' } })
        .to(line, { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut' })
        .to('#chartFill', { opacity: 1, duration: 1 }, 0.8)
        .to('#chartDot', { opacity: 1, duration: 0.3 }, 1.8);

    gsap.to('#gaugeArc', {
        strokeDashoffset: 326.7 * (1 - 0.75), duration: 2, ease: 'power3.out',
        scrollTrigger: { trigger: '#gaugeArc', start: 'top 90%' }
    });

    // ---------- Méthode ----------
    var steps = document.querySelectorAll('.step');
    gsap.to('#stepsLine', {
        scaleX: 1, ease: 'none',
        scrollTrigger: {
            trigger: '#steps', start: 'top 70%', end: 'bottom 55%', scrub: 0.6,
            onUpdate: function (self) {
                steps.forEach(function (s, i) { s.classList.toggle('is-on', self.progress >= i / steps.length + 0.01); });
            }
        }
    });

    // ---------- Grand logo du footer ----------
    gsap.fromTo('.foot-big', { yPercent: 40 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    window.addEventListener('load', function () { ST.refresh(); });

    // ---------- Terminal animé ----------
    function startTerminal() {
        if (startTerminal.done) return;
        startTerminal.done = true;
        var body = document.getElementById('terminalBody');
        if (!body) return;
        var P = '<span class="t-prompt">›</span> ';
        var scenes = [
            [
                { cmd: 'Créer le site de votre plomberie' },
                { out: '<span class="t-info">  ◦ Maquette à votre image… </span><span class="t-ok">prête</span>' },
                { out: '<span class="t-info">  ◦ Textes et photos de vos chantiers… </span><span class="t-ok">ok</span>' },
                { out: '<span class="t-info">  ◦ Fiche Google Maps… </span><span class="t-ok">complétée</span>' },
                { out: '<span class="t-info">  ◦ Vitesse sur mobile </span><span class="t-hl">98/100</span>' },
                { out: '<span class="t-ok">✔ Votre site est en ligne</span>' }
            ],
            [
                { cmd: 'Ajouter la réservation en ligne' },
                { out: '<span class="t-info">  ◦ Calendrier des disponibilités… </span><span class="t-ok">ok</span>' },
                { out: '<span class="t-info">  ◦ Paiement sécurisé… </span><span class="t-ok">ok</span>' },
                { out: '<span class="t-info">  ◦ Confirmation par SMS ou WhatsApp… </span><span class="t-ok">ok</span>' },
                { out: '<span class="t-ok">✔ Vos clients réservent seuls, même la nuit</span>' }
            ],
            [
                { cmd: 'Analyser votre visibilité sur Google' },
                { out: '<span class="t-info">  ◦ Votre position sur Google… </span><span class="t-hl">page 3</span>' },
                { out: '<span class="t-info">  ◦ Votre fiche Google Maps… </span><span style="color:#f87171">incomplète</span>' },
                { out: '<span class="t-info">  ◦ Concurrents étudiés… </span><span class="t-ok">12</span>' },
                { out: '<span class="t-ok">✔ Plan d\'action prêt, on en parle ?</span>' }
            ]
        ];
        var sceneIdx = 0;

        function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
        function cursor() { var c = document.createElement('span'); c.className = 't-cursor'; return c; }

        function runScene() {
            var lines = scenes[sceneIdx];
            body.innerHTML = '';
            var chain = Promise.resolve();
            lines.forEach(function (l) {
                chain = chain.then(function () {
                    var row = document.createElement('div'); row.className = 't-line';
                    body.appendChild(row);
                    if (l.cmd) {
                        row.innerHTML = P + '<span class="t-cmd"></span>';
                        var span = row.querySelector('.t-cmd');
                        var c = cursor(); row.appendChild(c);
                        if (reduce) { span.textContent = l.cmd; c.remove(); return wait(300); }
                        var i = 0;
                        return new Promise(function (res) {
                            (function type() {
                                span.textContent = l.cmd.slice(0, ++i);
                                if (i < l.cmd.length) setTimeout(type, 28 + Math.random() * 45);
                                else setTimeout(function () { c.remove(); res(); }, 350);
                            })();
                        });
                    }
                    row.innerHTML = l.out;
                    if (window.gsap && !reduce) gsap.from(row, { opacity: 0, x: -8, duration: 0.35 });
                    return wait(reduce ? 120 : 420 + Math.random() * 300);
                });
            });
            chain.then(function () {
                var row = document.createElement('div'); row.className = 't-line';
                row.innerHTML = P; row.appendChild(cursor()); body.appendChild(row);
                return wait(reduce ? 6000 : 3600);
            }).then(function () {
                sceneIdx = (sceneIdx + 1) % scenes.length;
                runScene();
            });
        }
        runScene();
    }
})();
