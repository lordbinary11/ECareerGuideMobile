import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#667eea',
    primaryContainer: '#e8eaff',
    secondary: '#764ba2',
    secondaryContainer: '#f3e8ff',
    tertiary: '#f093fb',
    tertiaryContainer: '#ffe8ff',
    surface: '#ffffff',
    surfaceVariant: '#f8f9fa',
    background: '#ffffff',
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#1a1b4b',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#2a1b4b',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#2a1b4b',
    onSurface: '#1c1b1f',
    onSurfaceVariant: '#49454f',
    onBackground: '#1c1b1f',
    onError: '#ffffff',
    onErrorContainer: '#410002',
    outline: '#79747e',
    outlineVariant: '#cac4d0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#313033',
    inverseOnSurface: '#f4eff4',
    inversePrimary: '#c7d0ff',
    elevation: {
      level0: 'transparent',
      level1: '#fdfcff',
      level2: '#faf8ff',
      level3: '#f6f4ff',
      level4: '#f3f0ff',
      level5: '#f0ecff',
    },
  },
  // Custom colors for the app
  custom: {
    gradient: ['#667eea', '#764ba2'],
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',
    lightGray: '#f5f5f5',
    darkGray: '#333333',
    textPrimary: '#1c1b1f',
    textSecondary: '#49454f',
    textLight: '#79747e',
    border: '#e0e0e0',
    card: '#ffffff',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  // Typography
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 10,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8.65,
      elevation: 15,
    },
  },
}; 