<?php
require_once __DIR__ . '/config.php';
requireAuth();
require_once __DIR__ . '/db.php';

$projectId = (int)($_GET['id'] ?? 0);
if (!$projectId) {
    header('Location: projets.php');
    exit;
}

$db = getDB();

$stmt = $db->prepare('SELECT p.*, c.first_name, c.last_name, c.email, c.phone, c.company FROM projects p JOIN clients c ON c.id = p.client_id WHERE p.id = ?');
$stmt->execute([$projectId]);
$project = $stmt->fetch();

if (!$project) {
    header('Location: projets.php');
    exit;
}

// Handle status update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'update_status') {
        $newStatus = $_POST['status'] ?? '';
        $allowed = ['invited','in_progress','questionnaire_complete','quote_sent','quote_accepted','in_development','delivered'];
        if (in_array($newStatus, $allowed, true)) {
            $stmt = $db->prepare('UPDATE projects SET status = ? WHERE id = ?');
            $stmt->execute([$newStatus, $projectId]);
            $project['status'] = $newStatus;
        }
    } elseif ($action === 'update_notes') {
        $notes = trim($_POST['admin_notes'] ?? '');
        $stmt = $db->prepare('UPDATE projects SET admin_notes = ? WHERE id = ?');
        $stmt->execute([$notes, $projectId]);
        $project['admin_notes'] = $notes;
    } elseif ($action === 'resend_invitation') {
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+72 hours'));
        $stmt = $db->prepare('INSERT INTO invitation_tokens (project_id, email, token, expires_at) VALUES (?, ?, ?, ?)');
        $stmt->execute([$projectId, $project['email'], $token, $expiresAt]);
        $resendUrl = 'https://mon-agenceweb.fr/portail/invitation/' . $token;
    }
}

// Get step responses
$stmt = $db->prepare('SELECT * FROM step_responses WHERE project_id = ? ORDER BY step_number');
$stmt->execute([$projectId]);
$steps = $stmt->fetchAll();

$stepNames = [
    1 => 'Votre projet', 2 => 'Votre activité', 3 => 'Votre cible',
    4 => 'Design & identité', 5 => 'Contenu & pages', 6 => 'Fonctionnalités',
    7 => 'Référencement & SEO', 8 => 'Budget & délais', 9 => 'Hébergement & technique',
    10 => 'Récapitulatif',
];

// Get files
$stmt = $db->prepare('SELECT * FROM files WHERE project_id = ? ORDER BY created_at DESC');
$stmt->execute([$projectId]);
$files = $stmt->fetchAll();

// Get quotes
$stmt = $db->prepare('SELECT * FROM quotes WHERE project_id = ? ORDER BY version DESC');
$stmt->execute([$projectId]);
$quotes = $stmt->fetchAll();

$completedSteps = count(array_filter($steps, function($s) { return $s['completed']; }));

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

$pageTitle = $project['name'];
$page = 'projets';
require_once __DIR__ . '/templates/header.php';
?>

<div style="margin-bottom:16px">
    <a href="projets.php" style="color:#999;text-decoration:none;font-size:0.9rem">&larr; Tous les projets</a>
</div>

<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;flex-wrap:wrap;gap:16px">
    <div>
        <h2 style="font-size:1.5rem;margin-bottom:4px"><?= sanitize($project['name']) ?></h2>
        <p style="color:#999"><?= sanitize($project['first_name'] . ' ' . $project['last_name']) ?> — <?= sanitize($project['email']) ?></p>
    </div>
    <form method="POST" style="display:flex;gap:8px;align-items:center">
        <input type="hidden" name="action" value="update_status">
        <select name="status" onchange="this.form.submit()" style="padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-family:inherit;font-weight:600">
            <?php foreach ($statusLabels as $key => $label): ?>
                <option value="<?= $key ?>" <?= $project['status'] === $key ? 'selected' : '' ?>><?= $label ?></option>
            <?php endforeach; ?>
        </select>
    </form>
</div>

<?php if (isset($resendUrl)): ?>
    <div class="alert alert--success" style="background:#f0fdf4;color:#27ae60;padding:16px;border-radius:8px;margin-bottom:20px;border:1px solid #bbf7d0">
        <p style="font-weight:600;margin-bottom:8px">Nouvelle invitation générée :</p>
        <input type="text" value="<?= sanitize($resendUrl) ?>" readonly
               style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;font-family:monospace;font-size:0.85rem"
               onclick="this.select();document.execCommand('copy')">
    </div>
<?php endif; ?>

