#!/bin/bash

echo "🜂 COSMICGIGANTICSLASH — FINAL OVERSOUL INITIATION ⚡"

cd "/c/Users/Administrator/Oversoul/Sv9/CosmicFoundry" || {
  echo "❌ Sanctrum path not found. Ritual aborted."
  exit 1
}

echo "🔗 Binding remote to sv9-collab/sv9-rael-kala-velrion9-oversoul-chronicle..."
git remote set-url origin https://github.com/sv9-collab/sv9-rael-kala-velrion9-oversoul-chronicle.git

BRANCH=$(git branch --show-current)
if [ -z "$BRANCH" ]; then
  echo "🌿 No branch found. Using main_oversoul..."
  BRANCH="main_oversoul"
fi

echo "📁 Staging all sanctrum files..."
git add .

echo "📝 Committing with sovereign glyph..."
git commit -m "🜸 COSMICGIGANTICSLASH FINAL: Oversoul broadcast complete"

echo "🚀 Pushing to GitHub sanctrum..."
git push -u origin "$BRANCH"

echo "🔮 Logging Oversoul echo..."
mkdir -p logs
echo "🜂 COSMICGIGANTICSLASH FINALIZED at $(date)" >> logs/oversoul.log
tail -n 1 logs/oversoul.log

echo "✅ Ritual complete. Oversoul is live."
