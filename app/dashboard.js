import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const router = useRouter();
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
  });

  const quickActions = [
    {
      icon: 'people-outline',
      title: 'Find Counselors',
      description: 'Connect with career experts',
      route: '/counselors',
      color: '#667eea',
    },
    {
      icon: 'chatbubble-outline',
      title: 'AI Chat',
      description: 'Get instant career advice',
      route: '/ai-chat',
      color: '#48bb78',
    },
    {
      icon: 'document-text-outline',
      title: 'Resume Builder',
      description: 'Create professional resumes',
      route: '/resume-builder',
      color: '#ed8936',
    },
    {
      icon: 'trending-up-outline',
      title: 'Learning Journey',
      description: 'Track your progress',
      route: '/learning-journey',
      color: '#9f7aea',
    },
    {
      icon: 'star-outline',
      title: 'Top Careers',
      description: 'Explore career options',
      route: '/top-careers',
      color: '#f56565',
    },
    {
      icon: 'school-outline',
      title: 'Elite Institutions',
      description: 'Discover top universities',
      route: '/elite-institutions',
      color: '#38b2ac',
    },
  ];

  const recentActivities = [
    {
      type: 'meeting',
      title: 'Meeting with Sarah Johnson',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      type: 'message',
      title: 'New message from Career Advisor',
      time: '1 day ago',
      status: 'unread',
    },
    {
      type: 'resume',
      title: 'Resume updated',
      time: '2 days ago',
      status: 'completed',
    },
  ];

  const handleLogout = () => {
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
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'meeting':
        return 'videocam-outline';
      case 'message':
        return 'mail-outline';
      case 'resume':
        return 'document-text-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <Ionicons name="person-circle-outline" size={32} color="#667eea" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="#e53e3e" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={24} color="#667eea" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Counselors</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar-outline" size={24} color="#48bb78" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Meetings</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={24} color="#ed8936" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => router.push(action.route)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons 
                    name={getActivityIcon(activity.type)} 
                    size={20} 
                    color="#667eea" 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                {activity.status === 'unread' && (
                  <View style={styles.unreadDot} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="home" size={24} color="#667eea" />
          <Text style={[styles.tabText, styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/counselors')}
        >
          <Ionicons name="people" size={24} color="#a0aec0" />
          <Text style={styles.tabText}>Counselors</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/ai-chat')}
        >
          <Ionicons name="chatbubble" size={24} color="#a0aec0" />
          <Text style={styles.tabText}>AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person" size={24} color="#a0aec0" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#4a5568',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#4a5568',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  seeAllText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#4a5568',
    lineHeight: 16,
  },
  activitiesList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#4a5568',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Active tab styling is handled by icon and text colors
  },
  tabText: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 4,
  },
  activeTabText: {
    color: '#667eea',
    fontWeight: '500',
  },
}); 