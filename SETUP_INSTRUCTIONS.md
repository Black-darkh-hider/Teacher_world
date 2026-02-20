# TeacherWorld Job Portal - Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Gmail account with 2FA enabled

## Step 1: MongoDB Setup

### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Verify with: `mongo --version`

### Option B: Cloud MongoDB (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/teacher-portal`

## Step 2: Gmail Setup (For OTP Emails)

**IMPORTANT: Use App-Specific Password, NOT your Gmail password**

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password (remove spaces)
7. Paste it in backend/.env as GMAIL_PASSWORD

Your Gmail address goes in GMAIL_USER field.

## Step 3: Backend Setup

\`\`\`bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (already created, just verify it)
# Edit .env with your:
# - MONGODB_URI
# - GMAIL_USER and GMAIL_PASSWORD
# - JWT secrets (keep defaults for testing)

# Start backend server
npm run dev
# or for production: npm start

# You should see: "MongoDB connected" and "Server running on port 5000"
\`\`\`

## Step 4: Frontend Setup

\`\`\`bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (already created)
# Verify VITE_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev

# Frontend will open at http://localhost:5173
\`\`\`

## Step 5: Test Registration

1. Open http://localhost:5173 in your browser
2. Click "Register as Teacher"
3. Fill in:
   - Name: John Doe
   - Email: your-email@gmail.com (use your real email)
   - Password: password123
   - Confirm Password: password123
4. Click "Continue"
5. Check your email for OTP (check spam folder too)
6. Enter OTP and complete registration

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongo --version`
- Check port 5000 is free: `lsof -i :5000` (Mac/Linux)
- Check .env file exists with valid MONGODB_URI

### OTP not arriving
- Check GMAIL_USER and GMAIL_PASSWORD in .env
- Verify you used App-Specific Password (not regular Gmail password)
- Check spam/promotions folder in Gmail
- Check backend logs for email sending errors

### Network Error on registration
- Check frontend console (F12 → Console tab) for error
- Check backend is running on port 5000
- Check VITE_API_URL in frontend/.env matches backend URL
- Check CORS is enabled (it is by default)
- Backend console should show the request

### MongoDB connection error
- If using cloud: verify connection string in .env
- If using local: ensure MongoDB service is running
- Check username/password in connection string (if using cloud)

## Environment Variables Reference

**backend/.env:**
- MONGODB_URI: Your MongoDB connection string
- JWT_SECRET: Secret key for JWT tokens
- GMAIL_USER: Your Gmail address
- GMAIL_PASSWORD: 16-character app-specific password
- PORT: Backend server port (default 5000)
- FRONTEND_URL: Frontend URL for CORS

**frontend/.env:**
- VITE_API_URL: Backend API URL

## Common Errors

| Error | Solution |
|-------|----------|
| "Cannot GET /api/health" | Backend not running. Run `npm run dev` in backend folder |
| "Network Error" | Check backend is running and VITE_API_URL is correct |
| "OTP not received" | Check Gmail credentials and app-specific password |
| "MongoDB connection error" | Check MONGODB_URI and MongoDB service status |
| "CORS error" | Verify FRONTEND_URL in backend/.env matches your frontend URL |

## Next Steps

1. Complete the registration process
2. Test login with the credentials you created
3. Explore dashboard
4. Upload profile documents (resume, certificates)

Good luck!
