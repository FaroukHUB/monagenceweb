<?php
/**
 * Configuration admin — mon-agenceweb.fr
 */

// --- AUTH ---
define('ADMIN_USER', 'farouk');
define('ADMIN_PASS_HASH', ''); // Laisser vide au premier lancement, le setup va le generer

// --- CLAUDE API ---
define('CLAUDE_API_KEY', ''); // Ta cle API Anthropic
define('CLAUDE_MODEL', 'claude-sonnet-4-20250514');

// --- MAIL (Brevo/Mailjet) ---
define('MAIL_API_KEY', '');
define('MAIL_FROM_EMAIL', 'contact@mon-agenceweb.fr');
define('MAIL_FROM_NAME', 'Farouk — mon-agenceweb.fr');

// --- PATHS ---
define('DATA_DIR', __DIR__ . '/data');
define('ADMIN_URL', '/admin');

// --- SESSION ---
session_start();

// --- HELPERS ---
function isLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function requireAuth() {
    if (!isLoggedIn()) {
        header('Location: ' . ADMIN_URL . '/login.php');
        exit;
    }
}

function readData($file) {
    $path = DATA_DIR . '/' . $file . '.json';
    if (!file_exists($path)) return [];
    $content = file_get_contents($path);
    return json_decode($content, true) ?: [];
}

function writeData($file, $data) {
    $path = DATA_DIR . '/' . $file . '.json';
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function sanitize($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
