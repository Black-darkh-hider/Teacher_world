# Teacher Portal - Complete System Documentation

## Overview
This is a comprehensive teacher-institution job portal system that connects educators with educational institutions. The system provides two main portals: one for teachers and one for institutions, with features including profile management, job applications, interview scheduling, and real-time communication.

## Table of Contents
1. [Teacher Side Features](#teacher-side-features)
2. [Institution Side Features](#institution-side-features)
3. [Job Portal System Level](#job-portal-system-level)
4. [System Architecture](#system-architecture)
5. [API Endpoints](#api-endpoints)
6. [Database Models](#database-models)
7. [Troubleshooting](#troubleshooting)

---

## Teacher Side Features

### A. Teacher Home Dashboard (After Login)

#### Profile Strength Indicator
- Visual indicator showing profile completion percentage (0-100%)
- Tips to improve profile visibility and reach

#### Quick Stats
- **Total Applied Jobs**: Number of job applications submitted
- **Shortlisted Count**: Jobs where teacher has been shortlisted
- **Interviews Scheduled**: Upcoming interview dates and times
- **New Messages**: Unread messages from institutions

#### Recommended Jobs
- AI-powered job recommendations based on:
  - Location preferences
  - Skills match
  - Experience level
  - Subject taught
  - Expected salary range

#### Quick Actions
- "Update Profile" - Modify personal, professional, and location information
- "Upload Resume" - Add or update resume PDF
- "Find Jobs" - Search for job opportunities

### B. Teacher Profile (Expanded Sections)

#### 1. Basic Information
- Full name (from registration)
- Email address
- Phone number
- Gender (Male/Female/Other)
- Date of birth
- Profile photo/avatar

#### 2. Professional Information
- **Total Experience**: Years in teaching profession
- **Relevant Teaching Experience**: Years in current teaching focus area
- **Subjects Taught**: Multi-select (Physics, Math, English, Chemistry, Biology, History, Geography, etc.)
- **Classes Level Taught**: 
  - Primary (1-5)
  - Middle School (6-10)
  - Senior Secondary (11-12)
  - College/University
- **Specializations**: Advanced expertise areas
- **Resume Builder**: Integrated resume editor
- **Resume Upload**: PDF or DOC file support
- **Skills Tags**: List of core teaching skills
- **Languages Spoken**: Language proficiencies with proficiency levels

#### 3. Education Section
- Degrees (B.A., B.Ed, M.A., M.Ed, Ph.D., etc.)
- Field of study/specialization
- Institution name
- Graduation year
- GPA (if applicable)
- Certificates and diplomas (B.Ed, D.Ed, M.Ed, etc.)
- Online course certificates
- Certificate upload functionality

#### 4. Job Preferences
- Expected salary range (min-max)
- Preferred location(s)
- Job type: 
  - Full-time
  - Part-time
  - Contract
  - Online
- Remote/Hybrid availability options
- Shift preference:
  - Morning
  - Afternoon
  - Evening
  - Flexible

#### 5. Location
- Live location (GPS map pin - with permission)
- Current address (full address)
- Ready to relocate: Yes/No toggle
- Multiple location preferences

### C. Jobs Section

#### 1. Job Search
- **Search Bar**: Search by subject, school name, region
- **Advanced Filters**:
  - Experience level required
  - Salary range
  - Job type (full-time, part-time, online)
  - Institution type (school, college, coaching center)
  - Distance from live location (km-based)
  - Posted date (last 7 days, 30 days, etc.)

#### 2. Job Details Page
- Full job description
- Responsibilities and duties
- Required qualifications
- Pay & benefits/perks
- Institution rating and reviews
- Location map view
- Similar job recommendations
- "Apply" button (with one-click application)
- "Save Job" button (bookmark for later)

#### 3. Saved Jobs
- Save/unsave jobs for later
- Auto-expiry for old saved jobs (90 days default)
- Easy access from dashboard
- Export saved jobs as list

#### 4. Applied Jobs Tracking
- Complete application timeline
- Application status updates:
  - Sent
  - Viewed
  - Shortlisted
  - Rejected
  - Interview scheduled
  - Offer extended
- Ability to withdraw applications
- Last updated timestamp for each application

### D. Interview System

#### 1. Interview Scheduling
- Institution chooses time slots
- Teacher gets auto-reminder
- Reschedule option with new time proposals
- Interview location/link (for online interviews)

#### 2. Demo Class / Zoom-like Session
- High-quality video call integration
- Whiteboard tools for demonstration
- Screen sharing capability
- Document upload during session
- Class recording capability
- Session notes/feedback from institution

### E. Messaging & Communication

#### Features
- Real-time chat with institutions
- Typing indicator
- "Seen" status for messages
- Send resume, documents, videos
- Emoji and formatting support
- Auto-greeting templates
- Message search functionality

### F. Analytics & Insights
- Profile view history (who viewed your profile)
- Profile score calculation (0-100)
- Tips to improve profile visibility
- Job match percentage for each job
- Monthly activity report

### G. Notifications
- New job alerts (can set preferences)
- Interview update notifications
- Chat message notifications
- Job expiry alerts
- Application status changes

### H. Settings
- Account settings
- Reset password
- Privacy settings
- Block/unblock institutions
- Account deactivation
- Data export

---

## Institution Side Features

### A. Institution Home Dashboard (After Login)

#### Key Metrics
- **Total Job Posts**: Active job listings
- **New Applicants**: New applications received (with notification badge)
- **Shortlisted Candidates**: Teachers marked for next round
- **Interviews Scheduled**: Upcoming interviews

#### Quick Actions
- "Post Job" - Create new job listing
- "Search Teachers" - Browse teacher database
- "Open Applications" - View all pending applications
- "Messages" - Chat with candidates

### B. Institution Profile (Expanded)

#### 1. Basic Information
- Institution name
- Logo upload
- Cover banner image
- Institution description (about, mission, vision)
- Establishment year
- Institution type:
  - School (K-12)
  - College/University
  - Coaching Center
  - Online Academy
  - Other

#### 2. Location
- Full address
- Live map location (GPS coordinates)
- Multiple branch locations
- Service area radius

#### 3. Contact Details
- HR name
- HR mobile number
- HR email
- Website URL
- General inquiry email

#### 4. Additional Information
- Accreditation details
- Facilities offered:
  - Hostel
  - Labs
  - Transport
  - Canteen
- Photo gallery (up to 10 images)

### C. Job Posting Module

#### 1. Create Job Post
Form fields include:
- Job title
- Required subjects (multi-select)
- Minimum experience required
- Salary range (min-max)
- Job schedule (e.g., 9 AM - 4 PM)
- Employment type (full-time, part-time, contract)
- Detailed job responsibilities
- Required qualifications
- Additional perks/benefits
- Application deadline

#### 2. Manage Jobs
- **Active Jobs**: View live listings
- **Archived Jobs**: View closed listings
- **Job Statistics**:
  - Total views
  - Total saves
  - Application count
  - Click-through rate
- **Boost/Sponsor**: Option to promote job (paid feature)
- Quick edit/delete options

### D. Applications Module

#### 1. View Applicants
- List of all applicants per job posting
- Filter options:
  - Teaching experience
  - Salary expectation
  - Skills match
  - Location distance
  - Profile completeness score
- Sort by: Latest, Relevance, Experience

#### 2. Applicant Profile Page
- Full teacher profile view
- Resume view and download
- Verified badges/credentials
- Subjects & skills assessment
- Years of experience
- Previous employer history
- Quick actions:
  - Schedule interview
  - Shortlist
  - Reject with feedback
  - Send message

### E. Teacher Search (Global Pool)

#### Search Features
- Search teachers across entire portal
- Location-based search (radius-based)
- Skills/subject search
- Experience level filter
- Online teacher filter (for remote positions)
- Distance from institution filter
- Availability filter

### F. Messaging

#### Features
- Real-time chat with candidates
- Share meeting links
- Send interview details/assignments
- HR team chat access
- Message templates
- Bulk messaging (for announcements)

### G. Interview Tools

#### 1. Schedule Interview
- Choose preferred time from availability
- Send interview invite with calendar attachment
- Auto SMS/email reminders to candidate
- Interview type selection (online, in-person, hybrid)
- Interview panel info

#### 2. Demo Class (Zoom-like Feature)
- Host online class/demo session
- Interactive whiteboard
- Screen sharing
- Timed session with countdown
- Recording capability
- Automatic recording storage

### H. Analytics

#### Metrics
- Job performance statistics (views, applications, conversions)
- Candidate quality score
- Hiring efficiency metrics (time to hire)
- View history of teacher profiles
- Monthly hiring trends

### I. Teams & Roles

#### Features
- Multiple HR login accounts
- Role-based access:
  - **Admin**: Full system access
  - **Recruiter**: Can post jobs and manage applications
  - **Viewer**: Read-only access
- Add/remove team members
- Activity logs

### J. Settings
- Billing and subscription plans
- Payment history
- Institution profile management
- Logo and branding
- Notification preferences

---

## Job Portal (System-Level)

### Features Available to Both User Types

#### Teacher Side System Features
- Personal dashboard with analytics
- Advanced job search with multiple filters
- One-click job application system
- Application tracking and status updates
- Demo class invitations and scheduling
- Real-time chat with institutions
- Profile recommendations and insights
- Interview scheduling and reminders
- Document management (resume, certificates)
- Notification center
- Message history and search

#### Institution Side System Features
- Comprehensive job management system
- Applicant management and filtering
- Global teacher talent search pool
- Advanced video interview tools
- Built-in demo class platform (Zoom-like)
- Real-time communication tools
- Team collaboration with role-based access
- Performance analytics and reporting
- Subscription and billing management
- Candidate recommendations

#### Shared Features
- Real-time chat and messaging
- Video interview platform (Zoom-like integration)
- Document sharing and uploads
- Notification system
- Analytics dashboard
- User authentication and security
- Profile management
- Search and filter capabilities

---

## System Architecture

### Frontend Structure
\`\`\`
frontend/
├── src/
│   ├── pages/
│   │   ├── TeacherDashboard.jsx
│   │   ├── InstitutionDashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Jobs.jsx
│   │   ├── Applications.jsx
│   │   ├── LoginTeacher.jsx
│   │   ├── LoginInstitution.jsx
│   │   ├── RegisterTeacher.jsx
│   │   ├── RegisterInstitution.jsx
│   │   └── Zoom.jsx
│   ├── components/
│   │   ├── ProfileCompletionModal.jsx
│   │   ├── NearbyJobsMapSection.jsx
│   │   └── JobsMapView.jsx
│   └── main.jsx
\`\`\`

### Backend Structure
\`\`\`
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   └── zoomController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── TeacherProfile.js
│   │   ├── InstitutionProfile.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── StudyMaterial.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   └── middleware/
│       ├── auth.js
│       └── upload.js
└── server.js
\`\`\`

---

## API Endpoints

### Authentication Routes

#### Register Teacher
\`\`\`
POST /api/auth/register/teacher
Body: {
  email: string,
  password: string,
  fullName: string
}
Response: { message: string, user: object }
\`\`\`

#### Register Institution
\`\`\`
POST /api/auth/register/institution
Body: {
  email: string,
  password: string,
  institutionName: string
}
Response: { message: string, user: object }
\`\`\`

#### Login
\`\`\`
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: { accessToken: string, user: object }
\`\`\`

### Profile Routes

#### Get Teacher Profile
\`\`\`
GET /api/profile/teacher
Headers: { Authorization: "Bearer <token>" }
Response: TeacherProfile object
\`\`\`

#### Update Teacher Profile ⭐ IMPORTANT
\`\`\`
PUT /api/profile/teacher
Headers: { Authorization: "Bearer <token>" }
Body (multipart/form-data): {
  phoneNumber: string,
  dateOfBirth: date,
  gender: string,
  city: string,
  state: string,
  country: string,
  skills: JSON array,
  bio: string,
  availability: string,
  education: JSON array,
  experience: JSON array,
  resume: file (optional),
  marksCard: file (optional)
}
Response: { message: "Profile updated successfully", profile: object }
Status: 200 OK or 404 if profile not found or 500 on error
\`\`\`

#### Upload Resume
\`\`\`
POST /api/profile/teacher/resume
Headers: { Authorization: "Bearer <token>" }
Body (multipart/form-data): { resume: file }
Response: { message: string, resumeUrl: string, profile: object }
\`\`\`

#### Upload Marks Card
\`\`\`
POST /api/profile/teacher/marks-card
Headers: { Authorization: "Bearer <token>" }
Body (multipart/form-data): { marksCard: file }
Response: { message: string, marksCardUrl: string, profile: object }
\`\`\`

### Job Routes

#### Get All Jobs
\`\`\`
GET /api/jobs?city=<city>&subject=<subject>&page=<number>
Response: { jobs: array, total: number, pages: number }
\`\`\`

#### Get Job Details
\`\`\`
GET /api/jobs/<jobId>
Response: Job object with institution details
\`\`\`

#### Post New Job (Institution Only)
\`\`\`
POST /api/jobs
Headers: { Authorization: "Bearer <token>" }
Body: {
  title: string,
  subjects: array,
  experience: number,
  salary: { min: number, max: number },
  type: string,
  responsibilities: string,
  requirements: string
}
Response: { message: string, job: object }
\`\`\`

### Application Routes

#### Apply to Job
\`\`\`
POST /api/applications
Headers: { Authorization: "Bearer <token>" }
Body: { jobId: string, coverLetter: string }
Response: { message: string, application: object }
\`\`\`

#### Get Applications (with pagination)
\`\`\`
GET /api/applications?page=<number>&status=<status>
Headers: { Authorization: "Bearer <token>" }
Response: { applications: array, total: number, pages: number }
\`\`\`

---

## Database Models

### User Model
\`\`\`javascript
{
  email: string (unique),
  password: string (hashed),
  role: enum ["teacher", "institution"],
  createdAt: date,
  updatedAt: date
}
\`\`\`

### TeacherProfile Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  phoneNumber: string,
  dateOfBirth: date,
  gender: string,
  education: [{
    degree: string,
    field: string,
    institution: string,
    graduationYear: number,
    gpa: number
  }],
  skills: [string],
  experience: [{
    title: string,
    institution: string,
    startDate: date,
    endDate: date,
    description: string
  }],
  city: string,
  state: string,
  country: string,
  coordinates: { latitude: number, longitude: number },
  resumeUrl: string,
  marksCardUrl: string,
  bio: string,
  availability: enum ["immediately", "1-month", "3-months"]
}
\`\`\`

### InstitutionProfile Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  institutionName: string,
  phoneNumber: string,
  address: string,
  city: string,
  state: string,
  country: string,
  type: enum ["school", "college", "coaching"],
  website: string
}
\`\`\`

### Job Model
\`\`\`javascript
{
  institutionId: ObjectId (ref: InstitutionProfile),
  title: string,
  subjects: [string],
  minExperience: number,
  salary: { min: number, max: number },
  type: enum ["full-time", "part-time", "contract"],
  responsibilities: string,
  requirements: string,
  createdAt: date,
  updatedAt: date
}
\`\`\`

### Application Model
\`\`\`javascript
{
  jobId: ObjectId (ref: Job),
  teacherId: ObjectId (ref: TeacherProfile),
  institutionId: ObjectId (ref: InstitutionProfile),
  status: enum ["sent", "viewed", "shortlisted", "rejected", "interview_scheduled"],
  coverLetter: string,
  appliedAt: date,
  updatedAt: date
}
\`\`\`

---

## Troubleshooting

### Common Issues

#### 1. Profile Update Returns 404 Error
**Problem**: "Failed to update profile: Request failed with status code 404"

**Solution**: 
- Ensure you're using **PUT** request method, not POST
- Verify the endpoint is `/api/profile/teacher` (not `/api/profile`)
- Check that authentication token is valid and included in headers
- Ensure user is logged in with "teacher" role

**Related Endpoints**:
- ✅ `PUT /api/profile/teacher` - Update existing profile
- ❌ `POST /api/profile/teacher` - This endpoint doesn't exist
- ✅ `POST /api/profile/teacher/resume` - Upload resume file
- ✅ `POST /api/profile/teacher/marks-card` - Upload marks card

#### 2. File Upload Fails
**Problem**: Resume or marks card not uploading

**Check**:
- File size is under 10MB
- File format is correct (PDF, DOC, DOCX for resume; PDF, JPG, PNG for marks card)
- `Content-Type` header is `multipart/form-data`
- Authorization token is valid

#### 3. Authentication Token Issues
**Problem**: "Unauthorized" or "Invalid token" errors

**Solution**:
- Token should be sent in header: `Authorization: Bearer <token>`
- Tokens expire - users need to re-login
- Check token format - should be JWT

#### 4. CORS Errors
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Check**:
- Backend CORS is configured to allow frontend URL
- Request includes valid credentials if needed
- Frontend URL matches backend CORS configuration

#### 5. MongoDB Connection Issues
**Problem**: "MongoDB connection FAILED"

**Solution**:
- Verify MONGODB_URI environment variable is set correctly
- Check MongoDB server is running
- Ensure database credentials are correct
- Check network connectivity to MongoDB host

---

## Environment Variables

### Backend (.env)
\`\`\`
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

---

## Development Tips

1. **Enable Debug Logs**: Check browser console and server terminal for detailed error messages
2. **API Testing**: Use Postman to test endpoints before frontend integration
3. **Token Management**: Store JWT in localStorage (or sessionStorage for security)
4. **File Uploads**: Always use FormData for multipart/form-data requests
5. **Error Handling**: Implement proper error boundaries and user feedback

---

## Contact & Support

For issues or questions:
1. Check this documentation first
2. Review error logs in console
3. Verify API endpoint and request format
4. Check database connection and data

**Last Updated**: November 11, 2025
