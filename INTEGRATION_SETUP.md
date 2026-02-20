# TeacherWorld - Complete Frontend, Backend & MongoDB Integration Guide

## System Architecture Overview

\`\`\`
Frontend (React/Vite) → Backend API (Node/Express) → MongoDB Database
Port: 5173              Port: 5000                  (Local/Atlas)
\`\`\`

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or MongoDB Atlas)
- Yarn or NPM
- Git

---

## Backend Setup (Node.js + Express + MongoDB)

### Step 1: Navigate to Backend Directory
\`\`\`bash
cd backend
npm install
\`\`\`

### Step 2: Create .env File
Copy the `.env.example` and fill in your credentials:

\`\`\`bash
# backend/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/teacher-portal

# JWT Secrets (Generate strong random strings)
JWT_SECRET=your-super-secret-key-min-32-chars-random
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars-random

# Gmail SMTP (For OTP emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password  # NOT your regular password - use app password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google Maps API
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Zoom Integration
ZOOM_CLIENT_ID=your-zoom-client-id
ZOOM_CLIENT_SECRET=your-zoom-client-secret
\`\`\`

### Step 3: Start MongoDB

**Option A: Local MongoDB**
\`\`\`bash
mongod  # On Mac/Linux
# OR
mongod  # Windows - ensure MongoDB service is running
\`\`\`

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGODB_URI` in .env with your Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/teacher-portal`

### Step 4: Start Backend Server
\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
Server running on port 5000
MongoDB connected successfully
\`\`\`

---

## Frontend Setup (React + Vite)

### Step 1: Navigate to Frontend Directory
\`\`\`bash
cd frontend
npm install
\`\`\`

### Step 2: Create .env File
\`\`\`bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
\`\`\`

### Step 3: Start Frontend Development Server
\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
VITE v4.0.0 ready in 123 ms

➜  Local:   http://localhost:5173/
\`\`\`

---

## MongoDB Setup Options

### Option 1: Local MongoDB Installation

**Mac:**
\`\`\`bash
brew install mongodb-community
brew services start mongodb-community
\`\`\`

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Follow installer instructions
- MongoDB will start as a service

**Linux (Ubuntu):**
\`\`\`bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

**Verify Connection:**
\`\`\`bash
mongo  # or mongosh (for newer versions)
> show databases
> use teacher-portal
> db.users.find()
\`\`\`

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up and create a free cluster
3. Create a database user with username/password
4. Get connection string
5. Update backend `.env`:
   \`\`\`
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teacher-portal
   \`\`\`

---

## Complete Integration Flow

### 1. User Registration (Teacher Example)

\`\`\`
1. User fills registration form on /register-teacher
2. Frontend sends POST to http://localhost:5000/api/auth/register-teacher
3. Backend receives request in /backend/src/controllers/authController.js
4. Controller generates OTP and saves to MongoDB (OtpToken collection)
5. OTP sent via Nodemailer Gmail SMTP
6. Frontend navigates to /verify-otp page
7. User enters OTP
8. Frontend sends POST to /api/auth/verify-otp
9. Backend verifies OTP, creates User and TeacherProfile in MongoDB
10. Returns JWT tokens (accessToken, refreshToken)
11. Frontend stores tokens in localStorage
12. User redirected to /dashboard/teacher
\`\`\`

### 2. API Request with Authentication

\`\`\`
1. Frontend makes API request with Bearer token:
   Authorization: Bearer <accessToken>

2. Backend middleware (auth.js) validates token
3. If valid: request proceeds to controller
4. If expired: returns 401, frontend refreshes token
5. If invalid: returns 403 Forbidden

Example:
axios.get(`${API_URL}/jobs`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})
\`\`\`

### 3. Database Operations

All CRUD operations go through controllers:
- CREATE: `User.create()`, `Job.create()`
- READ: `User.findOne()`, `Job.find()`
- UPDATE: `Job.findByIdAndUpdate()`
- DELETE: `Job.findByIdAndRemove()`

---

## API Endpoints Checklist

### Authentication
- `POST /api/auth/register-teacher` - Teacher registration
- `POST /api/auth/register-institution` - Institution registration
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/google/callback` - Google OAuth

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `POST /api/jobs` - Create job (Institution only)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications` - Get applications
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Delete application

### Profiles
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/upload` - Upload certificate/resume

### Materials
- `GET /api/materials` - Get study materials
- `POST /api/materials` - Upload material
- `DELETE /api/materials/:id` - Delete material

### Zoom
- `POST /api/zoom/create-meeting` - Create meeting
- `GET /api/zoom/meetings` - Get user meetings

---

## Testing the Connection

