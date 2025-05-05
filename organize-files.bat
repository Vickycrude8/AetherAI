@echo off
:: This script organizes your AetherAI files into the proper structure for GitHub

:: Create main project directory
mkdir AetherAI-Project

:: Create subdirectories
mkdir AetherAI-Project\app\src\components
mkdir AetherAI-Project\app\src\screens
mkdir AetherAI-Project\app\src\navigation
mkdir AetherAI-Project\app\src\services
mkdir AetherAI-Project\website\images
mkdir AetherAI-Project\docs

:: Copy app files
xcopy /E /I /Y AIWrapperApp\src\components AetherAI-Project\app\src\components 2>nul
xcopy /E /I /Y AIWrapperApp\src\screens AetherAI-Project\app\src\screens 2>nul
xcopy /E /I /Y AIWrapperApp\src\navigation AetherAI-Project\app\src\navigation 2>nul
xcopy /E /I /Y AIWrapperApp\src\services AetherAI-Project\app\src\services 2>nul
copy AIWrapperApp\App.js AetherAI-Project\app\ 2>nul
copy AIWrapperApp\package.json AetherAI-Project\app\ 2>nul

:: Copy website files
copy AetherAI-Website\index.html AetherAI-Project\website\ 2>nul
copy AetherAI-Website\styles.css AetherAI-Project\website\ 2>nul
copy AetherAI-Website\script.js AetherAI-Project\website\ 2>nul
xcopy /E /I /Y AetherAI-Website\images AetherAI-Project\website\images 2>nul

:: Copy documentation files
copy ai_app_development_guide.md AetherAI-Project\docs\app_development_guide.md 2>nul
copy app_store_submission_guide.md AetherAI-Project\docs\app_store_submission_guide.md 2>nul
copy monetization_strategy_guide.md AetherAI-Project\docs\monetization_strategy_guide.md 2>nul
copy deployment_and_api_guide.md AetherAI-Project\docs\deployment_and_api_guide.md 2>nul

:: Create a .gitignore file
(
echo # Node modules and dependencies
echo node_modules/
echo npm-debug.log
echo yarn-error.log
echo yarn-debug.log
echo.
echo # Build files
echo build/
echo dist/
echo.
echo # Environment variables
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo.
echo # IDE files
echo .idea/
echo .vscode/
echo *.swp
echo *.swo
echo.
echo # OS files
echo .DS_Store
echo Thumbs.db
) > AetherAI-Project\.gitignore

echo Files organized successfully in AetherAI-Project directory!
echo Follow the github-setup-guide.md instructions to upload to GitHub.