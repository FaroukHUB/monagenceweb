<h2>4. Design & identité visuelle</h2>
<p>Le design de votre site doit refléter votre identité. Partagez vos préférences.</p>

<div class="portal-form-group">
    <label for="has_logo">Avez-vous un logo ? *</label>
    <select id="has_logo" name="has_logo" required>
        <option value="">Sélectionnez...</option>
        <option value="oui_hd" <?= ($currentData['has_logo'] ?? '') === 'oui_hd' ? 'selected' : '' ?>>Oui, en haute définition</option>
        <option value="oui_basse" <?= ($currentData['has_logo'] ?? '') === 'oui_basse' ? 'selected' : '' ?>>Oui, mais en basse qualité</option>
        <option value="non" <?= ($currentData['has_logo'] ?? '') === 'non' ? 'selected' : '' ?>>Non, j'ai besoin d'un logo</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="brand_colors">Avez-vous des couleurs de marque ?</label>
    <input type="text" id="brand_colors" name="brand_colors" placeholder="Ex : Bleu #2563eb et blanc, ou 'je n'ai pas de préférence'" value="<?= sanitize($currentData['brand_colors'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="design_style">Quel style vous correspond ? *</label>
    <div class="portal-check-group">
        <?php
        $styles = ['Moderne & épuré', 'Professionnel & corporate', 'Créatif & coloré', 'Élégant & haut de gamme', 'Simple & efficace'];
        $selectedStyles = (array)($currentData['design_style'] ?? []);
        foreach ($styles as $s): ?>
            <div class="portal-check-item">
                <input type="checkbox" name="design_style" id="style_<?= md5($s) ?>" value="<?= sanitize($s) ?>" <?= in_array($s, $selectedStyles) ? 'checked' : '' ?>>
                <label for="style_<?= md5($s) ?>"><?= $s ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="design_references">Sites de référence (que vous aimez)</label>
    <textarea id="design_references" name="design_references" placeholder="Collez les URLs de sites dont le design vous plaît et expliquez pourquoi..."><?= sanitize($currentData['design_references'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="design_avoid">Ce que vous ne voulez PAS</label>
    <textarea id="design_avoid" name="design_avoid" placeholder="Couleurs, styles ou éléments que vous n'aimez pas..."><?= sanitize($currentData['design_avoid'] ?? '') ?></textarea>
</div>
