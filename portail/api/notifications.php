<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

if (!isClientLoggedIn()) {
    jsonResponse(['error' => 'Non connecté'], 401);
}

$clientId = getClientId();
$db = getDB();

$stmt = $db->prepare('SELECT COUNT(*) FROM notifications WHERE recipient_type = "client" AND recipient_id = ? AND is_read = 0');
$stmt->execute([$clientId]);
$count = (int)$stmt->fetchColumn();

jsonResponse(['count' => $count]);
