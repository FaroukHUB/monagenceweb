<?php
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$type  = $input['type'] ?? '';
$data  = $input['data'] ?? [];

$allowed = ['articles', 'social_posts', 'emails'];
if (!in_array($type, $allowed)) {
    jsonResponse(['error' => 'Type invalide'], 400);
}

$data['id'] = uniqid();
$data['created_at'] = time();

$existing = readData($type);
$existing[] = $data;
writeData($type, $existing);

jsonResponse(['success' => true, 'id' => $data['id']]);
