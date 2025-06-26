import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextInput as PaperTextInput, Button, Card, Title, Checkbox } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme';

export default function SignupScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // 'user' or 'counselor'
    // Counselor-specific fields
    phone: '',
    specialization: '',
    experience: '',
    availability: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    // Validation
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    // Counselor-specific validation
    if (formData.role === 'counselor') {
      if (!formData.phone.trim() || !formData.specialization.trim() || 
          !formData.experience.trim() || !formData.availability.trim()) {
        Alert.alert('Error', 'Please fill in all counselor fields');
        return;
      }
    }

    setLoading(true);
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === 'user') {
        userData.full_name = formData.full_name;
      } else {
        userData.name = formData.full_name;
        userData.phone = formData.phone;
        userData.specialization = formData.specialization;
        userData.experience = parseInt(formData.experience);
        userData.availability = formData.availability;
      }

      const result = await register(userData);
      
      if (result.success) {
        Alert.alert('Success', result.message, [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#667eea" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Logo and Welcome Text */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="person-add-outline" size={60} color="#667eea" />
            </View>
            <Text style={styles.welcomeText}>Join ECareerGuide and start your career journey</Text>
          </View>

          {/* Signup Form */}
          <View style={styles.formContainer}>
            {/* Role Selection */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'user' && styles.roleButtonActive,
                ]}
                onPress={() => updateFormData('role', 'user')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === 'user' && styles.roleButtonTextActive,
                  ]}
                >
                  Student
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'counselor' && styles.roleButtonActive,
                ]}
                onPress={() => updateFormData('role', 'counselor')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === 'counselor' && styles.roleButtonTextActive,
                  ]}
                >
                  Counselor
                </Text>
              </TouchableOpacity>
            </View>

            <PaperTextInput
              label={formData.role === 'user' ? 'Full Name' : 'Name'}
              value={formData.full_name}
              onChangeText={(value) => updateFormData('full_name', value)}
              mode="outlined"
              style={styles.input}
              left={<PaperTextInput.Icon icon="account" />}
            />

            <PaperTextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              left={<PaperTextInput.Icon icon="email" />}
            />

            <PaperTextInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              left={<PaperTextInput.Icon icon="lock" />}
              right={
                <PaperTextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <PaperTextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              left={<PaperTextInput.Icon icon="lock-check" />}
              right={
                <PaperTextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            {/* Counselor-specific fields */}
            {formData.role === 'counselor' && (
              <>
                <PaperTextInput
                  label="Phone Number"
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="phone-pad"
                  left={<PaperTextInput.Icon icon="phone" />}
                />

                <PaperTextInput
                  label="Specialization"
                  value={formData.specialization}
                  onChangeText={(value) => updateFormData('specialization', value)}
                  mode="outlined"
                  style={styles.input}
                  left={<PaperTextInput.Icon icon="briefcase" />}
                />

                <PaperTextInput
                  label="Years of Experience"
                  value={formData.experience}
                  onChangeText={(value) => updateFormData('experience', value)}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  left={<PaperTextInput.Icon icon="calendar" />}
                />

                <PaperTextInput
                  label="Availability"
                  value={formData.availability}
                  onChangeText={(value) => updateFormData('availability', value)}
                  mode="outlined"
                  style={styles.input}
                  left={<PaperTextInput.Icon icon="clock" />}
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                />
              </>
            )}

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Checkbox
                status={acceptedTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              />
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.linkText}>Terms and Conditions</Text>
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSignup}
              style={styles.signupButton}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              mode="outlined"
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loading}
            >
              Already have an account? Sign In
            </Button>
          </View>

          {/* Login Link */}
          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
  },
  placeholder: {
    width: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f7fafc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  halfWidth: {
    flex: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a202c',
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  roleContainer: {
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  roleButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#667eea',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#a0aec0',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  googleButtonText: {
    color: '#1a202c',
    fontSize: 16,
    fontWeight: '500',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  loginText: {
    color: '#4a5568',
    fontSize: 14,
  },
  loginLink: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
}); 