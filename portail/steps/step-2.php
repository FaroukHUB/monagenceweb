<h2>2. Votre activité</h2>
<p>Aidez-nous à comprendre votre métier et votre marché pour créer un site parfaitement adapté.</p>

<div class="portal-form-group">
    <label for="business_name">Nom de votre entreprise / activité *</label>
    <input type="text" id="business_name" name="business_name" required value="<?= sanitize($currentData['business_name'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="business_sector">Secteur d'activité *</label>
    <select id="business_sector" name="business_sector" required>
        <option value="">Sélectionnez...</option>
        <?php
        $sectors = ['Artisanat / BTP', 'Restaurant / Food', 'Commerce / Retail', 'Services aux entreprises', 'Santé / Bien-être', 'Immobilier', 'Éducation / Formation', 'Tech / Startup', 'Autre'];
        foreach ($sectors as $s): ?>
            <option value="<?= sanitize($s) ?>" <?= ($currentData['business_sector'] ?? '') === $s ? 'selected' : '' ?>><?= $s ?></option>
        <?php endforeach; ?>
    </select>
</div>

<div class="portal-form-group">
    <label for="business_description">Décrivez votre activité *</label>
    <textarea id="business_description" name="business_description" required placeholder="Quels services ou produits proposez-vous ? Depuis combien de temps ?"><?= sanitize($currentData['business_description'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="business_location">Zone géographique d'intervention *</label>
    <input type="text" id="business_location" name="business_location" required placeholder="Ex : Dunkerque et alentours, toute la France..." value="<?= sanitize($currentData['business_location'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="business_strengths">Qu'est-ce qui vous différencie de vos concurrents ?</label>
    <textarea id="business_strengths" name="business_strengths" placeholder="Vos points forts, votre spécialité, votre expérience..."><?= sanitize($currentData['business_strengths'] ?? '') ?></textarea>
</div>
