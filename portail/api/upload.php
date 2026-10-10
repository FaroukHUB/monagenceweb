<?php
require_once __DIR__ . '/../config.php';
requireClientAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

$csrfToken = $_POST['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!hash_equals($_SESSION['csrf_token'] ?? '', $csrfToken)) {
    jsonResponse(['error' => 'Session expirée'], 403);
}

$project = getClientProject();
if (!$project) {
    jsonResponse(['error' => 'Aucun projet actif'], 404);
}

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE => 'Fichier trop volumineux (limite serveur)',
        UPLOAD_ERR_FORM_SIZE => 'Fichier trop volumineux',
        UPLOAD_ERR_PARTIAL => 'Upload interrompu',
        UPLOAD_ERR_NO_FILE => 'Aucun fichier sélectionné',
    ];
    $code = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
    jsonResponse(['error' => $errors[$code] ?? 'Erreur d\'upload'], 400);
}

$file = $_FILES['file'];

if ($file['size'] > UPLOAD_MAX_SIZE) {
    jsonResponse(['error' => 'Fichier trop volumineux (max 10 Mo)'], 400);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ALLOWED_EXTENSIONS, true)) {
    jsonResponse(['error' => 'Type de fichier non autorisé'], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, ALLOWED_MIME_TYPES, true)) {
    jsonResponse(['error' => 'Type MIME non autorisé (' . $mimeType . ')'], 400);
}

$projectDir = UPLOAD_DIR . '/' . $project['id'];
if (!is_dir($projectDir)) {
    mkdir($projectDir, 0750, true);
}

$filename = bin2hex(random_bytes(16)) . '.' . $ext;
$destination = $projectDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    jsonResponse(['error' => 'Erreur de sauvegarde du fichier'], 500);
}

$stepNumber = (int)($_POST['step_number'] ?? 0) ?: null;
$clientId = getClientId();

try {
    $db = getDB();
    $stmt = $db->prepare('INSERT INTO files (project_id, client_id, filename, original_name, mime_type, size, step_number, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, "client")');
    $stmt->execute([
        $project['id'],
        $clientId,
        $filename,
        $file['name'],
        $mimeType,
        $file['size'],
        $stepNumber,
    ]);

    addNotification(
        $project['id'],
        'admin', null,
        'file_uploaded',
        'Nouveau document : ' . $file['name']
    );

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    unlink($destination);
    jsonResponse(['error' => 'Erreur base de données'], 500);
}
