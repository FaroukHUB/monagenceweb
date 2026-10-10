<?php
require_once __DIR__ . '/../config.php';
requireClientAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

verifyCSRF();

$clientId = getClientId();
$db = getDB();

$input = json_decode(file_get_contents('php://input'), true);
$notifId = (int)($input['id'] ?? 0);

if ($notifId > 0) {
    $stmt = $db->prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND recipient_type = "client" AND recipient_id = ?');
    $stmt->execute([$notifId, $clientId]);
} else {
    $stmt = $db->prepare('UPDATE notifications SET is_read = 1 WHERE recipient_type = "client" AND recipient_id = ?');
    $stmt->execute([$clientId]);
}

jsonResponse(['success' => true]);
