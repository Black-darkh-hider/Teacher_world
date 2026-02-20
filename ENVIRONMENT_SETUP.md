# Environment Variables Complete Setup Guide

## Quick Setup (Copy & Paste)

### Backend `.env` File

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/teacher-portal

# JWT Configuration (Generate random strings)
JWT_SECRET=super-secret-key-minimum-32-characters-long-random-string
JWT_REFRESH_SECRET=refresh-secret-key-minimum-32-characters-long-random-string

# Gmail SMTP (for OTP emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Google Maps API
GOOGLE_MAPS_API_KEY=your-maps-api-key

# Zoom Integration
ZOOM_CLIENT_ID=your-zoom-client-id
ZOOM_CLIENT_SECRET=your-zoom-client-secret
\`\`\`

### Frontend `.env` File

\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
\`\`\`

---

## Step-by-Step Configuration

### 1. Generate JWT Secrets

Open terminal and run:
\`\`\`bash
# Generate random JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output: 1a2b3c4d5e6f... (copy this to JWT_SECRET)

# Generate random JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output: 9z8y7x6w5v4u... (copy this to JWT_REFRESH_SECRET)
\`\`\`

### 2. Configure Gmail for OTP

**Step A: Enable 2-Factor Authentication**
1. Go to https://myaccount.google.com
2. Click "Security" in left menu
3. Enable "2-Step Verification"

**Step B: Create App Password**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your OS)
3. Google generates app password (16 characters)
4. Copy and paste to `GMAIL_PASSWORD` in .env

### 3. Get Google OAuth Credentials

**Step A: Create Google Cloud Project**
1. Go to https://console.cloud.google.com
2. Create new project "TeacherWorld"
3. Enable Google+ API

**Step B: Create OAuth Credentials**
1. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
2. Choose "Web application"
3. Add Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `http://localhost:5173` (frontend)
4. Copy Client ID and Secret to .env

### 4. Get Google Maps API Key

1. Go to https://console.cloud.google.com
2. Enable "Maps JavaScript API"
3. Create API key in Credentials
4. Restrict to your domain
5. Copy to `GOOGLE_MAPS_API_KEY`

### 5. Setup MongoDB

**Option A: Local MongoDB**
\`\`\`bash
# Mac
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt install mongodb
sudo systemctl start mongodb

# Windows - Use MongoDB installer from mongodb.com/download/community
\`\`\`

**Option B: MongoDB Atlas Cloud**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up free account
3. Create cluster "teacher-portal"
4. Create database user
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` and `<username>`
8. Paste to `MONGODB_URI`

Example:
\`\`\`
mongodb+srv://user:password@cluster.mongodb.net/teacher-portal
\`\`\`

### 6. Setup Zoom (Optional)

1. Go to https://marketplace.zoom.us/develop/create
2. Create server-to-server OAuth app
3. Copy Client ID and Secret to .env

---

## Verification Checklist

- [ ] Backend `.env` created with all fields
- [ ] Frontend `.env` created with all fields
- [ ] MongoDB running (test with `mongo` command)
- [ ] Gmail app password generated
- [ ] Google OAuth credentials created
- [ ] Google Maps API key generated
- [ ] JWT secrets generated (32+ characters)

---

## Testing Each Component

### Test 1: MongoDB Connection
\`\`\`bash
cd backend
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ MongoDB connected');
  process.exit(0);
}).catch(e => {
  console.log('❌ MongoDB failed:', e.message);
  process.exit(1);
});
"
\`\`\`

### Test 2: Gmail SMTP
\`\`\`bash
cd backend
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASSWORD }
});
transporter.verify((err, success) => {
  console.log(success ? '✅ Gmail configured' : '❌ Gmail failed: ' + err);
  process.exit(0);
});
"
\`\`\`

### Test 3: Frontend API Connection
\`\`\`bash
cd frontend
npm run dev

# Open browser console and run:
fetch('http://localhost:5000/api/health').then(r => r.json()).then(console.log)
# Should show: {status: "OK"}
\`\`\`

---

## Running Everything

### Terminal 1: Start Backend
\`\`\`bash
cd backend
npm install
npm run dev
# Output: Server running on port 5000
\`\`\`

### Terminal 2: Start Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
# Output: Local: http://localhost:5173/
\`\`\`

### Terminal 3: Check MongoDB (Optional)
\`\`\`bash
mongo
use teacher-portal
show collections
\`\`\`

Visit http://localhost:5173 and test:
1. Register new teacher
2. Verify OTP (check email)
3. Login
4. View jobs
5. Apply for job

---

## Troubleshooting

### "Cannot GET /api/auth/login"
- Backend not running on port 5000
- Check: `curl http://localhost:5000/api/health`

### "CORS error"
- Frontend URL doesn't match `FRONTEND_URL` in backend .env
- Clear browser cache: Ctrl+Shift+Delete

### "OTP not received"
- Gmail app password incorrect (must be 16 chars from Google)
- Gmail 2FA not enabled
- Check spam folder
- Verify `GMAIL_USER` matches

### "MongoDB connection timeout"
- MongoDB not running (`sudo systemctl status mongodb`)
- `MONGODB_URI` incorrect syntax
- For Atlas: IP not whitelisted (add 0.0.0.0/0 for development)

### "Google OAuth fails"
- Client ID doesn't match between backend and frontend
- Redirect URI not in Google Cloud Console
- Browser cookies blocked

---

## Credentials Safety Tips

1. **Never** commit `.env` to Git
2. `.env` already in `.gitignore`
3. For production: Use environment variable services
4. Rotate secrets periodically
5. Don't share .env files

## File Locations

\`\`\`
backend/.env          ← Backend credentials
frontend/.env         ← Frontend config
backend/.env.example  ← Template (safe to share)
frontend/.env.example ← Template (safe to share)
.gitignore           ← Prevents accidental commits
\`\`\`

Done! Your TeacherWorld is now fully configured and connected. 🚀
