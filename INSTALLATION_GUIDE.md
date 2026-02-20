# Detailed Installation Guide

## System Requirements

- Node.js 16.x or higher
- MongoDB 4.4 or higher
- 2GB RAM minimum
- 500MB disk space
- Internet connection

## Step 1: Install Node.js

### Windows
1. Download from https://nodejs.org (LTS version)
2. Run installer
3. Follow setup wizard
4. Verify: `node --version` and `npm --version`

### macOS
\`\`\`bash
brew install node
\`\`\`

### Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt update
sudo apt install nodejs npm
\`\`\`

## Step 2: Install MongoDB

### Option A: Local MongoDB (Development)

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Follow setup wizard
4. Services automatically start

**macOS:**
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

**Linux:**
\`\`\`bash
sudo apt install mongodb
sudo systemctl start mongodb
\`\`\`

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to mongodb.com/cloud
2. Sign up for free account
3. Create a cluster (M0 free tier)
4. Get connection string
5. Add to .env as MONGODB_URI

## Step 3: Get Gmail App Password

For email/OTP functionality:

1. Enable 2-Step Verification on Google Account
2. Go to myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Google generates 16-character password
5. Copy password to .env as SMTP_PASS

## Step 4: Clone Repository

\`\`\`bash
git clone https://github.com/yourname/teacher-portal.git
cd teacher-portal
\`\`\`

## Step 5: Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_change_this_123456
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this_123456
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SENDER_EMAIL=your_email@gmail.com
EOF

# (Or manually create .env and paste above content)

# Test backend
npm run dev
\`\`\`

Should see: "MongoDB connected" and "Server running on port 5000"

## Step 6: Frontend Setup (New Terminal)

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
\`\`\`

Should see: "Local: http://localhost:5173/"

## Step 7: Verify Setup

1. Open http://localhost:5173
2. You should see TeacherWorld home page
3. Click "Register as Teacher"
4. Fill in form with test data
5. You should see OTP verification screen
6. Check MongoDB/email for OTP
7. Complete registration

## Troubleshooting Installation

### "npm: command not found"
- Install Node.js properly
- Restart terminal/computer

### "MongoDB connection error"
- Ensure MongoDB is running:
  \`\`\`bash
  mongod  # Start MongoDB
  \`\`\`
- Or use MongoDB Atlas with MONGODB_URI

### "Port 5000 already in use"
\`\`\`bash
# Kill the process
lsof -ti:5000 | xargs kill -9
\`\`\`

### "Module not found"
\`\`\`bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### "CORS error"
- Ensure FRONTEND_URL in backend .env is exactly http://localhost:5173
- Restart backend server

## Next Steps

1. Review code structure in README_FINAL.md
2. Test registration and login
3. Post sample jobs
4. Apply for jobs
5. Track applications
6. Customize styling
7. Deploy to production

## Getting Help

1. Check COMPLETE_SETUP_GUIDE.md
2. Review terminal logs for errors
3. Verify all .env variables
4. Check MongoDB connection
5. Test with Postman if API calls fail

## File Sizes

After installation:
- backend/node_modules: ~300MB
- frontend/node_modules: ~400MB
- Total: ~700MB

If space is limited, delete these and run `npm install` when needed.
