<?php
require_once __DIR__ . '/config.php';

if (isClientLoggedIn()) {
    header('Location: ' . PORTAIL_URL . '/dashboard');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        $error = 'Veuillez remplir tous les champs.';
    } else {
        try {
            $db = getDB();
            $stmt = $db->prepare('SELECT id, password, first_name FROM clients WHERE email = ?');
            $stmt->execute([$email]);
            $client = $stmt->fetch();

            if ($client && $client['password'] && password_verify($password, $client['password'])) {
                session_regenerate_id(true);
                $_SESSION['client_id'] = $client['id'];
                $_SESSION['client_name'] = $client['first_name'];
                header('Location: ' . PORTAIL_URL . '/dashboard');
                exit;
            }
            $error = 'Email ou mot de passe incorrect.';
        } catch (Exception $e) {
            $error = 'Erreur de connexion. Veuillez réessayer.';
        }
    }
}

$pageTitle = 'Connexion';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion — Portail Client mon-agenceweb.fr</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/portail/style.css">
</head>
<body class="portal-login-page">
    <div class="portal-login-card">
        <div class="portal-login-logo">maw<span>.</span></div>
        <h1>Espace client</h1>
        <p>Connectez-vous pour accéder à votre projet</p>

        <?php if ($error): ?>
            <div class="portal-alert portal-alert--error"><?= sanitize($error) ?></div>
        <?php endif; ?>

        <form method="POST" autocomplete="on">
            <div class="portal-form-group">
                <label for="email">Adresse email</label>
                <input type="email" id="email" name="email" required autofocus
                       value="<?= sanitize($email ?? '') ?>"
                       placeholder="votre@email.fr">
            </div>
            <div class="portal-form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" required
                       placeholder="Votre mot de passe">
            </div>
            <button type="submit" class="portal-btn portal-btn--primary portal-btn--full">Se connecter</button>
        </form>
    </div>
</body>
</html>
