# AetherAI - Complete Project

This repository contains everything you need to build, deploy, and launch the AetherAI application for both Android and iOS platforms. The app serves as a user-friendly interface to powerful AI models like OpenAI GPT and Google Gemini.

## Project Overview

AetherAI provides users with:
- Text-based AI chat functionality
- Image generation and analysis capabilities
- Multiple AI provider support (OpenAI, Google Gemini)
- Freemium monetization with subscription tiers

## Repository Structure

This project includes:

1. **Complete Source Code**
   - React Native codebase for cross-platform development
   - Components for all app features
   - API integration service
   
2. **Comprehensive Documentation**
   - Development guide with step-by-step instructions
   - API integration documentation
   - Deployment guides for both Android and iOS
   - App Store submission walkthrough
   
3. **Monetization Strategy**
   - Freemium model implementation
   - Subscription tier recommendations
   - In-app purchase implementation guide

## Getting Started

### Prerequisites
- Node.js and npm
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- API keys for your chosen AI providers

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aetherai
```

2. Install dependencies:
```bash
npm install
```

3. iOS only - Install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

4. Configure your API keys in the settings screen or follow the backend proxy guide in the deployment documentation.

5. Run the development server:
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Documentation

Refer to these comprehensive guides for detailed instructions:

- [AetherAI Development Guide](./ai_app_development_guide.md) - Overview of app architecture and development
- [App Store Submission Guide](./app_store_submission_guide.md) - Step-by-step process for submitting to both app stores
- [Monetization Strategy Guide](./monetization_strategy_guide.md) - Detailed plan for app monetization
- [Deployment & API Guide](./deployment_and_api_guide.md) - Build and deployment instructions with API integration details

## Features

### AI Chat
- Text-based conversations with AI
- Support for different AI models
- History saving and export

### Image AI
- Image generation from text prompts
- Image analysis with AI vision
- Save and share generated images

### Settings & Configuration
- AI provider selection
- API key management
- Appearance customization
- Subscription management

## Monetization

AetherAI uses a freemium model with:

- **Free Tier**: Limited messages, basic AI model access
- **Premium Tiers**: Subscription-based with unlimited messages, premium models
- **In-App Purchases**: Optional token packs for pay-as-you-go usage

## Deployment

For detailed deployment instructions, see the [Deployment & API Guide](./deployment_and_api_guide.md). Key steps include:

1. Configure app for release
2. Build signed APK/AAB for Android
3. Archive and upload for iOS
4. Submit to respective app stores

## Customization

You can customize the app by:

- Changing branding elements (colors, logos, app name)
- Adding or removing AI providers
- Modifying subscription tiers and pricing
- Extending functionality with additional features

## Security

AetherAI implements several security best practices:

- Secure API key handling
- Optional backend proxy implementation
- Encrypted storage for sensitive data
- Network security configuration

## Support

For questions or issues, please open an issue in this repository or contact support at support@aetherai.com.

## License

This project is licensed under the MIT License - see the LICENSE file for details.