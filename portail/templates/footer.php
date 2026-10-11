    <?php if (isClientLoggedIn()): ?>
    </main>

    <!-- Bottom Tab Bar (mobile only) -->
    <nav class="portal-tabbar">
        <a href="/portail/dashboard" class="portal-tab <?= ($page ?? '') === 'dashboard' ? 'active' : '' ?>">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Accueil</span>
        </a>
        <a href="/portail/questionnaire" class="portal-tab <?= ($page ?? '') === 'questionnaire' ? 'active' : '' ?>">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Cahier</span>
        </a>
        <a href="/portail/documents" class="portal-tab <?= ($page ?? '') === 'documents' ? 'active' : '' ?>">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Fichiers</span>
        </a>
        <a href="/portail/devis" class="portal-tab <?= ($page ?? '') === 'devis' ? 'active' : '' ?>">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Devis</span>
        </a>
        <a href="/portail/profil" class="portal-tab <?= ($page ?? '') === 'profil' ? 'active' : '' ?>">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Profil</span>
        </a>
    </nav>
    <?php endif; ?>
    <script src="/portail/portail.js"></script>
</body>
</html>
