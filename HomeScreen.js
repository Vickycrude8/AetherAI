import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  
  // Card width calculation for 2 cards per row with spacing
  const cardWidth = (width - 60) / 2;

  const features = [
    {
      id: 'chat',
      title: 'AI Chat',
      icon: 'chatbubble-ellipses',
      color: '#4F8EF7',
      screen: 'Chat',
    },
    {
      id: 'image',
      title: 'Image AI',
      icon: 'image',
      color: '#FF6B6B',
      screen: 'ImageAI',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      color: '#4CD964',
      screen: 'Settings',
    },
    {
      id: 'premium',
      title: 'Go Premium',
      icon: 'star',
      color: '#FFD700',
      screen: 'Subscription',
    },
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to</Text>
        <Text style={styles.appName}>AetherAI</Text>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.featureCard, { width: cardWidth }]}
              onPress={() => handleNavigation(feature.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.usageContainer}>
        <Text style={styles.sectionTitle}>Usage</Text>
        <View style={styles.usageCard}>
          <View style={styles.usageHeader}>
            <Text style={styles.usageTitle}>Free Plan</Text>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => handleNavigation('Subscription')}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usageMeter}>
            <View style={[styles.usageProgress, { width: '70%' }]} />
          </View>
          <Text style={styles.usageText}>70/100 messages used this month</Text>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Tips</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsScrollContent}
        >
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Get Started</Text>
            <Text style={styles.tipDescription}>
              Tap on the Chat feature to start talking with AetherAI
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>API Keys</Text>
            <Text style={styles.tipDescription}>
              Add your OpenAI or Google Gemini API key in Settings
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Image AI</Text>
            <Text style={styles.tipDescription}>
              Generate images or analyze photos with our Image AI feature
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  usageContainer: {
    padding: 20,
  },
  usageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  usageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  upgradeButton: {
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  usageMeter: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  usageProgress: {
    height: '100%',
    backgroundColor: '#4F8EF7',
    borderRadius: 4,
  },
  usageText: {
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  tipsScrollContent: {
    paddingRight: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    width: 250,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;