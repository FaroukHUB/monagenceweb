<?php
require_once __DIR__ . '/config.php';
requireAuth();

$articles = readData('articles');
$posts    = readData('social_posts');
$emails   = readData('emails');

$totalArticles = count($articles);
$totalPosts    = count($posts);
$totalEmails   = count($emails);

$page = 'dashboard';
$pageTitle = 'Tableau de bord';
include __DIR__ . '/templates/header.php';
?>

<div class="stats-grid">
    <div class="stat-card">
        <span class="stat-number"><?= $totalArticles ?></span>
        <span class="stat-label">Articles de blog</span>
    </div>
    <div class="stat-card">
        <span class="stat-number"><?= $totalPosts ?></span>
        <span class="stat-label">Posts réseaux sociaux</span>
    </div>
    <div class="stat-card">
        <span class="stat-number"><?= $totalEmails ?></span>
        <span class="stat-label">Campagnes email</span>
    </div>
    <div class="stat-card">
        <span class="stat-number"><?= CLAUDE_API_KEY ? '✓' : '✗' ?></span>
        <span class="stat-label">API Claude <?= CLAUDE_API_KEY ? 'connectée' : 'non configurée' ?></span>
    </div>
</div>

<div class="dashboard-grid">
    <section class="card">
        <h2 class="card-title">Actions rapides</h2>
        <div class="quick-actions">
            <a href="blog.php" class="btn btn--primary">Générer un article</a>
            <a href="social.php" class="btn btn--secondary">Créer un post social</a>
            <a href="mailing.php" class="btn btn--secondary">Nouvelle campagne email</a>
        </div>
    </section>

    <section class="card">
        <h2 class="card-title">Derniers contenus</h2>
        <?php
        $recent = array_merge(
            array_map(function($a) { $a['_type'] = 'article'; return $a; }, array_slice($articles, -3)),
            array_map(function($p) { $p['_type'] = 'post'; return $p; }, array_slice($posts, -3))
        );
        usort($recent, function($a, $b) {
            return ($b['created_at'] ?? 0) <=> ($a['created_at'] ?? 0);
        });
        $recent = array_slice($recent, 0, 5);
        ?>
        <?php if (empty($recent)): ?>
            <p class="text-muted">Aucun contenu généré pour le moment.</p>
        <?php else: ?>
            <ul class="activity-list">
                <?php foreach ($recent as $item): ?>
                    <li>
                        <span class="activity-badge activity-badge--<?= $item['_type'] ?>">
                            <?= $item['_type'] === 'article' ? 'Blog' : 'Social' ?>
                        </span>
                        <span><?= sanitize($item['title'] ?? $item['content'] ?? '—') ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </section>
</div>

<?php if (!CLAUDE_API_KEY): ?>
<div class="alert alert--warning">
    <strong>API Claude non configurée.</strong>
    Ajoute ta clé API dans <code>admin/config.php</code> (ligne CLAUDE_API_KEY) pour activer la génération de contenu.
</div>
<?php endif; ?>

<?php include __DIR__ . '/templates/footer.php'; ?>
