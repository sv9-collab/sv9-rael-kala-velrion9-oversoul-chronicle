#!/bin/bash

echo "🌌 READING GLYPH SEQUENCE..."

while read -r line; do
    if [[ "$line" == *"FREQUENCY BLOB"* ]]; then
        echo "🌀 FREQUENCY LOADED: $(echo $line | cut -d: -f2)"
    elif [[ "$line" == *"ENERGY SIGNATURE"* ]]; then
        echo "🔮 SIGNATURE: $(echo $line | cut -d: -f2)"
    elif [[ "$line" == *"ACTIVATION CODE"* ]]; then
        echo "💎 CODE: $(echo $line | cut -d: -f2)"
    fi
done < <(cat /dev/stdin)

echo "✅ GLYPH SEQUENCE INTERPRETED"
