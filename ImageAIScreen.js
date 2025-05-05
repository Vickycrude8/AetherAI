import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import aiApi from '../services/aiApi';

const ImageAIScreen = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [analyzedImage, setAnalyzedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt to generate an image');
      return;
    }

    setIsLoading(true);

    try {
      const response = await aiApi.processImage('generation', {
        prompt: prompt,
        count: 1,
        size: '1024x1024',
      });

      if (response && response.images && response.images.length > 0) {
        setGeneratedImage(response.images[0]);
      } else {
        throw new Error('No image was generated');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      Alert.alert('Error', 'Failed to generate image. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = () => {
    // In a real app, this would use react-native-image-picker or similar
    // For this demo, we'll just show an alert
    Alert.alert(
      'Select Image Source',
      'Where would you like to get the image from?',
      [
        {
          text: 'Camera',
          onPress: () => console.log('Camera selected'),
        },
        {
          text: 'Gallery',
          onPress: () => console.log('Gallery selected'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleAnalyzeImage = async () => {
    // In a real app, we would have a selected image to analyze
    // For this demo, we'll just show an alert that this feature requires an actual image
    Alert.alert(
      'Feature Demo',
      'In a real app, this would analyze your selected image using AI vision capabilities. You would need to implement image picker functionality and pass the image to the API.',
      [{ text: 'OK' }]
    );
  };

  const renderGenerateTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.inputLabel}>Enter a prompt to generate an image</Text>
        <TextInput
          style={styles.promptInput}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Describe the image you want to create..."
          multiline
        />
        
        <TouchableOpacity
          style={[styles.generateButton, !prompt.trim() && styles.disabledButton]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || isLoading}
        >
          <Text style={styles.generateButtonText}>Generate Image</Text>
        </TouchableOpacity>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4F8EF7" />
            <Text style={styles.loadingText}>Generating your image...</Text>
          </View>
        ) : generatedImage ? (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: generatedImage }}
              style={styles.generatedImage}
              resizeMode="contain"
            />
            <View style={styles.imageActions}>
              <TouchableOpacity style={styles.imageActionButton}>
                <Ionicons name="download" size={20} color="#4F8EF7" />
                <Text style={styles.imageActionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageActionButton}>
                <Ionicons name="share" size={20} color="#4F8EF7" />
                <Text style={styles.imageActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="image-outline" size={60} color="#ccc" />
            <Text style={styles.placeholderText}>
              Your generated image will appear here
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderAnalyzeTab = () => {
    return (
      <View style={styles.tabContent}>
        <TouchableOpacity
          style={styles.selectImageButton}
          onPress={handleSelectImage}
        >
          <Ionicons name="image-outline" size={24} color="#fff" />
          <Text style={styles.selectImageButtonText}>Select an Image</Text>
        </TouchableOpacity>
        
        {analyzedImage ? (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: analyzedImage }}
              style={styles.analyzedImage}
              resizeMode="contain"
            />
            <TextInput
              style={styles.promptInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Ask something about this image..."
              multiline
            />
            <TouchableOpacity
              style={[styles.generateButton, !prompt.trim() && styles.disabledButton]}
              onPress={handleAnalyzeImage}
              disabled={!prompt.trim() || isLoading}
            >
              <Text style={styles.generateButtonText}>Analyze Image</Text>
            </TouchableOpacity>
            {analysisResult ? (
              <View style={styles.analysisContainer}>
                <Text style={styles.analysisText}>{analysisResult}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={60} color="#ccc" />
            <Text style={styles.placeholderText}>
              Select an image to analyze with AI
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'generate' && styles.activeTab]}
          onPress={() => setActiveTab('generate')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'generate' && styles.activeTabText,
            ]}
          >
            Generate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'analyze' && styles.activeTab]}
          onPress={() => setActiveTab('analyze')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'analyze' && styles.activeTabText,
            ]}
          >
            Analyze
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'generate' ? renderGenerateTab() : renderAnalyzeTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F8EF7',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#4F8EF7',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  promptInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    marginTop: 20,
  },
  generatedImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  analyzedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  imageActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  imageActionText: {
    color: '#4F8EF7',
    marginLeft: 5,
  },
  placeholderContainer: {
    marginTop: 50,
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  selectImageButton: {
    backgroundColor: '#4F8EF7',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectImageButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 10,
  },
  analysisContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  analysisText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ImageAIScreen;