import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking for authentication
  useEffect(() => {
    // In a real app, we would check for a valid auth token here
    const checkAuth = async () => {
      // Simulating an API call delay
      setTimeout(() => {
        // For demo purposes, we're setting this to false
        // In a real app, this would be based on whether a valid token exists
        setIsAuthenticated(false);
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>AetherAI</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator isAuthenticated={isAuthenticated} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F8EF7',
  },
});

export default App;