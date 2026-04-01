<?php
/**
 * Convertisseur JPG/PNG → WebP
 * Compatible hébergement mutualisé (pas besoin de sudo)
 *
 * Usage SSH :  php convert-webp.php
 * Usage web :  https://mon-agenceweb.fr/convert-webp.php (puis supprimer le fichier)
 */

$imgDir  = __DIR__ . '/img';
$quality = 82;
$isCli   = (php_sapi_name() === 'cli');

if (!$isCli) {
    header('Content-Type: text/plain; charset=utf-8');
}

// Vérifier que GD + WebP sont disponibles
if (!function_exists('imagewebp')) {
    echo "ERREUR : La fonction imagewebp() n'est pas disponible.\n";
    echo "Contacte ton hébergeur pour activer le support WebP dans GD.\n";
    exit(1);
}

echo "Conversion des images en WebP (qualite $quality)...\n\n";

$files = array_merge(
    glob("$imgDir/*.jpg"),
    glob("$imgDir/*.jpeg"),
    glob("$imgDir/*.png"),
    glob("$imgDir/*.JPG"),
    glob("$imgDir/*.JPEG"),
    glob("$imgDir/*.PNG")
);

$count = 0;

foreach ($files as $file) {
    $info     = pathinfo($file);
    $output   = $info['dirname'] . '/' . $info['filename'] . '.webp';
    $basename = $info['basename'];
    $ext      = strtolower($info['extension']);

    if (file_exists($output)) {
        echo "SKIP  $basename (deja converti)\n";
        continue;
    }

    // Charger l'image selon le type
    switch ($ext) {
        case 'jpg':
        case 'jpeg':
            $image = @imagecreatefromjpeg($file);
            break;
        case 'png':
            $image = @imagecreatefrompng($file);
            if ($image) {
                // Préserver la transparence
                imagepagenalpha($image, true);
                imagealphablending($image, true);
            }
            break;
        default:
            continue 2;
    }

    if (!$image) {
        echo "ERREUR  $basename (impossible de lire l'image)\n";
        continue;
    }

    // Convertir en WebP
    $success = imagewebp($image, $output, $quality);
    imagedestroy($image);

    if ($success && file_exists($output)) {
        $originalSize = filesize($file);
        $webpSize     = filesize($output);
        $reduction    = round(($originalSize - $webpSize) / $originalSize * 100);

        echo "OK    $basename -> " . $info['filename'] . ".webp";
        echo "  ({$reduction}% plus leger : " . round($originalSize/1024) . "Ko -> " . round($webpSize/1024) . "Ko)\n";
        $count++;
    } else {
        echo "ERREUR  $basename (echec conversion)\n";
    }
}

echo "\n";
if ($count > 0) {
    echo "$count image(s) convertie(s) en WebP.\n";
} else {
    echo "Aucune nouvelle image a convertir.\n";
    echo "Place tes .jpg/.png dans le dossier img/ puis relance.\n";
}

echo "\n⚠️  IMPORTANT : Supprime ce fichier apres utilisation (rm convert-webp.php)\n";
