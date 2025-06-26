import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Counselors() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Technology', 'Healthcare', 'Business', 'Education', 'Arts', 'Engineering'];

  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Technology',
      experience: '8 years',
      rating: 4.8,
      reviews: 127,
      availability: 'Available',
      avatar: '👩‍💼',
      description: 'Expert in software development careers and tech industry transitions.',
      languages: ['English', 'Spanish'],
      price: '$75/hour',
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Healthcare',
      experience: '12 years',
      rating: 4.9,
      reviews: 203,
      availability: 'Available',
      avatar: '👨‍⚕️',
      description: 'Specialized in medical careers, nursing, and healthcare administration.',
      languages: ['English', 'Mandarin'],
      price: '$85/hour',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Business',
      experience: '10 years',
      rating: 4.7,
      reviews: 156,
      availability: 'Available',
      avatar: '👩‍💼',
      description: 'Career strategist for business professionals and entrepreneurs.',
      languages: ['English', 'Portuguese'],
      price: '$90/hour',
    },
    {
      id: 4,
      name: 'James Wilson',
      specialty: 'Engineering',
      experience: '15 years',
      rating: 4.9,
      reviews: 189,
      availability: 'Available',
      avatar: '👨‍🔬',
      description: 'Mechanical and electrical engineering career guidance expert.',
      languages: ['English'],
      price: '$80/hour',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      specialty: 'Education',
      experience: '6 years',
      rating: 4.6,
      reviews: 94,
      availability: 'Available',
      avatar: '👩‍🏫',
      description: 'Educational leadership and teaching career development specialist.',
      languages: ['English', 'French'],
      price: '$70/hour',
    },
  ];

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         counselor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || counselor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderCounselorCard = ({ item }) => (
    <View style={styles.counselorCard}>
      <View style={styles.counselorHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.avatar}</Text>
        </View>
        <View style={styles.counselorInfo}>
          <Text style={styles.counselorName}>{item.name}</Text>
          <Text style={styles.counselorSpecialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} reviews)</Text>
          </View>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availabilityDot} />
          <Text style={styles.availability}>{item.availability}</Text>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.counselorDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#4a5568" />
          <Text style={styles.detailText}>{item.experience} experience</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="language-outline" size={16} color="#4a5568" />
          <Text style={styles.detailText}>{item.languages.join(', ')}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#4a5568" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => router.push(`/message-counselor/${item.id}`)}
        >
          <Ionicons name="chatbubble-outline" size={16} color="#667eea" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => router.push(`/schedule-meeting/${item.id}`)}
        >
          <Ionicons name="calendar-outline" size={16} color="#fff" />
          <Text style={styles.scheduleButtonText}>Schedule Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#667eea" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Counselors</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#a0aec0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search counselors..."
            placeholderTextColor="#a0aec0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Specialty Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[
                styles.filterChip,
                selectedSpecialty === specialty && styles.filterChipActive
              ]}
              onPress={() => setSelectedSpecialty(specialty)}
            >
              <Text style={[
                styles.filterChipText,
                selectedSpecialty === specialty && styles.filterChipTextActive
              ]}>
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Counselors List */}
      <FlatList
        data={filteredCounselors}
        renderItem={renderCounselorCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.counselorsList}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1a202c',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterChipText: {
    color: '#4a5568',
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  counselorsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  counselorCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  counselorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
  },
  counselorSpecialty: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 4,
  },
  availabilityContainer: {
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#48bb78',
    marginBottom: 4,
  },
  availability: {
    fontSize: 12,
    color: '#48bb78',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
    marginBottom: 16,
  },
  counselorDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#4a5568',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#667eea',
    gap: 6,
  },
  messageButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  scheduleButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 