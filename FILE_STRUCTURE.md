# TeacherWorld - Complete File Structure

## Project Overview

TeacherWorld is a full-stack job portal for teachers and educational institutions built with React (frontend) and Node.js/Express (backend) with MongoDB database.

\`\`\`
teacher-portal/
├── backend/                          # Node.js Express API Server
├── frontend/                         # React + Vite Frontend
├── app/                              # Next.js App (legacy)
├── components/                       # shadcn UI Components
├── public/                           # Static Assets
├── hooks/                            # React Hooks
├── lib/                              # Utilities
├── styles/                           # Global Styles
└── Documentation Files               # Setup Guides
\`\`\`

---

## Backend Structure (`/backend`)

### Root Level

\`\`\`
backend/
├── server.js                         # Main Express server entry point
├── package.json                      # Backend dependencies
├── .env.example                      # Environment variables template
├── README.md                         # Backend documentation
├── README_BACKEND.md                 # Backend API guide
├── seeds/
│   └── seed.js                       # Database seeding script
└── src/                              # Source code
\`\`\`

### Backend `/src` Structure

\`\`\`
backend/src/
├── config/                           # Configuration files
│   ├── db.js                         # MongoDB connection setup
│   ├── jwt.js                        # JWT token helpers (sign, verify, refresh)
│   ├── mailer.js                     # Nodemailer Gmail SMTP configuration
│   └── passport.js                   # Google & LinkedIn OAuth strategies
│
├── middleware/                       # Express middleware
│   ├── auth.js                       # JWT verification middleware
│   ├── upload.js                     # Multer file upload configuration
│   └── roles.js                      # Role-based access control (RBAC)
│
├── models/                           # MongoDB Mongoose schemas
│   ├── User.js                       # User schema (authentication, roles)
│   ├── OtpToken.js                   # OTP token schema for email verification
│   ├── TeacherProfile.js             # Teacher profile (qualifications, experience)
│   ├── InstitutionProfile.js         # Institution profile (verified, location)
│   ├── Job.js                        # Job posting schema
│   ├── Application.js                # Job application schema
│   └── StudyMaterial.js              # Study materials upload schema
│
├── controllers/                      # API business logic
│   ├── authController.js             # Register, login, OTP, forgot password
│   ├── jobController.js              # Job CRUD, search, location filtering
│   ├── applicationController.js      # Apply, status updates, notifications
│   ├── profileController.js          # Update teacher/institution profiles
│   ├── materialController.js         # Upload and retrieve study materials
│   ├── locationController.js         # Google Maps nearest college search
│   ├── zoomController.js             # Zoom meeting creation and management
│   └── socialAuthController.js       # Google & LinkedIn OAuth handlers
│
├── routes/                           # API route definitions
│   ├── authRoutes.js                 # /api/auth endpoints
│   ├── jobRoutes.js                  # /api/jobs endpoints
│   ├── applicationRoutes.js          # /api/applications endpoints
│   ├── profileRoutes.js              # /api/profile endpoints
│   ├── materialRoutes.js             # /api/materials endpoints
│   ├── locationRoutes.js             # /api/location endpoints
│   ├── zoomRoutes.js                 # /api/zoom endpoints
│   └── socialAuthRoutes.js           # /api/auth/google endpoints
│
└── uploads/                          # File storage
    ├── resumes/                      # Teacher resume files
    └── materials/                    # Study material files
\`\`\`

### Backend Configuration

**server.js** - Main Express server:
- MongoDB connection via Mongoose
- CORS configuration
- Multer file upload setup
- JWT middleware integration
- All route mounting
- Error handling middleware
- Server listening on port 5000

**Key Endpoints:**
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/verify-otp - OTP verification
- POST /api/jobs - Create job
- GET /api/jobs - List jobs with filtering
- GET /api/jobs/nearby - Nearby jobs by location
- POST /api/applications - Apply to job
- PATCH /api/applications/:id/status - Update application status
- GET /api/profile - Get user profile
- POST /api/zoom/create-meeting - Create Zoom meeting

---

## Frontend Structure (`/frontend`)

### Root Level

\`\`\`
frontend/
├── index.html                        # HTML entry point
├── package.json                      # Frontend dependencies
├── .env.example                      # Environment variables template
├── vite.config.js                    # Vite configuration
├── README.md                         # Frontend documentation
├── README_FRONTEND.md                # Frontend features guide
└── src/                              # React source code
\`\`\`

### Frontend `/src` Structure

\`\`\`
frontend/src/
├── main.jsx                          # Vite entry point
├── App.jsx                           # Main app component with routing
├── styles.css                        # Global styles (Naukri-like design)
│
└── pages/                            # React page components (20 pages)
    ├── Home.jsx                      # Landing page with CTA buttons
    ├── Contact.jsx                   # Contact form page
    ├── Service.jsx                   # Services overview page
    ├── Policy.jsx                    # Privacy policy & terms
    │
    ├── LoginTeacher.jsx              # Teacher login page
    ├── RegisterTeacher.jsx           # Teacher registration with qualifications
    ├── LoginInstitution.jsx          # Institution login page
    ├── RegisterInstitution.jsx       # Institution registration
    │
    ├── VerifyOTP.jsx                 # Email OTP verification page
    ├── ForgotPassword.jsx            # Password recovery with OTP
    ├── ForgotUsername.jsx            # Username recovery page
    │
    ├── Jobs.jsx                      # Job listing with search & filters
    ├── JobDetail.jsx                 # Single job details & apply
    ├── Materials.jsx                 # Study materials upload/browse
    ├── Applications.jsx              # View all applications
    │
    ├── Profile.jsx                   # User profile edit page
    ├── TeacherDashboard.jsx          # Teacher - track applications
    ├── InstitutionDashboard.jsx      # Institution - manage job listings
    │
    ├── Zoom.jsx                      # Zoom live session booking
    ├── SocialCallback.jsx            # Google OAuth callback handler
    
    └── (Location Search Component)   # Google Maps integration
\`\`\`

### Frontend Styling

**styles.css** - Main stylesheet:
- Naukri/Indeed inspired design
- Professional color scheme
  - Primary: #1a5490 (deep blue)
  - Accent: #ff6b35 (orange)
  - Neutral: #f5f5f5 (light gray)
- Responsive flexbox layouts
- Form styling and validation
- Dashboard and card layouts
- Mobile-first design

---

## Database Models (`/backend/src/models`)

### 1. User.js
\`\`\`javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String (enum: "teacher", "institution", "admin"),
  phone: String,
  location: String,
  profilePicture: String (file path),
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 2. OtpToken.js
\`\`\`javascript
{
  _id: ObjectId,
  email: String,
  otp: String (6 digits),
  expiresAt: Date (15 minutes),
  createdAt: Date
}
\`\`\`

### 3. TeacherProfile.js
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  fullName: String,
  qualifications: [String] (B.Sc, M.Sc, PhD, etc),
  experience: Number (years),
  specialization: [String],
  currentSchool: String,
  resume: String (file path),
  certificates: [String] (file paths),
  skills: [String],
  marks: String (file path),
  appliedJobs: [ObjectId] (ref: Job),
  savedJobs: [ObjectId] (ref: Job),
  createdAt: Date
}
\`\`\`

### 4. InstitutionProfile.js
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  institutionName: String,
  registrationNumber: String,
  address: String,
  city: String,
  latitude: Number,
  longitude: Number,
  verified: Boolean,
  verificationDate: Date,
  website: String,
  contactPerson: String,
  postedJobs: [ObjectId] (ref: Job),
  createdAt: Date
}
\`\`\`

### 5. Job.js
\`\`\`javascript
{
  _id: ObjectId,
  postedBy: ObjectId (ref: InstitutionProfile),
  title: String,
  description: String,
  qualification: String (B.Sc, M.Sc),
  experience: String,
  salary: Number,
  location: String,
  latitude: Number,
  longitude: Number,
  jobType: String (enum: "full-time", "part-time", "contract"),
  applications: [ObjectId] (ref: Application),
  applicationCount: Number,
  createdAt: Date,
  expiresAt: Date
}
\`\`\`

### 6. Application.js
\`\`\`javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: Job),
  applicantId: ObjectId (ref: TeacherProfile),
  status: String (enum: "applied", "shortlisted", "interviewed", "rejected", "accepted"),
  statusHistory: [
    {
      status: String,
      changedAt: Date
    }
  ],
  appliedAt: Date
}
\`\`\`

### 7. StudyMaterial.js
\`\`\`javascript
{
  _id: ObjectId,
  uploadedBy: ObjectId (ref: User),
  title: String,
  description: String,
  materialFile: String (file path),
  materialType: String (enum: "notes", "solved-papers", "practice-tests"),
  subject: String,
  createdAt: Date
}
\`\`\`

---

## Root Configuration Files

\`\`\`
/
├── package.json                      # Root workspace dependencies
├── tsconfig.json                     # TypeScript configuration
├── .gitignore                        # Git ignore rules
├── next.config.mjs                   # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # shadcn UI configuration
└── render.yaml                       # Render deployment config
\`\`\`

---

## Documentation Files

\`\`\`
Root Documentation:
├── README.md                         # Main project overview
├── QUICK_START.md                    # 5-minute quick start
├── COMPLETE_SETUP_GUIDE.md           # Detailed setup (500+ lines)
├── INSTALLATION_GUIDE.md             # Step-by-step installation
├── INSTALLATION_STEPS.md             # Alternative installation
├── API_REFERENCE.md                  # Complete API documentation
├── FILE_STRUCTURE.md                 # This file
├── PROJECT_STRUCTURE_COMPLETE.md     # Complete project overview
├── PROJECT_SUMMARY.md                # Project features summary
├── PROJECT_CHECKLIST.md              # Feature checklist
├── GET_STARTED.md                    # Getting started guide
├── START_HERE.md                     # Start here guide
├── SETUP_GUIDE.md                    # Setup guide
├── DEPLOYMENT.md                     # Production deployment
├── GITHUB_DEPLOYMENT.md              # GitHub & Render deployment
├── README_FINAL.md                   # Final README
├── backend/README.md                 # Backend API guide
├── backend/README_BACKEND.md         # Backend features
├── frontend/README.md                # Frontend features
└── frontend/README_FRONTEND.md       # Frontend documentation
\`\`\`

---

## Authentication & Security Flow

\`\`\`
Registration:
User → Register Form → Backend Validation → Hash Password (bcrypt) → 
  Create User → Send OTP Email → OTP Page → Verify OTP → 
  Create Session (JWT) → Dashboard

Login:
User → Login Form → Backend Validation → 
  Compare Password (bcrypt) → Generate JWT Token → 
  Return Access & Refresh Tokens → Store in localStorage → Dashboard

OAuth (Google):
User → Click "Login with Google" → Google OAuth Dialog → 
  Callback to /api/auth/google/callback → Create/Get User → 
  Generate JWT → Redirect to Dashboard
\`\`\`

---

## File Upload Paths

\`\`\`
backend/uploads/
├── resumes/
│   └── {userId}-resume-{timestamp}.pdf
├── materials/
│   ├── {userId}-certificate-{timestamp}.pdf
│   ├── {userId}-marks-{timestamp}.pdf
│   └── {userId}-material-{timestamp}.pdf
\`\`\`

---

## Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/teacherworld
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
ZOOM_SDK_KEY=your_zoom_sdk_key
ZOOM_SDK_SECRET=your_zoom_secret
GOOGLE_MAPS_API_KEY=your_google_maps_key
NODE_ENV=development
PORT=5000
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
\`\`\`

---

## Tech Stack Summary

**Frontend:**
- React 18 with Vite
- React Router v6 for routing
- Axios for HTTP requests
- @react-oauth/google for OAuth
- CSS3 for styling

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for emails
- Multer for file uploads
- Google Maps API for locations
- Zoom SDK for meetings

**Database:**
- MongoDB Atlas cloud database
- 7 collections with proper relationships

**Deployment:**
- Backend: Render
- Frontend: Vercel or Netlify
