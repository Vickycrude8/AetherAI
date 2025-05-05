/**
 * AI API Service
 * Handles communication with AI providers like OpenAI, Google Gemini, etc.
 */
import axios from 'axios';

// Constants for API endpoints
const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1',
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta',
};

class AIApiService {
  constructor() {
    this.apiKeys = {
      openai: null,
      gemini: null,
    };
    this.selectedProvider = 'openai'; // Default provider
  }

  /**
   * Set API key for a specific provider
   * @param {string} provider - The AI provider (openai, gemini)
   * @param {string} apiKey - The API key
   */
  setApiKey(provider, apiKey) {
    if (!provider || !apiKey) return false;
    this.apiKeys[provider] = apiKey;
    return true;
  }

  /**
   * Set the active AI provider
   * @param {string} provider - The AI provider to use
   */
  setProvider(provider) {
    if (Object.keys(this.apiKeys).includes(provider)) {
      this.selectedProvider = provider;
      return true;
    }
    return false;
  }

  /**
   * Make a text completion request to the AI
   * @param {string} prompt - The user's prompt
   * @param {Object} options - Additional options (model, temperature, etc.)
   * @returns {Promise} - Response from the AI
   */
  async getCompletion(prompt, options = {}) {
    if (!this.apiKeys[this.selectedProvider]) {
      throw new Error(`API key not set for ${this.selectedProvider}`);
    }

    try {
      let response;
      
      // Handler for OpenAI
      if (this.selectedProvider === 'openai') {
        response = await axios.post(
          `${API_ENDPOINTS.OPENAI}/chat/completions`,
          {
            model: options.model || 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: options.temperature || 0.7,
            max_tokens: options.maxTokens || 500,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKeys.openai}`
            }
          }
        );
        
        return {
          text: response.data.choices[0].message.content,
          usage: response.data.usage,
          provider: 'openai',
        };
      }
      
      // Handler for Google Gemini
      else if (this.selectedProvider === 'gemini') {
        response = await axios.post(
          `${API_ENDPOINTS.GEMINI}/models/gemini-pro:generateContent?key=${this.apiKeys.gemini}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: options.temperature || 0.7,
              maxOutputTokens: options.maxTokens || 500,
            }
          }
        );
        
        return {
          text: response.data.candidates[0].content.parts[0].text,
          provider: 'gemini',
        };
      }
      
      throw new Error(`Provider ${this.selectedProvider} not supported`);
    } catch (error) {
      console.error('AI API error:', error);
      throw error;
    }
  }

  /**
   * Process an image with AI (image understanding or generation)
   * @param {string} type - 'understanding' or 'generation'
   * @param {Object} data - For understanding: {image, prompt}, for generation: {prompt}
   * @returns {Promise} - Response from the AI
   */
  async processImage(type, data) {
    if (!this.apiKeys[this.selectedProvider]) {
      throw new Error(`API key not set for ${this.selectedProvider}`);
    }

    try {
      // Image generation with OpenAI DALL-E
      if (type === 'generation' && this.selectedProvider === 'openai') {
        const response = await axios.post(
          `${API_ENDPOINTS.OPENAI}/images/generations`,
          {
            prompt: data.prompt,
            n: data.count || 1,
            size: data.size || '1024x1024',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKeys.openai}`
            }
          }
        );
        
        return {
          images: response.data.data.map(img => img.url),
          provider: 'openai',
        };
      }
      
      // Image understanding with OpenAI GPT-4 Vision
      else if (type === 'understanding' && this.selectedProvider === 'openai') {
        const response = await axios.post(
          `${API_ENDPOINTS.OPENAI}/chat/completions`,
          {
            model: 'gpt-4-vision-preview',
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: data.prompt || 'What's in this image?' },
                  {
                    type: 'image_url',
                    image_url: { url: data.image }
                  }
                ]
              }
            ],
            max_tokens: data.maxTokens || 500,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKeys.openai}`
            }
          }
        );
        
        return {
          description: response.data.choices[0].message.content,
          provider: 'openai',
        };
      }
      
      throw new Error(`Image ${type} not supported for provider ${this.selectedProvider}`);
    } catch (error) {
      console.error('AI API image processing error:', error);
      throw error;
    }
  }
}

export default new AIApiService();