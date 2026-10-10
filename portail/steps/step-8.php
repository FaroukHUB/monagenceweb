<h2>8. Budget & délais</h2>
<p>Ces informations nous permettent de vous proposer une solution adaptée à vos moyens et votre planning.</p>

<div class="portal-form-group">
    <label for="budget_range">Quel est votre budget estimé ? *</label>
    <select id="budget_range" name="budget_range" required>
        <option value="">Sélectionnez...</option>
        <option value="moins_500" <?= ($currentData['budget_range'] ?? '') === 'moins_500' ? 'selected' : '' ?>>Moins de 500€</option>
        <option value="500_1000" <?= ($currentData['budget_range'] ?? '') === '500_1000' ? 'selected' : '' ?>>500€ — 1 000€</option>
        <option value="1000_2000" <?= ($currentData['budget_range'] ?? '') === '1000_2000' ? 'selected' : '' ?>>1 000€ — 2 000€</option>
        <option value="2000_5000" <?= ($currentData['budget_range'] ?? '') === '2000_5000' ? 'selected' : '' ?>>2 000€ — 5 000€</option>
        <option value="plus_5000" <?= ($currentData['budget_range'] ?? '') === 'plus_5000' ? 'selected' : '' ?>>Plus de 5 000€</option>
        <option value="a_definir" <?= ($currentData['budget_range'] ?? '') === 'a_definir' ? 'selected' : '' ?>>À définir ensemble</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="deadline">Avez-vous une date limite ? *</label>
    <select id="deadline" name="deadline" required>
        <option value="">Sélectionnez...</option>
        <option value="urgent" <?= ($currentData['deadline'] ?? '') === 'urgent' ? 'selected' : '' ?>>Urgent — moins de 2 semaines</option>
        <option value="1_mois" <?= ($currentData['deadline'] ?? '') === '1_mois' ? 'selected' : '' ?>>Dans le mois</option>
        <option value="2_3_mois" <?= ($currentData['deadline'] ?? '') === '2_3_mois' ? 'selected' : '' ?>>2 à 3 mois</option>
        <option value="pas_presse" <?= ($currentData['deadline'] ?? '') === 'pas_presse' ? 'selected' : '' ?>>Pas de deadline, prenons le temps</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="payment_preference">Préférence de paiement</label>
    <select id="payment_preference" name="payment_preference">
        <option value="">Sélectionnez...</option>
        <option value="comptant" <?= ($currentData['payment_preference'] ?? '') === 'comptant' ? 'selected' : '' ?>>Paiement comptant</option>
        <option value="echelonne" <?= ($currentData['payment_preference'] ?? '') === 'echelonne' ? 'selected' : '' ?>>Paiement échelonné (acompte + solde)</option>
        <option value="mensuel" <?= ($currentData['payment_preference'] ?? '') === 'mensuel' ? 'selected' : '' ?>>Mensualités</option>
    </select>
</div>

<div class="portal-form-group">
    <label for="budget_notes">Remarques sur le budget ou le planning</label>
    <textarea id="budget_notes" name="budget_notes" placeholder="Événement particulier, lancement à une date précise, contraintes..."><?= sanitize($currentData['budget_notes'] ?? '') ?></textarea>
</div>
