# TeacherWorld - Complete Data Flow Architecture

## System Overview

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    TEACHER WORLD SYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FRONTEND (React)          BACKEND (Node/Express)  DATABASE     │
│  Port: 5173                Port: 5000              MongoDB       │
│                                                                 │
│  ┌─────────────────┐      ┌──────────────────┐   ┌──────────┐  │
│  │  React Pages    │      │  Controllers     │   │ Collections │
│  │  - Login        │      │  - authCtrl      │   │ - Users    │
│  │  - Register     │◄────►│  - jobCtrl       │◄─►│ - Jobs     │
│  │  - Dashboard    │      │  - appCtrl       │   │ - Apps     │
│  │  - Jobs         │      │  - profileCtrl   │   │ - Profiles │
│  │  - Profile      │      │                  │   └──────────┘  │
│  └─────────────────┘      └──────────────────┘                  │
│         HTTP                    REST API                        │
│      (Axios/Fetch)          JSON Requests                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Complete Request-Response Cycle

### Example: Teacher Registration Flow

\`\`\`
Step 1: User Registration Form
┌─────────────────────────────────────┐
│ Frontend (RegisterTeacher.jsx)       │
│ - User enters email, password, name  │
│ - Clicks "Register" button           │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 2: Frontend Sends Request
┌─────────────────────────────────────┐
│ axios.post(                          │
│   `${API_URL}/auth/register-teacher`,│
│   { email, password, name }          │
│ )                                    │
└────────────────────┬────────────────┘
                     │ HTTP POST
                     │ (localhost:5000)
                     ▼
Step 3: Backend Receives Request
┌─────────────────────────────────────┐
│ server.js Routes                     │
│ app.use("/api/auth", authRoutes)     │
│ ↓                                    │
│ authRoutes.js                        │
│ router.post("/register-teacher", ...)│
└────────────────────┬────────────────┘
                     │
                     ▼
Step 4: Backend Controller Logic
┌──────────────────────────────────────┐
│ authController.js                    │
│ exports.registerTeacher = async(...) │
│                                      │
│ 1. Validate input                    │
│ 2. Check if email exists in MongoDB  │
│ 3. Generate 6-digit OTP              │
│ 4. Save OTP to MongoDB (OtpToken)    │
│ 5. Send OTP via Nodemailer Gmail     │
│ 6. Return { message, email }         │
└────────────────────┬────────────────┘
                     │
                     ▼ MongoDB CRUD
            ┌────────────────────┐
            │ OtpToken.create({  │
            │   email,           │
            │   otp,             │
            │   expiresAt: +10m   │
            │ })                 │
            └────────────────────┘
                     │
                     ▼ Gmail SMTP
            ┌────────────────────┐
            │ nodemailer sends   │
            │ "Your OTP: 123456" │
            │ to user@email.com  │
            └────────────────────┘
                     │
                     ▼
Step 5: Backend Returns Response
┌─────────────────────────────────────┐
│ HTTP 200 Response:                   │
│ {                                    │
│   "message": "OTP sent to email",    │
│   "email": "user@email.com"          │
│ }                                    │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 6: Frontend Receives Response
┌─────────────────────────────────────┐
│ .then(res => {                       │
│   // Show success message            │
│   // Navigate to /verify-otp page    │
│   // Store email in state            │
│ })                                   │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 7: User Enters OTP
┌─────────────────────────────────────┐
│ VerifyOTP.jsx Page                   │
│ - User receives OTP in email         │
│ - Enters 6-digit OTP                 │
│ - Clicks "Verify"                    │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 8: Frontend Sends OTP for Verification
┌─────────────────────────────────────┐
│ axios.post(                          │
│   `${API_URL}/auth/verify-otp`,      │
│   { email, otp }                     │
│ )                                    │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 9: Backend Verifies OTP
┌──────────────────────────────────────┐
│ authController.verifyOTP()           │
│                                      │
│ 1. Find OTP in MongoDB               │
│ 2. Check if OTP matches              │
│ 3. Check if OTP not expired          │
│ 4. Create User in MongoDB            │
│ 5. Create TeacherProfile in MongoDB  │
│ 6. Delete OTP record                 │
│ 7. Generate JWT tokens               │
│ 8. Return tokens + user info         │
└────────────────────┬────────────────┘
                     │
                     ▼ MongoDB Operations
        ┌────────────────────────────────┐
        │ 1. OtpToken.findOne({...})     │
        │ 2. User.create({...})          │
        │ 3. TeacherProfile.create({...})│
        │ 4. OtpToken.deleteOne({...})   │
        └────────────────────────────────┘
                     │
                     ▼
Step 10: Backend Returns Tokens
┌──────────────────────────────────────┐
│ HTTP 200 Response:                   │
│ {                                    │
│   "message": "Registration success", │
│   "accessToken": "eyJhbGc...",       │
│   "refreshToken": "eyJhbGc...",      │
│   "user": {                          │
│     "id": "507f1f77bcf86cd799439011",│
│     "email": "user@email.com",       │
│     "role": "teacher"                │
│   }                                  │
│ }                                    │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 11: Frontend Stores Tokens
┌──────────────────────────────────────┐
│ localStorage.setItem(                │
│   "accessToken",                     │
│   response.data.accessToken          │
│ )                                    │
│ localStorage.setItem(                │
│   "user",                            │
│   JSON.stringify(response.data.user) │
│ )                                    │
└────────────────────┬────────────────┘
                     │
                     ▼
Step 12: Frontend Redirects to Dashboard
┌──────────────────────────────────────┐
│ navigate("/dashboard/teacher")       │
│                                      │
│ User now logged in and sees their    │
│ teacher dashboard with applications  │
└──────────────────────────────────────┘
\`\`\`

---

## Authentication Token Flow

\`\`\`
1. User Logs In
   ↓
2. Backend Generates:
   - accessToken (valid 24 hours)
   - refreshToken (valid 7 days)
   ↓
3. Frontend Stores in localStorage
   ↓
4. Every API Request Includes:
   Authorization: Bearer <accessToken>
   ↓
5. Backend Middleware Validates:
   - Check token signature
   - Check expiry
   - Extract user ID
   ↓
6. If Valid → Proceed to Controller
   If Expired → Return 401 (need refresh)
   If Invalid → Return 403 (re-login)
   ↓
7. Frontend Catches 401:
   POST /api/auth/refresh-token
   with refreshToken
   ↓
8. Backend Returns New accessToken
   ↓
9. Frontend Retries Original Request
   with New Token
\`\`\`

---

## Database Schema Relationships

\`\`\`
User Collection
├── Teacher Account
│   └── TeacherProfile (userId reference)
│       ├── Education []
│       ├── Skills []
│       ├── Certificates []
│       └── Applications (jobId reference)
│
└── Institution Account
    └── InstitutionProfile (userId reference)
        └── Jobs (institutionId reference)
            └── Applications (jobId reference)

OtpToken Collection
└── Temporary OTP records (auto-delete after 10 min)

Job Collection
├── Created by Institution
├── Has many Applications
└── Location fields (for map search)

Application Collection
├── Belongs to Teacher
├── Belongs to Job
└── Status tracking (pending/accepted/rejected)

StudyMaterial Collection
├── Uploaded by Institutions
└── Downloaded by Teachers
\`\`\`

---

## File Upload Flow

\`\`\`
Step 1: User Selects File in Profile Page
   ↓
Step 2: Frontend creates FormData
   const formData = new FormData()
   formData.append('file', fileObject)
   formData.append('fileType', 'resume')
   ↓
Step 3: Frontend sends POST with file
   axios.post(`${API_URL}/profile/upload`, formData, {
     headers: { 'Content-Type': 'multipart/form-data' }
   })
   ↓
Step 4: Backend Middleware (Multer) processes:
   - Validates file type (pdf, doc, docx, png, jpg)
   - Checks file size (<5MB)
   - Creates upload directory if needed
   - Saves file to /backend/uploads/{fileType}/{filename}
   ↓
Step 5: Backend Controller updates MongoDB:
   TeacherProfile.findByIdAndUpdate(
     userId,
     { $push: { certificates: filePath } }
   )
   ↓
Step 6: Frontend shows confirmation
   ↓
Step 7: File accessible at:
   http://localhost:5000/uploads/certificates/{filename}
\`\`\`

---

## Email Flow

\`\`\`
1. Backend needs to send OTP/Notification
   ↓
2. Calls mailer.js or emailService.js
   ↓
3. nodemailer creates SMTP transport:
   service: "gmail"
   auth: {
     user: GMAIL_USER,
     pass: GMAIL_PASSWORD (app password)
   }
   ↓
4. Constructs email:
   from: GMAIL_USER
   to: recipient
   subject: "Your OTP"
   html: "<h1>OTP: 123456</h1>"
   ↓
5. Sends via Gmail SMTP servers
   ↓
6. Email arrives in recipient inbox
   (or spam folder)
   ↓
7. User enters OTP back to frontend
\`\`\`

---

## Location Search Flow

\`\`\`
1. Teacher views Jobs page
   ↓
2. Clicks "Find nearby jobs"
   ↓
3. Frontend gets user location via browser:
   navigator.geolocation.getCurrentPosition()
   → {latitude, longitude}
   ↓
4. Frontend sends to backend:
   GET /api/location/nearby?lat=40.7128&lng=-74.0060
   ↓
5. Backend uses Google Maps Distance Matrix API:
   - For each job in DB
   - Calculate distance from user location
   - Sort by distance
   ↓
6. Backend returns jobs within 5-10 km:
   [
     { id, title, location, distance: "2.3 km" },
     { id, title, location, distance: "4.1 km" }
   ]
   ↓
7. Frontend displays on map with markers
\`\`\`

---

## Error Handling Flow

\`\`\`
Request
   ↓
Backend Validation
├─ Input validation fails
│  └─ Return 400 Bad Request
│
├─ User not authenticated
│  └─ Return 401 Unauthorized
│
├─ User not authorized (wrong role)
│  └─ Return 403 Forbidden
│
├─ Resource not found
│  └─ Return 404 Not Found
│
├─ Database error
│  └─ Return 500 Internal Server Error
│
└─ Request successful
   └─ Return 200 OK with data

Frontend receives error
   ├─ 4xx (client error)
   │  └─ Show error message to user
   │
   ├─ 401 Unauthorized
   │  └─ Try refresh token
   │     ├─ Success → Retry request
   │     └─ Fail → Redirect to login
   │
   └─ 5xx (server error)
      └─ Show "Something went wrong"
\`\`\`

---

## Complete Data Model Example

\`\`\`javascript
// When user registers and logs in, here's what gets created:

// 1. User Document (MongoDB)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "teacher@example.com",
  password: "$2a$10$HASHED_PASSWORD", // hashed with bcrypt
  name: "John Doe",
  role: "teacher",
  verified: true,
  createdAt: 2024-01-15T10:30:00.000Z
}

// 2. OtpToken Document (automatically deleted after 10 min)
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  email: "teacher@example.com",
  otp: "123456",
  purpose: "registration",
  expiresAt: 2024-01-15T10:40:00.000Z
}

// 3. TeacherProfile Document
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  education: [
    {
      degree: "B.Tech",
      field: "Computer Science",
      university: "IIT Delhi",
      year: 2020
    }
  ],
  skills: ["JavaScript", "React", "MongoDB"],
  resume: "/uploads/resumes/john_resume.pdf",
  certificates: [
    "/uploads/certificates/john_cert1.pdf"
  ],
  experience: 3,
  createdAt: 2024-01-15T10:30:00.000Z
}

// 4. JWT Tokens Generated
{
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  // Valid for 24 hours
  // Contains: userId, role
  
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  // Valid for 7 days
  // Used to get new accessToken
}

// 5. Frontend localStorage
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "teacher@example.com",
    "name": "John Doe",
    "role": "teacher"
  }
}
\`\`\`

---

## Environment Variables Data Flow

\`\`\`
Backend .env
├─ Database Config (MONGODB_URI)
│  └─ Used by db.js to connect MongoDB
├─ Auth Config (JWT_SECRET, JWT_REFRESH_SECRET)
│  └─ Used by jwt.js to sign tokens
├─ Email Config (GMAIL_USER, GMAIL_PASSWORD)
│  └─ Used by mailer.js to send OTPs
└─ API Config (FRONTEND_URL)
   └─ Used by CORS to allow frontend requests

Frontend .env
├─ API URL (VITE_API_URL)
│  └─ Used by all axios calls
└─ Google Client ID
   └─ Used by Google OAuth component
\`\`\`

---

## Security Flow

\`\`\`
1. User enters password
   ↓
2. Frontend sends plain password to backend (HTTPS only)
   ↓
3. Backend receives password
   ↓
4. Backend uses bcrypt to hash password
   ↓
5. Hashed password stored in MongoDB (never plain text)
   ↓
6. When user logs in:
   a) Retrieve hashed password from DB
   b) Compare entered password with hash using bcrypt
   c) If match → Generate JWT tokens
   d) If no match → Return error
   ↓
7. JWT tokens sent to frontend
   ↓
8. Frontend stores tokens in localStorage
   ↓
9. With each API request, frontend sends:
   Authorization: Bearer <token>
   ↓
10. Backend verifies token signature and expiry
    ↓
11. If valid → Request proceeds
    If invalid → Return 401/403
\`\`\`

---

This architecture ensures data integrity, security, and scalability across the entire TeacherWorld platform.
