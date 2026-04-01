<?php
/**
 * Optimiseur d'images : Redimensionne + Convertit en WebP
 * Utilise ImageMagick (convert) car GD manque de memoire sur mutualise
 *
 * Usage SSH :  php convert-webp.php
 */

$imgDir     = __DIR__ . '/img';
$maxWidth   = 1200;
$qualityJpg = 82;
$qualityWebp = 80;

echo "=== Optimisation des images ===\n";
echo "Max: {$maxWidth}px | JPG: q{$qualityJpg} | WebP: q{$qualityWebp}\n\n";

// Detecter l'outil disponible
$hasConvert = false;
$convertCmd = '';

// Tester convert (ImageMagick)
exec('which convert 2>/dev/null', $out, $ret);
if ($ret === 0 && !empty($out[0])) {
    $hasConvert = true;
    $convertCmd = trim($out[0]);
    echo "Outil: ImageMagick ($convertCmd)\n\n";
}

if (!$hasConvert) {
    // Tester magick (ImageMagick v7)
    exec('which magick 2>/dev/null', $out2, $ret2);
    if ($ret2 === 0 && !empty($out2[0])) {
        $hasConvert = true;
        $convertCmd = trim($out2[0]);
        echo "Outil: ImageMagick v7 ($convertCmd)\n\n";
    }
}

if (!$hasConvert) {
    echo "ERREUR: Ni 'convert' ni 'magick' trouves.\n";
    echo "Essaie: which convert && which magick\n";
    echo "\nAlternative manuelle : redimensionne tes images a 1200px\n";
    echo "sur https://squoosh.app avant de les uploader.\n";
    exit(1);
}

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
    $originalSize = filesize($file);
    $webpPath = $info['dirname'] . '/' . $info['filename'] . '.webp';

    echo "--- $basename (" . round($originalSize / 1024) . " Ko) ---\n";

    // ETAPE 1 : Redimensionner le JPG/PNG (ecrase l'original)
    $cmd1 = escapeshellcmd($convertCmd) . ' '
        . escapeshellarg($file)
        . " -resize '{$maxWidth}x>' -quality {$qualityJpg} -strip "
        . escapeshellarg($file);

    exec($cmd1 . ' 2>&1', $output1, $ret1);

    if ($ret1 !== 0) {
        echo "  ERREUR resize: " . implode(' ', $output1) . "\n\n";
        continue;
    }

    clearstatcache(true, $file);
    $resizedSize = filesize($file);
    echo "  Redimensionne: " . round($resizedSize / 1024) . " Ko\n";

    // ETAPE 2 : Convertir en WebP
    $cmd2 = escapeshellcmd($convertCmd) . ' '
        . escapeshellarg($file)
        . " -quality {$qualityWebp} "
        . escapeshellarg($webpPath);

    exec($cmd2 . ' 2>&1', $output2, $ret2);

    if ($ret2 === 0 && file_exists($webpPath)) {
        $webpSize = filesize($webpPath);
        $saved = $originalSize - $webpSize;
        $totalSaved += $saved;
        $pct = round($saved / $originalSize * 100);
        echo "  WebP: " . round($webpSize / 1024) . " Ko ({$pct}% plus leger)\n";
        $count++;
    } else {
        echo "  ERREUR WebP: " . implode(' ', $output2) . "\n";
    }

    echo "\n";
}

echo "=== TERMINE ===\n";
echo "$count image(s) traitee(s)\n";
echo "Espace economise: " . round($totalSaved / 1024 / 1024, 1) . " Mo\n";
echo "\nSupprime ce fichier : rm convert-webp.php\n";
