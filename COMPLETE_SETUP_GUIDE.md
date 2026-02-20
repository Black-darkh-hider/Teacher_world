# TeacherWorld - Complete Setup & Execution Guide

## Project Overview
TeacherWorld is a full-stack job portal platform connecting teachers with educational institutions. It features:
- Separate authentication for Teachers and Institutions
- OTP-based email verification (Nodemailer)
- Job posting and applications
- Location-based job search (Google Maps)
- Comprehensive teacher profiles with resume and certificate uploads
- Zoom live sessions for interviews
- Real-time application tracking

---

## Technology Stack

**Frontend:**
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Google Maps JavaScript API
- CSS for styling

**Backend:**
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Nodemailer for email/OTP
- Multer for file uploads
- Passport.js for OAuth (Google, LinkedIn)

---

## Prerequisites

Before starting, ensure you have installed:
1. **Node.js** (v16+) - [Download](https://nodejs.org)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
3. **Git** - [Download](https://git-scm.com)

---

## Step 1: Backend Setup

### 1.1 Navigate to Backend Directory
\`\`\`bash
cd backend
\`\`\`

### 1.2 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 1.3 Configure Environment Variables

Create a `.env` file in the `backend` directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/teacher-portal
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teacher-portal

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this
JWT_REFRESH_SECRET=your_refresh_secret_key_here_change_this
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SENDER_EMAIL=your_email@gmail.com

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Zoom API (Optional)
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_secret

# Google Maps API (Optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
\`\`\`

### 1.4 Important: Gmail Setup for Nodemailer

To use Gmail for OTP emails:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the 16-character App Password as `SMTP_PASS` in .env

### 1.5 Start MongoDB (if local)

**Windows:**
\`\`\`bash
mongod
\`\`\`

**macOS/Linux:**
\`\`\`bash
brew services start mongodb-community
# or
mongod
\`\`\`

**Using MongoDB Atlas (Cloud):**
Just update `MONGODB_URI` in .env with your connection string from MongoDB Atlas dashboard.

### 1.6 Seed Database (Optional)
\`\`\`bash
node seeds/seed.js
\`\`\`
This creates sample admin, institutions, and job data for testing.

### 1.7 Start Backend Server
\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
MongoDB connected
Server running on port 5000
\`\`\`

Backend API is now running at: `http://localhost:5000/api`

---

## Step 2: Frontend Setup

### 2.1 Navigate to Frontend Directory (in a new terminal)
\`\`\`bash
cd frontend
\`\`\`

### 2.2 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2.3 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
\`\`\`

### 2.4 Start Frontend Development Server
\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
  Local:        http://localhost:5173/
\`\`\`

Frontend is now running at: `http://localhost:5173`

---

## Step 3: Google Maps Setup (For Nearby Jobs Feature)

### 3.1 Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Maps JavaScript API", "Geocoding API", and "Places API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key and add to `frontend/.env` as `VITE_GOOGLE_MAPS_API_KEY`

### 3.2 Verify in Frontend
The nearby jobs tab will display an interactive map with job location markers. Click markers to see job details.

---

## Step 4: Testing the Application

### Test Workflow:

**1. Register as Teacher:**
- Go to `http://localhost:5173/register-teacher`
- Fill in details (name, email, password)
- Click "Continue"
- Check Gmail for OTP (or check console/backend logs in dev mode)
- Enter OTP and verify
- Complete profile modal will appear automatically

**2. Complete Teacher Profile:**
- Fill in personal info, location, skills, education, and experience
- Upload resume and marks card
- Click "Save Profile"
- Profile completion modal will close

**3. View Dashboard:**
- View "Applications" tab (initially empty)
- View "Nearby Jobs" tab to see location-based recommendations with Google Maps
- Update profile anytime from "Profile" tab

**4. Register as Institution:**
- Go to `http://localhost:5173/register-institution`
- Fill in institution details
- Verify email with OTP

**5. Login & Browse Jobs:**
- After verification, login with email/password
- Teacher dashboard shows applications
- Browse available jobs
- Apply for jobs

**6. Post Jobs (Institution):**
- Login as institution
- Click "Post New Job"
- Fill in job details and submit
- Job appears in teacher's job search

**7. Track Applications:**
- Teachers see applications in dashboard
- Institutions see applicants and can update statuses

---

## API Endpoints

### Authentication
\`\`\`
POST   /api/auth/register-teacher        - Register teacher
POST   /api/auth/register-institution    - Register institution
POST   /api/auth/login                   - Login (both roles)
POST   /api/auth/verify-otp              - Verify email OTP
POST   /api/auth/refresh-token           - Refresh JWT token
POST   /api/auth/forgot-password         - Request password reset
POST   /api/auth/reset-password          - Reset password with token
\`\`\`

### Jobs
\`\`\`
GET    /api/jobs                         - List all jobs (with filters)
GET    /api/jobs/:id                     - Get job details
GET    /api/jobs/nearby                  - Get nearby jobs (location-based with geolocation)
POST   /api/jobs                         - Post new job (Institution only)
PUT    /api/jobs/:id                     - Update job (Institution only)
DELETE /api/jobs/:id                     - Delete job (Institution only)
\`\`\`

### Applications
\`\`\`
GET    /api/applications                 - Get user's applications
POST   /api/applications                 - Apply for a job
GET    /api/applications/:id             - Get application details
PATCH  /api/applications/:id/status      - Update application status
\`\`\`

### Profile
\`\`\`
GET    /api/profile/teacher              - Get teacher profile with education & experience
PUT    /api/profile/teacher              - Update teacher profile
POST   /api/profile/teacher/education    - Add education entry
POST   /api/profile/teacher/certificate  - Upload certificate
POST   /api/profile/institution          - Create/update institution profile
GET    /api/profile/institution          - Get institution profile
\`\`\`

### Materials
\`\`\`
GET    /api/materials                    - Get study materials
POST   /api/materials/upload             - Upload material
\`\`\`

### Zoom
\`\`\`
POST   /api/zoom/create-meeting          - Create Zoom meeting
GET    /api/zoom/meeting/:id             - Get meeting details
\`\`\`

---

## New Features Added

### Profile Completion Modal
- Automatically appears after registration
- Teachers can skip or complete immediately
- Includes all essential profile fields

### Enhanced Teacher Profile Page
- **Personal Tab:** Name, DOB, phone, location, bio, skills, availability
- **Education Tab:** Add multiple degrees with GPA and graduation year
- **Experience Tab:** Add professional experience with duration and description
- **Documents Tab:** Upload resume, marks card, and certificates

### Google Maps Integration
- Located in "Nearby Jobs" dashboard tab
- Shows interactive map with job location markers
- Click markers to view job details and apply
- Auto-updates based on teacher's location profile

### File Upload System
- Drag-and-drop interface for resumes and certificates
- Support for PDF, DOC, DOCX, JPG, PNG
- 10MB file size limit per file
- Multiple certificate support

### Skills Management
- Add/remove skills dynamically
- Visual tag display with delete buttons
- Search and filter by skills

---

## File Structure

\`\`\`
teacher-portal/
├── backend/
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   ├── seeds/
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── jwt.js
│   │   │   ├── mailer.js
│   │   │   └── passport.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── OtpToken.js
│   │   │   ├── TeacherProfile.js (with education, experience, skills)
│   │   │   ├── InstitutionProfile.js
│   │   │   ├── Job.js (with location fields)
│   │   │   ├── Application.js
│   │   │   └── StudyMaterial.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── jobController.js (with nearbyJobs)
│   │   │   ├── applicationController.js
│   │   │   ├── profileController.js (with file upload)
│   │   │   ├── materialController.js
│   │   │   └── zoomController.js
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       ├── jobRoutes.js
│   │       ├── applicationRoutes.js
│   │       ├── profileRoutes.js (with multer middleware)
│   │       ├── materialRoutes.js
│   │       └── zoomRoutes.js
│   └── uploads/
│       ├── resumes/
│       ├── certificates/
│       └── materials/
│
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── LoginTeacher.jsx
│       │   ├── LoginInstitution.jsx
│       │   ├── RegisterTeacher.jsx (with OTP redirect to profile)
│       │   ├── RegisterInstitution.jsx
│       │   ├── VerifyOTP.jsx
│       │   ├── Jobs.jsx
│       │   ├── JobDetail.jsx
│       │   ├── TeacherDashboard.jsx (with maps and profile modal)
│       │   ├── InstitutionDashboard.jsx
│       │   └── Profile.jsx (enhanced with tabs)
│       └── components/
│           ├── ProfileCompletionModal.jsx (auto-shows after registration)
│           ├── JobsMapView.jsx (Google Maps integration)
│           ├── NearbyJobsMapSection.jsx (section wrapper)
│           └── ...
│
├── COMPLETE_SETUP_GUIDE.md
└── README.md
\`\`\`

---

## Troubleshooting

### Issue: "MongoDB connection error"
**Solution:** 
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, verify connection string and whitelist your IP

### Issue: "CORS error when frontend connects to backend"
**Solution:**
- Ensure FRONTEND_URL in backend .env matches frontend URL (http://localhost:5173)
- Restart backend server after changing env

### Issue: "OTP not received in email"
**Solution:**
- Check SMTP_USER and SMTP_PASS in .env
- Verify Gmail App Password is correct (16 characters)
- Check spam folder
- Check backend console for OTP logs

### Issue: "Google Maps not displaying"
**Solution:**
- Verify VITE_GOOGLE_MAPS_API_KEY is added to frontend .env
- Check that Maps JavaScript API is enabled in Google Cloud Console
- Open browser console (F12) for error messages
- Ensure API key isn't restricted to specific domains (in development)

### Issue: "Profile modal doesn't appear after registration"
**Solution:**
- Ensure you're using the updated RegisterTeacher.jsx that passes showProfileCompletion state
- Check browser console for errors
- Verify dashboard is loading properly

### Issue: "File uploads not working"
**Solution:**
- Ensure /backend/uploads directory exists and is writable
- Check Multer middleware configuration
- Verify file size is under 10MB
- Check supported formats (PDF, DOC, DOCX, JPG, PNG)

### Issue: "Port already in use"
**Solution:**
\`\`\`bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
\`\`\`

### Issue: "npm install fails"
**Solution:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

---

## Production Deployment

### Deploy Backend (Render.com example)
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Add environment variables in Render dashboard
4. Deploy automatically on push

### Deploy Frontend (Vercel example)
1. Push frontend folder to GitHub
2. Connect repo to Vercel
3. Set `VITE_API_URL` to production backend URL
4. Set `VITE_GOOGLE_MAPS_API_KEY` for production
5. Deploy

### MongoDB Atlas Setup (Production)
1. Create cluster on MongoDB Atlas
2. Create user with strong password
3. Whitelist IPs (0.0.0.0/0 for all)
4. Get connection string
5. Update MONGODB_URI in production .env

---

## Additional Features (Optional)

### Enable Google OAuth
1. Create OAuth app at [Google Cloud Console](https://console.cloud.google.com)
2. Add credentials to .env
3. Uncomment OAuth routes in backend

### Enable Zoom Integration
1. Create Zoom app at [Zoom Marketplace](https://marketplace.zoom.us)
2. Add API keys to .env
3. Implement meeting creation endpoints

### Extend Profile Features
- Add more certificate types and validations
- Implement skill endorsements
- Add portfolio/project showcase
- Add references and recommendations

---

## Need Help?

1. Check logs in terminal/console
2. Review API responses in browser DevTools (Network tab)
3. Check MongoDB for data: use MongoDB Compass (GUI tool)
4. Test API endpoints with Postman
5. Enable debug logging in backend

---

## Security Notes

- Change JWT_SECRET and JWT_REFRESH_SECRET to strong random values
- Never commit .env file (add to .gitignore)
- Use HTTPS in production
- Implement rate limiting on API
- Validate all user inputs
- Restrict Google Maps API key to specific domains
- Use Row-Level Security (RLS) in MongoDB
- Scan files uploaded by users for malware (production)

---

## Next Steps

1. Customize branding (logos, colors)
2. Add more job filters (skills, experience level)
3. Implement advanced search with Elasticsearch
4. Add video call capability (WebRTC)
5. Build admin panel for moderation
6. Add payment integration for premium features
7. Implement user notifications and messaging
8. Add social features (recommendations, endorsements)

---

Happy coding! 🚀
