import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const subscriptionPlans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$4.99',
      pricePerMonth: '$4.99/mo',
      features: [
        '500 AI messages per month',
        '100 image generations',
        'Advanced AI models',
        'No watermarks on images',
      ],
      popular: false,
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$49.99',
      pricePerMonth: '$4.17/mo',
      savings: 'Save 16%',
      features: [
        'Unlimited AI messages',
        '300 image generations per month',
        'Premium AI models access',
        'Priority support',
        'No watermarks on images',
      ],
      popular: true,
    },
  ];

  const handleSubscribe = () => {
    // In a real app, this would initiate a payment flow
    Alert.alert(
      'Demo Mode',
      'In a real app, this would connect to the iOS App Store or Google Play billing system to process the subscription payment.',
      [{ text: 'OK' }]
    );
  };

  const handleRestorePurchases = () => {
    Alert.alert(
      'Demo Mode',
      'In a real app, this would restore previous purchases from the app stores.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Premium Plans</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Text style={styles.subtitle}>
            Unlock all features and enjoy the full AI experience
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlan,
                plan.popular && styles.popularPlan,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPricePerMonth}>{plan.pricePerMonth}</Text>
                {plan.savings && (
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                )}
              </View>
              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>
            Subscribe Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestorePurchases}
        >
          <Text style={styles.restoreButtonText}>
            Restore Purchases
          </Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By subscribing, you agree to our Terms of Service and Privacy Policy.
            Subscriptions will automatically renew unless canceled at least 24
            hours before the end of the current period. You can cancel anytime
            in your App Store or Google Play account settings.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  plansContainer: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedPlan: {
    borderColor: '#4F8EF7',
  },
  popularPlan: {
    borderColor: '#4F8EF7',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 20,
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  planPricePerMonth: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  savingsText: {
    fontSize: 14,
    color: '#4CD964',
    fontWeight: 'bold',
    marginTop: 5,
  },
  planFeatures: {
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  subscribeButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restoreButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  restoreButtonText: {
    color: '#4F8EF7',
    fontSize: 14,
  },
  termsContainer: {
    marginBottom: 30,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SubscriptionScreen;