# ECareerGuide Mobile App

A React Native Expo mobile application for ECareerGuide, providing career guidance, counselor connections, and AI-powered features.

## Features

- **Authentication**: Login/Register for both students and counselors
- **Dashboard**: Personalized dashboard with stats and quick actions
- **Counselors**: Browse and connect with career counselors
- **AI Chat**: Get instant career advice from AI
- **Messaging**: Real-time messaging with counselors
- **Meeting Scheduling**: Schedule virtual meetings with counselors
- **Profile Management**: Complete user profile management
- **Resume Builder**: Create and manage professional resumes
- **Learning Journey**: Track your career development progress

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: React Native Paper
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **Backend**: PHP with MySQL (separate repository)
- **Authentication**: JWT tokens

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- PHP server (for backend)

## Installation

### 1. Install Dependencies

If you're on Windows and encounter PowerShell execution policy issues, run:

```powershell
# Option 1: Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Option 2: Use Command Prompt instead of PowerShell
# Option 3: Use Git Bash
```

Then install dependencies:

```bash
npm install
```

### 2. Backend Setup

Make sure your PHP backend is running and accessible. The default API URL is:
```
http://localhost/ECareerGuide/backend/api
```

Update the API URL in `services/api.js` if your backend is hosted elsewhere.

### 3. Environment Configuration

Create a `.env` file in the root directory (optional):

```env
EXPO_PUBLIC_API_URL=http://localhost/ECareerGuide/backend/api
EXPO_PUBLIC_APP_NAME=ECareerGuide
```

## Running the App

### Development Mode

```bash
# Start the development server
npm start

# Or use Expo CLI
expo start
```

### Platform-Specific

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web
npm run web
```

### Using Expo Go App

1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## Project Structure

```
ECareerGuideMobile/
├── app/                    # Expo Router pages
│   ├── _layout.js         # Root layout with providers
│   ├── index.js           # Home page
│   ├── login.js           # Login page
│   ├── signup.js          # Registration page
│   ├── dashboard.js       # Dashboard page
│   ├── counselors.js      # Counselors listing
│   ├── ai-chat.js         # AI chat interface
│   └── profile.js         # User profile
├── contexts/              # React Context providers
│   └── AuthContext.js     # Authentication context
├── services/              # API and utility services
│   ├── api.js            # API service layer
│   └── storage.js        # Local storage service
├── theme.js              # App theme configuration
├── assets/               # Images, fonts, etc.
├── package.json          # Dependencies and scripts
└── app.json             # Expo configuration
```

## API Integration

The mobile app communicates with the PHP backend through the following endpoints:

### Authentication
- `POST /login.php` - User login
- `POST /register.php` - User registration

### User Management
- `GET /profile.php` - Get user profile
- `POST /profile.php` - Update user profile

### Counselors
- `GET /get_counselors.php` - Get all counselors
- `GET /get_counselor.php` - Get specific counselor

### Messaging
- `POST /send_message.php` - Send message
- `GET /get_messages.php` - Get messages
- `GET /get_unread_count.php` - Get unread count

### Meetings
- `POST /schedule_meeting.php` - Schedule meeting
- `GET /get_meeting_details.php` - Get meetings

### AI Features
- `POST /ask-ai.php` - Ask AI question
- `GET /ai_insights.php` - Get AI insights

## Key Components

### Authentication Context (`contexts/AuthContext.js`)

Manages user authentication state throughout the app:

```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

### API Service (`services/api.js`)

Handles all API communication with the backend:

```javascript
import apiService from '../services/api';

// Login
const result = await apiService.login(email, password, role);

// Get counselors
const counselors = await apiService.getCounselors();
```

### Storage Service (`services/storage.js`)

Manages local data persistence:

```javascript
import storageService from '../services/storage';

// Save auth token
await storageService.saveAuthToken(token);

// Get user data
const userData = await storageService.getUserData();
```

## Troubleshooting

### PowerShell Execution Policy Issues

If you encounter PowerShell execution policy errors:

1. **Run PowerShell as Administrator**
2. **Execute**: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. **Or use Command Prompt or Git Bash instead**

### Network Issues

If the app can't connect to the backend:

1. **Check if the backend server is running**
2. **Verify the API URL in `services/api.js`**
3. **Ensure your device/emulator can reach the backend URL**
4. **Check CORS settings in the backend**

### Build Issues

If you encounter build errors:

1. **Clear cache**: `expo start -c`
2. **Reset Metro**: `expo start --clear`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`

### Platform-Specific Issues

#### Android
- Ensure Android Studio is properly configured
- Check that ANDROID_HOME environment variable is set
- Verify that an Android emulator is running or device is connected

#### iOS (macOS only)
- Ensure Xcode is installed and updated
- Run `sudo xcode-select --install` if needed
- Make sure you have a valid Apple Developer account

## Development Workflow

1. **Start the backend server** (PHP/MySQL)
2. **Start the mobile app**: `npm start`
3. **Use Expo Go** or run on simulator/emulator
4. **Make changes** to the code
5. **Hot reload** will automatically update the app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the ECareerGuide platform.

## Support

For support and questions:
- Check the troubleshooting section above
- Review the backend documentation
- Contact the development team

## Backend Requirements

The mobile app requires the following backend endpoints to be implemented:

- User authentication (login/register)
- Counselor management
- Messaging system
- Meeting scheduling
- AI integration
- Profile management
- Resume management
- Learning journey tracking

Make sure all these endpoints are available and properly configured in your PHP backend before testing the mobile app. 