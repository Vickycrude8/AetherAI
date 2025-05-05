# GitHub Setup Guide for AetherAI Project

This guide will walk you through the process of setting up a GitHub repository for your AetherAI app and website. Even if you have no prior experience with GitHub, these step-by-step instructions will help you get everything set up properly.

## Part 1: Organizing Your Files

Before uploading to GitHub, we'll organize your files in a clear structure. GitHub repositories typically follow a specific organization pattern to make code easy to navigate.

The recommended structure for your project is:

```
AetherAI/
├── README.md                     # Project overview
├── .gitignore                    # Files to ignore in Git
├── app/                          # Mobile app code
│   ├── src/                      # Source code
│   │   ├── components/           # UI components
│   │   ├── screens/              # App screens
│   │   ├── navigation/           # Navigation setup
│   │   └── services/             # API services
│   ├── package.json              # Dependencies
│   └── App.js                    # Main app file
├── website/                      # Website files
│   ├── index.html                # Homepage
│   ├── styles.css                # CSS styles
│   ├── script.js                 # JavaScript
│   └── images/                   # Website images
└── docs/                         # Documentation
    ├── app_development_guide.md
    ├── app_store_submission_guide.md
    ├── monetization_strategy_guide.md
    └── deployment_and_api_guide.md
```

## Part 2: Setting Up GitHub Step by Step

### Step 1: Create a GitHub Account

1. Go to [GitHub's website](https://github.com/)
2. Click on "Sign up" in the top right corner
3. Follow the prompts to create your account:
   - Enter your email address
   - Create a password
   - Choose a username
   - Solve the puzzle to verify you're human
   - Click "Create account"
4. Verify your email address by clicking the link GitHub sends you

### Step 2: Install Git on Your Computer

#### For Windows:
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer and follow the default options
3. Open Command Prompt to verify installation by typing: `git --version`

#### For Mac:
1. Open Terminal
2. If you have Homebrew installed, type: `brew install git`
3. Otherwise, you'll be prompted to install developer tools when you first use Git
4. Verify installation by typing: `git --version`

#### For Linux (Ubuntu/Debian):
1. Open Terminal
2. Type: `sudo apt-get update`
3. Type: `sudo apt-get install git`
4. Verify installation by typing: `git --version`

### Step 3: Configure Git

1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Set your name:
   ```
   git config --global user.name "Your Name"
   ```
3. Set your email (use the same email as your GitHub account):
   ```
   git config --global user.email "youremail@example.com"
   ```

### Step 4: Create a New Repository on GitHub

1. Log in to GitHub
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - Repository name: `AetherAI`
   - Description: `AetherAI mobile app and website - AI assistant application`
   - Choose "Public" (unless you want to keep it private)
   - Do NOT initialize with README, .gitignore, or license yet
5. Click "Create repository"

### Step 5: Prepare Your Local Files

1. Create a new folder named `AetherAI` on your computer
2. Move all your files into this folder according to the structure outlined in Part 1

### Step 6: Initialize Git Repository Locally

1. Open Command Prompt or Terminal
2. Navigate to your AetherAI folder:
   ```
   cd path/to/AetherAI
   ```
   Replace "path/to/AetherAI" with the actual path to your folder
3. Initialize the repository:
   ```
   git init
   ```
4. Create a .gitignore file with common exclusions:
   ```
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
   ```

### Step 7: Add Your Files to Git

1. Add all files to the staging area:
   ```
   git add .
   ```
2. Commit the files:
   ```
   git commit -m "Initial commit with AetherAI app and website"
   ```

### Step 8: Connect and Push to GitHub

1. Link your local repository to GitHub:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/AetherAI.git
   ```
   Replace "YOUR-USERNAME" with your GitHub username
2. Push your files to GitHub:
   ```
   git push -u origin master
   ```
   or if you're using the main branch:
   ```
   git push -u origin main
   ```
3. Enter your GitHub username and password if prompted
   - Note: GitHub now requires a Personal Access Token instead of password for HTTPS authentication

### Step 9: Verify Your Files Are on GitHub

1. Go to your GitHub repository page at `https://github.com/YOUR-USERNAME/AetherAI`
2. You should see all your files displayed

## Additional Tips for GitHub Beginners

### Creating a Personal Access Token (if needed)

If you're prompted for a password and your regular password doesn't work:

1. Go to GitHub.com and log in
2. Click your profile photo in the top right
3. Go to Settings
4. Scroll down and click "Developer settings" in the left sidebar
5. Click "Personal access tokens" → "Tokens (classic)"
6. Click "Generate new token"
7. Give it a name (e.g., "AetherAI Project")
8. Select scopes: at minimum, select "repo"
9. Click "Generate token"
10. Copy the token immediately (you won't be able to see it again)
11. Use this token instead of your password when pushing to GitHub

### Basic Git Commands for Future Updates

After your initial setup, here are the basic commands you'll use to update your repository:

1. Check status of changes:
   ```
   git status
   ```
2. Add new or changed files:
   ```
   git add .
   ```
3. Commit changes:
   ```
   git commit -m "Description of changes"
   ```
4. Push changes to GitHub:
   ```
   git push
   ```
5. Get latest changes from GitHub:
   ```
   git pull
   ```

### GitHub Desktop Alternative

If you prefer a visual interface instead of command line:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and log in with your GitHub account
3. Use the "Add" button to add your existing folder
4. Publish the repository to GitHub

## Conclusion

Congratulations! You've successfully set up a GitHub repository for your AetherAI project. This will allow you to:

- Track changes to your code
- Revert to previous versions if needed
- Collaborate with others
- Showcase your project to potential users or employers

Remember to commit and push your changes regularly to keep your GitHub repository up to date.