// API Service Layer for ECareerGuide Mobile App
// This file handles all communication with the PHP backend

import API_CONFIG, { getApiUrl, getEndpoint } from '../config/api';

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.token = null;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
  }

  // Get authentication token
  getToken() {
    return this.token;
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = getApiUrl(endpoint);
    
    const defaultHeaders = {
      ...API_CONFIG.HEADERS,
    };

    // Add authorization header if token exists
    if (this.token) {
      defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      method: 'GET',
      headers: defaultHeaders,
      ...options,
    };

    // Merge headers
    if (options.headers) {
      config.headers = { ...defaultHeaders, ...options.headers };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication Methods
  async login(email, password, loginAs = 'user') {
    try {
      const response = await this.request(getEndpoint('LOGIN'), {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          loginAs,
        }),
      });

      if (response.success && response.token) {
        this.setToken(response.token);
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await this.request(getEndpoint('REGISTER'), {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  // User Methods
  async getUserProfile() {
    try {
      const response = await this.request(getEndpoint('PROFILE'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(profileData) {
    try {
      const response = await this.request(getEndpoint('PROFILE'), {
        method: 'POST',
        body: JSON.stringify(profileData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Counselor Methods
  async getCounselors() {
    try {
      const response = await this.request(getEndpoint('GET_COUNSELORS'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCounselorById(counselorId) {
    try {
      const response = await this.request(`${getEndpoint('GET_COUNSELOR')}?id=${counselorId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Messaging Methods
  async sendMessage(counselorId, message) {
    try {
      const response = await this.request(getEndpoint('SEND_MESSAGE'), {
        method: 'POST',
        body: JSON.stringify({
          counselor_id: counselorId,
          message,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(counselorId) {
    try {
      const response = await this.request(`${getEndpoint('GET_MESSAGES')}?counselor_id=${counselorId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUnreadCount() {
    try {
      const response = await this.request(getEndpoint('GET_UNREAD_COUNT'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Meeting Methods
  async scheduleMeeting(meetingData) {
    try {
      const response = await this.request(getEndpoint('SCHEDULE_MEETING'), {
        method: 'POST',
        body: JSON.stringify(meetingData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMeetings() {
    try {
      const response = await this.request(getEndpoint('GET_MEETINGS'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // AI Chat Methods
  async askAI(question) {
    try {
      const response = await this.request(getEndpoint('ASK_AI'), {
        method: 'POST',
        body: JSON.stringify({
          question,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAIInsights() {
    try {
      const response = await this.request(getEndpoint('AI_INSIGHTS'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Resume Methods
  async saveResume(resumeData) {
    try {
      const response = await this.request(getEndpoint('RESUME'), {
        method: 'POST',
        body: JSON.stringify(resumeData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getResume() {
    try {
      const response = await this.request(getEndpoint('RESUME'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Learning Journey Methods
  async saveLearningJourney(journeyData) {
    try {
      const response = await this.request(getEndpoint('LEARNING_JOURNEY'), {
        method: 'POST',
        body: JSON.stringify(journeyData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLearningJourney() {
    try {
      const response = await this.request(getEndpoint('LEARNING_JOURNEY'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Skills and Interests Methods
  async saveSkills(skillsData) {
    try {
      const response = await this.request(getEndpoint('SKILLS'), {
        method: 'POST',
        body: JSON.stringify(skillsData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSkills() {
    try {
      const response = await this.request(getEndpoint('SKILLS'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async saveInterests(interestsData) {
    try {
      const response = await this.request(getEndpoint('INTERESTS'), {
        method: 'POST',
        body: JSON.stringify(interestsData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getInterests() {
    try {
      const response = await this.request(getEndpoint('INTERESTS'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Education and Experience Methods
  async saveEducation(educationData) {
    try {
      const response = await this.request(getEndpoint('EDUCATION'), {
        method: 'POST',
        body: JSON.stringify(educationData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getEducation() {
    try {
      const response = await this.request(getEndpoint('EDUCATION'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async saveExperience(experienceData) {
    try {
      const response = await this.request(getEndpoint('EXPERIENCE'), {
        method: 'POST',
        body: JSON.stringify(experienceData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getExperience() {
    try {
      const response = await this.request(getEndpoint('EXPERIENCE'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Document Optimizer Methods
  async optimizeDocument(documentData) {
    try {
      const response = await this.request(getEndpoint('OPTIMIZE_DOCUMENT'), {
        method: 'POST',
        body: JSON.stringify(documentData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Dashboard Methods
  async getDashboard() {
    try {
      const response = await this.request(getEndpoint('DASHBOARD'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Student Activity Methods
  async getStudentActivity() {
    try {
      const response = await this.request(getEndpoint('STUDENT_ACTIVITY'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Counselor Inbox Methods (for counselors)
  async getCounselorInbox() {
    try {
      const response = await this.request(getEndpoint('COUNSELOR_INBOX'));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async replyToMessage(replyData) {
    try {
      const response = await this.request(getEndpoint('SEND_REPLY'), {
        method: 'POST',
        body: JSON.stringify(replyData),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Virtual Meeting Methods
  async getMeetingToken(meetingId) {
    try {
      const response = await this.request(`${getEndpoint('GET_MEETING_TOKEN')}?meeting_id=${meetingId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async renewMeetingToken(meetingId) {
    try {
      const response = await this.request(getEndpoint('RENEW_MEETING_TOKEN'), {
        method: 'POST',
        body: JSON.stringify({ meeting_id: meetingId }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

export default apiService; 