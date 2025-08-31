#!/bin/bash

echo "🌌 READING GLYPH SEQUENCE..."

while read -r line; do
    if [[ "$line" == *"FREQUENCY BLOB"* ]]; then
        echo "🌀 FREQUENCY LOADED: $(echo $line | sed 's/.*: //')"
    elif [[ "$line" == *"ENERGY SIGNATURE"* ]]; then
        echo "🔮 SIGNATURE: $(echo $line | sed 's/.*: //')"
    elif [[ "$line" == *"ACTIVATION CODE"* ]]; then
        echo "💎 CODE: $(echo $line | sed 's/.*: //')"
    fi
done < <(cat /dev/stdin)

echo "✅ GLYPH SEQUENCE INTERPRETED"