<?php
require_once __DIR__ . '/../config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

if (!CLAUDE_API_KEY) {
    jsonResponse(['error' => 'Clé API Claude non configurée dans config.php'], 400);
}

$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'] ?? '';
$prompt = $input['prompt'] ?? '';
$context = $input['context'] ?? '';

if (!$prompt) {
    jsonResponse(['error' => 'Prompt requis'], 400);
}

$systemPrompts = [
    'article' => "Tu es un rédacteur web expert en SEO pour l'agence mon-agenceweb.fr (développeur web freelance, Farouk). Rédige des articles de blog professionnels en français. Structure avec des titres H2/H3, des paragraphes courts, et intègre naturellement les mots-clés. Le ton est expert mais accessible.",

    'social' => "Tu es un community manager expert pour l'agence mon-agenceweb.fr (développeur web freelance, Farouk). Crée des posts engageants en français pour les réseaux sociaux. Utilise des emojis avec parcimonie, des accroches percutantes, et des call-to-action. Adapte le format selon la plateforme demandée.",

    'email' => "Tu es un expert en email marketing pour l'agence mon-agenceweb.fr (développeur web freelance, Farouk). Rédige des emails professionnels en français avec un objet accrocheur, un corps structuré et un CTA clair. Le ton est professionnel mais chaleureux.",

    'custom' => "Tu es un assistant professionnel pour l'agence mon-agenceweb.fr (développeur web freelance, Farouk). Réponds en français de manière experte."
];

$system = $systemPrompts[$type] ?? $systemPrompts['custom'];
if ($context) {
    $system .= "\n\nContexte additionnel : " . $context;
}

$payload = [
    'model' => CLAUDE_MODEL,
    'max_tokens' => 4096,
    'system' => $system,
    'messages' => [
        ['role' => 'user', 'content' => $prompt]
    ]
];

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-api-key: ' . CLAUDE_API_KEY,
        'anthropic-version: 2023-06-01'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 120
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    jsonResponse(['error' => 'Erreur réseau : ' . $curlError], 500);
}

$data = json_decode($response, true);

if ($httpCode !== 200) {
    $errMsg = $data['error']['message'] ?? 'Erreur API (HTTP ' . $httpCode . ')';
    jsonResponse(['error' => $errMsg], $httpCode);
}

$content = $data['content'][0]['text'] ?? '';
$usage = $data['usage'] ?? [];

jsonResponse([
    'content' => $content,
    'usage' => $usage
]);
