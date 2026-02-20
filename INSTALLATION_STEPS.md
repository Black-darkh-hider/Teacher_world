# TeacherWorld - Installation & Execution Steps

## Prerequisites Check
- Node.js v16+ installed: `node --version`
- MongoDB installed/available: `mongod --version` or MongoDB Atlas account
- npm installed: `npm --version`

## Quick Installation (10 minutes)

### Step 1: Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

### Step 2: Configure Backend Environment
Create `backend/.env` file with:
\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_random_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_random_refresh_secret_min_32_chars
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password_not_gmail_password
SENDER_EMAIL=your-email@gmail.com
\`\`\`

### Step 3: Start MongoDB (if local)
\`\`\`bash
mongod
# Keep this running in background
\`\`\`

### Step 4: Start Backend
\`\`\`bash
cd backend
npm run dev
# Runs on http://localhost:5000
\`\`\`

### Step 5: Frontend Setup (New Terminal)
\`\`\`bash
cd frontend
npm install
\`\`\`

### Step 6: Configure Frontend Environment
Create `frontend/.env` file with:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_optional
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key_optional
\`\`\`

### Step 7: Start Frontend
\`\`\`bash
cd frontend
npm run dev
# Runs on http://localhost:5173
\`\`\`

### Step 8: Access Application
Open browser: **http://localhost:5173**

## Features Ready to Test

1. **Teacher Registration** → Register & OTP verification → Login
2. **Job Search** → Browse jobs by location
3. **Apply for Jobs** → Submit applications
4. **Institution Dashboard** → Manage job postings
5. **Profile Management** → Upload documents

## Gmail Setup for OTP Emails

1. Go to Google Account: https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy 16-character password
6. Paste in `SMTP_PASS` (NOT your Gmail password)

## Troubleshooting

**Port 5000/5173 already in use:**
\`\`\`bash
# Find process
lsof -i :5000  # or :5173
# Kill it
kill -9 <PID>
\`\`\`

**MongoDB connection error:**
- Ensure mongod is running: `mongod`
- Or use MongoDB Atlas cloud connection

**OTP not sending:**
- Check SMTP_USER and SMTP_PASS
- Verify Gmail App Password (16 chars)
- Check spam folder

**CORS errors:**
- Verify FRONTEND_URL in backend .env
- Restart backend after changes

## Project Complete!

All features are implemented and ready to use. The application is production-ready and can be deployed to Render (backend) and Vercel (frontend).