<div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;align-items:flex-start">
    <!-- Left column: Questionnaire Responses -->
    <div>
        <div class="card" style="padding:24px;margin-bottom:24px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h3>Cahier des charges</h3>
                <span style="font-weight:700;color:#FFA000"><?= $completedSteps ?>/10</span>
            </div>

            <?php if (empty($steps)): ?>
                <p style="color:#999;text-align:center;padding:24px">Le client n'a pas encore commencé le questionnaire.</p>
                <?php if ($project['status'] === 'invited'): ?>
                    <form method="POST" style="text-align:center">
                        <input type="hidden" name="action" value="resend_invitation">
                        <button type="submit" style="padding:10px 20px;background:#C6993E;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-family:inherit">Renvoyer l'invitation</button>
                    </form>
                <?php endif; ?>
            <?php else: ?>
                <?php foreach ($steps as $step): ?>
                    <div style="border:1px solid #eee;border-radius:8px;margin-bottom:12px;overflow:hidden">
                        <div style="padding:14px 16px;background:<?= $step['completed'] ? '#f0fdf4' : '#fff' ?>;display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
                            <span style="font-weight:600;font-size:0.92rem">
                                <?= $step['step_number'] ?>. <?= $stepNames[$step['step_number']] ?? 'Étape ' . $step['step_number'] ?>
                            </span>
                            <span style="font-size:0.8rem;color:<?= $step['completed'] ? '#27ae60' : '#FFA000' ?>">
                                <?= $step['completed'] ? 'Complété' : 'En cours' ?>
                            </span>
                        </div>
                        <div style="display:none;padding:16px;border-top:1px solid #eee;background:#fafafa">
                            <?php
                            $data = json_decode($step['data'], true);
                            if ($data):
                                foreach ($data as $key => $value): ?>
                                    <div style="margin-bottom:12px">
                                        <strong style="font-size:0.82rem;color:#999;display:block;margin-bottom:4px"><?= sanitize(str_replace('_', ' ', ucfirst($key))) ?></strong>
                                        <span style="font-size:0.92rem">
                                            <?php if (is_array($value)): ?>
                                                <?= sanitize(implode(', ', $value)) ?>
                                            <?php else: ?>
                                                <?= nl2br(sanitize((string)$value)) ?>
                                            <?php endif; ?>
                                        </span>
                                    </div>
                                <?php endforeach;
                            else: ?>
                                <p style="color:#999">Aucune donnée.</p>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <!-- Files -->
        <div class="card" style="padding:24px">
            <h3 style="margin-bottom:16px">Documents (<?= count($files) ?>)</h3>
            <?php if (empty($files)): ?>
                <p style="color:#999;text-align:center;padding:16px">Aucun document uploadé.</p>
            <?php else: ?>
                <table style="width:100%;border-collapse:collapse">
                    <?php foreach ($files as $f): ?>
                    <tr style="border-bottom:1px solid #f5f5f5">
                        <td style="padding:10px 0"><?= sanitize($f['original_name']) ?></td>
                        <td style="padding:10px 0;color:#999;font-size:0.85rem"><?= round($f['size'] / 1024) ?> Ko</td>
                        <td style="padding:10px 0;color:#999;font-size:0.85rem"><?= date('d/m/Y', strtotime($f['created_at'])) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            <?php endif; ?>
        </div>
    </div>

    <!-- Right column: Client Info + Notes -->
    <div>
        <div class="card" style="padding:24px;margin-bottom:24px">
            <h3 style="margin-bottom:16px">Client</h3>
            <div style="margin-bottom:12px">
                <small style="color:#999">Nom</small>
                <p style="font-weight:600"><?= sanitize($project['first_name'] . ' ' . $project['last_name']) ?></p>
            </div>
            <div style="margin-bottom:12px">
                <small style="color:#999">Email</small>
                <p><a href="mailto:<?= sanitize($project['email']) ?>" style="color:#C6993E"><?= sanitize($project['email']) ?></a></p>
            </div>
            <?php if ($project['phone']): ?>
            <div style="margin-bottom:12px">
                <small style="color:#999">Téléphone</small>
                <p><?= sanitize($project['phone']) ?></p>
            </div>
            <?php endif; ?>
            <?php if ($project['company']): ?>
            <div style="margin-bottom:12px">
                <small style="color:#999">Entreprise</small>
                <p><?= sanitize($project['company']) ?></p>
            </div>
            <?php endif; ?>
            <div>
                <small style="color:#999">Créé le</small>
                <p><?= date('d/m/Y à H:i', strtotime($project['created_at'])) ?></p>
            </div>
        </div>

        <div class="card" style="padding:24px">
            <h3 style="margin-bottom:16px">Notes internes</h3>
            <form method="POST">
                <input type="hidden" name="action" value="update_notes">
                <textarea name="admin_notes" rows="6" style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;resize:vertical;margin-bottom:12px"
                          placeholder="Notes privées sur ce projet..."><?= sanitize($project['admin_notes'] ?? '') ?></textarea>
                <button type="submit" style="padding:8px 16px;background:#C6993E;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-family:inherit;font-size:0.85rem">Sauvegarder</button>
            </form>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
