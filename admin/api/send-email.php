<?php
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

if (!MAIL_API_KEY) {
    jsonResponse(['error' => 'Clé API Brevo non configurée dans config.php'], 400);
}

$input = json_decode(file_get_contents('php://input'), true);
$to      = $input['to'] ?? '';
$subject = $input['subject'] ?? '';
$body    = $input['body'] ?? '';

if (!$to || !$subject || !$body) {
    jsonResponse(['error' => 'Destinataire, objet et contenu requis'], 400);
}

if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['error' => 'Email invalide'], 400);
}

$htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">';
$htmlBody .= nl2br(htmlspecialchars($body));
$htmlBody .= '</div>';

$payload = [
    'sender' => [
        'name' => MAIL_FROM_NAME,
        'email' => MAIL_FROM_EMAIL
    ],
    'to' => [
        ['email' => $to]
    ],
    'subject' => $subject,
    'htmlContent' => $htmlBody
];

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'api-key: ' . MAIL_API_KEY,
        'accept: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    jsonResponse(['error' => 'Erreur réseau : ' . $curlError], 500);
}

$data = json_decode($response, true);

if ($httpCode >= 200 && $httpCode < 300) {
    jsonResponse(['success' => true, 'messageId' => $data['messageId'] ?? '']);
} else {
    $errMsg = $data['message'] ?? 'Erreur Brevo (HTTP ' . $httpCode . ')';
    jsonResponse(['error' => $errMsg], $httpCode);
}
