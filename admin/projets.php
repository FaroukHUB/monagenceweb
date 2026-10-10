<?php
require_once __DIR__ . '/config.php';
requireAuth();
require_once __DIR__ . '/db.php';

$db = getDB();

$statusFilter = $_GET['status'] ?? '';
$query = 'SELECT p.*, c.first_name, c.last_name, c.email, c.company FROM projects p JOIN clients c ON c.id = p.client_id';
$params = [];

if ($statusFilter) {
    $query .= ' WHERE p.status = ?';
    $params[] = $statusFilter;
}
$query .= ' ORDER BY p.updated_at DESC';

$stmt = $db->prepare($query);
$stmt->execute($params);
$projects = $stmt->fetchAll();

$statusLabels = [
    'invited' => 'Invitation envoyée',
    'in_progress' => 'En cours',
    'questionnaire_complete' => 'Questionnaire complété',
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

$pageTitle = 'Projets';
$page = 'projets';
require_once __DIR__ . '/templates/header.php';
?>

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
    <div>
        <select onchange="location.href='projets.php'+(this.value?'?status='+this.value:'')" style="padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-family:inherit">
            <option value="">Tous les statuts</option>
            <?php foreach ($statusLabels as $key => $label): ?>
                <option value="<?= $key ?>" <?= $statusFilter === $key ? 'selected' : '' ?>><?= $label ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <a href="projet-nouveau.php" class="btn btn--primary" style="text-decoration:none;padding:10px 20px;background:#C6993E;color:#fff;border-radius:8px;font-weight:600">+ Nouveau projet</a>
</div>

<?php if (empty($projects)): ?>
    <div class="card" style="text-align:center;padding:48px">
        <p style="color:#999;margin-bottom:16px">Aucun projet pour le moment.</p>
        <a href="projet-nouveau.php" class="btn btn--primary" style="text-decoration:none;padding:10px 20px;background:#C6993E;color:#fff;border-radius:8px;font-weight:600">Créer un projet</a>
    </div>
<?php else: ?>
    <div class="card" style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
            <thead>
                <tr style="border-bottom:2px solid #eee">
                    <th style="text-align:left;padding:12px 16px;font-size:0.8rem;color:#999;text-transform:uppercase">Projet</th>
                    <th style="text-align:left;padding:12px 16px;font-size:0.8rem;color:#999;text-transform:uppercase">Client</th>
                    <th style="text-align:left;padding:12px 16px;font-size:0.8rem;color:#999;text-transform:uppercase">Statut</th>
                    <th style="text-align:left;padding:12px 16px;font-size:0.8rem;color:#999;text-transform:uppercase">Mise à jour</th>
                    <th style="padding:12px 16px"></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($projects as $p): ?>
                <tr style="border-bottom:1px solid #f5f5f5">
                    <td style="padding:14px 16px">
                        <strong><?= sanitize($p['name']) ?></strong>
                    </td>
                    <td style="padding:14px 16px">
                        <?= sanitize($p['first_name'] . ' ' . $p['last_name']) ?>
                        <?php if ($p['company']): ?>
                            <br><small style="color:#999"><?= sanitize($p['company']) ?></small>
                        <?php endif; ?>
                    </td>
                    <td style="padding:14px 16px">
                        <span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;color:#fff;background:<?= $statusColors[$p['status']] ?? '#999' ?>">
                            <?= $statusLabels[$p['status']] ?? $p['status'] ?>
                        </span>
                    </td>
                    <td style="padding:14px 16px;color:#999;font-size:0.9rem">
                        <?= date('d/m/Y', strtotime($p['updated_at'])) ?>
                    </td>
                    <td style="padding:14px 16px;text-align:right">
                        <a href="projet-detail.php?id=<?= $p['id'] ?>" style="color:#C6993E;font-weight:600;text-decoration:none">Voir &rarr;</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
