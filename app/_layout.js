import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Add custom fonts here if needed
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'ECareerGuide',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="counselors"
        options={{
          title: 'Counselors',
        }}
      />
      <Stack.Screen
        name="ai-chat"
        options={{
          title: 'AI Chat',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="resume-builder"
        options={{
          title: 'Resume Builder',
        }}
      />
      <Stack.Screen
        name="learning-journey"
        options={{
          title: 'Learning Journey',
        }}
      />
      <Stack.Screen
        name="top-careers"
        options={{
          title: 'Top Careers',
        }}
      />
      <Stack.Screen
        name="elite-institutions"
        options={{
          title: 'Elite Institutions',
        }}
      />
      <Stack.Screen
        name="document-optimizer"
        options={{
          title: 'Document Optimizer',
        }}
      />
      <Stack.Screen
        name="counselor-inbox"
        options={{
          title: 'Counselor Inbox',
        }}
      />
    </Stack>
  );
} 