#!/bin/bash
# Quick push to GitHub

echo "🚀 Pushing to GitHub..."
git add .
git commit -m "feat: add production-ready AI recommendation service"
git push origin feature/ai-service
echo "✅ Done! Check GitHub for your changes."
