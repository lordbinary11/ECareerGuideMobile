// Storage Service for ECareerGuide Mobile App
// This file handles local data persistence using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Storage keys
  static KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    USER_ROLE: 'user_role',
    APP_SETTINGS: 'app_settings',
    NOTIFICATIONS_ENABLED: 'notifications_enabled',
    THEME: 'theme',
    LANGUAGE: 'language',
    LAST_SYNC: 'last_sync',
    CACHED_COUNSELORS: 'cached_counselors',
    CACHED_MESSAGES: 'cached_messages',
    CACHED_RESUME: 'cached_resume',
    CACHED_LEARNING_JOURNEY: 'cached_learning_journey',
  };

  // Generic storage methods
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Storage setItem error:', error);
      return false;
    }
  }

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage removeItem error:', error);
      return false;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  // Authentication methods
  async saveAuthToken(token) {
    return await this.setItem(StorageService.KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken() {
    return await this.getItem(StorageService.KEYS.AUTH_TOKEN);
  }

  async removeAuthToken() {
    return await this.removeItem(StorageService.KEYS.AUTH_TOKEN);
  }

  // User data methods
  async saveUserData(userData) {
    return await this.setItem(StorageService.KEYS.USER_DATA, userData);
  }

  async getUserData() {
    return await this.getItem(StorageService.KEYS.USER_DATA);
  }

  async removeUserData() {
    return await this.removeItem(StorageService.KEYS.USER_DATA);
  }

  // User role methods
  async saveUserRole(role) {
    return await this.setItem(StorageService.KEYS.USER_ROLE, role);
  }

  async getUserRole() {
    return await this.getItem(StorageService.KEYS.USER_ROLE);
  }

  async removeUserRole() {
    return await this.removeItem(StorageService.KEYS.USER_ROLE);
  }

  // App settings methods
  async saveAppSettings(settings) {
    return await this.setItem(StorageService.KEYS.APP_SETTINGS, settings);
  }

  async getAppSettings() {
    const settings = await this.getItem(StorageService.KEYS.APP_SETTINGS);
    return settings || {
      notificationsEnabled: true,
      emailNotifications: true,
      theme: 'light',
      language: 'en',
    };
  }

  async updateAppSetting(key, value) {
    const settings = await this.getAppSettings();
    settings[key] = value;
    return await this.saveAppSettings(settings);
  }

  // Notifications methods
  async saveNotificationsEnabled(enabled) {
    return await this.setItem(StorageService.KEYS.NOTIFICATIONS_ENABLED, enabled);
  }

  async getNotificationsEnabled() {
    const enabled = await this.getItem(StorageService.KEYS.NOTIFICATIONS_ENABLED);
    return enabled !== null ? enabled : true; // Default to true
  }

  // Theme methods
  async saveTheme(theme) {
    return await this.setItem(StorageService.KEYS.THEME, theme);
  }

  async getTheme() {
    const theme = await this.getItem(StorageService.KEYS.THEME);
    return theme || 'light'; // Default to light theme
  }

  // Language methods
  async saveLanguage(language) {
    return await this.setItem(StorageService.KEYS.LANGUAGE, language);
  }

  async getLanguage() {
    const language = await this.getItem(StorageService.KEYS.LANGUAGE);
    return language || 'en'; // Default to English
  }

  // Cache methods
  async saveCachedCounselors(counselors) {
    return await this.setItem(StorageService.KEYS.CACHED_COUNSELORS, {
      data: counselors,
      timestamp: Date.now(),
    });
  }

  async getCachedCounselors() {
    const cached = await this.getItem(StorageService.KEYS.CACHED_COUNSELORS);
    if (!cached) return null;

    // Check if cache is still valid (24 hours)
    const isExpired = Date.now() - cached.timestamp > 24 * 60 * 60 * 1000;
    return isExpired ? null : cached.data;
  }

  async saveCachedMessages(counselorId, messages) {
    const key = `${StorageService.KEYS.CACHED_MESSAGES}_${counselorId}`;
    return await this.setItem(key, {
      data: messages,
      timestamp: Date.now(),
    });
  }

  async getCachedMessages(counselorId) {
    const key = `${StorageService.KEYS.CACHED_MESSAGES}_${counselorId}`;
    const cached = await this.getItem(key);
    if (!cached) return null;

    // Check if cache is still valid (1 hour)
    const isExpired = Date.now() - cached.timestamp > 60 * 60 * 1000;
    return isExpired ? null : cached.data;
  }

  async saveCachedResume(resume) {
    return await this.setItem(StorageService.KEYS.CACHED_RESUME, {
      data: resume,
      timestamp: Date.now(),
    });
  }

  async getCachedResume() {
    const cached = await this.getItem(StorageService.KEYS.CACHED_RESUME);
    if (!cached) return null;

    // Check if cache is still valid (1 hour)
    const isExpired = Date.now() - cached.timestamp > 60 * 60 * 1000;
    return isExpired ? null : cached.data;
  }

  async saveCachedLearningJourney(journey) {
    return await this.setItem(StorageService.KEYS.CACHED_LEARNING_JOURNEY, {
      data: journey,
      timestamp: Date.now(),
    });
  }

  async getCachedLearningJourney() {
    const cached = await this.getItem(StorageService.KEYS.CACHED_LEARNING_JOURNEY);
    if (!cached) return null;

    // Check if cache is still valid (1 hour)
    const isExpired = Date.now() - cached.timestamp > 60 * 60 * 1000;
    return isExpired ? null : cached.data;
  }

  // Last sync methods
  async saveLastSync(timestamp = Date.now()) {
    return await this.setItem(StorageService.KEYS.LAST_SYNC, timestamp);
  }

  async getLastSync() {
    return await this.getItem(StorageService.KEYS.LAST_SYNC);
  }

  // Clear all cached data
  async clearCache() {
    const keys = [
      StorageService.KEYS.CACHED_COUNSELORS,
      StorageService.KEYS.CACHED_MESSAGES,
      StorageService.KEYS.CACHED_RESUME,
      StorageService.KEYS.CACHED_LEARNING_JOURNEY,
      StorageService.KEYS.LAST_SYNC,
    ];

    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Clear cache error:', error);
      return false;
    }
  }

  // Clear all user data (logout)
  async clearUserData() {
    const keys = [
      StorageService.KEYS.AUTH_TOKEN,
      StorageService.KEYS.USER_DATA,
      StorageService.KEYS.USER_ROLE,
    ];

    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Clear user data error:', error);
      return false;
    }
  }

  // Get all keys (for debugging)
  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Get all keys error:', error);
      return [];
    }
  }

  // Get storage info (for debugging)
  async getStorageInfo() {
    try {
      const keys = await this.getAllKeys();
      const info = {};

      for (const key of keys) {
        const value = await this.getItem(key);
        info[key] = {
          exists: value !== null,
          type: typeof value,
          size: value ? JSON.stringify(value).length : 0,
        };
      }

      return info;
    } catch (error) {
      console.error('Get storage info error:', error);
      return {};
    }
  }
}

// Create and export a singleton instance
const storageService = new StorageService();

export default storageService; 