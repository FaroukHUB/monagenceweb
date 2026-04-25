/* ============================================
   Admin Panel JS — mon-agenceweb.fr
   ============================================ */

(function () {
    'use strict';

    // --- CLAUDE API CALL ---
    window.callClaude = function (type, prompt, context) {
        return fetch('api/claude.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, prompt: prompt, context: context || '' })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.error) throw new Error(data.error);
            return data;
        });
    };

    // --- MARKDOWN TO HTML (basic) ---
    window.mdToHtml = function (md) {
        var html = md
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/^\- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        return '<p>' + html + '</p>';
    };

    // --- COPY TO CLIPBOARD ---
    window.copyContent = function (text) {
        navigator.clipboard.writeText(text).then(function () {
            showNotif('Copié dans le presse-papier');
        });
    };

    // --- NOTIFICATION ---
    window.showNotif = function (msg, type) {
        var el = document.createElement('div');
        el.className = 'alert alert--' + (type || 'success');
        el.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:999;min-width:250px;animation:fadeIn .3s';
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, 3000);
    };

    // --- SAVE CONTENT ---
    window.saveContent = function (type, data) {
        return fetch('api/save.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, data: data })
        })
        .then(function (res) { return res.json(); });
    };

    // --- LOADING STATE ---
    window.setLoading = function (btn, loading) {
        if (loading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<span class="spinner"></span> Génération...';
            btn.classList.add('btn--loading');
        } else {
            btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
            btn.classList.remove('btn--loading');
        }
    };

})();
