# Deployment & API Integration Guide for AI Wrapper App

This comprehensive guide covers how to deploy your AI Wrapper App and integrate with AI APIs properly. It provides step-by-step instructions for both development and production environments.

## Table of Contents
1. [Development Environment Setup](#development-environment-setup)
2. [API Integration](#api-integration)
3. [Building for Android](#building-for-android)
4. [Building for iOS](#building-for-ios)
5. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
6. [API Monitoring & Maintenance](#api-monitoring--maintenance)
7. [Security Best Practices](#security-best-practices)

## Development Environment Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- JDK 11
- CocoaPods (for iOS)

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ai-wrapper-app.git
   cd ai-wrapper-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS-specific setup** (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Setup environment variables**:
   Create a `.env` file in the project root:
   ```
   API_URL=https://your-backend-api.com
   API_TIMEOUT=30000
   DEBUG_MODE=true
   ```

5. **Run the development server**:
   ```bash
   # For Android
   npm run android
   # or
   yarn android
   
   # For iOS
   npm run ios
   # or
   yarn ios
   ```

## API Integration

### Setting Up AI API Keys

#### OpenAI API Setup
1. Create an account at [OpenAI](https://platform.openai.com/)
2. Navigate to API Keys section
3. Generate a new API key
4. Set usage limits to prevent unexpected charges
5. Store the API key securely (never in code repositories)

#### Google Gemini API Setup
1. Create a Google Cloud account if you don't have one
2. Enable Gemini API in Google Cloud Console
3. Create API credentials
4. Set appropriate usage quotas
5. Store the API key securely

### API Security Best Practices

1. **Never store API keys in client code**:
   - Use a backend proxy service to make API calls
   - If not possible, consider using a secure storage mechanism
   
2. **Implement API key rotation**:
   - Change keys regularly
   - Have a system to update keys without app updates
   
3. **Usage monitoring**:
   - Set up alerts for unusual activity
   - Implement rate limiting in your app

### Backend Proxy Implementation (Recommended)

For production apps, create a simple backend proxy to keep API keys secure:

1. **Create a simple Express server**:
   ```javascript
   const express = require('express');
   const axios = require('axios');
   const app = express();
   
   // Environment variables for API keys
   const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
   
   app.use(express.json());
   
   app.post('/api/ai/completion', async (req, res) => {
     try {
       const { prompt, options } = req.body;
       
       const response = await axios.post(
         'https://api.openai.com/v1/chat/completions',
         {
           model: options.model || 'gpt-3.5-turbo',
           messages: [{ role: 'user', content: prompt }],
           temperature: options.temperature || 0.7,
           max_tokens: options.maxTokens || 500,
         },
         {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${OPENAI_API_KEY}`
           }
         }
       );
       
       res.json({
         text: response.data.choices[0].message.content,
         usage: response.data.usage,
         provider: 'openai',
       });
     } catch (error) {
       console.error('AI API error:', error.response?.data || error.message);
       res.status(500).json({ 
         error: 'Failed to generate AI response', 
         details: error.response?.data || error.message 
       });
     }
   });
   
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`API proxy server running on port ${PORT}`);
   });
   ```

2. **Update your React Native app to use the proxy**:
   ```javascript
   // In your aiApi.js file
   async getCompletion(prompt, options = {}) {
     try {
       const response = await axios.post(
         'https://your-backend-api.com/api/ai/completion',
         { prompt, options }
       );
       
       return response.data;
     } catch (error) {
       console.error('AI API error:', error);
       throw error;
     }
   }
   ```

3. **Deploy backend to a service** like:
   - Heroku
   - Vercel
   - AWS Lambda
   - Google Cloud Functions

## Building for Android

### Generating a Signed APK/AAB

1. **Generate a keystore file** (if you don't have one):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Add keystore information to gradle.properties**:
   Create a `gradle.properties` file in the android folder with:
   ```properties
   MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=*****
   MYAPP_UPLOAD_KEY_PASSWORD=*****
   ```

3. **Configure app/build.gradle**:
   ```gradle
   android {
       ...
       defaultConfig { ... }
       signingConfigs {
           release {
               storeFile file(MYAPP_UPLOAD_STORE_FILE)
               storePassword MYAPP_UPLOAD_STORE_PASSWORD
               keyAlias MYAPP_UPLOAD_KEY_ALIAS
               keyPassword MYAPP_UPLOAD_KEY_PASSWORD
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

4. **Generate the release build**:
   ```bash
   # For APK
   cd android
   ./gradlew assembleRelease
   
   # For AAB (recommended for Play Store)
   cd android
   ./gradlew bundleRelease
   ```

5. **Find the output file**:
   - APK: `android/app/build/outputs/apk/release/app-release.apk`
   - AAB: `android/app/build/outputs/bundle/release/app-release.aab`

### Configuring Build Variants

For different environments (dev, staging, production), you can use build variants:

1. **Update app/build.gradle**:
   ```gradle
   android {
       ...
       flavorDimensions "environment"
       productFlavors {
           dev {
               dimension "environment"
               applicationIdSuffix ".dev"
               versionNameSuffix "-dev"
               // Development-specific configurations
               buildConfigField "String", "API_URL", "\"https://dev-api.yourbackend.com\""
           }
           staging {
               dimension "environment"
               applicationIdSuffix ".staging"
               versionNameSuffix "-staging"
               buildConfigField "String", "API_URL", "\"https://staging-api.yourbackend.com\""
           }
           production {
               dimension "environment"
               buildConfigField "String", "API_URL", "\"https://api.yourbackend.com\""
           }
       }
   }
   ```

2. **Build specific variants**:
   ```bash
   cd android
   ./gradlew assembleDevDebug
   ./gradlew assembleStagingRelease
   ./gradlew assembleProductionRelease
   ```

## Building for iOS

### Creating a Build for TestFlight/App Store

1. **Open the Xcode workspace**:
   ```bash
   cd ios
   open AIWrapperApp.xcworkspace
   ```

2. **Update signing settings**:
   - Open your project settings
   - Go to Signing & Capabilities
   - Select your team
   - Update Bundle Identifier if needed

3. **Configure build settings**:
   - Set version number and build number
   - Ensure proper device orientation settings
   - Configure App Transport Security settings

4. **Archive the app**:
   - Select "Generic iOS Device" as the build target
   - Select Product > Archive from the menu
   - Wait for the archiving process to complete

5. **Upload to App Store Connect**:
   - In the Archives window, select your archive
   - Click "Distribute App"
   - Select "App Store Connect"
   - Follow the wizard to upload

### Managing Environment Configurations

Use XCConfig files for different environments:

1. **Create configuration files**:
   Create three files: `Dev.xcconfig`, `Staging.xcconfig`, and `Prod.xcconfig`:
   ```
   // Dev.xcconfig
   API_URL = https:\/\/dev-api.yourbackend.com
   APP_NAME = AI Wrapper Dev
   APP_BUNDLE_ID = com.yourdomain.aiwrapper.dev
   
   // Staging.xcconfig
   API_URL = https:\/\/staging-api.yourbackend.com
   APP_NAME = AI Wrapper Staging
   APP_BUNDLE_ID = com.yourdomain.aiwrapper.staging
   
   // Prod.xcconfig
   API_URL = https:\/\/api.yourbackend.com
   APP_NAME = AI Wrapper
   APP_BUNDLE_ID = com.yourdomain.aiwrapper
   ```

2. **Update Info.plist to use configurations**:
   ```xml
   <key>CFBundleDisplayName</key>
   <string>${APP_NAME}</string>
   <key>CFBundleIdentifier</key>
   <string>${APP_BUNDLE_ID}</string>
   <key>APIBaseURL</key>
   <string>${API_URL}</string>
   ```

3. **Set up schemes in Xcode**:
   - Create separate schemes for Dev, Staging, and Production
   - Assign the appropriate configuration to each scheme

## CI/CD Pipeline Setup

### GitHub Actions Setup

Create a file at `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          distribution: 'adopt'
          java-version: '11'
      - name: Build Android
        run: |
          cd android
          ./gradlew assembleRelease
      - name: Upload APK
        uses: actions/upload-artifact@v2
        with:
          name: app-release
          path: android/app/build/outputs/apk/release/app-release.apk

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Install CocoaPods
        run: |
          cd ios
          pod install
      - name: Build iOS
        run: |
          cd ios
          xcodebuild -workspace AIWrapperApp.xcworkspace -scheme AIWrapperApp -configuration Release -sdk iphonesimulator
```

### Fastlane Setup (Optional)

1. **Install Fastlane**:
   ```bash
   gem install fastlane
   ```

2. **Initialize Fastlane**:
   ```bash
   cd ios  # or android
   fastlane init
   ```

3. **Create a Fastfile** for iOS deployment:
   ```ruby
   default_platform(:ios)
   
   platform :ios do
     desc "Push a new beta build to TestFlight"
     lane :beta do
       increment_build_number
       build_app(workspace: "AIWrapperApp.xcworkspace", scheme: "AIWrapperApp")
       upload_to_testflight
     end
     
     desc "Push a new release build to the App Store"
     lane :release do
       increment_build_number
       build_app(workspace: "AIWrapperApp.xcworkspace", scheme: "AIWrapperApp")
       upload_to_app_store(
         submit_for_review: true,
         automatic_release: true,
         force: true
       )
     end
   end
   ```

4. **Create a Fastfile** for Android deployment:
   ```ruby
   default_platform(:android)
   
   platform :android do
     desc "Submit a new Beta Build to Play Store"
     lane :beta do
       gradle(task: "clean bundleRelease")
       upload_to_play_store(track: 'beta', aab: "app/build/outputs/bundle/release/app-release.aab")
     end
     
     desc "Deploy a new version to the Google Play"
     lane :release do
       gradle(task: "clean bundleRelease")
       upload_to_play_store(aab: "app/build/outputs/bundle/release/app-release.aab")
     end
   end
   ```

## API Monitoring & Maintenance

### Monitoring API Usage

1. **Implement usage tracking**:
   ```javascript
   // Add to your API service class
   trackApiUsage(endpoint, success, latency) {
     Analytics.logEvent('api_call', {
       endpoint,
       success,
       latency_ms: latency,
       user_id: currentUser.id,
       timestamp: new Date().toISOString()
     });
   }
   
   // Usage in API calls
   const startTime = Date.now();
   try {
     const result = await makeApiCall();
     this.trackApiUsage('completion', true, Date.now() - startTime);
     return result;
   } catch (error) {
     this.trackApiUsage('completion', false, Date.now() - startTime);
     throw error;
   }
   ```

2. **Set up error reporting**:
   ```javascript
   // Setup Sentry or similar service
   import * as Sentry from '@sentry/react-native';
   
   Sentry.init({
     dsn: 'YOUR_SENTRY_DSN',
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });
   
   // Capture API errors
   try {
     // API call
   } catch (error) {
     Sentry.captureException(error);
     // Handle error...
   }
   ```

3. **Implement rate limiting detection**:
   ```javascript
   handleApiError(error) {
     if (error.response && error.response.status === 429) {
       // Rate limit exceeded
       this.showRateLimitMessage();
       // Wait before retrying or notify user
     } else {
       // Handle other errors
     }
   }
   ```

### API Version Updates

1. **Version checking at startup**:
   ```javascript
   async checkApiCompatibility() {
     try {
       const response = await axios.get('https://your-backend-api.com/version');
       const { minAppVersion, currentApiVersion, deprecated } = response.data;
       
       if (deprecated.includes(this.clientVersion)) {
         // Show mandatory update dialog
       } else if (semver.lt(this.clientVersion, minAppVersion)) {
         // Show recommended update dialog
       }
       
       // Store current API version
       this.apiVersion = currentApiVersion;
     } catch (error) {
       console.warn('Version check failed', error);
     }
   }
   ```

2. **Add fallback mechanism**:
   ```javascript
   callApi(endpoint, data, retries = 3) {
     return axios.post(`${this.apiUrl}/${endpoint}`, data)
       .catch(error => {
         if (retries > 0 && this.isRetryableError(error)) {
           return new Promise(resolve => {
             setTimeout(() => {
               resolve(this.callApi(endpoint, data, retries - 1));
             }, 1000); // Exponential backoff could be used here
           });
         }
         throw error;
       });
   }
   ```

## Security Best Practices

### Securing API Keys

1. **Use environment variables** for development:
   ```javascript
   // Use react-native-dotenv or react-native-config
   import { API_KEY } from '@env';
   
   // Usage
   const apiKey = API_KEY;
   ```

2. **For production, use a backend proxy** to make API calls

3. **Use obfuscation techniques** if direct API calls are necessary:
   - React Native code obfuscation tools
   - Split keys into multiple parts
   - Dynamic key generation based on device info

### Data Storage Security

1. **For sensitive data, use secure storage**:
   ```javascript
   import EncryptedStorage from 'react-native-encrypted-storage';
   
   // Store API key securely
   async function storeApiKey(key) {
     try {
       await EncryptedStorage.setItem(
         "api_key",
         JSON.stringify({
           key: key,
           timestamp: Date.now()
         })
       );
     } catch (error) {
       console.error('Error storing API key', error);
     }
   }
   
   // Retrieve API key
   async function getApiKey() {
     try {
       const result = await EncryptedStorage.getItem("api_key");
       if (result) {
         return JSON.parse(result).key;
       }
       return null;
     } catch (error) {
       console.error('Error retrieving API key', error);
       return null;
     }
   }
   ```

2. **Implement certificate pinning** for API requests:
   ```javascript
   // For fetch API
   const certificates = [
     'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', // Your API server certificate hash
   ];
   
   fetch('https://your-api.com/endpoint', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
     pkPinning: certificates,
   });
   ```

3. **Network Security Configuration** for Android:
   In `android/app/src/main/res/xml/network_security_config.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
       <domain-config cleartextTrafficPermitted="false">
           <domain includeSubdomains="true">your-api.com</domain>
           <pin-set>
               <pin digest="SHA-256">base64EncodedPin1</pin>
               <!-- Backup pin -->
               <pin digest="SHA-256">base64EncodedPin2</pin>
           </pin-set>
       </domain-config>
   </network-security-config>
   ```

### Content Moderation

1. **Implement frontend content filtering**:
   ```javascript
   function moderateContent(userInput) {
     const profanityRegex = /badword1|badword2|badword3/gi;
     if (profanityRegex.test(userInput)) {
       return {
         isValid: false,
         message: 'Your message contains inappropriate content'
       };
     }
     return { isValid: true };
   }
   
   // Usage
   const check = moderateContent(userInput);
   if (!check.isValid) {
     Alert.alert('Warning', check.message);
     return;
   }
   // Continue with API call
   ```

2. **Use AI provider content filtering**:
   ```javascript
   // OpenAI example with moderation API
   async function checkContent(userInput) {
     try {
       const response = await axios.post(
         'https://api.openai.com/v1/moderations',
         { input: userInput },
         {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${OPENAI_API_KEY}`
           }
         }
       );
       
       const result = response.data.results[0];
       return {
         isValid: !result.flagged,
         categories: result.categories,
         scores: result.category_scores
       };
     } catch (error) {
       console.error('Moderation API error', error);
       return { isValid: true }; // Fail open if the API check fails
     }
   }
   ```

## Troubleshooting

### Common Deployment Issues

1. **Android build fails with dependency issues**:
   - Solution: Check for conflicting dependencies in `package.json`
   - Try running `npx jetify` to convert dependencies to AndroidX
   - Clear project caches: `cd android && ./gradlew clean`

2. **iOS build fails with CocoaPods issues**:
   - Solution: Update CocoaPods with `sudo gem install cocoapods`
   - Try deleting `Podfile.lock` and running `pod install` again
   - If necessary, delete the `Pods` directory and run `pod install`

3. **App crashes when making API calls**:
   - Check internet permissions in the manifest
   - Verify API keys are correctly set
   - Add proper error handling around API calls
   - Test API endpoints independently before integrating

### Performance Optimization

1. **Reduce bundle size**:
   - Use ProGuard for Android: Enable in `android/app/build.gradle`
   ```gradle
   buildTypes {
       release {
           ...
           minifyEnabled true
           shrinkResources true
           proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
   }
   ```
   
   - Use Hermes JavaScript engine:
   ```
   // In android/app/build.gradle
   project.ext.react = [
       enableHermes: true
   ]
   
   // In ios/Podfile
   use_react_native!(
     :path => config[:reactNativePath],
     :hermes_enabled => true
   )
   ```

2. **Optimize API calls**:
   - Implement caching for responses
   - Use debounce for user input
   - Batch API requests when possible

3. **Image optimization**:
   - Use appropriate image formats and sizes
   - Implement lazy loading for images
   - Consider using a CDN for image storage and delivery

## Conclusion

This guide provides a comprehensive overview of deploying your AI Wrapper App and properly integrating with AI APIs. By following these best practices, you can ensure a smooth deployment process and maintain a secure, high-performance application for your users.

Remember to regularly update your app to accommodate changes in the AI APIs and mobile platforms. Monitor your app's performance and user feedback to identify areas for improvement and optimization.