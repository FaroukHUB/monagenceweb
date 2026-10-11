<?php
/**
 * Configuration Portail Client — mon-agenceweb.fr
 */

session_start();

require_once __DIR__ . '/../admin/db.php';

define('PORTAIL_URL', '/portail');
define('UPLOAD_DIR', __DIR__ . '/../uploads');
define('UPLOAD_MAX_SIZE', 10 * 1024 * 1024); // 10 Mo
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip']);
define('ALLOWED_MIME_TYPES', [
    'image/jpeg', 'image/png', 'image/gif',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip',
]);

define('QUESTIONNAIRE_STEPS', [
    1 => 'Votre projet',
    2 => 'Votre activité',
    3 => 'Votre cible',
    4 => 'Design & identité',
    5 => 'Contenu & pages',
    6 => 'Fonctionnalités',
    7 => 'Référencement & SEO',
    8 => 'Budget & délais',
    9 => 'Hébergement & technique',
    10 => 'Récapitulatif',
]);

function isClientLoggedIn(): bool {
    return isset($_SESSION['client_id']) && $_SESSION['client_id'] > 0;
}

function requireClientAuth(): void {
    if (!isClientLoggedIn()) {
        header('Location: ' . PORTAIL_URL . '/login');
        exit;
    }
}

function getClientId(): int {
    return (int)($_SESSION['client_id'] ?? 0);
}

function getClientProject(): ?array {
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM projects WHERE client_id = ? ORDER BY created_at DESC LIMIT 1');
    $stmt->execute([getClientId()]);
    return $stmt->fetch() ?: null;
}

function generateCSRFToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCSRF(): void {
    $token = $_POST['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        die('Session expirée. Veuillez rafraîchir la page.');
    }
}

function sanitize(string $str): string {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

function jsonResponse(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function addNotification(int $projectId, string $recipientType, ?int $recipientId, string $type, string $message): void {
    $db = getDB();
    $stmt = $db->prepare('INSERT INTO notifications (project_id, recipient_type, recipient_id, type, message) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$projectId, $recipientType, $recipientId, $type, $message]);
}

function notifyAdmin(string $subject, string $body): void {
    require_once __DIR__ . '/../admin/config.php';
    if (!defined('MAIL_API_KEY') || !MAIL_API_KEY) return;

    $html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#333">';
    $html .= '<div style="text-align:center;margin-bottom:24px"><span style="font-size:1.5rem;font-weight:700;color:#111">maw<span style="color:#FFA000">.</span></span></div>';
    $html .= nl2br(htmlspecialchars($body));
    $html .= '<hr style="border:none;border-top:1px solid #eee;margin:24px 0">';
    $html .= '<p style="text-align:center"><a href="https://mon-agenceweb.fr/admin/projets.php" style="display:inline-block;padding:12px 24px;background:#FFA000;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">Voir dans l\'admin</a></p>';
    $html .= '</div>';

    $payload = [
        'sender' => ['name' => MAIL_FROM_NAME, 'email' => MAIL_FROM_EMAIL],
        'to' => [['email' => MAIL_FROM_EMAIL]],
        'subject' => '[Portail] ' . $subject,
        'htmlContent' => $html,
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'api-key: ' . MAIL_API_KEY, 'accept: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 10,
    ]);
    curl_exec($ch);
    curl_close($ch);
}
