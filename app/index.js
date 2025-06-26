import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: 'bulb-outline',
      title: 'Expert Guidance',
      description: 'Connect with experienced career counselors tailored to your needs.',
    },
    {
      icon: 'trending-up-outline',
      title: 'Personalized Paths',
      description: 'Receive customized advice and resources for your unique career goals.',
    },
    {
      icon: 'rocket-outline',
      title: 'Achieve Your Dreams',
      description: 'Gain the confidence and tools to land your dream job and grow professionally.',
    },
  ];

  const quotes = [
    "The only way to do great work is to love what you do.",
    "Choose a job you love, and you will never have to work a day in your life.",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    "The future belongs to those who believe in the beauty of their dreams."
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>ECareerGuide</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Unlock Your <Text style={styles.highlightText}>Career Potential</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Personalized guidance to help you navigate your professional journey, find your passion, and achieve your career goals.
            </Text>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => router.push('/signup')}
            >
              <Ionicons name="rocket-outline" size={20} color="#fff" />
              <Text style={styles.getStartedButtonText}>Get Started Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageContainer}>
            <View style={styles.placeholderImage}>
              <Ionicons name="person-outline" size={80} color="#667eea" />
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why ECareerGuide?</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={30} color="#667eea" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quotes Section */}
        <View style={styles.quotesSection}>
          <Text style={styles.sectionTitle}>Inspiring Words</Text>
          {quotes.map((quote, index) => (
            <View key={index} style={styles.quoteCard}>
              <Text style={styles.quoteText}>"{quote}"</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} ECareerGuide. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  loginButtonText: {
    color: '#667eea',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  heroSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    marginRight: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 15,
    lineHeight: 36,
  },
  highlightText: {
    color: '#667eea',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 25,
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  getStartedButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  heroImageContainer: {
    width: 120,
    height: 120,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#f7fafc',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  quotesSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quoteText: {
    fontSize: 16,
    color: '#4a5568',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#718096',
  },
}); 