<h2>5. Contenu & pages</h2>
<p>Définissons ensemble la structure de votre site et les contenus nécessaires.</p>

<div class="portal-form-group">
    <label for="pages_needed">Quelles pages souhaitez-vous ? *</label>
    <div class="portal-check-group">
        <?php
        $pages = ['Accueil', 'À propos', 'Services / Prestations', 'Réalisations / Portfolio', 'Blog / Actualités', 'Contact', 'FAQ', 'Mentions légales', 'Tarifs', 'Galerie photos', 'Témoignages / Avis', 'Page de destination (landing)'];
        $selectedPages = (array)($currentData['pages_needed'] ?? []);
        foreach ($pages as $p): ?>
            <div class="portal-check-item">
                <input type="checkbox" name="pages_needed" id="page_<?= md5($p) ?>" value="<?= sanitize($p) ?>" <?= in_array($p, $selectedPages) ? 'checked' : '' ?>>
                <label for="page_<?= md5($p) ?>"><?= $p ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="content_ready">Avez-vous du contenu prêt ? *</label>
    <select id="content_ready" name="content_ready" required>
        <option value="">Sélectionnez...</option>
        <option value="textes_photos" <?= ($currentData['content_ready'] ?? '') === 'textes_photos' ? 'selected' : '' ?>>Oui, textes et photos prêts</option>
        <option value="textes_seuls" <?= ($currentData['content_ready'] ?? '') === 'textes_seuls' ? 'selected' : '' ?>>Textes prêts, photos à trouver</option>
        <option value="rien" <?= ($currentData['content_ready'] ?? '') === 'rien' ? 'selected' : '' ?>>Non, j'ai besoin d'aide pour tout</option>
        <option value="partiel" <?= ($currentData['content_ready'] ?? '') === 'partiel' ? 'selected' : '' ?>>Partiellement (je compléterai)</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="content_details">Précisions sur le contenu</label>
    <textarea id="content_details" name="content_details" placeholder="Décrivez les pages spéciales, le nombre de services à présenter, etc."><?= sanitize($currentData['content_details'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="languages">Langues du site</label>
    <div class="portal-check-group">
        <?php
        $langs = ['Français uniquement', 'Français + Anglais', 'Multilingue (précisez)'];
        $selectedLangs = (array)($currentData['languages'] ?? []);
        foreach ($langs as $l): ?>
            <div class="portal-check-item">
                <input type="radio" name="languages" id="lang_<?= md5($l) ?>" value="<?= sanitize($l) ?>" <?= in_array($l, $selectedLangs) || ($currentData['languages'] ?? '') === $l ? 'checked' : '' ?>>
                <label for="lang_<?= md5($l) ?>"><?= $l ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>
