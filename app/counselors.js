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
import { Card, Title, Paragraph, Button, Avatar, Chip, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { theme } from '../theme';

export default function CounselorsScreen() {
  const [counselors, setCounselors] = useState([]);
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadCounselors();
  }, []);

  useEffect(() => {
    filterCounselors();
  }, [searchQuery, selectedSpecialization, counselors]);

  const loadCounselors = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCounselors();
      
      if (response.success) {
        setCounselors(response.counselors || []);
      } else {
        Alert.alert('Error', 'Failed to load counselors');
      }
    } catch (error) {
      console.error('Load counselors error:', error);
      Alert.alert('Error', 'Failed to load counselors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCounselors();
    setRefreshing(false);
  };

  const filterCounselors = () => {
    let filtered = counselors;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(counselor =>
        counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(counselor =>
        counselor.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
      );
    }

    setFilteredCounselors(filtered);
  };

  const getSpecializations = () => {
    const specializations = [...new Set(counselors.map(c => c.specialization))];
    return ['all', ...specializations];
  };

  const handleCounselorPress = (counselor) => {
    // Navigate to counselor detail page or start chat
    Alert.alert(
      'Counselor Options',
      `What would you like to do with ${counselor.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Message',
          onPress: () => router.push(`/chat/${counselor.id}`),
        },
        {
          text: 'Schedule Meeting',
          onPress: () => router.push(`/schedule/${counselor.id}`),
        },
        {
          text: 'View Profile',
          onPress: () => router.push(`/counselor/${counselor.id}`),
        },
      ]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
      );
    }

    return stars;
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please login to view counselors</Text>
        <Button mode="contained" onPress={() => router.push('/login')}>
          Go to Login
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Career Counselors</Text>
        <Text style={styles.headerSubtitle}>
          Connect with experienced professionals
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search counselors..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {getSpecializations().map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterChip,
                selectedSpecialization === spec && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecialization(spec)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpecialization === spec && styles.filterChipTextActive,
                ]}
              >
                {spec === 'all' ? 'All' : spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Counselors List */}
      <ScrollView
        style={styles.counselorsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading counselors...</Text>
          </View>
        ) : filteredCounselors.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>No counselors found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          filteredCounselors.map((counselor) => (
            <Card
              key={counselor.id}
              style={styles.counselorCard}
              onPress={() => handleCounselorPress(counselor)}
            >
              <Card.Content>
                <View style={styles.counselorHeader}>
                  <Avatar.Text
                    size={60}
                    label={counselor.name.charAt(0)}
                    style={styles.counselorAvatar}
                  />
                  <View style={styles.counselorInfo}>
                    <Title style={styles.counselorName}>{counselor.name}</Title>
                    <Chip
                      mode="outlined"
                      textStyle={styles.specializationChip}
                      style={styles.specializationChip}
                    >
                      {counselor.specialization}
                    </Chip>
                    <View style={styles.ratingContainer}>
                      <View style={styles.stars}>
                        {renderStars(counselor.rating || 0)}
                      </View>
                      <Text style={styles.ratingText}>
                        {counselor.rating ? `${counselor.rating.toFixed(1)}` : 'No rating'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.counselorDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="briefcase-outline" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>
                      {counselor.experience} years experience
                    </Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>
                      {counselor.availability}
                    </Text>
                  </View>

                  {counselor.phone && (
                    <View style={styles.detailItem}>
                      <Ionicons name="call-outline" size={16} color={theme.colors.onSurfaceVariant} />
                      <Text style={styles.detailText}>{counselor.phone}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.actionButtons}>
                  <Button
                    mode="outlined"
                    onPress={() => router.push(`/chat/${counselor.id}`)}
                    style={styles.actionButton}
                    icon="message"
                  >
                    Message
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => router.push(`/schedule/${counselor.id}`)}
                    style={styles.actionButton}
                    icon="calendar"
                  >
                    Schedule
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.onPrimary,
    opacity: 0.8,
  },
  searchContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  searchBar: {
    marginBottom: theme.spacing.md,
  },
  filterContainer: {
    marginBottom: theme.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: theme.colors.onPrimary,
  },
  counselorsList: {
    flex: 1,
    padding: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  counselorCard: {
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  counselorHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  counselorAvatar: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  specializationChip: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: theme.spacing.sm,
  },
  ratingText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  counselorDetails: {
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginLeft: theme.spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.error,
    margin: theme.spacing.xxl,
  },
}); 