#!/bin/bash
# ============================================
# Convertisseur JPG/PNG → WebP
# Usage : ./convert-webp.sh
# Prerequis : sudo apt install cwebp
#             ou : sudo apt install webp
# ============================================

IMG_DIR="./img"
QUALITY=82

# Vérifier que cwebp est installé
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp non trouvé. Installe-le avec :"
    echo "   sudo apt install webp"
    echo "   ou : brew install webp (macOS)"
    exit 1
fi

echo "🔄 Conversion des images en WebP (qualité ${QUALITY})..."
echo ""

COUNT=0

for file in "$IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -f "$file" ] || continue

    filename="${file%.*}"
    output="${filename}.webp"

    if [ -f "$output" ]; then
        echo "⏭  Déjà converti : $(basename "$output")"
        continue
    fi

    echo "📸 $(basename "$file") → $(basename "$output")"
    cwebp -q "$QUALITY" "$file" -o "$output" -quiet

    if [ $? -eq 0 ]; then
        original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        webp_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)

        if [ -n "$original_size" ] && [ -n "$webp_size" ] && [ "$original_size" -gt 0 ]; then
            reduction=$(( (original_size - webp_size) * 100 / original_size ))
            echo "   ✅ ${reduction}% plus léger ($(( original_size / 1024 ))Ko → $(( webp_size / 1024 ))Ko)"
        else
            echo "   ✅ Converti"
        fi
        COUNT=$((COUNT + 1))
    else
        echo "   ❌ Erreur de conversion"
    fi
done

echo ""
if [ "$COUNT" -gt 0 ]; then
    echo "✅ ${COUNT} image(s) convertie(s) en WebP."
else
    echo "ℹ️  Aucune nouvelle image à convertir."
    echo "   Place tes .jpg/.png dans le dossier img/ puis relance le script."
fi
