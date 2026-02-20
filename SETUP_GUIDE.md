# TeacherWorld - Complete Setup & Deployment Guide

A realistic, production-ready Teacher Job Portal like Naukri/Indeed

## Project Structure

\`\`\`
teacher-portal/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── uploads/
│   ├── seeds/
│   └── src/
│       ├── config/ (db, jwt, mailer, passport)
│       ├── middleware/ (auth, roles, upload)
│       ├── models/ (User, Job, Application, etc)
│       ├── controllers/
│       ├── routes/
│       └── services/
│
├── frontend/
│   ├── package.json
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles.css
│       └── pages/
│
└── README.md
\`\`\`

## 🚀 Quick Start (5 minutes)

### 1. Clone & Install

\`\`\`bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
\`\`\`

### 2. Setup Environment Variables

**Backend (.env)**
\`\`\`
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/teacher-portal
JWT_SECRET=super_secret_key_change_this
JWT_REFRESH_SECRET=refresh_secret_key_change_this
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_16_digit_app_password
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
GOOGLE_MAPS_API_KEY=your_maps_api_key
ZOOM_CLIENT_ID=your_zoom_id
ZOOM_CLIENT_SECRET=your_zoom_secret
\`\`\`

**Frontend (.env)**
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 3. Start Services

\`\`\`bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: MongoDB (if local)
mongod
\`\`\`

Access frontend at **http://localhost:5173**

## 📋 Features Implemented

### Authentication
- ✅ Email-based registration with OTP verification (Nodemailer)
- ✅ Separate teacher & institution roles
- ✅ JWT tokens (Access + Refresh)
- ✅ Forgot password functionality
- ✅ Google OAuth ready

### Teachers
- ✅ Complete profile with education & skills
- ✅ Upload resume, certificates, marks card
- ✅ Browse jobs with filters
- ✅ Apply for jobs
- ✅ Track applications
- ✅ Location-based job search

### Institutions
- ✅ Create institutional profile
- ✅ Post job openings
- ✅ Manage job applicants
- ✅ Update application status
- ✅ Upload study materials
- ✅ Search for candidates

### General
- ✅ Responsive design (mobile-first)
- ✅ Professional UI like Naukri/Indeed
- ✅ File upload system (resume, certificates)
- ✅ Email notifications
- ✅ Error handling & validation
- ✅ Loading states

## 🔧 Gmail App Password Setup

Required for OTP emails:

1. Go to https://myaccount.google.com
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-digit password
6. Paste in `.env` as `GMAIL_PASSWORD`

## 💾 Database Setup

### Using Local MongoDB

\`\`\`bash
# Install MongoDB
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
\`\`\`

### Using MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Seed Sample Data

\`\`\`bash
cd backend
npm run seed
\`\`\`

This creates:
- Admin user
- Sample institution
- Sample jobs

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` file
2. **JWT Secrets**: Use strong, unique secrets in production
3. **Passwords**: Hashed with bcrypt
4. **Rate Limiting**: Add in production
5. **CORS**: Configure for your domain
6. **File Uploads**: Validate file types & size
7. **Input Validation**: Sanitize all inputs

## 📁 File Upload Configuration

Currently accepts:
- **Resumes**: PDF, DOC, DOCX
- **Certificates**: PDF, JPG, PNG
- **Materials**: PDF, JPG, PNG

Max file size: 10MB

Change in `/backend/src/middleware/upload.js`

## 🧪 Test Accounts

After seeding:

**Admin**
- Email: admin@teacherworld.com
- Password: Admin@123

**Institution**
- Email: school@teacherworld.com
- Password: School@123

Create teacher account via registration.

## 🚢 Deployment

### Backend Deployment (Render)

1. Push to GitHub
2. Go to https://render.com
3. New → Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

**Netlify:**
\`\`\`bash
npm run build
# Drag and drop dist folder to netlify.com
\`\`\`

### Production Environment Variables

Change for production:
- `FRONTEND_URL`: Your domain
- `GOOGLE_CALLBACK_URL`: Your domain
- `VITE_API_URL`: Your backend URL
- `NODE_ENV`: production
- Strong random `JWT_SECRET`

## 📊 API Endpoints

### Auth
\`\`\`
POST   /api/auth/register-teacher
POST   /api/auth/register-institution
POST   /api/auth/verify-otp
POST   /api/auth/login
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
\`\`\`

### Jobs
\`\`\`
GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs/nearby
POST   /api/jobs (institution)
\`\`\`

### Applications
\`\`\`
POST   /api/applications
GET    /api/applications/my-applications
GET    /api/applications/job/:jobId
PATCH  /api/applications/:id (institution)
\`\`\`

### Profiles
\`\`\`
GET    /api/profile/teacher
PUT    /api/profile/teacher
POST   /api/profile/teacher/certificate
GET    /api/profile/institution
PUT    /api/profile/institution
\`\`\`

### Materials
\`\`\`
POST   /api/materials
GET    /api/materials
GET    /api/materials/my-materials
DELETE /api/materials/:id
\`\`\`

## 🐛 Troubleshooting

### "Cannot find module"
\`\`\`bash
npm install
\`\`\`

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Use MongoDB Atlas connection string if local DB isn't available

### OTP Not Sending
- Enable "Less secure app access" (Gmail)
- Use App Password (recommended)
- Check `GMAIL_USER` and `GMAIL_PASSWORD`

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Check frontend makes requests to correct API URL

### File Upload Issues
- Check `/uploads` folder exists
- Ensure user has write permissions
- Verify file type in allowed list

## 🎨 Customization

### Colors & Branding
Edit `/frontend/src/styles.css`:
\`\`\`css
:root {
  --primary: #1a5490;      /* Main brand color */
  --accent: #ff6b35;       /* Highlight color */
  --success: #2ecc71;
  --danger: #e74c3c;
}
\`\`\`

### Email Templates
Edit `/backend/src/config/mailer.js`

### Logo & Images
Add to `/frontend/src/` and import in components

## 📚 Next Steps

1. **Add Google Maps**: Integrate Google Maps API for location-based search
2. **Add Zoom Integration**: Connect Zoom for live sessions
3. **Add Payments**: Integrate Stripe for premium features
4. **Add Analytics**: Track user behavior
5. **Add Admin Dashboard**: Full admin control panel
6. **Mobile App**: React Native version

## 💬 Support

For questions or issues:
1. Check troubleshooting section
2. Review API documentation
3. Check environment variables
4. Review browser console for errors
5. Check server logs

## 📄 License

This project is provided as-is for educational and commercial use.

---

**Built with ❤️ for teachers and institutions**

Happy coding! 🚀