### 1. Backend Health Check
\`\`\`bash
curl http://localhost:5000/api/health
# Response: {"status":"OK"}
\`\`\`

### 2. Test User Registration
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/register-teacher \
  -H "Content-Type: application/json" \
  -d '{
    "email":"teacher@example.com",
    "password":"Password123",
    "name":"John Doe"
  }'
\`\`\`

### 3. Check MongoDB
\`\`\`bash
# Open MongoDB shell
mongo

# Check database
use teacher-portal
show collections
db.users.find()
db.otptokens.find()
\`\`\`

---

## Common Issues & Solutions

### Issue 1: "MongoDB connection error"
**Solution:**
- Check if MongoDB is running: `sudo systemctl status mongodb`
- Verify `MONGODB_URI` in `.env`
- For Atlas: Ensure IP whitelist includes your IP

### Issue 2: "CORS error" in frontend
**Solution:**
- Backend already configured CORS
- Verify `FRONTEND_URL` in backend `.env`
- Clear browser cache: Ctrl+Shift+Delete

### Issue 3: "OTP not sending"
**Solution:**
- Verify Gmail credentials in `.env`
- Use Gmail App Password (not regular password)
- Enable 2FA on Gmail account
- Check spam folder

### Issue 4: "Google OAuth not working"
**Solution:**
- Get Google Client ID from Google Cloud Console
- Add `http://localhost:5000` to authorized redirect URIs
- Verify `GOOGLE_CLIENT_ID` matches in frontend

### Issue 5: "Token expired"
**Solution:**
- Frontend automatically refreshes token
- If manual: POST to `/api/auth/refresh-token` with `refreshToken`
- Check token expiry: 24 hours (access), 7 days (refresh)

---

## Environment Variables Reference

| Variable | Backend | Frontend | Required | Example |
|----------|---------|----------|----------|---------|
| VITE_API_URL | ❌ | ✓ | Yes | http://localhost:5000/api |
| VITE_GOOGLE_CLIENT_ID | ❌ | ✓ | Yes | xxx.apps.googleusercontent.com |
| PORT | ✓ | ❌ | No | 5000 |
| MONGODB_URI | ✓ | ❌ | Yes | mongodb://localhost:27017/teacher-portal |
| JWT_SECRET | ✓ | ❌ | Yes | random-secret-key |
| GMAIL_USER | ✓ | ❌ | Yes | your-email@gmail.com |
| GMAIL_PASSWORD | ✓ | ❌ | Yes | app-password |
| GOOGLE_CLIENT_ID | ✓ | ✓ | Yes | xxx.apps.googleusercontent.com |
| GOOGLE_MAPS_API_KEY | ✓ | ❌ | No | AIzaSyD... |

---

## Running Both Frontend & Backend

### Terminal 1: Backend
\`\`\`bash
cd backend
npm run dev
# Output: Server running on port 5000
\`\`\`

### Terminal 2: Frontend
\`\`\`bash
cd frontend
npm run dev
# Output: Local: http://localhost:5173/
\`\`\`

### Open Browser
Visit: http://localhost:5173

---

## Production Deployment

### Backend to Render
1. Push code to GitHub
2. Connect Render to GitHub repo
3. Set environment variables in Render dashboard
4. Deploy: Render auto-builds on push

### Frontend to Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Set `VITE_API_URL` to production backend URL
4. Deploy: Vercel auto-builds on push

---

## Database Collections Schema

\`\`\`javascript
// Users
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "teacher" | "institution" | "admin",
  verified: Boolean,
  googleId: String (optional),
  createdAt: Date
}

// OtpTokens
{
  _id: ObjectId,
  email: String,
  otp: String,
  purpose: "registration" | "password-reset",
  expiresAt: Date (10 minutes)
}

// TeacherProfile
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  education: Array,
  skills: Array,
  resume: String (file path),
  certificates: Array,
  experience: Number,
  createdAt: Date
}

// Jobs
{
  _id: ObjectId,
  institutionId: ObjectId (ref: User),
  title: String,
  description: String,
  location: {latitude, longitude},
  salary: Number,
  status: "active" | "closed",
  createdAt: Date
}

// Applications
{
  _id: ObjectId,
  teacherId: ObjectId (ref: User),
  jobId: ObjectId (ref: Job),
  status: "pending" | "accepted" | "rejected",
  appliedAt: Date
}
\`\`\`

---

## Next Steps

1. Set up all environment variables
2. Start MongoDB
3. Start backend server
4. Start frontend server
5. Create test account
6. Test registration → OTP → Login flow
7. Test job listing and search
8. Deploy to production

Good luck! 🚀
