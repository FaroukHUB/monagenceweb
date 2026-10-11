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

<div class="app-dashboard">

    <!-- Hero Section -->
    <div class="app-hero">
        <h1 class="app-hero-greeting">Bonjour <?= sanitize($client['first_name']) ?> &#x1F44B;</h1>
        <?php if ($project): ?>
            <p class="app-hero-project"><?= sanitize($project['name']) ?></p>
            <span class="app-hero-badge" style="background:<?= $statusColors[$project['status']] ?? '#999' ?>">
                <?= $statusLabels[$project['status']] ?? $project['status'] ?>
            </span>
        <?php endif; ?>
    </div>

    <?php if ($project): ?>

    <!-- Progress Ring -->
    <div class="app-progress-section">
        <div class="app-ring-container">
            <svg class="app-ring" width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f0f0f0" stroke-width="8"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke="url(#progressGrad)" stroke-width="8"
                        stroke-linecap="round" stroke-dasharray="326.73"
                        stroke-dashoffset="<?= 326.73 - (326.73 * $completedSteps / $totalSteps) ?>"
                        transform="rotate(-90 60 60)"/>
                <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#FFA000"/>
                        <stop offset="100%" stop-color="#FFD100"/>
                    </linearGradient>
                </defs>
            </svg>
            <div class="app-ring-label">
                <span class="app-ring-fraction"><?= $completedSteps ?>/<?= $totalSteps ?></span>
            </div>
        </div>
        <p class="app-progress-title">Cahier des charges</p>
        <?php if ($completedSteps < $totalSteps): ?>
            <a href="/portail/questionnaire" class="app-cta-btn">
                <?= $completedSteps === 0 ? 'Commencer' : 'Continuer' ?>
            </a>
        <?php else: ?>
            <p class="app-done-text">Termin&eacute;</p>
        <?php endif; ?>
    </div>

    <!-- Action Tiles -->
    <div class="app-actions">
        <a href="/portail/questionnaire" class="app-action-tile">
            <div class="app-action-icon" style="background:rgba(255,160,0,0.1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FFA000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            </div>
            <p class="app-action-title">Questionnaire</p>
            <p class="app-action-subtitle"><?= $completedSteps ?>/<?= $totalSteps ?> compl&eacute;t&eacute;s</p>
        </a>
        <a href="/portail/documents" class="app-action-tile">
            <div class="app-action-icon" style="background:rgba(52,152,219,0.1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
            </div>
            <p class="app-action-title">Documents</p>
            <p class="app-action-subtitle">Mes fichiers</p>
        </a>
        <a href="/portail/devis" class="app-action-tile">
            <div class="app-action-icon" style="background:rgba(39,174,96,0.1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            </div>
            <p class="app-action-title">Devis</p>
            <p class="app-action-subtitle">Mes devis</p>
        </a>
        <a href="/portail/profil" class="app-action-tile">
            <div class="app-action-icon" style="background:rgba(155,89,182,0.1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9b59b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </div>
            <p class="app-action-title">Profil</p>
            <p class="app-action-subtitle">Mon compte</p>
        </a>
    </div>

    <!-- Notifications -->
    <div class="app-notifications">
        <h2 class="app-notifications-title">
            Activit&eacute; r&eacute;cente
            <?php if ($unreadCount > 0): ?>
                <span class="app-notifications-badge"><?= $unreadCount ?></span>
            <?php endif; ?>
        </h2>
        <?php if (empty($notifications)): ?>
            <p class="app-empty">Aucune notification pour le moment.</p>
        <?php else: ?>
            <div class="app-notif-list">
                <?php foreach ($notifications as $notif): ?>
                    <div class="app-notif-item <?= $notif['is_read'] ? '' : 'app-notif-item--unread' ?>">
                        <p class="app-notif-message"><?= sanitize($notif['message']) ?></p>
                        <time class="app-notif-time"><?= date('d/m/Y H:i', strtotime($notif['created_at'])) ?></time>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <?php else: ?>
    <div class="app-no-project">
        <p>Aucun projet actif. Vous recevrez une invitation lorsque votre projet sera cr&eacute;&eacute;.</p>
    </div>
    <?php endif; ?>

</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
