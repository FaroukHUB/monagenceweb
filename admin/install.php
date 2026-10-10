<?php
/**
 * Installation des tables MySQL — Portail Client mon-agenceweb.fr
 */
require_once __DIR__ . '/config.php';
requireAuth();
require_once __DIR__ . '/db.php';

$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install'])) {
    try {
        $db = getDB();

        $db->exec("CREATE TABLE IF NOT EXISTS clients (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) DEFAULT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            phone VARCHAR(30) DEFAULT NULL,
            company VARCHAR(150) DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            status ENUM('invited','in_progress','questionnaire_complete','quote_sent','quote_accepted','in_development','delivered') DEFAULT 'invited',
            admin_notes TEXT DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
            INDEX idx_status (status),
            INDEX idx_client (client_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS invitation_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT NOT NULL,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(64) NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            used TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
            INDEX idx_token (token)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS step_responses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT NOT NULL,
            step_number TINYINT NOT NULL,
            data JSON NOT NULL,
            completed TINYINT(1) DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
            UNIQUE KEY uq_project_step (project_id, step_number)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS files (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT NOT NULL,
            client_id INT NOT NULL,
            filename VARCHAR(255) NOT NULL,
            original_name VARCHAR(255) NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            size INT UNSIGNED NOT NULL,
            step_number TINYINT DEFAULT NULL,
            uploaded_by ENUM('client','admin') DEFAULT 'client',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
            FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
            INDEX idx_project (project_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS quotes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT NOT NULL,
            version INT NOT NULL DEFAULT 1,
            items JSON NOT NULL,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            status ENUM('draft','sent','accepted','rejected','revised') DEFAULT 'draft',
            sent_at DATETIME DEFAULT NULL,
            accepted_at DATETIME DEFAULT NULL,
            pdf_path VARCHAR(255) DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
            INDEX idx_project_version (project_id, version)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $db->exec("CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT DEFAULT NULL,
            recipient_type ENUM('admin','client') NOT NULL,
            recipient_id INT DEFAULT NULL,
            type VARCHAR(50) NOT NULL,
            message TEXT NOT NULL,
            is_read TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
            INDEX idx_recipient (recipient_type, recipient_id, is_read)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $message = 'Toutes les tables ont été créées avec succès.';
    } catch (Exception $e) {
        $error = 'Erreur : ' . $e->getMessage();
    }
}

// Check table status
$tables = [];
try {
    $db = getDB();
    $expected = ['clients', 'projects', 'invitation_tokens', 'step_responses', 'files', 'quotes', 'notifications'];
    foreach ($expected as $t) {
        $stmt = $db->query("SHOW TABLES LIKE '$t'");
        $tables[$t] = $stmt->rowCount() > 0;
    }
    $dbConnected = true;
} catch (Exception $e) {
    $dbConnected = false;
    if (!$error) $error = $e->getMessage();
}

$pageTitle = 'Installation BDD';
$page = 'install';
require_once __DIR__ . '/templates/header.php';
?>

<div style="max-width:700px">
    <?php if ($message): ?>
        <div class="alert alert--success"><?= $message ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div class="alert alert--error"><?= $error ?></div>
    <?php endif; ?>

    <?php if (!$dbConnected): ?>
        <div class="card">
            <h2>Configuration requise</h2>
            <p>Remplissez les identifiants MySQL dans <code>/admin/db.php</code> avant de lancer l'installation.</p>
            <pre style="background:#1a1a2e;color:#fff;padding:16px;border-radius:8px;overflow-x:auto">
define('DB_HOST', 'localhost');
define('DB_NAME', 'votre_base');
define('DB_USER', 'votre_user');
define('DB_PASS', 'votre_mdp');</pre>
        </div>
    <?php else: ?>
        <div class="card">
            <h2>État des tables</h2>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
                <?php foreach ($tables as $name => $exists): ?>
                <tr style="border-bottom:1px solid #eee">
                    <td style="padding:10px"><code><?= $name ?></code></td>
                    <td style="padding:10px;text-align:right">
                        <?php if ($exists): ?>
                            <span style="color:#27ae60;font-weight:600">Installée</span>
                        <?php else: ?>
                            <span style="color:#e74c3c;font-weight:600">Manquante</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
            <?php if (in_array(false, $tables, true)): ?>
                <form method="POST">
                    <input type="hidden" name="install" value="1">
                    <button type="submit" class="btn btn--primary">Installer les tables manquantes</button>
                </form>
            <?php else: ?>
                <p style="color:#27ae60;font-weight:600;margin-top:16px">Toutes les tables sont installées.</p>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
