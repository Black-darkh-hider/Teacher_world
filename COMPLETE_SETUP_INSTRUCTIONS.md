# Complete TeacherWorld Job Portal - Setup & Deployment Guide

## Project Overview
TeacherWorld is a comprehensive job portal connecting teachers with educational institutions. The platform includes:
- Teacher and Institution registration with OTP verification
- Profile management with document uploads (resume, certificates, marks cards)
- Job posting and browsing with location-based search
- Application management and tracking
- Direct messaging and interview scheduling

## System Architecture

### Technology Stack
**Frontend:**
- React with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons

**Backend:**
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Multer for file uploads
- SendGrid/Gmail for email

**Database:**
- MongoDB (Local or Atlas)
- Collections: users, profiles, jobs, applications, materials, OTP tokens

## Quick Start (5 Minutes)

### Backend Setup
\`\`\`bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file with:
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
JWT_SECRET=your-secret-key-here
REFRESH_TOKEN_SECRET=your-refresh-secret-key

# 4. Start backend
node server.js
# Backend runs on http://localhost:5000
\`\`\`

### Frontend Setup
\`\`\`bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file with:
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key

# 4. Start frontend
npm run dev
# Frontend runs on http://localhost:5173
\`\`\`

### Test the Application
1. Visit http://localhost:5173
2. Register as Teacher or Institution
3. Verify with OTP sent to email
4. Complete profile with documents
5. Browse jobs and apply

## Key Features Implemented

### 1. Authentication System
- OTP-based email verification
- Forgot password with OTP recovery
- Forgot username with email verification
- JWT token-based sessions
- Role-based access (Teacher/Institution)

### 2. Profile Management
- Complete personal information
- Education history with GPA
- Professional experience
- Skills management
- Resume upload (PDF, DOC, DOCX)
- Marks card/certificate upload (PDF, JPG, PNG)

### 3. Job Portal
- Browse available jobs
- Location-based job search with Google Maps
- Job details and requirements
- Apply to positions
- Track applications

### 4. Institution Features
- Post job openings
- View applications
- Manage job listings
- Profile verification

### 5. Frontend Pages
- Home page with features overview
- Services page with service descriptions
- Contact page with form
- Privacy & Terms page
- Individual job detail pages

## Fixed Issues

### Issue 1: Parser Error "expected a value"
**Solution:** Fixed JSON parsing in profile controller with proper error handling and safe parsing functions

### Issue 2: Resume Upload Not Saving
**Solution:** 
- Added separate upload endpoints for resume and marks card
- Implemented proper file handling in multer middleware
- Added file validation and directory creation

### Issue 3: Blank Page After Login
**Solution:** Fixed Google Maps API initialization and error handling in NearbyJobsMapSection

### Issue 4: Missing Authentication Features
**Solution:** Implemented OTP-based forgot password and username recovery

## Database Collections

### users
\`\`\`javascript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  name: string,
  role: "teacher" | "institution",
  verified: boolean,
  createdAt: date
}
\`\`\`

### teacherprofiles
\`\`\`javascript
{
  userId: ObjectId,
  phoneNumber: string,
  education: [{degree, field, institution, graduationYear, gpa}],
  experience: [{title, institution, startDate, endDate, description}],
  skills: [string],
  resumeUrl: string,
  marksCardUrl: string,
  bio: string,
  city: string,
  state: string,
  country: string
}
\`\`\`

### institutionprofiles, jobs, applications
[See MongoDB_SETUP.md for complete schema]

## API Endpoints

### Authentication
- POST `/api/auth/register-teacher` - Register teacher
- POST `/api/auth/register-institution` - Register institution
- POST `/api/auth/verify-otp` - Verify OTP
- POST `/api/auth/login` - Login
- POST `/api/auth/forgot-password` - Forgot password
- POST `/api/auth/reset-password` - Reset password
- POST `/api/auth/forgot-username` - Forgot username
- POST `/api/auth/verify-username-recovery` - Verify username recovery

### Profile
- GET `/api/profile/teacher` - Get teacher profile
- PUT `/api/profile/teacher` - Update teacher profile
- POST `/api/profile/teacher/resume` - Upload resume
- POST `/api/profile/teacher/marks-card` - Upload marks card
- POST `/api/profile/teacher/education` - Add education
- POST `/api/profile/teacher/certificate` - Upload certificate

### Jobs
- GET `/api/jobs` - List all jobs
- GET `/api/jobs/:id` - Get job details
- POST `/api/jobs` - Create job (institution only)

### Applications
- GET `/api/applications` - List user applications
- POST `/api/applications` - Apply to job

## Deployment Instructions

### Option 1: Render + Vercel (Recommended)

**Backend on Render:**
1. Create Render account and connect GitHub
2. Create web service for backend
3. Set environment variables
4. Deploy

**Frontend on Vercel:**
1. Create Vercel account and connect GitHub
2. Select frontend directory
3. Set environment variables
4. Deploy

### Option 2: Local Server
\`\`\`bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm run dev

# Access at http://localhost:5173
\`\`\`

See DEPLOYMENT_GUIDE.md for detailed instructions.

## Configuration

### Email Setup (Gmail)
1. Enable 2-Step Verification in Gmail
2. Generate App Password (16-character password)
3. Use as GMAIL_PASSWORD in .env

### Google Maps API
1. Visit https://console.cloud.google.com
2. Create new project
3. Enable Maps JavaScript API
4. Create API key
5. Add to VITE_GOOGLE_MAPS_API_KEY

### MongoDB
1. Local: Install MongoDB Community Server
2. Cloud: Create MongoDB Atlas cluster and connection string
3. Add MONGODB_URI to backend .env

## Performance Optimization

### Frontend
- Lazy load components
- Optimize images
- Minify CSS/JS
- Use CDN for assets

### Backend
- Database indexing on email, userId
- Connection pooling for MongoDB
- Caching for job listings
- Pagination for large result sets

### Deployment
- Enable gzip compression
- Use reverse proxy (Nginx)
- Implement rate limiting
- Enable CORS selectively

## Security Measures

✓ Password hashing with bcrypt
✓ JWT token-based auth
✓ OTP verification for sensitive operations
✓ File upload validation
✓ CORS protection
✓ SQL injection prevention (MongoDB)
✓ XSS protection
✓ HTTPS enforcement

## Troubleshooting

### Backend Won't Start
\`\`\`bash
# Check if port 5000 is in use
netstat -ano | findstr :5000 (Windows)
lsof -i :5000 (Mac/Linux)

# Use different port
PORT=5001 node server.js
\`\`\`

### MongoDB Connection Error
\`\`\`bash
# Verify MongoDB is running
# Windows: net start MongoDB
# Check connection string in .env
# Verify MongoDB port 27017 is accessible
\`\`\`

### Frontend API Calls Fail
- Check VITE_API_URL in .env
- Verify backend is running
- Check CORS settings in backend
- Look at browser network tab for errors

## Next Steps

1. **Set up MongoDB Atlas** (cloud database)
2. **Configure email provider** (Gmail/SendGrid)
3. **Deploy backend** to Render
4. **Deploy frontend** to Vercel
5. **Set up custom domain** (optional)
6. **Enable SSL/HTTPS** (automatic on Vercel/Render)
7. **Monitor and scale** as needed

## Support & Resources

- MongoDB Docs: https://docs.mongodb.com
- Express.js: https://expressjs.com
- React: https://react.dev
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs

## License
[Add your license here]

## Contributing
[Add contribution guidelines]

---
Last Updated: January 2025
Version: 1.0.0
