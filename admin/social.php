<?php
require_once __DIR__ . '/config.php';
requireAuth();

$posts = readData('social_posts');
$page = 'social';
$pageTitle = 'Posts sociaux';
include __DIR__ . '/templates/header.php';
?>

<div class="generator">
    <div class="generator-form">
        <div class="card">
            <h2 class="card-title">Générer un post</h2>
            <form id="socialForm">
                <div class="form-group">
                    <label for="social-platform">Plateforme</label>
                    <select id="social-platform">
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram (légende)</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter/X">Twitter / X</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="social-objective">Objectif du post</label>
                    <select id="social-objective">
                        <option value="promouvoir un service">Promouvoir un service</option>
                        <option value="montrer une réalisation">Montrer une réalisation</option>
                        <option value="partager un conseil">Partager un conseil</option>
                        <option value="générer des leads">Générer des leads</option>
                        <option value="engager la communauté">Engager la communauté</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="social-topic">Sujet / Détails</label>
                    <textarea id="social-topic" rows="3" placeholder="Ex: On vient de livrer un site e-commerce pour une boutique de parfums avec un tunnel d'achat optimisé..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="social-cta">Call-to-action souhaité <span style="color:var(--text-muted)">(optionnel)</span></label>
                    <input type="text" id="social-cta" placeholder="Ex: Contactez-moi pour un devis gratuit">
                </div>
                <button type="submit" class="btn btn--primary btn--full" id="socialSubmit">Générer le post</button>
            </form>
        </div>
    </div>

    <div>
        <div class="generator-output" id="socialOutput">
            <div class="generator-output-empty" id="socialEmpty">
                Le post généré apparaîtra ici.
            </div>
            <div class="generated-content" id="socialContent" style="display:none"></div>
            <div class="output-actions" id="socialActions" style="display:none">
                <button class="btn btn--secondary" onclick="copyContent(window._lastSocialRaw)">Copier le texte</button>
                <button class="btn btn--primary" id="socialSave">Sauvegarder</button>
            </div>
        </div>

        <?php if (!empty($posts)): ?>
        <div class="history">
            <h3 class="history-title">Posts générés</h3>
            <div class="history-list">
                <?php foreach (array_reverse(array_slice($posts, -10)) as $post): ?>
                <div class="history-item" onclick="this.querySelector('.history-detail').style.display = this.querySelector('.history-detail').style.display === 'none' ? 'block' : 'none'">
                    <div>
                        <div class="history-item-title"><?= sanitize($post['platform'] ?? '') ?> — <?= sanitize(substr($post['content'] ?? '', 0, 60)) ?>...</div>
                        <div class="history-item-date"><?= date('d/m/Y H:i', $post['created_at'] ?? 0) ?></div>
                        <div class="history-detail" style="display:none;margin-top:1rem;font-size:0.9rem;color:var(--text-muted);white-space:pre-wrap"><?= sanitize($post['content'] ?? '') ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<script>
document.getElementById('socialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('socialSubmit');
    var platform = document.getElementById('social-platform').value;
    var objective = document.getElementById('social-objective').value;
    var topic = document.getElementById('social-topic').value;
    var cta = document.getElementById('social-cta').value;

    var prompt = "Crée un post " + platform + " pour mon agence web (mon-agenceweb.fr).\n\n";
    prompt += "Objectif : " + objective + "\n";
    prompt += "Sujet : " + topic + "\n";
    if (cta) prompt += "CTA souhaité : " + cta + "\n";
    prompt += "\nAdapte le format et la longueur à " + platform + ". ";
    if (platform === 'Instagram') prompt += "Ajoute des hashtags pertinents à la fin. ";
    if (platform === 'Twitter/X') prompt += "Maximum 280 caractères. ";
    if (platform === 'LinkedIn') prompt += "Ton professionnel, ajoute des sauts de ligne pour la lisibilité. ";

    setLoading(btn, true);
    document.getElementById('socialEmpty').style.display = 'none';
    document.getElementById('socialContent').style.display = 'none';
    document.getElementById('socialActions').style.display = 'none';
    document.getElementById('socialContent').innerHTML = '<div class="spinner"></div> Génération en cours...';
    document.getElementById('socialContent').style.display = 'block';

    callClaude('social', prompt)
        .then(function(data) {
            window._lastSocialRaw = data.content;
            document.getElementById('socialContent').innerHTML = '<div style="white-space:pre-wrap">' + data.content.replace(/</g,'&lt;') + '</div>';
            document.getElementById('socialActions').style.display = 'flex';
            setLoading(btn, false);
        })
        .catch(function(err) {
            document.getElementById('socialContent').innerHTML = '<div class="alert alert--error">' + err.message + '</div>';
            setLoading(btn, false);
        });
});

document.getElementById('socialSave').addEventListener('click', function() {
    if (!window._lastSocialRaw) return;
    saveContent('social_posts', {
        platform: document.getElementById('social-platform').value,
        content: window._lastSocialRaw
    }).then(function() {
        showNotif('Post sauvegardé');
    });
});
</script>

<?php include __DIR__ . '/templates/footer.php'; ?>
