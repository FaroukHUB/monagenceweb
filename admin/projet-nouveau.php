<?php
require_once __DIR__ . '/config.php';
requireAuth();
require_once __DIR__ . '/db.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectName = trim($_POST['project_name'] ?? '');
    $clientEmail = trim($_POST['client_email'] ?? '');
    $clientFirstName = trim($_POST['client_first_name'] ?? '');
    $clientLastName = trim($_POST['client_last_name'] ?? '');
    $clientCompany = trim($_POST['client_company'] ?? '');

    if (!$projectName || !$clientEmail || !$clientFirstName || !$clientLastName) {
        $error = 'Tous les champs obligatoires doivent être remplis.';
    } elseif (!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
        $error = 'Adresse email invalide.';
    } else {
        try {
            $db = getDB();
            $db->beginTransaction();

            $stmt = $db->prepare('SELECT id FROM clients WHERE email = ?');
            $stmt->execute([$clientEmail]);
            $existing = $stmt->fetch();

            if ($existing) {
                $clientId = $existing['id'];
            } else {
                $stmt = $db->prepare('INSERT INTO clients (email, first_name, last_name, company) VALUES (?, ?, ?, ?)');
                $stmt->execute([$clientEmail, $clientFirstName, $clientLastName, $clientCompany]);
                $clientId = $db->lastInsertId();
            }

            $stmt = $db->prepare('INSERT INTO projects (client_id, name, status) VALUES (?, ?, "invited")');
            $stmt->execute([$clientId, $projectName]);
            $projectId = $db->lastInsertId();

            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', strtotime('+72 hours'));
            $stmt = $db->prepare('INSERT INTO invitation_tokens (project_id, email, token, expires_at) VALUES (?, ?, ?, ?)');
            $stmt->execute([$projectId, $clientEmail, $token, $expiresAt]);

            $db->commit();

            $invitationUrl = 'https://mon-agenceweb.fr/portail/invitation/' . $token;

            if (MAIL_API_KEY) {
                $htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#333">';
                $htmlBody .= '<div style="text-align:center;margin-bottom:32px"><span style="font-size:2rem;font-weight:700;color:#111">maw<span style="color:#FFA000">.</span></span></div>';
                $htmlBody .= '<h2 style="color:#111;margin-bottom:16px">Bonjour ' . htmlspecialchars($clientFirstName) . ',</h2>';
                $htmlBody .= '<p style="margin-bottom:16px">Votre espace projet <strong>' . htmlspecialchars($projectName) . '</strong> est prêt sur mon-agenceweb.fr.</p>';
                $htmlBody .= '<p style="margin-bottom:24px">Cliquez sur le bouton ci-dessous pour créer votre mot de passe et accéder à votre cahier des charges interactif.</p>';
                $htmlBody .= '<div style="text-align:center;margin:32px 0">';
                $htmlBody .= '<a href="' . $invitationUrl . '" style="display:inline-block;padding:14px 32px;background:#FFA000;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:1rem">Activer mon espace projet</a>';
                $htmlBody .= '</div>';
                $htmlBody .= '<p style="color:#999;font-size:0.85rem">Ce lien expire dans 72 heures. Si vous n\'êtes pas à l\'origine de cette demande, ignorez cet email.</p>';
                $htmlBody .= '<hr style="border:none;border-top:1px solid #eee;margin:24px 0">';
                $htmlBody .= '<p style="color:#999;font-size:0.8rem;text-align:center">mon-agenceweb.fr — Votre agence web de confiance</p>';
                $htmlBody .= '</div>';

                $payload = [
                    'sender' => ['name' => MAIL_FROM_NAME, 'email' => MAIL_FROM_EMAIL],
                    'to' => [['email' => $clientEmail, 'name' => $clientFirstName . ' ' . $clientLastName]],
                    'subject' => 'Votre espace projet est prêt — ' . $projectName,
                    'htmlContent' => $htmlBody,
                ];

                $ch = curl_init('https://api.brevo.com/v3/smtp/email');
                curl_setopt_array($ch, [
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_POST => true,
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json',
                        'api-key: ' . MAIL_API_KEY,
                        'accept: application/json'
                    ],
                    CURLOPT_POSTFIELDS => json_encode($payload),
                    CURLOPT_TIMEOUT => 30,
                ]);
                $response = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);

                if ($httpCode >= 200 && $httpCode < 300) {
                    $success = 'Projet créé et invitation envoyée à ' . $clientEmail;
                } else {
                    $success = 'Projet créé. L\'email n\'a pas pu être envoyé (vérifiez la clé Brevo). Lien d\'invitation :';
                }
            } else {
                $success = 'Projet créé. Brevo non configuré — envoyez ce lien manuellement :';
            }
        } catch (Exception $e) {
            if (isset($db) && $db->inTransaction()) $db->rollBack();
            $error = 'Erreur : ' . $e->getMessage();
        }
    }
}

