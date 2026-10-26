#!/usr/bin/env bash
# Transforme une capture pleine page en vidéo qui défile (aller-retour, boucle parfaite).
# Usage : tools/scroll-video.sh capture.png sortie.mp4 [desktop|mobile] [durée_s]
#   desktop : fenêtre 1280×800   mobile : fenêtre 390×844 rendue en 2× (780×1688)
set -euo pipefail

in="$1"; out="$2"; mode="${3:-desktop}"; dur="${4:-14}"

if [ "$mode" = "mobile" ]; then W=780; H=1688; else W=1280; H=800; fi

# Ease in-out (cosinus) : descend jusqu'en bas puis remonte, pause naturelle aux extrémités
ffmpeg -y -loglevel error -loop 1 -framerate 30 -i "$in" -t "$dur" \
  -vf "scale=${W}:-2:flags=lanczos,crop=${W}:${H}:0:'(ih-oh)*(0.5-0.5*cos(2*PI*t/${dur}))',format=yuv420p" \
  -c:v libx264 -preset veryfast -crf 27 -profile:v high -movflags +faststart -an "$out"

# Image de repos (première image), utilisée avant le chargement de la vidéo
ffmpeg -y -loglevel error -i "$out" -frames:v 1 -q:v 4 "${out%.*}.jpg"
echo "OK  $out  ($(du -h "$out" | cut -f1))"
