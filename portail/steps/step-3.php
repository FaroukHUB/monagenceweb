<h2>3. Votre cible</h2>
<p>Comprendre vos clients permet de concevoir un site qui leur parle directement.</p>

<div class="portal-form-group">
    <label for="target_type">Type de clientèle *</label>
    <div class="portal-check-group">
        <?php
        $types = ['Particuliers (B2C)', 'Professionnels (B2B)', 'Les deux'];
        $selected = (array)($currentData['target_type'] ?? []);
        foreach ($types as $t): ?>
            <div class="portal-check-item">
                <input type="radio" name="target_type" id="target_<?= md5($t) ?>" value="<?= sanitize($t) ?>" <?= in_array($t, $selected) || ($currentData['target_type'] ?? '') === $t ? 'checked' : '' ?>>
                <label for="target_<?= md5($t) ?>"><?= $t ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="target_age">Tranche d'âge principale</label>
    <select id="target_age" name="target_age">
        <option value="">Sélectionnez...</option>
        <?php
        $ages = ['18-25 ans', '25-35 ans', '35-50 ans', '50+ ans', 'Tous âges'];
        foreach ($ages as $a): ?>
            <option value="<?= $a ?>" <?= ($currentData['target_age'] ?? '') === $a ? 'selected' : '' ?>><?= $a ?></option>
        <?php endforeach; ?>
    </select>
</div>

<div class="portal-form-group">
    <label for="target_description">Décrivez votre client type *</label>
    <textarea id="target_description" name="target_description" required placeholder="Qui sont vos clients ? Que recherchent-ils ? Comment vous trouvent-ils ?"><?= sanitize($currentData['target_description'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="target_problems">Quels problèmes résolvez-vous pour eux ?</label>
    <textarea id="target_problems" name="target_problems" placeholder="Les difficultés auxquelles vos clients font face et comment vous les aidez..."><?= sanitize($currentData['target_problems'] ?? '') ?></textarea>
</div>
