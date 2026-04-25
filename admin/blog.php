<?php
require_once __DIR__ . '/config.php';
requireAuth();

$articles = readData('articles');
$page = 'blog';
$pageTitle = 'Blog / Articles';
include __DIR__ . '/templates/header.php';
?>

<div class="generator">
    <div class="generator-form">
        <div class="card">
            <h2 class="card-title">Générer un article</h2>
            <form id="blogForm">
                <div class="form-group">
                    <label for="blog-topic">Sujet de l'article</label>
                    <input type="text" id="blog-topic" placeholder="Ex: Pourquoi investir dans un site sur mesure en 2025" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="blog-tone">Ton</label>
                        <select id="blog-tone">
                            <option value="professionnel">Professionnel</option>
                            <option value="decontracte">Décontracté</option>
                            <option value="educatif">Éducatif</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="blog-length">Longueur</label>
                        <select id="blog-length">
                            <option value="court (500 mots)">Court (~500 mots)</option>
                            <option value="moyen (1000 mots)" selected>Moyen (~1000 mots)</option>
                            <option value="long (1500-2000 mots)">Long (~1500 mots)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="blog-keywords">Mots-clés SEO <span style="color:var(--text-muted)">(optionnel)</span></label>
                    <input type="text" id="blog-keywords" placeholder="développeur web, site sur mesure, Laravel...">
                </div>
                <div class="form-group">
                    <label for="blog-notes">Notes / instructions supplémentaires <span style="color:var(--text-muted)">(optionnel)</span></label>
                    <textarea id="blog-notes" rows="3" placeholder="Détails spécifiques, points à aborder..."></textarea>
                </div>
                <button type="submit" class="btn btn--primary btn--full" id="blogSubmit">Générer l'article</button>
            </form>
        </div>
    </div>

    <div>
        <div class="generator-output" id="blogOutput">
            <div class="generator-output-empty" id="blogEmpty">
                Le contenu généré apparaîtra ici.
            </div>
            <div class="generated-content" id="blogContent" style="display:none"></div>
            <div class="output-actions" id="blogActions" style="display:none">
                <button class="btn btn--secondary" onclick="copyContent(window._lastBlogRaw)">Copier le texte</button>
                <button class="btn btn--secondary" onclick="copyContent(document.getElementById('blogContent').innerHTML)">Copier en HTML</button>
                <button class="btn btn--primary" id="blogSave">Sauvegarder</button>
            </div>
        </div>

        <?php if (!empty($articles)): ?>
        <div class="history">
            <h3 class="history-title">Articles générés</h3>
            <div class="history-list">
                <?php foreach (array_reverse($articles) as $article): ?>
                <div class="history-item" onclick="this.querySelector('.history-detail').style.display = this.querySelector('.history-detail').style.display === 'none' ? 'block' : 'none'">
                    <div>
                        <div class="history-item-title"><?= sanitize($article['title'] ?? 'Sans titre') ?></div>
                        <div class="history-item-date"><?= date('d/m/Y H:i', $article['created_at'] ?? 0) ?></div>
                        <div class="history-detail" style="display:none;margin-top:1rem;font-size:0.9rem;color:var(--text-muted);white-space:pre-wrap"><?= sanitize($article['content'] ?? '') ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<script>
document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('blogSubmit');
    var topic = document.getElementById('blog-topic').value;
    var tone = document.getElementById('blog-tone').value;
    var length = document.getElementById('blog-length').value;
    var keywords = document.getElementById('blog-keywords').value;
    var notes = document.getElementById('blog-notes').value;

    var prompt = "Rédige un article de blog sur le sujet suivant : " + topic + "\n\n";
    prompt += "Ton : " + tone + "\n";
    prompt += "Longueur : " + length + "\n";
    if (keywords) prompt += "Mots-clés SEO à intégrer : " + keywords + "\n";
    if (notes) prompt += "Instructions : " + notes + "\n";
    prompt += "\nStructure l'article avec un titre H1, des sous-titres H2, une introduction accrocheuse, et une conclusion avec CTA. Optimise pour le SEO.";

    setLoading(btn, true);
    document.getElementById('blogEmpty').style.display = 'none';
    document.getElementById('blogContent').style.display = 'none';
    document.getElementById('blogActions').style.display = 'none';
    document.getElementById('blogContent').innerHTML = '<div class="spinner"></div> Génération en cours...';
    document.getElementById('blogContent').style.display = 'block';

    callClaude('article', prompt)
        .then(function(data) {
            window._lastBlogRaw = data.content;
            document.getElementById('blogContent').innerHTML = mdToHtml(data.content);
            document.getElementById('blogActions').style.display = 'flex';
            setLoading(btn, false);
        })
        .catch(function(err) {
            document.getElementById('blogContent').innerHTML = '<div class="alert alert--error">' + err.message + '</div>';
            setLoading(btn, false);
        });
});

document.getElementById('blogSave').addEventListener('click', function() {
    if (!window._lastBlogRaw) return;
    saveContent('articles', {
        title: document.getElementById('blog-topic').value,
        content: window._lastBlogRaw
    }).then(function() {
        showNotif('Article sauvegardé');
    });
});
</script>

<?php include __DIR__ . '/templates/footer.php'; ?>
