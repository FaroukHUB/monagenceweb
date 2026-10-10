<?php
require_once __DIR__ . '/../config.php';
requireClientAuth();

$fileId = (int)($_GET['id'] ?? 0);
if (!$fileId) {
    http_response_code(400);
    die('ID manquant');
}

$clientId = getClientId();
$db = getDB();

$stmt = $db->prepare('SELECT f.* FROM files f JOIN projects p ON p.id = f.project_id WHERE f.id = ? AND p.client_id = ?');
$stmt->execute([$fileId, $clientId]);
$file = $stmt->fetch();

if (!$file) {
    http_response_code(404);
    die('Fichier non trouvé');
}

$path = UPLOAD_DIR . '/' . $file['project_id'] . '/' . $file['filename'];

if (!file_exists($path)) {
    http_response_code(404);
    die('Fichier introuvable sur le serveur');
}

header('Content-Type: ' . $file['mime_type']);
header('Content-Disposition: attachment; filename="' . str_replace('"', '', $file['original_name']) . '"');
header('Content-Length: ' . filesize($path));
header('Cache-Control: no-cache, must-revalidate');

readfile($path);
exit;
