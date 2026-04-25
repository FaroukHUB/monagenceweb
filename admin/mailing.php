<?php
require_once __DIR__ . '/config.php';
requireAuth();

$emails = readData('emails');
$page = 'mailing';
$pageTitle = 'Campagnes email';
include __DIR__ . '/templates/header.php';
?>

<div class="generator">
    <div class="generator-form">
        <div class="card">
            <h2 class="card-title">Générer un email</h2>
            <form id="mailingForm">
                <div class="form-group">
                    <label for="mail-type">Type d'email</label>
                    <select id="mail-type">
                        <option value="prospection">Prospection client</option>
                        <option value="newsletter">Newsletter</option>
                        <option value="promotion">Offre promotionnelle</option>
                        <option value="relance">Relance / Follow-up</option>
                        <option value="lancement">Lancement de service</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="mail-target">Cible</label>
                    <input type="text" id="mail-target" placeholder="Ex: Restaurateurs qui n'ont pas de site web" required>
                </div>
                <div class="form-group">
                    <label for="mail-topic">Sujet / Message principal</label>
                    <textarea id="mail-topic" rows="3" placeholder="Ex: Proposer notre offre de site vitrine avec commande en ligne intégrée..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="mail-cta">Action souhaitée</label>
                    <input type="text" id="mail-cta" placeholder="Ex: Réserver un appel de 15 min gratuit">
                </div>
                <button type="submit" class="btn btn--primary btn--full" id="mailingSubmit">Générer l'email</button>
            </form>
        </div>

        <?php if (MAIL_API_KEY): ?>
        <div class="card mt-2">
            <h2 class="card-title">Envoyer un email</h2>
            <form id="sendForm">
                <div class="form-group">
                    <label for="send-to">Destinataire(s)</label>
                    <input type="email" id="send-to" placeholder="email@exemple.com" required>
                    <span class="form-hint">Un seul destinataire par envoi</span>
                </div>
                <div class="form-group">
                    <label for="send-subject">Objet</label>
                    <input type="text" id="send-subject" placeholder="Objet de l'email" required>
                </div>
                <button type="submit" class="btn btn--secondary btn--full" id="sendSubmit">Envoyer le dernier email généré</button>
            </form>
        </div>
        <?php endif; ?>
    </div>

    <div>
        <div class="generator-output" id="mailingOutput">
            <div class="generator-output-empty" id="mailingEmpty">
                L'email généré apparaîtra ici.
            </div>
            <div class="generated-content" id="mailingContent" style="display:none"></div>
            <div class="output-actions" id="mailingActions" style="display:none">
                <button class="btn btn--secondary" onclick="copyContent(window._lastMailRaw)">Copier le texte</button>
                <button class="btn btn--primary" id="mailingSave">Sauvegarder</button>
            </div>
        </div>

        <?php if (!empty($emails)): ?>
        <div class="history">
            <h3 class="history-title">Emails générés</h3>
            <div class="history-list">
                <?php foreach (array_reverse(array_slice($emails, -10)) as $email): ?>
                <div class="history-item" onclick="this.querySelector('.history-detail').style.display = this.querySelector('.history-detail').style.display === 'none' ? 'block' : 'none'">
                    <div>
                        <div class="history-item-title"><?= sanitize($email['type'] ?? '') ?> — <?= sanitize(substr($email['content'] ?? '', 0, 60)) ?>...</div>
                        <div class="history-item-date"><?= date('d/m/Y H:i', $email['created_at'] ?? 0) ?></div>
                        <div class="history-detail" style="display:none;margin-top:1rem;font-size:0.9rem;color:var(--text-muted);white-space:pre-wrap"><?= sanitize($email['content'] ?? '') ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<script>
document.getElementById('mailingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('mailingSubmit');
    var type = document.getElementById('mail-type').value;
    var target = document.getElementById('mail-target').value;
    var topic = document.getElementById('mail-topic').value;
    var cta = document.getElementById('mail-cta').value;

    var prompt = "Rédige un email de " + type + " pour mon agence web (mon-agenceweb.fr).\n\n";
    prompt += "Cible : " + target + "\n";
    prompt += "Message principal : " + topic + "\n";
    if (cta) prompt += "Action souhaitée : " + cta + "\n";
    prompt += "\nGénère un objet d'email accrocheur en premier (ligne 'Objet : ...'), puis le corps de l'email. ";
    prompt += "Le ton doit être professionnel mais chaleureux. Pas trop long, va à l'essentiel.";

    setLoading(btn, true);
    document.getElementById('mailingEmpty').style.display = 'none';
    document.getElementById('mailingContent').style.display = 'none';
    document.getElementById('mailingActions').style.display = 'none';
    document.getElementById('mailingContent').innerHTML = '<div class="spinner"></div> Génération en cours...';
    document.getElementById('mailingContent').style.display = 'block';

    callClaude('email', prompt)
        .then(function(data) {
            window._lastMailRaw = data.content;
            document.getElementById('mailingContent').innerHTML = '<div style="white-space:pre-wrap">' + data.content.replace(/</g,'&lt;') + '</div>';
            document.getElementById('mailingActions').style.display = 'flex';

            // Pre-fill subject if found
            var subjectMatch = data.content.match(/^Objet\s*:\s*(.+)$/m);
            if (subjectMatch) {
                var subjectField = document.getElementById('send-subject');
                if (subjectField) subjectField.value = subjectMatch[1].trim();
            }

            setLoading(btn, false);
        })
        .catch(function(err) {
            document.getElementById('mailingContent').innerHTML = '<div class="alert alert--error">' + err.message + '</div>';
            setLoading(btn, false);
        });
});

document.getElementById('mailingSave').addEventListener('click', function() {
    if (!window._lastMailRaw) return;
    saveContent('emails', {
        type: document.getElementById('mail-type').value,
        target: document.getElementById('mail-target').value,
        content: window._lastMailRaw
    }).then(function() {
        showNotif('Email sauvegardé');
    });
});

// Send email
var sendForm = document.getElementById('sendForm');
if (sendForm) {
    sendForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!window._lastMailRaw) {
            showNotif('Génère d\'abord un email', 'warning');
            return;
        }
        var btn = document.getElementById('sendSubmit');
        setLoading(btn, true);

        fetch('api/send-email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: document.getElementById('send-to').value,
                subject: document.getElementById('send-subject').value,
                body: window._lastMailRaw
            })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.error) throw new Error(data.error);
            showNotif('Email envoyé avec succès');
            setLoading(btn, false);
        })
        .catch(function(err) {
            showNotif(err.message, 'error');
            setLoading(btn, false);
        });
    });
}
</script>

<?php include __DIR__ . '/templates/footer.php'; ?>
