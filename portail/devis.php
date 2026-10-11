<?php
require_once __DIR__ . '/config.php';
requireClientAuth();

$db = getDB();
$clientId = getClientId();
$project = getClientProject();

$quotes = [];
if ($project) {
    $stmt = $db->prepare('SELECT * FROM quotes WHERE project_id = ? ORDER BY version DESC');
    $stmt->execute([$project['id']]);
    $quotes = $stmt->fetchAll();
}

// Handle quote acceptance
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accept_quote'])) {
    verifyCSRF();
    $quoteId = (int)$_POST['accept_quote'];
    $stmt = $db->prepare('SELECT * FROM quotes WHERE id = ? AND project_id = ?');
    $stmt->execute([$quoteId, $project['id']]);
    $quote = $stmt->fetch();

    if ($quote && $quote['status'] === 'sent') {
        $stmt = $db->prepare('UPDATE quotes SET status = "accepted", accepted_at = NOW() WHERE id = ?');
        $stmt->execute([$quoteId]);

        $stmt = $db->prepare('UPDATE projects SET status = "quote_accepted" WHERE id = ?');
        $stmt->execute([$project['id']]);

        addNotification(
            $project['id'],
            'admin', null,
            'quote_accepted',
            'Le devis v' . $quote['version'] . ' du projet "' . $project['name'] . '" a été accepté.'
        );

        header('Location: /portail/devis?accepted=1');
        exit;
    }
}

$statusLabels = [
    'draft' => 'Brouillon',
    'sent' => 'En attente de validation',
    'accepted' => 'Accepté',
    'rejected' => 'Refusé',
    'revised' => 'Révisé',
];

$statusColors = [
    'draft' => 'var(--portal-gray-500)',
    'sent' => 'var(--portal-orange)',
    'accepted' => 'var(--portal-green)',
    'rejected' => 'var(--portal-red)',
    'revised' => 'var(--portal-blue)',
];

$pageTitle = 'Mes devis';
$page = 'devis';
require_once __DIR__ . '/templates/header.php';
?>

<div style="max-width:900px">
    <h1 class="app-page-title">Mes devis</h1>

    <?php if (isset($_GET['accepted'])): ?>
        <div class="portal-alert portal-alert--success">Devis accepté ! Nous revenons vers vous rapidement.</div>
    <?php endif; ?>

    <?php if (empty($quotes)): ?>
        <div class="portal-card" style="text-align:center;padding:48px">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--portal-gray-400)" stroke-width="1.5" style="margin-bottom:16px"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <p style="color:var(--portal-gray-500)">Aucun devis pour le moment. Complétez votre cahier des charges pour recevoir un devis.</p>
        </div>
    <?php else: ?>
        <?php foreach ($quotes as $q):
            $items = json_decode($q['items'], true) ?: [];
        ?>
            <div class="portal-card" style="margin-bottom:20px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                    <div>
                        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:4px">Devis v<?= $q['version'] ?></h2>
                        <small style="color:var(--portal-gray-500)">
                            <?= $q['sent_at'] ? 'Envoyé le ' . date('d/m/Y', strtotime($q['sent_at'])) : 'Créé le ' . date('d/m/Y', strtotime($q['created_at'])) ?>
                        </small>
                    </div>
                    <span class="portal-badge" style="background:<?= $statusColors[$q['status']] ?? 'var(--portal-gray-500)' ?>">
                        <?= $statusLabels[$q['status']] ?? $q['status'] ?>
                    </span>
                </div>

                <?php if (!empty($items)): ?>
                    <table class="portal-table">
                        <thead>
                            <tr>
                                <th>Prestation</th>
                                <th style="text-align:right">Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($items as $item): ?>
                                <tr>
                                    <td>
                                        <strong><?= sanitize($item['label'] ?? '') ?></strong>
                                        <?php if (!empty($item['description'])): ?>
                                            <br><small style="color:var(--portal-gray-500)"><?= sanitize($item['description']) ?></small>
                                        <?php endif; ?>
                                    </td>
                                    <td style="text-align:right;font-weight:600;white-space:nowrap"><?= number_format($item['amount'] ?? 0, 2, ',', ' ') ?> &euro;</td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                        <tfoot>
                            <tr style="border-top:2px solid var(--portal-gray-300)">
                                <td style="font-weight:700;font-size:1.05rem;padding-top:16px">Total</td>
                                <td style="text-align:right;font-weight:700;font-size:1.1rem;color:var(--portal-orange);padding-top:16px">
                                    <?= number_format($q['total'], 2, ',', ' ') ?> &euro;
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                <?php endif; ?>

                <?php if ($q['status'] === 'sent'): ?>
                    <div style="margin-top:24px;display:flex;gap:12px;justify-content:flex-end">
                        <form method="POST" onsubmit="return confirm('Confirmez-vous l\'acceptation de ce devis ?')">
                            <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">
                            <input type="hidden" name="accept_quote" value="<?= $q['id'] ?>">
                            <button type="submit" class="portal-btn portal-btn--primary">Accepter ce devis</button>
                        </form>
                    </div>
                <?php endif; ?>

                <?php if ($q['status'] === 'accepted' && $q['accepted_at']): ?>
                    <p style="margin-top:16px;color:var(--portal-green);font-weight:600;font-size:0.9rem">
                        Accepté le <?= date('d/m/Y à H:i', strtotime($q['accepted_at'])) ?>
                    </p>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
