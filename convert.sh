#!/bin/bash
# Convert all .mp4 files from input folder to .gif in output folder
# Usage: ./convert.sh <input_dir> <output_dir> [width]
# Example: ./convert.sh ./clips ./gifs 320

INPUT="${1:?Usage: ./convert.sh <input_dir> <output_dir> [width]}"
OUTPUT="${2:?Usage: ./convert.sh <input_dir> <output_dir> [width]}"
WIDTH="${3:-320}"

mkdir -p "$OUTPUT"

for f in "$INPUT"/*.mp4; do
  [ -f "$f" ] || continue
  name="$(basename "${f%.mp4}.gif")"
  out="$OUTPUT/$name"
  echo "Converting: $f -> $out"
  ffmpeg -i "$f" -vf "fps=15,scale=$WIDTH:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "$out"
done

echo "Done."
