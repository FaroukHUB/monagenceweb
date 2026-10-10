<h2>6. Fonctionnalités</h2>
<p>Quelles fonctionnalités votre site doit-il proposer à vos visiteurs ?</p>

<div class="portal-form-group">
    <label>Fonctionnalités souhaitées *</label>
    <div class="portal-check-group">
        <?php
        $features = [
            'Formulaire de contact',
            'Formulaire de demande de devis',
            'Chat en ligne / WhatsApp',
            'Prise de rendez-vous',
            'Galerie photos / avant-après',
            'Avis clients / Google Reviews',
            'Blog / actualités',
            'Newsletter',
            'Carte / zone d\'intervention',
            'Click-to-call (appel direct)',
            'Espace client / compte',
            'Paiement en ligne',
            'Réservation en ligne',
            'Menu en ligne (restaurant)',
            'Catalogue produits',
            'Moteur de recherche interne',
        ];
        $selectedFeatures = (array)($currentData['features'] ?? []);
        foreach ($features as $f): ?>
            <div class="portal-check-item">
                <input type="checkbox" name="features" id="feat_<?= md5($f) ?>" value="<?= sanitize($f) ?>" <?= in_array($f, $selectedFeatures) ? 'checked' : '' ?>>
                <label for="feat_<?= md5($f) ?>"><?= $f ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="features_priority">Quelle est LA fonctionnalité la plus importante ? *</label>
    <input type="text" id="features_priority" name="features_priority" required placeholder="Ex : Le formulaire de devis, c'est essentiel pour mon business" value="<?= sanitize($currentData['features_priority'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="features_other">Autres fonctionnalités spécifiques ?</label>
    <textarea id="features_other" name="features_other" placeholder="Décrivez toute fonctionnalité personnalisée dont vous avez besoin..."><?= sanitize($currentData['features_other'] ?? '') ?></textarea>
</div>
