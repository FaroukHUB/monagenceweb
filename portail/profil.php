<?php
require_once __DIR__ . '/config.php';
requireClientAuth();

$db = getDB();
$clientId = getClientId();

$stmt = $db->prepare('SELECT * FROM clients WHERE id = ?');
$stmt->execute([$clientId]);
$client = $stmt->fetch();

$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verifyCSRF();

    $action = $_POST['action'] ?? '';

    if ($action === 'profile') {
        $firstName = trim($_POST['first_name'] ?? '');
        $lastName = trim($_POST['last_name'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $company = trim($_POST['company'] ?? '');

        if (!$firstName || !$lastName) {
            $error = 'Le prénom et le nom sont obligatoires.';
        } else {
            $stmt = $db->prepare('UPDATE clients SET first_name = ?, last_name = ?, phone = ?, company = ? WHERE id = ?');
            $stmt->execute([$firstName, $lastName, $phone, $company, $clientId]);
            $success = 'Profil mis à jour.';
            $stmt = $db->prepare('SELECT * FROM clients WHERE id = ?');
            $stmt->execute([$clientId]);
            $client = $stmt->fetch();
        }
    } elseif ($action === 'password') {
        $current = $_POST['current_password'] ?? '';
        $newPass = $_POST['new_password'] ?? '';
        $confirm = $_POST['confirm_password'] ?? '';

        if (!password_verify($current, $client['password'])) {
            $error = 'Mot de passe actuel incorrect.';
        } elseif (strlen($newPass) < 8) {
            $error = 'Le nouveau mot de passe doit contenir au moins 8 caractères.';
        } elseif ($newPass !== $confirm) {
            $error = 'Les mots de passe ne correspondent pas.';
        } else {
            $hash = password_hash($newPass, PASSWORD_DEFAULT);
            $stmt = $db->prepare('UPDATE clients SET password = ? WHERE id = ?');
            $stmt->execute([$hash, $clientId]);
            $success = 'Mot de passe modifié.';
        }
    }
}

$pageTitle = 'Mon profil';
$page = 'profil';
require_once __DIR__ . '/templates/header.php';
?>

<div style="max-width:600px">
    <h1 style="font-size:1.5rem;font-weight:700;margin-bottom:24px">Mon profil</h1>

    <?php if ($success): ?>
        <div class="portal-alert portal-alert--success"><?= sanitize($success) ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div class="portal-alert portal-alert--error"><?= sanitize($error) ?></div>
    <?php endif; ?>

    <div class="portal-card" style="margin-bottom:24px">
        <h2 style="margin-bottom:20px">Informations personnelles</h2>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">
            <input type="hidden" name="action" value="profile">
            <div class="portal-form-group">
                <label for="first_name">Prénom</label>
                <input type="text" id="first_name" name="first_name" required value="<?= sanitize($client['first_name']) ?>">
            </div>
            <div class="portal-form-group">
                <label for="last_name">Nom</label>
                <input type="text" id="last_name" name="last_name" required value="<?= sanitize($client['last_name']) ?>">
            </div>
            <div class="portal-form-group">
                <label for="email_display">Email</label>
                <input type="email" id="email_display" value="<?= sanitize($client['email']) ?>" disabled>
            </div>
            <div class="portal-form-group">
                <label for="phone">Téléphone</label>
                <input type="tel" id="phone" name="phone" value="<?= sanitize($client['phone'] ?? '') ?>">
            </div>
            <div class="portal-form-group">
                <label for="company">Entreprise</label>
                <input type="text" id="company" name="company" value="<?= sanitize($client['company'] ?? '') ?>">
            </div>
            <button type="submit" class="portal-btn portal-btn--primary">Enregistrer</button>
        </form>
    </div>

    <div class="portal-card">
        <h2 style="margin-bottom:20px">Changer le mot de passe</h2>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">
            <input type="hidden" name="action" value="password">
            <div class="portal-form-group">
                <label for="current_password">Mot de passe actuel</label>
                <input type="password" id="current_password" name="current_password" required>
            </div>
            <div class="portal-form-group">
                <label for="new_password">Nouveau mot de passe</label>
                <input type="password" id="new_password" name="new_password" required minlength="8">
            </div>
            <div class="portal-form-group">
                <label for="confirm_password">Confirmer</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
            </div>
            <button type="submit" class="portal-btn portal-btn--primary">Modifier le mot de passe</button>
        </form>
    </div>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
