<?php
require_once __DIR__ . '/config.php';
requireClientAuth();

$db = getDB();
$clientId = getClientId();
$project = getClientProject();

$files = [];
if ($project) {
    $stmt = $db->prepare('SELECT * FROM files WHERE project_id = ? AND client_id = ? ORDER BY created_at DESC');
    $stmt->execute([$project['id'], $clientId]);
    $files = $stmt->fetchAll();
}

$pageTitle = 'Mes documents';
$page = 'documents';
require_once __DIR__ . '/templates/header.php';
?>

<div style="max-width:900px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <h1 style="font-size:1.5rem;font-weight:700">Mes documents</h1>
        <?php if ($project): ?>
            <button class="portal-btn portal-btn--primary portal-btn--sm" onclick="document.getElementById('uploadModal').style.display='flex'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Ajouter un document
            </button>
        <?php endif; ?>
    </div>

    <?php if (empty($files)): ?>
        <div class="portal-card" style="text-align:center;padding:48px">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--portal-gray-400)" stroke-width="1.5" style="margin-bottom:16px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <p style="color:var(--portal-gray-500);margin-bottom:16px">Aucun document pour le moment.</p>
            <?php if ($project): ?>
                <button class="portal-btn portal-btn--outline" onclick="document.getElementById('uploadModal').style.display='flex'">
                    Ajouter votre premier document
                </button>
            <?php endif; ?>
        </div>
    <?php else: ?>
        <div class="portal-card">
            <table class="portal-table">
                <thead>
                    <tr>
                        <th>Fichier</th>
                        <th>Taille</th>
                        <th>Étape</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($files as $f): ?>
                        <tr>
                            <td>
                                <div style="display:flex;align-items:center;gap:10px">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--portal-gray-400)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    <?= sanitize($f['original_name']) ?>
                                </div>
                            </td>
                            <td style="color:var(--portal-gray-500)"><?= round($f['size'] / 1024) ?> Ko</td>
                            <td style="color:var(--portal-gray-500)"><?= $f['step_number'] ? 'Étape ' . $f['step_number'] : '—' ?></td>
                            <td style="color:var(--portal-gray-500)"><?= date('d/m/Y', strtotime($f['created_at'])) ?></td>
                            <td style="text-align:right">
                                <a href="/portail/api/download?id=<?= $f['id'] ?>" class="portal-btn portal-btn--sm portal-btn--secondary" style="text-decoration:none">Télécharger</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</div>

<!-- Upload Modal -->
<?php if ($project): ?>
<div id="uploadModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:2000;align-items:center;justify-content:center;padding:24px">
    <div style="background:var(--portal-white);border-radius:var(--portal-radius);padding:32px;max-width:480px;width:100%">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
            <h2 style="font-size:1.1rem;font-weight:700">Ajouter un document</h2>
            <button onclick="document.getElementById('uploadModal').style.display='none'" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--portal-gray-500)">&times;</button>
        </div>
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">
            <div class="portal-form-group">
                <label for="upload_file">Fichier (max 10 Mo)</label>
                <input type="file" id="upload_file" name="file" required
                       accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                       style="padding:12px;border:2px dashed var(--portal-gray-300);border-radius:8px;width:100%;cursor:pointer">
            </div>
            <div class="portal-form-group">
                <label for="upload_step">Associer à une étape (optionnel)</label>
                <select id="upload_step" name="step_number">
                    <option value="">Aucune étape</option>
                    <?php foreach (QUESTIONNAIRE_STEPS as $num => $label): ?>
                        <option value="<?= $num ?>"><?= $num ?>. <?= $label ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div id="uploadProgress" style="display:none;margin-bottom:16px">
                <div class="portal-progress-bar">
                    <div class="portal-progress-fill" id="uploadProgressBar" style="width:0%"></div>
                </div>
                <small id="uploadStatus" style="color:var(--portal-gray-500)"></small>
            </div>
            <button type="submit" class="portal-btn portal-btn--primary portal-btn--full">Envoyer</button>
        </form>
    </div>
</div>

<script>
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var form = this;
    var formData = new FormData(form);
    var progress = document.getElementById('uploadProgress');
    var bar = document.getElementById('uploadProgressBar');
    var status = document.getElementById('uploadStatus');

    progress.style.display = 'block';
    status.textContent = 'Envoi en cours...';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/portail/api/upload');

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            var pct = Math.round((e.loaded / e.total) * 100);
            bar.style.width = pct + '%';
            status.textContent = pct + '%';
        }
    };

    xhr.onload = function() {
        var result = JSON.parse(xhr.responseText);
        if (result.success) {
            status.textContent = 'Envoyé !';
            setTimeout(function() { location.reload(); }, 800);
        } else {
            status.textContent = result.error || 'Erreur d\'envoi';
            status.style.color = 'var(--portal-red)';
        }
    };

    xhr.onerror = function() {
        status.textContent = 'Erreur réseau';
        status.style.color = 'var(--portal-red)';
    };

    xhr.send(formData);
});
</script>
<?php endif; ?>

<?php require_once __DIR__ . '/templates/footer.php'; ?>
