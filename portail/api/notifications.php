<?php
require_once __DIR__ . '/../config.php';
requireClientAuth();

$clientId = getClientId();
$db = getDB();

$stmt = $db->prepare('SELECT COUNT(*) FROM notifications WHERE recipient_type = "client" AND recipient_id = ? AND is_read = 0');
$stmt->execute([$clientId]);
$count = (int)$stmt->fetchColumn();

jsonResponse(['count' => $count]);
