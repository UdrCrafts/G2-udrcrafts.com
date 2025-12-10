#!/bin/bash

# Quick push script for G2-udrcrafts.com repository
# Run: bash PUSH_NOW.sh

echo "🚀 Pushing to GitHub..."
echo ""

# Stage all files
echo "📦 Staging files..."
git add .

# Show what will be committed
echo ""
echo "📋 Files to be committed:"
git status --short

# Commit
echo ""
read -p "✅ Proceed with commit? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git commit -m "feat: add production-ready AI recommendation service

- Complete ML pipeline with TF-IDF + cosine similarity
- Flask REST API with health checks
- Docker support for development and production
- Model persistence and auto-loading
- Comprehensive documentation and deployment guides
- Clean repository structure with proper .gitignore"
    
    echo ""
    echo "🚀 Pushing to origin main..."
    git push origin main
    
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your AI service is now live on GitHub!"
else
    echo "❌ Push cancelled"
fi
