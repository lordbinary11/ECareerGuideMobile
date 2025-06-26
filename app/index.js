import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const features = [
    {
      icon: 'people-outline',
      title: 'Career Counselors',
      description: 'Connect with experienced professionals',
      color: '#667eea',
    },
    {
      icon: 'chatbubble-ellipses-outline',
      title: 'AI Career Chat',
      description: 'Get instant career advice from AI',
      color: '#48bb78',
    },
    {
      icon: 'document-text-outline',
      title: 'Resume Builder',
      description: 'Create professional resumes',
      color: '#ed8936',
    },
    {
      icon: 'trending-up-outline',
      title: 'Learning Journey',
      description: 'Track your career progress',
      color: '#9f7aea',
    },
    {
      icon: 'star-outline',
      title: 'Top Careers',
      description: 'Explore career options',
      color: '#f56565',
    },
    {
      icon: 'school-outline',
      title: 'Elite Institutions',
      description: 'Discover top universities',
      color: '#38b2ac',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={40} color="#667eea" />
          </View>
          <Text style={styles.title}>ECareerGuide</Text>
          <Text style={styles.subtitle}>
            Your comprehensive career guidance platform
          </Text>
        </View>

        {/* Welcome Message */}
        {isAuthenticated && (
          <Card style={styles.welcomeCard}>
            <Card.Content>
              <Title style={styles.welcomeTitle}>
                Welcome back, {user?.full_name || user?.name || 'User'}!
              </Title>
              <Text style={styles.welcomeText}>
                Continue your career journey with personalized guidance.
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => {
                  if (isAuthenticated) {
                    router.push('/dashboard');
                  } else {
                    router.push('/login');
                  }
                }}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Ionicons name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaContainer}>
          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={styles.ctaButton}
            contentStyle={styles.ctaButtonContent}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
          
          {!isAuthenticated && (
            <View style={styles.authButtons}>
              <Button
                mode="outlined"
                onPress={() => router.push('/login')}
                style={styles.authButton}
              >
                Sign In
              </Button>
              <Button
                mode="outlined"
                onPress={() => router.push('/signup')}
                style={styles.authButton}
              >
                Sign Up
              </Button>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Empowering students and professionals with career guidance
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
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f7fafc',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  welcomeCard: {
    margin: 20,
    backgroundColor: '#667eea',
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  welcomeText: {
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 8,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    marginBottom: 16,
  },
  ctaButtonContent: {
    paddingVertical: 12,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  authButton: {
    flex: 1,
    borderColor: '#667eea',
    borderWidth: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 