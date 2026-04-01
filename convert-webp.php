<?php
/**
 * Optimiseur d'images : Redimensionne + Convertit en WebP
 * Compatible hebergement mutualise (PHP GD uniquement)
 *
 * Usage SSH :  php convert-webp.php
 * Usage web :  https://mon-agenceweb.fr/convert-webp.php (puis supprimer)
 */

// --- CONFIG ---
$imgDir    = __DIR__ . '/img';
$maxWidth  = 1200;   // Largeur max en pixels
$qualityJpg = 82;    // Qualite JPG redimensionne
$qualityWebp = 80;   // Qualite WebP

$isCli = (php_sapi_name() === 'cli');
if (!$isCli) {
    header('Content-Type: text/plain; charset=utf-8');
}

// Augmenter la memoire pour les grosses images
ini_set('memory_limit', '512M');
set_time_limit(300);

echo "=== Optimisation des images ===\n";
echo "Max: {$maxWidth}px | JPG: q{$qualityJpg} | WebP: q{$qualityWebp}\n\n";

$files = array_merge(
    glob("$imgDir/*.jpg"),
    glob("$imgDir/*.jpeg"),
    glob("$imgDir/*.png"),
    glob("$imgDir/*.JPG"),
    glob("$imgDir/*.JPEG"),
    glob("$imgDir/*.PNG")
);

if (empty($files)) {
    echo "Aucune image trouvee dans $imgDir\n";
    exit(0);
}

$totalSaved = 0;
$count = 0;

foreach ($files as $file) {
    $info     = pathinfo($file);
    $basename = $info['basename'];
    $ext      = strtolower($info['extension']);
    $originalSize = filesize($file);

    echo "--- $basename (" . round($originalSize / 1024) . " Ko) ---\n";

    // Charger l'image
    switch ($ext) {
        case 'jpg':
        case 'jpeg':
            $image = @imagecreatefromjpeg($file);
            break;
        case 'png':
            $image = @imagecreatefrompng($file);
            break;
        default:
            continue 2;
    }

    if (!$image) {
        echo "  ERREUR: impossible de lire l'image (memoire insuffisante ?)\n\n";
        continue;
    }

    $w = imagesx($image);
    $h = imagesy($image);
    echo "  Original: {$w}x{$h}\n";

    // ETAPE 1 : Redimensionner si trop large
    if ($w > $maxWidth) {
        $newW = $maxWidth;
        $newH = (int) round($h * ($maxWidth / $w));
        $resized = imagecreatetruecolor($newW, $newH);

        // Preserver transparence PNG
        if ($ext === 'png') {
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
        }

        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newW, $newH, $w, $h);
        imagedestroy($image);
        $image = $resized;

        // Ecraser le JPG original avec la version redimensionnee
        if ($ext === 'jpg' || $ext === 'jpeg') {
            imagejpeg($image, $file, $qualityJpg);
        } elseif ($ext === 'png') {
            imagepng($image, $file, 8);
        }

        $newSize = filesize($file);
        echo "  Redimensionne: {$newW}x{$newH} (" . round($newSize / 1024) . " Ko)\n";
    }

    // ETAPE 2 : Convertir en WebP
    $webpPath = $info['dirname'] . '/' . $info['filename'] . '.webp';

    if (function_exists('imagewebp')) {
        $success = imagewebp($image, $webpPath, $qualityWebp);

        if ($success && file_exists($webpPath)) {
            $webpSize = filesize($webpPath);
            $saved = $originalSize - $webpSize;
            $totalSaved += $saved;
            $pct = round($saved / $originalSize * 100);
            echo "  WebP: " . round($webpSize / 1024) . " Ko ({$pct}% plus leger que l'original)\n";
            $count++;
        } else {
            echo "  ERREUR: echec conversion WebP\n";
        }
    } else {
        echo "  SKIP WebP (imagewebp non disponible)\n";
    }

    imagedestroy($image);
    echo "\n";
}

echo "=== TERMINE ===\n";
echo "$count image(s) traitee(s)\n";
echo "Espace total economise: " . round($totalSaved / 1024 / 1024, 1) . " Mo\n";
echo "\nSupprime ce fichier apres utilisation : rm convert-webp.php\n";
