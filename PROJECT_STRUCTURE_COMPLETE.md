# TeacherWorld - Complete Project Structure Guide

## Quick Stats

- **20 React Pages** - Full user interface
- **8 API Controllers** - Business logic
- **8 Route Groups** - 32+ API endpoints
- **7 MongoDB Models** - Data storage
- **2 OAuth Providers** - Google & LinkedIn
- **1 Location Service** - Google Maps integration
- **1 Video Service** - Zoom integration
- **1 Email Service** - Nodemailer Gmail SMTP

---

## Architecture Overview

\`\`\`
User (Browser)
    ↓
React Frontend (port 5173)
    ↓
Express API Server (port 5000)
    ↓
MongoDB Database
    ↓
External Services:
  - Google OAuth
  - Google Maps
  - Zoom
  - Gmail SMTP
\`\`\`

---

## Frontend Pages (20 Total)

### Authentication Pages (6)
1. **LoginTeacher.jsx** - Email/password + Google OAuth login
2. **RegisterTeacher.jsx** - Registration with qualifications form
3. **LoginInstitution.jsx** - Institution email/password login
4. **RegisterInstitution.jsx** - Institution registration
5. **VerifyOTP.jsx** - 6-digit OTP verification
6. **ForgotPassword.jsx** - Password reset with OTP

### Core Pages (4)
7. **Home.jsx** - Landing page with feature showcase
8. **Jobs.jsx** - Job listing with search, filters, location
9. **JobDetail.jsx** - Individual job details, apply button
10. **Profile.jsx** - Edit user profile and credentials

### User Pages (4)
11. **TeacherDashboard.jsx** - View applications, status tracking
12. **InstitutionDashboard.jsx** - Posted jobs, manage applicants
13. **Materials.jsx** - Upload/browse study materials
14. **Applications.jsx** - All applications with filters

### Info Pages (4)
15. **Contact.jsx** - Contact form
16. **Service.jsx** - Services overview
17. **Policy.jsx** - Privacy policy and terms
18. **Zoom.jsx** - Zoom live session booking

### Utility Pages (2)
19. **SocialCallback.jsx** - Google OAuth redirect handler
20. **ForgotUsername.jsx** - Username recovery

---

## Backend Controllers (8)

### 1. authController.js
**Methods:**
- `register()` - User registration with password hashing
- `login()` - Email/password login with JWT generation
- `verifyOTP()` - OTP validation and user verification
- `forgotPassword()` - Send password reset OTP
- `resetPassword()` - Update password after OTP verification
- `refreshToken()` - Generate new access token
- `logout()` - Clear session

**Middleware Used:**
- JWT verification
- Input validation

---

### 2. jobController.js
**Methods:**
- `createJob()` - Post new job (institution only)
- `getAllJobs()` - List all jobs with pagination
- `getJobById()` - Get single job details
- `searchJobs()` - Search by title, skills, salary
- `getNearbyJobs()` - Jobs within X km radius (Google Maps)
- `updateJob()` - Edit job posting
- `deleteJob()` - Remove job posting

**Params:**
- Query: `q` (search), `city`, `skills`, `minSalary`, `maxSalary`
- Body: Job object

---

### 3. applicationController.js
**Methods:**
- `applyToJob()` - Submit job application
- `getApplications()` - List user applications
- `getJobApplications()` - List applications for a job
- `updateApplicationStatus()` - Change status (institution only)
- `rejectApplication()` - Reject application with email
- `acceptApplication()` - Accept application with email

**Status Flow:**
- applied → shortlisted → interviewed → accepted/rejected

---

### 4. profileController.js
**Methods:**
- `getTeacherProfile()` - Retrieve teacher profile
- `updateTeacherProfile()` - Update qualifications, experience
- `getInstitutionProfile()` - Retrieve institution profile
- `updateInstitutionProfile()` - Update institution details
- `uploadProfilePicture()` - Change profile image
- `uploadCertificate()` - Upload qualification cert
- `uploadMarks()` - Upload marks card

**Files Handled:**
- Resume (PDF)
- Certificates (PDF)
- Marks card (PDF/Image)
- Profile pictures (JPEG/PNG)

---

### 5. materialController.js
**Methods:**
- `uploadMaterial()` - Upload study material
- `getAllMaterials()` - List all materials
- `getMaterialsBySubject()` - Filter by subject
- `downloadMaterial()` - Download material file
- `deleteMaterial()` - Remove material

**Material Types:**
- notes
- solved-papers
- practice-tests

---

### 6. locationController.js
**Methods:**
- `getNearbyColleges()` - Find colleges within radius
- `getCoordinates()` - Get lat/long from address
- `calculateDistance()` - Distance between two points

**Integration:**
- Google Maps Geocoding API
- Haversine distance formula

---

### 7. zoomController.js
**Methods:**
- `createMeeting()` - Schedule Zoom meeting
- `getMeetings()` - List user meetings
- `joinMeeting()` - Get meeting join link
- `endMeeting()` - End active meeting
- `recordMeeting()` - Start recording

**Zoom Data:**
- Meeting ID, Password
- Join URL, Start time
- Duration, Participants

---

### 8. socialAuthController.js
**Methods:**
- `googleAuth()` - Authenticate with Google token
- `linkedInAuth()` - Authenticate with LinkedIn token
- `generateOAuthToken()` - Create JWT from OAuth
- `linkOAuthToAccount()` - Connect OAuth to existing account

**OAuth Flow:**
1. Frontend sends OAuth code
2. Backend verifies with provider
3. Get user info (email, name)
4. Create/update user in DB
5. Return JWT token

---

## API Routes (32+ Endpoints)

### Authentication Routes (`/api/auth`)
\`\`\`
POST   /register              - Register new user
POST   /login                 - Login with email/password
POST   /verify-otp            - Verify email OTP
POST   /forgot-password       - Request password reset
POST   /reset-password        - Reset password with OTP
POST   /refresh-token         - Get new access token
POST   /logout                - Logout user
\`\`\`

### Job Routes (`/api/jobs`)
\`\`\`
POST   /                      - Create new job
GET    /                      - List all jobs
GET    /:id                   - Get job details
GET    /nearby                - Nearby jobs by location
PATCH  /:id                   - Update job
DELETE /:id                   - Delete job
\`\`\`

### Application Routes (`/api/applications`)
\`\`\`
POST   /                      - Apply to job
GET    /                      - Get user applications
GET    /job/:jobId            - Get job applications
PATCH  /:id/status            - Update application status
PATCH  /:id/reject            - Reject application
PATCH  /:id/accept            - Accept application
\`\`\`

### Profile Routes (`/api/profile`)
\`\`\`
GET    /teacher               - Get teacher profile
PUT    /teacher               - Update teacher profile
GET    /institution           - Get institution profile
PUT    /institution           - Update institution profile
POST   /upload-picture        - Upload profile picture
POST   /upload-certificate    - Upload certificate
POST   /upload-marks          - Upload marks card
\`\`\`

### Materials Routes (`/api/materials`)
\`\`\`
POST   /                      - Upload material
GET    /                      - List all materials
GET    /subject/:subject      - Filter by subject
GET    /download/:id          - Download material
DELETE /:id                   - Delete material
\`\`\`

### Location Routes (`/api/location`)
\`\`\`
GET    /nearby-colleges       - Find nearby colleges
GET    /coordinates           - Get coordinates from address
POST   /distance              - Calculate distance
\`\`\`

### Zoom Routes (`/api/zoom`)
\`\`\`
POST   /create-meeting        - Create Zoom meeting
GET    /meetings              - List meetings
POST   /join/:meetingId       - Join meeting
POST   /end/:meetingId        - End meeting
POST   /record/:meetingId     - Record meeting
\`\`\`

### Social Auth Routes (`/api/auth/google`)
\`\`\`
POST   /authenticate          - Google OAuth login
POST   /link-account          - Link OAuth to account
GET    /callback              - OAuth callback handler
\`\`\`

---

## MongoDB Collections (7)

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  role: "teacher" | "institution" | "admin",
  phone: String,
  location: String,
  profilePicture: String,
  isVerified: Boolean,
  timestamps: { createdAt, updatedAt }
}
\`\`\`

### TeacherProfiles Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId → User,
  fullName: String,
  qualifications: [String],
  experience: Number,
  specialization: [String],
  currentSchool: String,
  resume: String,
  certificates: [String],
  skills: [String],
  marks: String,
  appliedJobs: [ObjectId] → Job,
  savedJobs: [ObjectId] → Job
}
\`\`\`

### InstitutionProfiles Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId → User,
  institutionName: String,
  registrationNumber: String,
  address: String,
  city: String,
  latitude: Number,
  longitude: Number,
  verified: Boolean,
  website: String,
  postedJobs: [ObjectId] → Job
}
\`\`\`

### Jobs Collection
\`\`\`javascript
{
  _id: ObjectId,
  postedBy: ObjectId → InstitutionProfile,
  title: String,
  description: String,
  qualification: String,
  experience: String,
  salary: Number,
  location: String,
  latitude: Number,
  longitude: Number,
  jobType: "full-time" | "part-time" | "contract",
  applications: [ObjectId] → Application,
  applicationCount: Number,
  timestamps: { createdAt, expiresAt }
}
\`\`\`

### Applications Collection
\`\`\`javascript
{
  _id: ObjectId,
  jobId: ObjectId → Job,
  applicantId: ObjectId → TeacherProfile,
  status: "applied" | "shortlisted" | "interviewed" | "accepted" | "rejected",
  statusHistory: [{
    status: String,
    changedAt: Date
  }],
  appliedAt: Date
}
\`\`\`

### OtpTokens Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String,
  otp: String,
  expiresAt: Date,
  createdAt: Date
}
\`\`\`

### StudyMaterials Collection
\`\`\`javascript
{
  _id: ObjectId,
  uploadedBy: ObjectId → User,
  title: String,
  description: String,
  materialFile: String,
  materialType: "notes" | "solved-papers" | "practice-tests",
  subject: String,
  createdAt: Date
}
\`\`\`

---

## Feature Matrix

| Feature | Frontend | Backend | Database | External |
|---------|----------|---------|----------|----------|
| User Registration | LoginTeacher | authController | User, TeacherProfile | - |
| Email OTP | VerifyOTP | authController | OtpToken | Nodemailer |
| Google OAuth | LoginTeacher | socialAuthController | User | Google |
| Job Search | Jobs | jobController | Job | - |
| Location Search | Jobs | locationController | Job | Google Maps |
| Apply to Job | JobDetail | applicationController | Application | Nodemailer |
| Profile Management | Profile | profileController | TeacherProfile | - |
| File Upload | Profile, Materials | profileController | - | Multer |
| Dashboard | TeacherDashboard | applicationController | Application | - |
| Zoom Meeting | Zoom | zoomController | - | Zoom SDK |
| Admin Panel | InstitutionDashboard | applicationController | Job | - |

---

## Security Features

1. **Password Security**
   - Bcrypt hashing (salt rounds: 10)
   - Secure password reset via OTP

2. **Authentication**
   - JWT tokens (Access: 1 hour, Refresh: 7 days)
   - Secure token storage in localStorage

3. **Authorization**
   - Role-based access control (RBAC)
   - Middleware checks on protected routes

4. **File Upload**
   - File type validation (PDF, JPEG, PNG only)
   - File size limits (5MB max)
   - Stored in separate `/uploads` folder

5. **Data Validation**
   - Input sanitization
   - Email validation
   - Password strength requirements

6. **Email Security**
   - Gmail SMTP with app password
   - OTP expiry (15 minutes)
   - Rate limiting on email sends

---

## Deployment Checklist

- [ ] Environment variables set (.env files)
- [ ] MongoDB Atlas cluster created
- [ ] Gmail account with app password
- [ ] Google OAuth credentials created
- [ ] Google Maps API key generated
- [ ] Zoom SDK credentials obtained
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Email configuration tested
- [ ] OAuth flow tested
- [ ] File uploads working
- [ ] Database indexed properly

---

## Performance Optimization

1. **Frontend**
   - React code splitting with lazy loading
   - Image optimization
   - CSS compression
   - Browser caching

2. **Backend**
   - MongoDB indexing on frequently queried fields
   - Request validation before DB queries
   - Error handling to prevent crashes
   - Rate limiting on sensitive endpoints

3. **Database**
   - Indexed fields: email, username, userId
   - Compound indexes for job searches
   - Proper relationship setup with ObjectId refs

---

## Development Workflow

\`\`\`
1. Frontend Development
   → Create React component
   → Add routing in App.jsx
   → Test with mock data

2. Backend API Development
   → Create Mongoose model
   → Create controller methods
   → Create route handlers
   → Test with Postman

3. Integration
   → Connect frontend to API
   → Add error handling
   → Test end-to-end flow

4. Deployment
   → Push to GitHub
   → Deploy backend (Render)
   → Deploy frontend (Vercel)
\`\`\`

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| API connection refused | Check backend running on port 5000 |
| MongoDB connection error | Verify MONGODB_URI in .env |
| Email OTP not received | Check Gmail SMTP credentials |
| OAuth not working | Verify Google credentials and redirect URL |
| File upload fails | Check file size and type restrictions |
| Images not loading | Check public folder path |
| 404 on routes | Verify routes in App.jsx match backend |
