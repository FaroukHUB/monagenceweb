<?php
require_once __DIR__ . '/config.php';
requireClientAuth();

$db = getDB();
$clientId = getClientId();
$project = getClientProject();

if (!$project) {
    header('Location: ' . PORTAIL_URL . '/dashboard');
    exit;
}

$currentStep = max(1, min(10, (int)($_GET['step'] ?? 1)));

// Load all step responses for this project
$stmt = $db->prepare('SELECT step_number, data, completed FROM step_responses WHERE project_id = ?');
$stmt->execute([$project['id']]);
$allResponses = [];
$completedSteps = [];
while ($row = $stmt->fetch()) {
    $allResponses[$row['step_number']] = json_decode($row['data'], true) ?: [];
    if ($row['completed']) $completedSteps[] = $row['step_number'];
}

$currentData = $allResponses[$currentStep] ?? [];
$isCompleted = in_array($currentStep, $completedSteps);

$csrf = generateCSRFToken();

$pageTitle = 'Cahier des charges — Étape ' . $currentStep;
$page = 'questionnaire';
require_once __DIR__ . '/templates/header.php';
?>
<meta name="csrf-token" content="<?= $csrf ?>">

<div class="portal-questionnaire-layout">
    <!-- Sidebar steps -->
    <div class="portal-steps-sidebar">
        <ul class="portal-steps-list">
            <?php foreach (QUESTIONNAIRE_STEPS as $num => $label): ?>
                <a href="/portail/questionnaire/etape/<?= $num ?>"
                   class="portal-step-item <?= $num === $currentStep ? 'active' : '' ?> <?= in_array($num, $completedSteps) ? 'completed' : '' ?>">
                    <span class="portal-step-num"><?= in_array($num, $completedSteps) && $num !== $currentStep ? '&#10003;' : $num ?></span>
                    <span><?= $label ?></span>
                </a>
            <?php endforeach; ?>
        </ul>
        <div class="portal-save-indicator" style="margin-top:12px;padding:0 12px"></div>
    </div>

    <!-- Step content -->
    <div class="portal-step-content">
        <form id="stepForm" method="POST" action="/portail/api/save-step" onsubmit="return false;">
            <input type="hidden" name="csrf_token" value="<?= $csrf ?>">

            <?php include __DIR__ . '/steps/step-' . $currentStep . '.php'; ?>

            <div class="portal-step-actions">
                <?php if ($currentStep > 1): ?>
                    <a href="/portail/questionnaire/etape/<?= $currentStep - 1 ?>" class="portal-btn portal-btn--secondary">
                        &larr; Précédent
                    </a>
                <?php else: ?>
                    <span></span>
                <?php endif; ?>

                <div style="display:flex;gap:12px;align-items:center">
                    <button type="button" class="portal-btn portal-btn--outline portal-btn--sm" onclick="saveStep(false)">
                        Sauvegarder
                    </button>
                    <?php if ($currentStep < 10): ?>
                        <button type="button" class="portal-btn portal-btn--primary" onclick="saveStep(true)">
                            Valider et continuer &rarr;
                        </button>
                    <?php else: ?>
                        <button type="button" class="portal-btn portal-btn--primary" onclick="saveStep(true)" style="background:var(--portal-green)">
                            Terminer le cahier des charges
                        </button>
                    <?php endif; ?>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
var currentStep = <?= $currentStep ?>;
var totalSteps = 10;

var form = document.getElementById('stepForm');
form.addEventListener('input', function() {
    window.debounceSave(currentStep, form);
});

function saveStep(completed) {
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) {
        if (key === 'csrf_token') return;
        if (data[key]) {
            if (!Array.isArray(data[key])) data[key] = [data[key]];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    fetch('/portail/api/save-step.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': '<?= $csrf ?>'
        },
        body: JSON.stringify({
            step: currentStep,
            data: data,
            completed: completed
        })
    })
    .then(function(r) { return r.json(); })
    .then(function(result) {
        if (result.success) {
            var indicator = document.querySelector('.portal-save-indicator');
            if (indicator) {
                indicator.textContent = completed ? 'Étape validée !' : 'Sauvegardé';
                indicator.classList.add('visible');
            }
            if (completed && currentStep < totalSteps) {
                setTimeout(function() {
                    location.href = '/portail/questionnaire/etape/' + (currentStep + 1);
                }, 500);
            } else if (completed && currentStep === totalSteps) {
                setTimeout(function() {
                    location.href = '/portail/dashboard';
                }, 800);
            }
        }
    })
    .catch(function() {
        alert('Erreur de sauvegarde. Vérifiez votre connexion.');
    });
}
</script>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
