<h2>9. Hébergement & technique</h2>
<p>Quelques questions techniques pour bien préparer votre projet.</p>

<div class="portal-form-group">
    <label for="domain_status">Avez-vous un nom de domaine ? *</label>
    <select id="domain_status" name="domain_status" required>
        <option value="">Sélectionnez...</option>
        <option value="oui" <?= ($currentData['domain_status'] ?? '') === 'oui' ? 'selected' : '' ?>>Oui, j'ai déjà mon domaine</option>
        <option value="reserve" <?= ($currentData['domain_status'] ?? '') === 'reserve' ? 'selected' : '' ?>>Non, mais j'ai une idée de nom</option>
        <option value="aide" <?= ($currentData['domain_status'] ?? '') === 'aide' ? 'selected' : '' ?>>Non, j'ai besoin d'aide pour le choisir</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="domain_name">Nom de domaine souhaité ou existant</label>
    <input type="text" id="domain_name" name="domain_name" placeholder="Ex : mon-entreprise.fr" value="<?= sanitize($currentData['domain_name'] ?? '') ?>">
</div>

<div class="portal-form-group">
    <label for="hosting_status">Avez-vous un hébergement ?</label>
    <select id="hosting_status" name="hosting_status">
        <option value="">Sélectionnez...</option>
        <option value="oui" <?= ($currentData['hosting_status'] ?? '') === 'oui' ? 'selected' : '' ?>>Oui, j'ai un hébergeur</option>
        <option value="non" <?= ($currentData['hosting_status'] ?? '') === 'non' ? 'selected' : '' ?>>Non, je n'en ai pas</option>
        <option value="aide" <?= ($currentData['hosting_status'] ?? '') === 'aide' ? 'selected' : '' ?>>Je ne sais pas ce que c'est</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="emails_pro">Avez-vous besoin d'emails professionnels ?</label>
    <select id="emails_pro" name="emails_pro">
        <option value="">Sélectionnez...</option>
        <option value="oui" <?= ($currentData['emails_pro'] ?? '') === 'oui' ? 'selected' : '' ?>>Oui (contact@mon-entreprise.fr)</option>
        <option value="deja" <?= ($currentData['emails_pro'] ?? '') === 'deja' ? 'selected' : '' ?>>J'en ai déjà</option>
        <option value="non" <?= ($currentData['emails_pro'] ?? '') === 'non' ? 'selected' : '' ?>>Non, pas nécessaire</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="maintenance">Souhaitez-vous une maintenance après livraison ?</label>
    <div class="portal-check-group">
        <?php
        $maintenanceOptions = ['Oui, je veux un accompagnement', 'Juste pour les urgences', 'Non, je me débrouillerai', 'À discuter'];
        foreach ($maintenanceOptions as $m): ?>
            <div class="portal-check-item">
                <input type="radio" name="maintenance" id="maint_<?= md5($m) ?>" value="<?= sanitize($m) ?>" <?= ($currentData['maintenance'] ?? '') === $m ? 'checked' : '' ?>>
                <label for="maint_<?= md5($m) ?>"><?= $m ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="portal-form-group">
    <label for="tech_notes">Remarques techniques</label>
    <textarea id="tech_notes" name="tech_notes" placeholder="Outils existants à intégrer, accès à fournir, contraintes techniques..."><?= sanitize($currentData['tech_notes'] ?? '') ?></textarea>
</div>
