<?php
require_once __DIR__ . '/config.php';
requireAuth();

$message = '';
$messageType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'update_keys') {
        $configFile = file_get_contents(__DIR__ . '/config.php');

        $newClaudeKey = $_POST['claude_key'] ?? '';
        $newMailKey   = $_POST['mail_key'] ?? '';
        $newMailFrom  = $_POST['mail_from'] ?? '';

        if ($newClaudeKey) {
            $configFile = preg_replace(
                "/define\('CLAUDE_API_KEY',\s*'[^']*'\);/",
                "define('CLAUDE_API_KEY', '" . addslashes($newClaudeKey) . "');",
                $configFile
            );
        }
        if ($newMailKey) {
            $configFile = preg_replace(
                "/define\('MAIL_API_KEY',\s*'[^']*'\);/",
                "define('MAIL_API_KEY', '" . addslashes($newMailKey) . "');",
                $configFile
            );
        }
        if ($newMailFrom) {
            $configFile = preg_replace(
                "/define\('MAIL_FROM_EMAIL',\s*'[^']*'\);/",
                "define('MAIL_FROM_EMAIL', '" . addslashes($newMailFrom) . "');",
                $configFile
            );
        }

        file_put_contents(__DIR__ . '/config.php', $configFile);
        $message = 'Configuration mise à jour.';
        $messageType = 'success';
    }

    if ($action === 'change_password') {
        $current = $_POST['current_password'] ?? '';
        $new     = $_POST['new_password'] ?? '';

        if (!password_verify($current, ADMIN_PASS_HASH)) {
            $message = 'Mot de passe actuel incorrect.';
            $messageType = 'error';
        } elseif (strlen($new) < 6) {
            $message = 'Le nouveau mot de passe doit faire au moins 6 caractères.';
            $messageType = 'error';
        } else {
            $hash = password_hash($new, PASSWORD_DEFAULT);
            $configFile = file_get_contents(__DIR__ . '/config.php');
            $configFile = preg_replace(
                "/define\('ADMIN_PASS_HASH',\s*'[^']*'\);/",
                "define('ADMIN_PASS_HASH', '$hash');",
                $configFile
            );
            file_put_contents(__DIR__ . '/config.php', $configFile);
            $message = 'Mot de passe modifié.';
            $messageType = 'success';
        }
    }

    if ($action === 'clear_data') {
        $type = $_POST['data_type'] ?? '';
        $allowed = ['articles', 'social_posts', 'emails'];
        if (in_array($type, $allowed)) {
            writeData($type, []);
            $message = 'Données "' . $type . '" supprimées.';
            $messageType = 'success';
        }
    }
}

$page = 'settings';
$pageTitle = 'Paramètres';
include __DIR__ . '/templates/header.php';
?>

<?php if ($message): ?>
    <div class="alert alert--<?= $messageType ?>"><?= sanitize($message) ?></div>
<?php endif; ?>

<div class="dashboard-grid">
    <div class="card">
        <h2 class="card-title">Clés API</h2>
        <form method="POST">
            <input type="hidden" name="action" value="update_keys">
            <div class="form-group">
                <label for="claude_key">Clé API Claude (Anthropic)</label>
                <input type="password" id="claude_key" name="claude_key" placeholder="<?= CLAUDE_API_KEY ? '••••••••' . substr(CLAUDE_API_KEY, -6) : 'sk-ant-...' ?>">
                <span class="form-hint"><?= CLAUDE_API_KEY ? 'Configurée' : 'Non configurée' ?> — <a href="https://console.anthropic.com/" target="_blank">console.anthropic.com</a></span>
            </div>
            <div class="form-group">
                <label for="mail_key">Clé API Brevo (email)</label>
                <input type="password" id="mail_key" name="mail_key" placeholder="<?= MAIL_API_KEY ? '••••••••' . substr(MAIL_API_KEY, -6) : 'xkeysib-...' ?>">
                <span class="form-hint"><?= MAIL_API_KEY ? 'Configurée' : 'Non configurée' ?> — <a href="https://app.brevo.com/" target="_blank">app.brevo.com</a> (gratuit 300 emails/jour)</span>
            </div>
            <div class="form-group">
                <label for="mail_from">Email d'expédition</label>
                <input type="email" id="mail_from" name="mail_from" value="<?= sanitize(MAIL_FROM_EMAIL) ?>">
            </div>
            <button type="submit" class="btn btn--primary">Enregistrer</button>
        </form>
    </div>

    <div class="card">
        <h2 class="card-title">Mot de passe</h2>
        <form method="POST">
            <input type="hidden" name="action" value="change_password">
            <div class="form-group">
                <label for="current_password">Mot de passe actuel</label>
                <input type="password" id="current_password" name="current_password" required>
            </div>
            <div class="form-group">
                <label for="new_password">Nouveau mot de passe</label>
                <input type="password" id="new_password" name="new_password" required minlength="6">
            </div>
            <button type="submit" class="btn btn--primary">Modifier</button>
        </form>
    </div>
</div>

<div class="card mt-2">
    <h2 class="card-title">Gestion des données</h2>
    <p class="text-muted mb-2">Supprimer les contenus générés sauvegardés.</p>
    <div class="btn-group">
        <form method="POST" style="display:inline" onsubmit="return confirm('Supprimer tous les articles ?')">
            <input type="hidden" name="action" value="clear_data">
            <input type="hidden" name="data_type" value="articles">
            <button type="submit" class="btn btn--danger">Vider les articles (<?= count(readData('articles')) ?>)</button>
        </form>
        <form method="POST" style="display:inline" onsubmit="return confirm('Supprimer tous les posts ?')">
            <input type="hidden" name="action" value="clear_data">
            <input type="hidden" name="data_type" value="social_posts">
            <button type="submit" class="btn btn--danger">Vider les posts (<?= count(readData('social_posts')) ?>)</button>
        </form>
        <form method="POST" style="display:inline" onsubmit="return confirm('Supprimer tous les emails ?')">
            <input type="hidden" name="action" value="clear_data">
            <input type="hidden" name="data_type" value="emails">
            <button type="submit" class="btn btn--danger">Vider les emails (<?= count(readData('emails')) ?>)</button>
        </form>
    </div>
</div>

<?php include __DIR__ . '/templates/footer.php'; ?>
