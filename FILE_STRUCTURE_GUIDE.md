# Complete File Structure Guide

## Project Overview
TeacherWorld - A comprehensive platform connecting teachers and institutions

## Frontend Pages & Routes

### Authentication Routes
- `/` - Home landing page
- `/login-teacher` - Teacher login
- `/login-institution` - Institution login
- `/register-teacher` - Teacher registration
- `/register-institution` - Institution registration
- `/verify-otp` - Email OTP verification
- `/forgot-password` - Password recovery
- `/forgot-username` - Username recovery

### Teacher Routes
- `/dashboard/teacher` - Main teacher dashboard
- `/teacher/profile` - Teacher profile with document uploads (Resume, Marks Card, Certificates)
- `/teacher/applications` - Track job applications
- `/teacher/messages` - Real-time messaging with institutions
- `/teacher/interviews` - Schedule and manage interviews
- `/teacher/notifications` - Activity notifications
- `/teacher/analytics` - Profile analytics and insights
- `/teacher/settings` - Account settings and preferences
- `/teacher/jobs/:jobId` - View specific job details

### Institution Routes
- `/dashboard/institution` - Main institution dashboard
- `/institution/post-job` - Create and post new jobs
- `/institution/applications` - Manage job applications
- `/institution/search-teachers` - Search and filter teachers
- `/institution/teams` - Team management
- `/institution/billing` - Billing and subscription management
- `/institution/settings` - Account settings

### Public Routes
- `/jobs` - Browse all available jobs
- `/jobs/:id` - Detailed job view
- `/materials` - Study materials section
- `/profile` - Public profile view
- `/applications` - Application tracking
- `/contact` - Contact us form
- `/services` - Services overview
- `/policy` - Privacy policy
- `/social-callback` - OAuth callback handler
- `/zoom` - Zoom integration

## Backend API Structure

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/refresh-token` - Token refresh

### Profile Endpoints
- `GET /api/profile/teacher` - Get teacher profile
- `PUT /api/profile/teacher` - Update teacher profile
- `POST /api/profile/teacher/resume` - Upload resume
- `POST /api/profile/teacher/marks-card` - Upload marks card
- `POST /api/profile/teacher/certificate` - Upload certificate
- `GET /api/profile/institution` - Get institution profile
- `PUT /api/profile/institution` - Update institution profile

### Job Endpoints
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job posting (institution only)
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting

### Application Endpoints
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Withdraw application

### Message Endpoints
- `POST /api/messages` - Send message
- `GET /api/messages` - Get conversation
- `GET /api/messages/conversations` - List conversations

### Interview Endpoints
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews` - Get interviews
- `PUT /api/interviews/:id` - Update interview

## File Upload System

### Supported Document Types

| Type | Folder | Formats | Max Size | Purpose |
|---|---|---|---|---|
| Resume | `/uploads/resumes/` | PDF, DOC, DOCX | 10MB | Job applications |
| Marks Card | `/uploads/marksCards/` | PDF, JPG, PNG | 10MB | Academic proof |
| Certificates | `/uploads/certificates/` | PDF, JPG, PNG | 10MB | Teaching credentials |
| Materials | `/uploads/materials/` | PDF, PPT, XLS, DOC | 10MB | Study resources |

### Upload Process Flow

1. User selects file in TeacherProfile.jsx
2. Frontend validates file type & size
3. Frontend creates FormData object
4. API request sent to `/api/profile/teacher/[type]`
5. Backend multer middleware processes file
6. File saved to `/backend/uploads/[type]/`
7. Database profile updated with file URL
8. Success response sent to frontend
9. UI shows confirmation with file name

### Error Handling

**Validation Errors**:
- Invalid file type → Error message shown
- File > 10MB → Size error shown
- Missing file → Empty input error
- Upload failure → Server error message

**Error Messages**:
- "Invalid file type for {type}. Please upload PDF, DOC, JPG, or PNG."
- "File size exceeds 10MB limit"
- "No file provided"
- "Failed to upload {type}"

## Database Models

### User Model
- userId
- email (unique)
- role (teacher/institution)
- password
- createdAt
- updatedAt

### TeacherProfile Model
- userId (ref: User)
- name
- phone
- bio
- experience
- subjects[]
- classesLevel[]
- skills[]
- resumeUrl
- marksCardUrl
- certificateUrls[]
- expectedSalary
- preferredLocations[]
- jobType[]
- remoteAvailable
- createdAt
- updatedAt

### InstitutionProfile Model
- userId (ref: User)
- institutionName
- website
- phone
- address
- type
- createdAt
- updatedAt

### JobPosting Model
- institutionId (ref: User)
- title
- description
- qualifications
- salary
- location
- createdAt
- expiresAt

### Application Model
- userId (ref: User)
- jobId (ref: JobPosting)
- status (applied/shortlisted/rejected)
- appliedAt

## Folder Structure

\`\`\`
frontend/src/
├── pages/                    # 35 page components
├── components/              # Reusable components
├── styles/                  # CSS files
├── main.jsx                 # Entry point
└── App.jsx                  # Router configuration

backend/src/
├── models/                  # MongoDB schemas
├── controllers/             # Business logic
├── routes/                  # API routes
├── middleware/              # Auth, upload, validation
├── utils/                   # Helper functions
└── server.js                # Server entry

uploads/
├── resumes/                 # Resume files
├── marksCards/              # Marks card images
├── certificates/            # Certificate files
└── materials/               # Study materials
\`\`\`

## Key Features Implemented

✅ Teacher & Institution authentication
✅ Profile management with document uploads
✅ Multi-file upload support (Resume, Marks Card, Certificates)
✅ Job posting and browsing
✅ Job application system
✅ Real-time messaging
✅ Interview scheduling
✅ Notifications
✅ Profile analytics
✅ Advanced search and filters
✅ Study materials sharing
✅ Subscription management

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| Upload fails with 413 error | Check backend file size limit in multer config |
| Files not persisting | Ensure `/uploads` folder exists with proper permissions |
| 404 on file access | Verify backend serves static files from `/uploads` |
| CORS errors | Check backend CORS configuration |
| Authentication fails | Verify JWT token in localStorage and Authorization header |
| Profile data missing | Ensure profile fetched after login before rendering forms |
