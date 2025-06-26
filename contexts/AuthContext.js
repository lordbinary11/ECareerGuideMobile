// Authentication Context for ECareerGuide Mobile App
// This file manages authentication state and provides auth methods to the entire app

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import storageService from '../services/storage';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication from storage
  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Get stored token and user data
      const storedToken = await storageService.getAuthToken();
      const storedUser = await storageService.getUserData();
      const storedRole = await storageService.getUserRole();

      if (storedToken && storedUser) {
        // Set token in API service
        apiService.setToken(storedToken);
        
        // Set state
        setToken(storedToken);
        setUser(storedUser);
        setRole(storedRole);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear any corrupted data
      await logout();
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password, loginAs = 'user') => {
    try {
      setLoading(true);
      
      // Call API to login
      const response = await apiService.login(email, password, loginAs);
      
      if (response.success && response.token) {
        // Save to storage
        await storageService.saveAuthToken(response.token);
        await storageService.saveUserData(response.user || response.counselor);
        await storageService.saveUserRole(response.role);
        
        // Set state
        setToken(response.token);
        setUser(response.user || response.counselor);
        setRole(response.role);
        setIsAuthenticated(true);
        
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Call API to register
      const response = await apiService.register(userData);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // Clear API token
      apiService.clearToken();
      
      // Clear storage
      await storageService.clearUserData();
      
      // Clear state
      setToken(null);
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        message: 'Logout failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      const response = await apiService.updateUserProfile(profileData);
      
      if (response.success) {
        // Update stored user data
        const updatedUser = { ...user, ...response.user };
        await storageService.saveUserData(updatedUser);
        setUser(updatedUser);
        
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        message: error.message || 'Profile update failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    try {
      if (!isAuthenticated) return;
      
      const response = await apiService.getUserProfile();
      
      if (response.success) {
        const updatedUser = response.user || response.counselor;
        await storageService.saveUserData(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Refresh user data error:', error);
    }
  };

  // Check if token is valid
  const checkTokenValidity = async () => {
    try {
      if (!token) return false;
      
      // Try to get user profile to check if token is still valid
      const response = await apiService.getUserProfile();
      return response.success;
    } catch (error) {
      console.error('Token validation error:', error);
      // Token is invalid, logout user
      await logout();
      return false;
    }
  };

  // Get user role
  const getUserRole = () => {
    return role;
  };

  // Check if user is a counselor
  const isCounselor = () => {
    return role === 'counselor';
  };

  // Check if user is a student
  const isStudent = () => {
    return role === 'user';
  };

  // Context value
  const value = {
    // State
    user,
    token,
    role,
    loading,
    isAuthenticated,
    
    // Methods
    login,
    register,
    logout,
    updateProfile,
    refreshUserData,
    checkTokenValidity,
    getUserRole,
    isCounselor,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 