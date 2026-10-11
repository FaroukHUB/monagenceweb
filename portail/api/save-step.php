<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

if (!isClientLoggedIn()) {
    jsonResponse(['error' => 'Non connecté'], 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'POST uniquement'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$stepNumber = (int)($input['step'] ?? 0);
$data = $input['data'] ?? [];
$completed = !empty($input['completed']);

if ($stepNumber < 1 || $stepNumber > 10) {
    jsonResponse(['error' => 'Étape invalide'], 400);
}

$project = getClientProject();
if (!$project) {
    jsonResponse(['error' => 'Aucun projet actif'], 404);
}

try {
    $db = getDB();
    $stmt = $db->prepare('
        INSERT INTO step_responses (project_id, step_number, data, completed)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE data = VALUES(data), completed = VALUES(completed)
    ');
    $stmt->execute([
        $project['id'],
        $stepNumber,
        json_encode($data, JSON_UNESCAPED_UNICODE),
        $completed ? 1 : 0
    ]);

    if ($completed) {
        $stepNames = [
            1 => 'Votre projet', 2 => 'Votre activité', 3 => 'Votre cible',
            4 => 'Design & identité', 5 => 'Contenu & pages', 6 => 'Fonctionnalités',
            7 => 'Référencement & SEO', 8 => 'Budget & délais', 9 => 'Hébergement & technique',
            10 => 'Récapitulatif',
        ];

        $stmt = $db->prepare('SELECT first_name, last_name FROM clients WHERE id = ?');
        $stmt->execute([getClientId()]);
        $client = $stmt->fetch();
        $clientName = $client['first_name'] . ' ' . $client['last_name'];

        $stmt = $db->prepare('SELECT COUNT(*) FROM step_responses WHERE project_id = ? AND completed = 1');
        $stmt->execute([$project['id']]);
        $count = (int)$stmt->fetchColumn();

        addNotification(
            $project['id'],
            'admin', null,
            'step_completed',
            $clientName . ' a validé l\'étape ' . $stepNumber . ' — ' . ($stepNames[$stepNumber] ?? '') . ' (' . $count . '/10)'
        );

        notifyAdmin(
            $clientName . ' — Étape ' . $stepNumber . '/10 validée',
            $clientName . " a validé l'étape " . $stepNumber . " (" . ($stepNames[$stepNumber] ?? '') . ") du projet \"" . $project['name'] . "\".\n\nProgression : " . $count . "/10 étapes complétées."
        );

        if ($count >= 10) {
            $stmt = $db->prepare('UPDATE projects SET status = "questionnaire_complete" WHERE id = ? AND status = "in_progress"');
            $stmt->execute([$project['id']]);

            notifyAdmin(
                'Cahier des charges COMPLET — ' . $project['name'],
                "Le cahier des charges du projet \"" . $project['name'] . "\" est entièrement complété par " . $clientName . ".\n\nVous pouvez maintenant préparer le devis."
            );
        }
    }

    jsonResponse(['success' => true, 'step' => $stepNumber, 'completed' => $completed]);
} catch (Exception $e) {
    jsonResponse(['error' => 'Erreur de sauvegarde'], 500);
}
