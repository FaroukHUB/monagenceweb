<?php
require_once __DIR__ . '/config.php';
requireClientAuth();

$db = getDB();
$clientId = getClientId();

$stmt = $db->prepare('SELECT * FROM clients WHERE id = ?');
$stmt->execute([$clientId]);
$client = $stmt->fetch();

$project = getClientProject();

$completedSteps = 0;
$totalSteps = 10;
if ($project) {
    $stmt = $db->prepare('SELECT COUNT(*) FROM step_responses WHERE project_id = ? AND completed = 1');
    $stmt->execute([$project['id']]);
    $completedSteps = (int)$stmt->fetchColumn();
}

$notifications = [];
if ($project) {
    $stmt = $db->prepare('SELECT * FROM notifications WHERE recipient_type = "client" AND recipient_id = ? ORDER BY created_at DESC LIMIT 10');
    $stmt->execute([$clientId]);
    $notifications = $stmt->fetchAll();
}

$unreadCount = 0;
if ($project) {
    $stmt = $db->prepare('SELECT COUNT(*) FROM notifications WHERE recipient_type = "client" AND recipient_id = ? AND is_read = 0');
    $stmt->execute([$clientId]);
    $unreadCount = (int)$stmt->fetchColumn();
}

$statusLabels = [
    'invited' => 'Invitation envoyée',
    'in_progress' => 'En cours de complétion',
    'questionnaire_complete' => 'Cahier des charges complété',
    'quote_sent' => 'Devis envoyé',
    'quote_accepted' => 'Devis accepté',
    'in_development' => 'En développement',
    'delivered' => 'Livré',
];

$statusColors = [
    'invited' => '#9b59b6',
    'in_progress' => '#FFA000',
    'questionnaire_complete' => '#2ecc71',
    'quote_sent' => '#3498db',
    'quote_accepted' => '#27ae60',
    'in_development' => '#e67e22',
    'delivered' => '#27ae60',
];

$pageTitle = 'Tableau de bord';
$page = 'dashboard';
require_once __DIR__ . '/templates/header.php';
?>

<div class="portal-dashboard">
    <div class="portal-welcome">
        <h1>Bonjour <?= sanitize($client['first_name']) ?></h1>
        <?php if ($project): ?>
            <p>Projet : <strong><?= sanitize($project['name']) ?></strong></p>
        <?php endif; ?>
    </div>

    <?php if ($project): ?>
    <div class="portal-grid">
        <div class="portal-card portal-card--status">
            <div class="portal-card-header">
                <h2>Statut du projet</h2>
                <span class="portal-badge" style="background:<?= $statusColors[$project['status']] ?? '#999' ?>">
                    <?= $statusLabels[$project['status']] ?? $project['status'] ?>
                </span>
            </div>
        </div>

        <div class="portal-card portal-card--progress">
            <div class="portal-card-header">
                <h2>Cahier des charges</h2>
                <span class="portal-progress-text"><?= $completedSteps ?>/<?= $totalSteps ?></span>
            </div>
            <div class="portal-progress-bar">
                <div class="portal-progress-fill" style="width:<?= ($completedSteps / $totalSteps) * 100 ?>%"></div>
            </div>
            <?php if ($completedSteps < $totalSteps): ?>
                <a href="/portail/questionnaire" class="portal-btn portal-btn--primary" style="margin-top:16px">
                    <?= $completedSteps === 0 ? 'Commencer' : 'Continuer' ?>
                </a>
            <?php else: ?>
                <p style="margin-top:12px;color:#27ae60;font-weight:600">Terminé</p>
            <?php endif; ?>
        </div>

        <div class="portal-card portal-card--quick">
            <h2>Accès rapide</h2>
            <div class="portal-quick-links">
                <a href="/portail/questionnaire" class="portal-quick-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Cahier des charges
                </a>
                <a href="/portail/documents" class="portal-quick-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    Mes documents
                </a>
                <a href="/portail/devis" class="portal-quick-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    Mes devis
                </a>
            </div>
        </div>

        <div class="portal-card portal-card--notif">
            <div class="portal-card-header">
                <h2>Notifications</h2>
                <?php if ($unreadCount > 0): ?>
                    <span class="portal-badge portal-badge--small"><?= $unreadCount ?></span>
                <?php endif; ?>
            </div>
            <?php if (empty($notifications)): ?>
                <p class="portal-empty">Aucune notification pour le moment.</p>
            <?php else: ?>
                <div class="portal-notif-list">
                    <?php foreach ($notifications as $notif): ?>
                        <div class="portal-notif-item <?= $notif['is_read'] ? '' : 'portal-notif-item--unread' ?>">
                            <p><?= sanitize($notif['message']) ?></p>
                            <time><?= date('d/m/Y H:i', strtotime($notif['created_at'])) ?></time>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php else: ?>
        <div class="portal-card">
            <p>Aucun projet actif. Vous recevrez une invitation lorsque votre projet sera créé.</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
