<h2>1. Votre projet</h2>
<p>Parlez-nous de votre projet web. Ces informations nous aident à comprendre vos besoins fondamentaux.</p>

<div class="portal-form-group">
    <label for="project_type">Type de projet *</label>
    <select id="project_type" name="project_type" required>
        <option value="">Sélectionnez...</option>
        <option value="site_vitrine" <?= ($currentData['project_type'] ?? '') === 'site_vitrine' ? 'selected' : '' ?>>Site vitrine</option>
        <option value="site_ecommerce" <?= ($currentData['project_type'] ?? '') === 'site_ecommerce' ? 'selected' : '' ?>>Site e-commerce</option>
        <option value="application_web" <?= ($currentData['project_type'] ?? '') === 'application_web' ? 'selected' : '' ?>>Application web / SaaS</option>
        <option value="refonte" <?= ($currentData['project_type'] ?? '') === 'refonte' ? 'selected' : '' ?>>Refonte de site existant</option>
        <option value="landing_page" <?= ($currentData['project_type'] ?? '') === 'landing_page' ? 'selected' : '' ?>>Landing page</option>
        <option value="autre" <?= ($currentData['project_type'] ?? '') === 'autre' ? 'selected' : '' ?>>Autre</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="project_description">Décrivez votre projet en quelques phrases *</label>
    <textarea id="project_description" name="project_description" required placeholder="Que souhaitez-vous réaliser ? Quel problème voulez-vous résoudre ?"><?= sanitize($currentData['project_description'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <label for="existing_site">Avez-vous un site existant ?</label>
    <select id="existing_site" name="existing_site">
        <option value="non" <?= ($currentData['existing_site'] ?? '') === 'non' ? 'selected' : '' ?>>Non, c'est une création</option>
        <option value="oui" <?= ($currentData['existing_site'] ?? '') === 'oui' ? 'selected' : '' ?>>Oui, je veux le refaire</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="existing_url">Si oui, quelle est l'URL ?</label>
    <input type="url" id="existing_url" name="existing_url" placeholder="https://..." value="<?= sanitize($currentData['existing_url'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="project_goals">Quels sont vos objectifs principaux ? *</label>
    <div class="portal-check-group">
        <?php
        $goals = ['Générer des contacts/devis', 'Vendre en ligne', 'Présenter mon activité', 'Améliorer ma visibilité', 'Automatiser des processus', 'Fidéliser mes clients'];
        $selectedGoals = (array)($currentData['project_goals'] ?? []);
        foreach ($goals as $g): ?>
            <div class="portal-check-item">
                <input type="checkbox" name="project_goals" id="goal_<?= md5($g) ?>" value="<?= sanitize($g) ?>" <?= in_array($g, $selectedGoals) ? 'checked' : '' ?>>
                <label for="goal_<?= md5($g) ?>"><?= $g ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>
