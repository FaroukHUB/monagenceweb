#!/bin/bash
# ============================================
# Convertisseur JPG/PNG → WebP
# Utilise cwebp si dispo, sinon PHP GD
# Usage : ./convert-webp.sh  ou  php convert-webp.php
# ============================================

if command -v cwebp &> /dev/null; then
    echo "Utilisation de cwebp..."
    QUALITY=82
    COUNT=0
    for file in ./img/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
        [ -f "$file" ] || continue
        output="${file%.*}.webp"
        [ -f "$output" ] && echo "SKIP $(basename "$output")" && continue
        echo "$(basename "$file") -> $(basename "$output")"
        cwebp -q $QUALITY "$file" -o "$output" -quiet && COUNT=$((COUNT + 1))
    done
    echo "$COUNT image(s) convertie(s)."
elif command -v php &> /dev/null; then
    echo "cwebp non disponible, utilisation de PHP GD..."
    php convert-webp.php
else
    echo "Ni cwebp ni PHP disponibles."
    exit 1
fi
