<?php
require_once __DIR__ . '/config.php';

$token = $_GET['token'] ?? '';
$error = '';
$success = false;

if (!$token || !preg_match('/^[a-f0-9]{64}$/', $token)) {
    $error = 'Lien d\'invitation invalide.';
} else {
    try {
        $db = getDB();
        $stmt = $db->prepare('
            SELECT it.*, c.email, c.first_name, c.last_name, p.name AS project_name
            FROM invitation_tokens it
            JOIN projects p ON p.id = it.project_id
            JOIN clients c ON c.id = p.client_id
            WHERE it.token = ? AND it.used = 0 AND it.expires_at > NOW()
        ');
        $stmt->execute([$token]);
        $invitation = $stmt->fetch();

        if (!$invitation) {
            $error = 'Ce lien d\'invitation a expiré ou a déjà été utilisé.';
        }
    } catch (Exception $e) {
        $error = 'Erreur technique. Veuillez réessayer.';
    }
}

if (!$error && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    $passwordConfirm = $_POST['password_confirm'] ?? '';
    $phone = trim($_POST['phone'] ?? '');

    if (strlen($password) < 8) {
        $error = 'Le mot de passe doit contenir au moins 8 caractères.';
    } elseif ($password !== $passwordConfirm) {
        $error = 'Les mots de passe ne correspondent pas.';
    } else {
        try {
            $db = getDB();
            $db->beginTransaction();

            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $db->prepare('UPDATE clients SET password = ?, phone = COALESCE(NULLIF(?, ""), phone) WHERE email = ?');
            $stmt->execute([$hash, $phone, $invitation['email']]);

            $stmt = $db->prepare('UPDATE invitation_tokens SET used = 1 WHERE token = ?');
            $stmt->execute([$token]);

            $stmt = $db->prepare('UPDATE projects SET status = "in_progress" WHERE id = ?');
            $stmt->execute([$invitation['project_id']]);

            addNotification(
                $invitation['project_id'],
                'admin', null,
                'invitation_accepted',
                $invitation['first_name'] . ' ' . $invitation['last_name'] . ' a activé son compte.'
            );

            $db->commit();

            session_regenerate_id(true);
            $_SESSION['client_id'] = $invitation['project_id'];
            // Fetch client_id from email
            $stmt = $db->prepare('SELECT id, first_name FROM clients WHERE email = ?');
            $stmt->execute([$invitation['email']]);
            $client = $stmt->fetch();
            $_SESSION['client_id'] = $client['id'];
            $_SESSION['client_name'] = $client['first_name'];

            $success = true;
        } catch (Exception $e) {
            $db->rollBack();
            $error = 'Erreur lors de la création du compte. Veuillez réessayer.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
    <title>Créer votre compte — Portail Client</title>
    <meta name="robots" content="noindex, nofollow">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#111111">
    <meta name="apple-mobile-web-app-title" content="maw.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/portail/style.css">
</head>
<body class="portal-login-page">
    <div class="portal-login-card">
        <div class="portal-login-logo">maw<span>.</span></div>

        <?php if ($success): ?>
            <h1>Compte créé !</h1>
            <p>Bienvenue <?= sanitize($invitation['first_name']) ?>. Votre espace projet est prêt.</p>
            <a href="/portail/dashboard" class="portal-btn portal-btn--primary portal-btn--full" style="margin-top:24px;display:block;text-align:center">Accéder à mon projet</a>

        <?php elseif ($error && !isset($invitation)): ?>
            <h1>Lien invalide</h1>
            <div class="portal-alert portal-alert--error"><?= sanitize($error) ?></div>
            <p style="margin-top:16px">Si vous avez déjà créé votre compte, <a href="/portail/login">connectez-vous ici</a>.</p>

        <?php else: ?>
            <h1>Bienvenue <?= sanitize($invitation['first_name']) ?></h1>
            <p>Créez votre mot de passe pour accéder au projet <strong><?= sanitize($invitation['project_name']) ?></strong></p>

            <?php if ($error): ?>
                <div class="portal-alert portal-alert--error"><?= sanitize($error) ?></div>
            <?php endif; ?>

            <form method="POST" autocomplete="off">
                <div class="portal-form-group">
                    <label>Email</label>
                    <input type="email" value="<?= sanitize($invitation['email']) ?>" disabled>
                </div>
                <div class="portal-form-group">
                    <label for="phone">Téléphone (optionnel)</label>
                    <input type="tel" id="phone" name="phone" placeholder="06 12 34 56 78">
                </div>
                <div class="portal-form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required minlength="8"
                           placeholder="8 caractères minimum">
                </div>
                <div class="portal-form-group">
                    <label for="password_confirm">Confirmer le mot de passe</label>
                    <input type="password" id="password_confirm" name="password_confirm" required
                           placeholder="Retapez votre mot de passe">
                </div>
                <button type="submit" class="portal-btn portal-btn--primary portal-btn--full">Créer mon compte</button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