$pageTitle = 'Nouveau projet';
$page = 'projets';
require_once __DIR__ . '/templates/header.php';
?>

<div style="max-width:600px">
    <?php if ($success): ?>
        <div class="alert alert--success" style="background:#f0fdf4;color:#27ae60;padding:16px;border-radius:8px;margin-bottom:20px;border:1px solid #bbf7d0">
            <p style="font-weight:600;margin-bottom:8px"><?= sanitize($success) ?></p>
            <?php if (isset($invitationUrl)): ?>
                <input type="text" value="<?= sanitize($invitationUrl) ?>" readonly
                       style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;font-family:monospace;font-size:0.85rem;margin-top:8px"
                       onclick="this.select();document.execCommand('copy')">
                <small style="color:#999">Cliquez pour copier</small>
            <?php endif; ?>
        </div>
        <a href="projets.php" style="color:#C6993E;font-weight:600;text-decoration:none">&larr; Retour aux projets</a>

    <?php else: ?>
        <?php if ($error): ?>
            <div class="alert alert--error" style="background:#fef2f2;color:#e74c3c;padding:16px;border-radius:8px;margin-bottom:20px;border:1px solid #fecaca"><?= sanitize($error) ?></div>
        <?php endif; ?>

        <div class="card" style="padding:32px">
            <h2 style="margin-bottom:24px">Créer un projet client</h2>

            <form method="POST">
                <h3 style="font-size:0.9rem;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px">Projet</h3>
                <div class="form-group" style="margin-bottom:20px">
                    <label for="project_name" style="display:block;margin-bottom:6px;font-weight:600;font-size:0.85rem">Nom du projet *</label>
                    <input type="text" id="project_name" name="project_name" required
                           placeholder="Ex : Site web Restaurant Le Gourmet"
                           value="<?= sanitize($_POST['project_name'] ?? '') ?>"
                           style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem">
                </div>

                <h3 style="font-size:0.9rem;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin:32px 0 16px">Client</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                    <div class="form-group" style="margin-bottom:20px">
                        <label for="client_first_name" style="display:block;margin-bottom:6px;font-weight:600;font-size:0.85rem">Prénom *</label>
                        <input type="text" id="client_first_name" name="client_first_name" required
                               value="<?= sanitize($_POST['client_first_name'] ?? '') ?>"
                               style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem">
                    </div>
                    <div class="form-group" style="margin-bottom:20px">
                        <label for="client_last_name" style="display:block;margin-bottom:6px;font-weight:600;font-size:0.85rem">Nom *</label>
                        <input type="text" id="client_last_name" name="client_last_name" required
                               value="<?= sanitize($_POST['client_last_name'] ?? '') ?>"
                               style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom:20px">
                    <label for="client_email" style="display:block;margin-bottom:6px;font-weight:600;font-size:0.85rem">Email *</label>
                    <input type="email" id="client_email" name="client_email" required
                           placeholder="client@email.fr"
                           value="<?= sanitize($_POST['client_email'] ?? '') ?>"
                           style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem">
                </div>
                <div class="form-group" style="margin-bottom:24px">
                    <label for="client_company" style="display:block;margin-bottom:6px;font-weight:600;font-size:0.85rem">Entreprise</label>
                    <input type="text" id="client_company" name="client_company"
                           value="<?= sanitize($_POST['client_company'] ?? '') ?>"
                           style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem">
                </div>

                <div style="display:flex;gap:12px">
                    <button type="submit" class="btn btn--primary" style="padding:12px 24px;background:#C6993E;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-family:inherit;font-size:0.95rem">Créer et envoyer l'invitation</button>
                    <a href="projets.php" style="padding:12px 24px;color:#999;text-decoration:none;display:flex;align-items:center">Annuler</a>
                </div>
            </form>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
