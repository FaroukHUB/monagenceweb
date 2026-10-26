/* mon-agenceweb.fr — Section « En direct » : la commande filmée pilote les étapes et l'arrivée du ticket WhatsApp */
(function () {
    'use strict';
    var section = document.getElementById('direct');
    if (!section) return;
    var video = document.getElementById('liveVideo');
    var steps = Array.prototype.slice.call(section.querySelectorAll('.live-steps li'));
    var bubble = document.getElementById('waBubble');
    var chat = document.getElementById('waChat');
    var stateEl = document.getElementById('waState');
    var rig = document.getElementById('liveRig');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // La vidéo est pilotée en script : pas de boucle native
    video.loop = false;
    video.removeAttribute('autoplay');

    var marks = steps.map(function (li) { return li.dataset.at === 'end' ? Infinity : parseFloat(li.dataset.at); });
    var inView = false, phase = 'play', timers = [];

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function setClasses(c) {
        ['is-sending', 'is-typing', 'is-notif', 'is-received'].forEach(function (k) {
            section.classList.toggle(k, c.indexOf(k) !== -1);
        });
    }

    function paintSteps(t, done) {
        var cur = 0;
        marks.forEach(function (m, i) { if (t >= m) cur = i; });
        if (done) cur = steps.length - 1;
        steps.forEach(function (li, i) {
            li.classList.toggle('is-on', i === cur);
            li.classList.toggle('is-done', i < cur);
            var bar = li.querySelector('.ls-bar');
            var start = marks[i], end = i + 1 < marks.length ? marks[i + 1] : Infinity;
            if (end === Infinity) end = video.duration || 28;
            var f = i < cur ? 1 : i > cur ? 0 : done ? 1 : Math.max(0, Math.min(1, (t - start) / (end - start)));
            bar.style.transform = 'scaleX(' + f + ')';
        });
    }

    function measureOverflow() {
        // Hauteur du ticket qui dépasse de l'écran : on la fait défiler pour qu'il se lise en entier
        var over = Math.max(0, bubble.offsetTop + bubble.offsetHeight - (chat.clientHeight - 12));
        bubble.style.setProperty('--overflow', over + 'px');
    }

    function receive() {
        phase = 'receive';
        paintSteps(Infinity, true);
        setClasses(['is-sending']);
        later(function () { setClasses(['is-notif']); stateEl.textContent = 'écrit…'; }, 700);
        later(function () { setClasses(['is-notif', 'is-typing']); }, 1100);
        later(function () { setClasses(['is-received']); measureOverflow(); stateEl.textContent = 'en ligne'; }, 2300);
        later(restart, 2300 + 9500);
    }

    function restart() {
        clearTimers();
        setClasses([]);
        phase = 'play';
        video.currentTime = 0;
        if (inView) video.play().catch(function () {});
    }

    video.addEventListener('ended', function () { if (phase === 'play') receive(); });

    (function tick() {
        if (phase === 'play') paintSteps(video.currentTime || 0, false);
        requestAnimationFrame(tick);
    })();

    if (reduce) {
        // Mouvement réduit : on montre directement le résultat final
        video.pause();
        setClasses(['is-received']);
        measureOverflow();
        paintSteps(Infinity, true);
        return;
    }

    new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) {
            if (phase === 'play') video.play().catch(function () {});
        } else {
            video.pause();
        }
    }, { threshold: 0.25 }).observe(section);

    // Inclinaison 3D qui suit la souris
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        var rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
        section.addEventListener('pointermove', function (e) {
            var r = rig.getBoundingClientRect();
            tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
            ty = ((e.clientY - r.top) / r.height - 0.5) * -10;
            if (!raf) raf = requestAnimationFrame(step);
        });
        section.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(step); });
        function step() {
            rx += (ty - rx) * 0.08; ry += (tx - ry) * 0.08;
            rig.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
            raf = (Math.abs(ty - rx) + Math.abs(tx - ry) > 0.05) ? requestAnimationFrame(step) : 0;
        }
    }
})();
