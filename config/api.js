// API Configuration for ECareerGuide Mobile App

// Environment configuration
const ENV = {
  development: {
    API_BASE_URL: 'http://localhost/ECareerGuide/backend/api',
    API_TIMEOUT: 10000, // 10 seconds
  },
  production: {
    API_BASE_URL: 'https://your-production-domain.com/api',
    API_TIMEOUT: 15000, // 15 seconds
  },
};

// Get current environment (default to development)
const getEnvironment = () => {
  // You can set this via environment variable or build configuration
  return process.env.NODE_ENV || 'development';
};

// Export configuration
export const API_CONFIG = {
  BASE_URL: ENV[getEnvironment()].API_BASE_URL,
  TIMEOUT: ENV[getEnvironment()].API_TIMEOUT,
  ENDPOINTS: {
    // Authentication
    LOGIN: 'login.php',
    REGISTER: 'register.php',
    
    // User Management
    PROFILE: 'profile.php',
    
    // Counselors
    GET_COUNSELORS: 'get_counselors.php',
    GET_COUNSELOR: 'get_counselor.php',
    
    // Messaging
    SEND_MESSAGE: 'send_message.php',
    GET_MESSAGES: 'get_messages.php',
    GET_UNREAD_COUNT: 'get_unread_count.php',
    
    // Meetings
    SCHEDULE_MEETING: 'schedule_meeting.php',
    GET_MEETINGS: 'get_meeting_details.php',
    
    // AI Features
    ASK_AI: 'ask-ai.php',
    AI_INSIGHTS: 'ai_insights.php',
    
    // Resume
    RESUME: 'resume.php',
    
    // Learning Journey
    LEARNING_JOURNEY: 'learning_journey.php',
    
    // Skills and Interests
    SKILLS: 'skills.php',
    INTERESTS: 'interests.php',
    
    // Education and Experience
    EDUCATION: 'education.php',
    EXPERIENCE: 'experience.php',
    
    // Document Optimizer
    OPTIMIZE_DOCUMENT: 'optimize_document.php',
    
    // Dashboard
    DASHBOARD: 'dashboard.php',
    
    // Student Activity
    STUDENT_ACTIVITY: 'student_activity.php',
    
    // Counselor Inbox
    COUNSELOR_INBOX: 'counselor_inbox.php',
    SEND_REPLY: 'send_reply.php',
    
    // Virtual Meeting
    GET_MEETING_TOKEN: 'get_meeting_token.php',
    RENEW_MEETING_TOKEN: 'renew_meeting_token.php',
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper function to get full URL for an endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};

// Helper function to get endpoint by name
export const getEndpoint = (name) => {
  return API_CONFIG.ENDPOINTS[name];
};

// Helper function to get full URL by endpoint name
export const getFullUrl = (endpointName) => {
  const endpoint = getEndpoint(endpointName);
  return endpoint ? getApiUrl(endpoint) : null;
};

export default API_CONFIG; 