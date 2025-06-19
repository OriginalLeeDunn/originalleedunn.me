#!/bin/bash

# Create optimized directory if it doesn't exist
mkdir -p public/optimized

# Optimize PNG files
for file in public/*.png; do
  if [ -f "$file" ]; then
    filename=$(basename -- "$file")
    echo "Optimizing $filename..."
    # Convert to WebP with quality 80
    convert "$file" -quality 80 -define webp:lossless=false "public/optimized/${filename%.*}.webp"
    # Optimize original PNG
    optipng -o7 -strip all "$file"
  fi
done

echo "Image optimization complete!"
