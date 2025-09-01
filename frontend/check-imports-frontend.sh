#!/bin/bash
set -euo pipefail

BASE=./src

if [ ! -d "$BASE" ]; then
  echo "‚ùó No $BASE directory found. Run this script from the frontend/ folder."
  exit 1
fi

echo "Ì¥ç Scanning $BASE for relative import issues (case-sensitive)..."

find "$BASE" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
  grep -nE "from[[:space:]]+['\"](\./|\.\./)[^'\"]+['\"]|import[[:space:]]+['\"](\./|\.\./)[^'\"]+['\"]" "$file" 2>/dev/null | while IFS=: read -r lineno line; do
    imp=$(echo "$line" | sed -nE "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/p; s/.*import[[:space:]]+['\"]([^'\"]+)['\"].*/\1/p")
    dir=$(dirname "$file")

    candidates=()
    for ext in .js .jsx .ts .tsx; do
      candidates+=("$dir/$imp$ext")
    done
    candidates+=("$dir/$imp/index.js" "$dir/$imp/index.jsx" "$dir/$imp/index.ts" "$dir/$imp/index.tsx")

    found=0
    for c in "${candidates[@]}"; do
      if [ -e "$c" ]; then
        found=1
        break
      fi
    done

    if [ $found -eq 0 ]; then
      echo "‚ùå Import not found (possible case mismatch) in $file:$lineno"
      echo "   ‚Üí $line"
    fi
  done
done

echo "‚úÖ Scan complete!"

