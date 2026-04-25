<?php
require_once __DIR__ . '/config.php';

$error = '';

// Premier lancement : setup du mot de passe
if (ADMIN_PASS_HASH === '') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['new_password'])) {
        $hash = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
        $configFile = file_get_contents(__DIR__ . '/config.php');
        $configFile = str_replace(
            "define('ADMIN_PASS_HASH', '');",
            "define('ADMIN_PASS_HASH', '$hash');",
            $configFile
        );
        file_put_contents(__DIR__ . '/config.php', $configFile);
        $_SESSION['admin_logged_in'] = true;
        header('Location: ' . ADMIN_URL . '/');
        exit;
    }
    $isSetup = true;
} else {
    $isSetup = false;
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user = $_POST['username'] ?? '';
        $pass = $_POST['password'] ?? '';
        if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS_HASH)) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: ' . ADMIN_URL . '/');
            exit;
        }
        $error = 'Identifiants incorrects.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $isSetup ? 'Setup' : 'Connexion' ?> — Admin</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="login-page">
    <div class="login-card">
        <h1 class="login-logo">maw<span class="accent">.</span></h1>
        <p class="login-subtitle"><?= $isSetup ? 'Créer votre mot de passe admin' : 'Panneau d\'administration' ?></p>

        <?php if ($error): ?>
            <div class="alert alert--error"><?= $error ?></div>
        <?php endif; ?>

        <?php if ($isSetup): ?>
            <form method="POST">
                <div class="form-group">
                    <label for="new_password">Nouveau mot de passe</label>
                    <input type="password" id="new_password" name="new_password" required minlength="6" autofocus>
                </div>
                <button type="submit" class="btn btn--primary btn--full">Créer le compte</button>
            </form>
        <?php else: ?>
            <form method="POST">
                <div class="form-group">
                    <label for="username">Identifiant</label>
                    <input type="text" id="username" name="username" required autofocus>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn--primary btn--full">Se connecter</button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
