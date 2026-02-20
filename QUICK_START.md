# Quick Start Guide

## 1. Backend (Terminal 1)

\`\`\`bash
cd backend
npm install
\`\`\`

Create `.env`:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SENDER_EMAIL=your_email@gmail.com
\`\`\`

Start MongoDB:
\`\`\`bash
mongod  # Keep running in background
\`\`\`

Run backend:
\`\`\`bash
npm run dev
\`\`\`

## 2. Frontend (Terminal 2)

\`\`\`bash
cd frontend
npm install
\`\`\`

Create `.env`:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

Run frontend:
\`\`\`bash
npm run dev
\`\`\`

## 3. Access the App

Open browser to: **http://localhost:5173**

## Test Accounts (after seeding)

**Teacher:**
- Email: teacher@example.com
- Password: password123

**Institution:**
- Email: institution@example.com
- Password: password123

Done! Your app is running!
