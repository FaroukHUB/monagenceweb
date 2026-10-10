<h2>10. Récapitulatif</h2>
<p>Relisez vos réponses avant de valider votre cahier des charges. Vous pourrez toujours revenir modifier une étape.</p>

<?php
$allStepNames = QUESTIONNAIRE_STEPS;
$allCompleted = count($completedSteps) >= 9;
?>

<?php if (!$allCompleted): ?>
    <div class="portal-alert portal-alert--info">
        <strong>Étapes manquantes :</strong> Veuillez compléter toutes les étapes avant de valider le récapitulatif.
        <?php
        for ($i = 1; $i <= 9; $i++) {
            if (!in_array($i, $completedSteps)) {
                echo '<br>— <a href="/portail/questionnaire/etape/' . $i . '" style="color:var(--portal-blue);font-weight:600">' . $allStepNames[$i] . '</a>';
            }
        }
        ?>
    </div>
<?php endif; ?>

<?php for ($i = 1; $i <= 9; $i++):
    $stepData = $allResponses[$i] ?? [];
    $stepComplete = in_array($i, $completedSteps);
?>
    <div style="border:1px solid <?= $stepComplete ? 'var(--portal-green)' : 'var(--portal-gray-300)' ?>;border-radius:10px;margin-bottom:16px;overflow:hidden">
        <div style="padding:14px 20px;background:<?= $stepComplete ? '#f0fdf4' : 'var(--portal-gray-50)' ?>;display:flex;justify-content:space-between;align-items:center">
            <strong style="font-size:0.95rem"><?= $i ?>. <?= $allStepNames[$i] ?></strong>
            <div style="display:flex;gap:8px;align-items:center">
                <span style="font-size:0.8rem;color:<?= $stepComplete ? 'var(--portal-green)' : 'var(--portal-gray-500)' ?>">
                    <?= $stepComplete ? 'Validé' : 'Non complété' ?>
                </span>
                <a href="/portail/questionnaire/etape/<?= $i ?>" style="font-size:0.85rem;color:var(--portal-orange);font-weight:600;text-decoration:none">Modifier</a>
            </div>
        </div>
        <?php if (!empty($stepData)): ?>
            <div style="padding:16px 20px">
                <?php foreach ($stepData as $key => $value):
                    if ($key === 'csrf_token') continue;
                ?>
                    <div style="margin-bottom:10px">
                        <span style="font-size:0.8rem;color:var(--portal-gray-500);display:block"><?= sanitize(str_replace('_', ' ', ucfirst($key))) ?></span>
                        <span style="font-size:0.9rem">
                            <?php if (is_array($value)): ?>
                                <?= sanitize(implode(', ', $value)) ?>
                            <?php else: ?>
                                <?= nl2br(sanitize((string)$value)) ?>
                            <?php endif; ?>
                        </span>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
<?php endfor; ?>

<div class="portal-form-group" style="margin-top:24px">
    <label for="final_comments">Commentaires ou demandes supplémentaires</label>
    <textarea id="final_comments" name="final_comments" placeholder="Tout ce que vous souhaitez ajouter..."><?= sanitize($currentData['final_comments'] ?? '') ?></textarea>
</div>

<div class="portal-form-group">
    <div class="portal-check-item">
        <input type="checkbox" name="terms_accepted" id="terms_accepted" value="oui" <?= ($currentData['terms_accepted'] ?? '') === 'oui' ? 'checked' : '' ?>>
        <label for="terms_accepted">Je comprends que ces réponses servent de base de travail et ne constituent pas un engagement contractuel.</label>
    </div>
</div>
