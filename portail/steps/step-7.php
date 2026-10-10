<h2>7. Référencement & SEO</h2>
<p>Pour que vos clients vous trouvent sur Google, nous avons besoin de ces informations.</p>

<div class="portal-form-group">
    <label for="seo_importance">Le référencement Google est-il important pour vous ? *</label>
    <div class="portal-check-group">
        <?php
        $seoLevels = ['Essentiel — je veux être trouvé sur Google', 'Important mais pas prioritaire', 'Pas vraiment — j\'ai déjà mes clients', 'Je ne sais pas'];
        foreach ($seoLevels as $s): ?>
            <div class="portal-check-item">
                <input type="radio" name="seo_importance" id="seo_<?= md5($s) ?>" value="<?= sanitize($s) ?>" <?= ($currentData['seo_importance'] ?? '') === $s ? 'checked' : '' ?>>
                <label for="seo_<?= md5($s) ?>"><?= $s ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="seo_keywords">Sur quels mots-clés voudriez-vous apparaître ?</label>
    <textarea id="seo_keywords" name="seo_keywords" placeholder="Ex : plombier Dunkerque, restaurant italien Lille, coach sportif en ligne..."><?= sanitize($currentData['seo_keywords'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="seo_local">Avez-vous un Google Business Profile ?</label>
    <select id="seo_local" name="seo_local">
        <option value="">Sélectionnez...</option>
        <option value="oui_optimise" <?= ($currentData['seo_local'] ?? '') === 'oui_optimise' ? 'selected' : '' ?>>Oui, il est à jour</option>
        <option value="oui_abandonne" <?= ($currentData['seo_local'] ?? '') === 'oui_abandonne' ? 'selected' : '' ?>>Oui, mais pas à jour</option>
        <option value="non" <?= ($currentData['seo_local'] ?? '') === 'non' ? 'selected' : '' ?>>Non</option>
        <option value="ne_sais_pas" <?= ($currentData['seo_local'] ?? '') === 'ne_sais_pas' ? 'selected' : '' ?>>Je ne sais pas ce que c'est</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="seo_competitors">Vos principaux concurrents en ligne ?</label>
    <textarea id="seo_competitors" name="seo_competitors" placeholder="URLs de sites concurrents, ou noms d'entreprises concurrentes..."><?= sanitize($currentData['seo_competitors'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label>Réseaux sociaux actifs</label>
    <div class="portal-check-group">
        <?php
        $socials = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'Aucun'];
        $selectedSocials = (array)($currentData['social_networks'] ?? []);
        foreach ($socials as $s): ?>
            <div class="portal-check-item">
                <input type="checkbox" name="social_networks" id="social_<?= md5($s) ?>" value="<?= sanitize($s) ?>" <?= in_array($s, $selectedSocials) ? 'checked' : '' ?>>
                <label for="social_<?= md5($s) ?>"><?= $s ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>
