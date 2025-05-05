import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import aiApi from '../services/aiApi';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    // In a real app, these would be loaded from AsyncStorage or a similar persistence mechanism
    // For now, we'll use hardcoded values for demonstration
    
    // Also set the provider in the API service
    aiApi.setProvider(selectedProvider);
  }, []);

  // Update API provider when selection changes
  useEffect(() => {
    aiApi.setProvider(selectedProvider);
  }, [selectedProvider]);

  const saveApiKey = (provider) => {
    const key = provider === 'openai' ? openaiApiKey : geminiApiKey;
    
    if (!key.trim()) {
      Alert.alert('Error', `Please enter a valid API key for ${provider === 'openai' ? 'OpenAI' : 'Google Gemini'}`);
      return;
    }
    
    const success = aiApi.setApiKey(provider, key);
    
    if (success) {
      Alert.alert('Success', `API key for ${provider === 'openai' ? 'OpenAI' : 'Google Gemini'} has been saved.`);
    } else {
      Alert.alert('Error', 'Failed to save API key. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // In a real app, we would clear the auth token and navigate to login
          console.log('User logged out');
        }}
      ]
    );
  };

  const navigateToSubscription = () => {
    navigation.navigate('Subscription');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity 
          style={styles.subscriptionButton} 
          onPress={navigateToSubscription}
        >
          <View style={styles.subscriptionContent}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.subscriptionText}>
              {isSubscribed ? 'Premium Account' : 'Upgrade to Premium'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Provider</Text>
        <View style={styles.providerContainer}>
          <TouchableOpacity
            style={[
              styles.providerOption,
              selectedProvider === 'openai' && styles.selectedProvider
            ]}
            onPress={() => setSelectedProvider('openai')}
          >
            <Text style={styles.providerText}>OpenAI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.providerOption,
              selectedProvider === 'gemini' && styles.selectedProvider
            ]}
            onPress={() => setSelectedProvider('gemini')}
          >
            <Text style={styles.providerText}>Google Gemini</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Keys</Text>
        <View style={styles.apiKeyContainer}>
          <Text style={styles.inputLabel}>OpenAI API Key</Text>
          <TextInput
            style={styles.input}
            value={openaiApiKey}
            onChangeText={setOpenaiApiKey}
            placeholder="Enter OpenAI API Key"
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveApiKey('openai')}
          >
            <Text style={styles.saveButtonText}>Save Key</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.apiKeyContainer}>
          <Text style={styles.inputLabel}>Google Gemini API Key</Text>
          <TextInput
            style={styles.input}
            value={geminiApiKey}
            onChangeText={setGeminiApiKey}
            placeholder="Enter Google Gemini API Key"
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveApiKey('gemini')}
          >
            <Text style={styles.saveButtonText}>Save Key</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ccc', true: '#4F8EF7' }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Save Chat History</Text>
          <Switch
            value={saveHistory}
            onValueChange={setSaveHistory}
            trackColor={{ false: '#ccc', true: '#4F8EF7' }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : saveHistory ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>AetherAI v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  providerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  providerOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedProvider: {
    backgroundColor: '#4F8EF7',
    borderColor: '#4F8EF7',
  },
  providerText: {
    fontWeight: '500',
  },
  apiKeyContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  logoutContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  versionText: {
    color: '#999',
    fontSize: 14,
  },
  subscriptionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subscriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;