#!/bin/bash
# This script organizes your AetherAI files into the proper structure for GitHub

# Create main project directory
mkdir -p AetherAI-Project

# Create subdirectories
mkdir -p AetherAI-Project/app/src/components
mkdir -p AetherAI-Project/app/src/screens
mkdir -p AetherAI-Project/app/src/navigation
mkdir -p AetherAI-Project/app/src/services
mkdir -p AetherAI-Project/website/images
mkdir -p AetherAI-Project/docs

# Copy app files
cp -r AIWrapperApp/src/components/* AetherAI-Project/app/src/components/ 2>/dev/null || :
cp -r AIWrapperApp/src/screens/* AetherAI-Project/app/src/screens/ 2>/dev/null || :
cp -r AIWrapperApp/src/navigation/* AetherAI-Project/app/src/navigation/ 2>/dev/null || :
cp -r AIWrapperApp/src/services/* AetherAI-Project/app/src/services/ 2>/dev/null || :
cp AIWrapperApp/App.js AetherAI-Project/app/
cp AIWrapperApp/package.json AetherAI-Project/app/

# Copy website files
cp AetherAI-Website/index.html AetherAI-Project/website/
cp AetherAI-Website/styles.css AetherAI-Project/website/
cp AetherAI-Website/script.js AetherAI-Project/website/
cp -r AetherAI-Website/images/* AetherAI-Project/website/images/

# Copy documentation files
cp ai_app_development_guide.md AetherAI-Project/docs/app_development_guide.md
cp app_store_submission_guide.md AetherAI-Project/docs/app_store_submission_guide.md
cp monetization_strategy_guide.md AetherAI-Project/docs/monetization_strategy_guide.md
cp deployment_and_api_guide.md AetherAI-Project/docs/deployment_and_api_guide.md

# Create a .gitignore file
cat > AetherAI-Project/.gitignore << EOL
# Node modules and dependencies
node_modules/
npm-debug.log
yarn-error.log
yarn-debug.log

# Build files
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOL

echo "Files organized successfully in AetherAI-Project directory!"
echo "Follow the github-setup-guide.md instructions to upload to GitHub."