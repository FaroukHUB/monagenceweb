/* mon-agenceweb.fr — page Tarifs : menu, navigation par catégorie, formulaire de devis */
(function () {
    'use strict';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Menu mobile ----------
    var burger = document.querySelector('.nav-burger');
    var menu = document.getElementById('mobileMenu');
    function setMenu(open) {
        document.body.classList.toggle('nav-open', open);
        burger.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
    }
    if (burger && menu) {
        burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('nav-open')); });
        menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    }

    // ---------- Bouton WhatsApp flottant : caché en haut et sur le formulaire ----------
    var wa = document.getElementById('waFloat');
    var devis = document.getElementById('devis');
    var devisVisible = false;
    if (wa) {
        if (devis && 'IntersectionObserver' in window) {
            new IntersectionObserver(function (e) { devisVisible = e[0].isIntersecting; upd(); }, { threshold: 0.1 }).observe(devis);
        }
        function upd() { wa.classList.toggle('is-hidden', window.scrollY < 200 || devisVisible); }
        window.addEventListener('scroll', upd, { passive: true }); upd();
    }

    // ---------- Navigation par catégorie : lien actif ----------
    var jumps = Array.prototype.slice.call(document.querySelectorAll('.tp-jump-in a'));
    if (jumps.length && 'IntersectionObserver' in window) {
        var map = {};
        jumps.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting && map[en.target.id]) {
                    jumps.forEach(function (a) { a.classList.toggle('is-on', a === map[en.target.id]); });
                    var on = map[en.target.id], bar = on.parentNode;
                    bar.scrollTo({ left: on.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }

    // ---------- Formulaire de devis ----------
    var form = document.getElementById('devisForm');
    if (!form) return;
    var offre = document.getElementById('f-offre');
    var gProd = document.getElementById('g-prod');
    var status = document.getElementById('f-status');
    var submit = document.getElementById('f-submit');
    var errType = document.getElementById('err-type');
    var TYPE = { landing: 'Landing page', site: 'Site vitrine', resto: 'Restaurant', shop: 'Boutique e-commerce', seo: 'SEO', app: 'Application web', maint: 'Autre', autre: 'Autre' };

    function syncProd() {
        var t = form.querySelector('input[name="type_projet"]:checked');
        gProd.hidden = !(t && t.value === 'Boutique e-commerce');
    }
    form.addEventListener('change', function (e) {
        if (e.target.name === 'type_projet') { syncProd(); errType.hidden = true; offre.value = ''; }
    });

    // Les boutons « Demander un devis » présélectionnent la prestation
    document.querySelectorAll('[data-devis]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var val = TYPE[btn.dataset.devis];
            var r = val && form.querySelector('input[name="type_projet"][value="' + val + '"]');
            if (r) { r.checked = true; syncProd(); errType.hidden = true; }
            offre.value = btn.dataset.offre || '';
            var desc = document.getElementById('f-desc');
            if (btn.dataset.offre && !desc.value) desc.placeholder = 'Formule choisie : ' + btn.dataset.offre + '. Parlez-nous de votre activité et de vos besoins…';
            setTimeout(function () { document.getElementById('f-nom').focus({ preventScroll: true }); }, reduce ? 0 : 600);
        });
    });

    function fieldError(input, msg) {
        var wrap = input.closest('.field');
        var p = wrap.querySelector('.tp-err');
        if (!p) { p = document.createElement('p'); p.className = 'tp-err'; wrap.appendChild(p); }
        p.textContent = msg; p.hidden = !msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    function validate() {
        var ok = true, first = null;
        var t = form.querySelector('input[name="type_projet"]:checked');
        errType.hidden = !!t;
        if (!t) { ok = false; first = first || form.querySelector('input[name="type_projet"]'); }
        [['f-nom', 'Indiquez votre nom.'], ['f-mail', 'Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.'], ['f-desc', 'Décrivez votre projet en quelques mots (10 caractères minimum).']].forEach(function (c) {
            var el = document.getElementById(c[0]);
            var bad = !el.checkValidity() || !el.value.trim();
            fieldError(el, bad ? c[1] : '');
            if (bad) { ok = false; first = first || el; }
        });
        if (first) first.focus();
        return ok;
    }
    ['f-nom', 'f-mail', 'f-desc'].forEach(function (id) {
        var el = document.getElementById(id);
        el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity() && el.value.trim()) fieldError(el, ''); });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.className = 'tp-status'; status.textContent = '';
        if (!validate()) { status.classList.add('is-err'); status.textContent = 'Il manque une ou plusieurs informations, vérifiez les champs signalés.'; return; }
        if (form.querySelector('.tp-hp').value) return; // robot
        submit.disabled = true; submit.textContent = 'Envoi en cours…';
        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
            .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
            .then(function (res) {
                if (res.ok) {
                    form.reset(); syncProd(); offre.value = '';
                    status.classList.add('is-ok');
                    status.textContent = 'Merci, votre demande est envoyée. On vous répond sous 24 h.';
                } else {
                    var msg = res.d && res.d.errors ? res.d.errors.map(function (x) { return x.message; }).join(' ') : '';
                    status.classList.add('is-err');
                    status.textContent = 'L\'envoi n\'a pas abouti. ' + (msg ? msg + ' ' : '') + 'Réessayez, ou écrivez-nous sur WhatsApp au 07 57 83 18 83.';
                }
            })
            .catch(function () {
                status.classList.add('is-err');
                status.textContent = 'Pas de connexion pour le moment. Vérifiez votre réseau et réessayez, ou écrivez-nous sur WhatsApp au 07 57 83 18 83.';
            })
            .then(function () { submit.disabled = false; submit.innerHTML = 'Envoyer ma demande <span class="arrow">→</span>'; });
    });
})();
