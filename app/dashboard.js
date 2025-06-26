import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { theme } from '../theme';

export default function DashboardScreen() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const router = useRouter();
  const { user, isAuthenticated, logout, isStudent, isCounselor } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard data
      const dashboardResponse = await apiService.getDashboard();
      if (dashboardResponse.success) {
        setDashboardData(dashboardResponse.data);
      }

      // Load unread message count
      const unreadResponse = await apiService.getUnreadCount();
      if (unreadResponse.success) {
        setUnreadCount(unreadResponse.count || 0);
      }
    } catch (error) {
      console.error('Dashboard loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              router.replace('/');
            }
          },
        },
      ]
    );
  };

  const navigateTo = (screen) => {
    router.push(screen);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please login to access the dashboard</Text>
        <Button mode="contained" onPress={() => router.push('/login')}>
          Go to Login
        </Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar.Text
            size={50}
            label={user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userName}>
              {user?.full_name || user?.name || 'User'}
            </Text>
            <Chip
              mode="outlined"
              textStyle={styles.roleChip}
              style={styles.roleChip}
            >
              {isStudent() ? 'Student' : 'Counselor'}
            </Chip>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statContent}>
              <Ionicons name="people-outline" size={24} color={theme.colors.primary} />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>
                  {dashboardData?.counselors_count || 0}
                </Text>
                <Text style={styles.statLabel}>Counselors</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statContent}>
              <Ionicons name="chatbubbles-outline" size={24} color={theme.colors.secondary} />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>
                  {dashboardData?.messages_count || 0}
                </Text>
                <Text style={styles.statLabel}>Messages</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statContent}>
              <Ionicons name="calendar-outline" size={24} color={theme.colors.tertiary} />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>
                  {dashboardData?.meetings_count || 0}
                </Text>
                <Text style={styles.statLabel}>Meetings</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigateTo('/counselors')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="people" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.actionText}>Find Counselors</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigateTo('/ai-chat')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="chatbubble-ellipses" size={24} color={theme.colors.secondary} />
              </View>
              <Text style={styles.actionText}>AI Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigateTo('/profile')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="person" size={24} color={theme.colors.tertiary} />
              </View>
              <Text style={styles.actionText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigateTo('/resume')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="document-text" size={24} color={theme.colors.info} />
              </View>
              <Text style={styles.actionText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      {dashboardData?.recent_activity && (
        <Card style={styles.activityCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Recent Activity</Title>
            {dashboardData.recent_activity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons
                    name={activity.icon || 'notifications'}
                    size={16}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Notifications */}
      {unreadCount > 0 && (
        <Card style={styles.notificationCard}>
          <Card.Content>
            <View style={styles.notificationHeader}>
              <Title style={styles.sectionTitle}>Notifications</Title>
              <Chip mode="outlined" textStyle={styles.notificationBadge}>
                {unreadCount} new
              </Chip>
            </View>
            <Button
              mode="contained"
              onPress={() => navigateTo('/messages')}
              style={styles.viewAllButton}
            >
              View All Messages
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Counselor-specific features */}
      {isCounselor() && (
        <Card style={styles.counselorCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Counselor Tools</Title>
            <View style={styles.counselorActions}>
              <Button
                mode="outlined"
                onPress={() => navigateTo('/inbox')}
                style={styles.counselorButton}
              >
                View Inbox
              </Button>
              <Button
                mode="outlined"
                onPress={() => navigateTo('/schedule')}
                style={styles.counselorButton}
              >
                Manage Schedule
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    backgroundColor: theme.colors.onPrimary,
    marginRight: theme.spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  welcomeText: {
    color: theme.colors.onPrimary,
    fontSize: 14,
    opacity: 0.8,
  },
  userName: {
    color: theme.colors.onPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  roleChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    ...theme.shadows.small,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: theme.spacing.sm,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  actionsCard: {
    margin: theme.spacing.md,
    ...theme.shadows.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.onSurface,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  actionButton: {
    width: '45%',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
  },
  actionIcon: {
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  activityCard: {
    margin: theme.spacing.md,
    ...theme.shadows.medium,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  notificationCard: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.errorContainer,
    ...theme.shadows.medium,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  notificationBadge: {
    backgroundColor: theme.colors.error,
    color: theme.colors.onError,
  },
  viewAllButton: {
    marginTop: theme.spacing.sm,
  },
  counselorCard: {
    margin: theme.spacing.md,
    ...theme.shadows.medium,
  },
  counselorActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  counselorButton: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.error,
    margin: theme.spacing.xxl,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    margin: theme.spacing.xxl,
  },
}); 