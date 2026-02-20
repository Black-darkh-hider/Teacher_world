# TeacherWorld - START HERE

Welcome to TeacherWorld! This is your complete Teacher Job Portal application.

## What You Have

A fully functional web application with:
- Teacher registration & login
- Institution registration & login
- Job posting and applications
- Application tracking
- Email verification with OTP
- Responsive design
- MongoDB database
- Express backend
- React frontend

## Quick Start (Choose One)

### Option 1: Copy-Paste Quick Start (Fastest)

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm install
mongod  # Keep running, or use MongoDB Atlas
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Then open: **http://localhost:5173**

### Option 2: Detailed Setup

Follow: `INSTALLATION_GUIDE.md`

## First Time User Guide

### 1. Setup .env Files

Backend (.env):
\`\`\`
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=mysecretkey123
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_16_chars
SENDER_EMAIL=your_email@gmail.com
\`\`\`

Frontend (.env):
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 2. Start Both Servers

Backend: `npm run dev` in backend folder
Frontend: `npm run dev` in frontend folder

### 3. Test Registration

1. Go to http://localhost:5173
2. Click "Register as Teacher"
3. Enter test data
4. Enter OTP when prompted
5. Login and explore

## Documentation Files

- **START_HERE.md** - This file
- **QUICK_START.md** - 5-minute setup
- **INSTALLATION_GUIDE.md** - Step-by-step installation
- **COMPLETE_SETUP_GUIDE.md** - Detailed configuration
- **README_FINAL.md** - Full project overview
- **DEPLOYMENT.md** - Production deployment
- **GITHUB_DEPLOYMENT.md** - Deploy to GitHub & production

## File Structure

\`\`\`
├── backend/              # Node.js Express server
├── frontend/             # React application
├── docs/                 # Documentation
├── START_HERE.md         # This file
└── README_FINAL.md       # Complete guide
\`\`\`

## Key Features to Try

1. **Register as Teacher** - Test full registration with OTP
2. **Post a Job** - Login as institution and post job
3. **Apply for Job** - Apply as teacher from job listing
4. **Track Applications** - See status updates in dashboard
5. **Search Jobs** - Filter jobs by city/keyword

## API Endpoints (For Testing)

Base URL: http://localhost:5000/api

Examples:
- POST /auth/register-teacher
- POST /auth/login
- GET /jobs
- POST /jobs (institution only)
- POST /applications

## Default Test Credentials (After Seeding)

Teacher:
- Email: teacher@example.com
- Password: password123

Institution:
- Email: institution@example.com
- Password: password123

To seed: `cd backend && node seeds/seed.js`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| MongoDB error | Start MongoDB: `mongod` |
| OTP not received | Check Gmail spam, verify SMTP_USER/SMTP_PASS |
| CORS error | Check FRONTEND_URL in backend .env |
| npm install fails | Delete node_modules, run npm install again |

## Environment Setup Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Gmail account with app password
- [ ] Clone/download project
- [ ] Created backend/.env
- [ ] Created frontend/.env
- [ ] MongoDB running
- [ ] Backend started (npm run dev)
- [ ] Frontend started (npm run dev)
- [ ] Able to access http://localhost:5173

## What Happens Next

1. Frontend loads at localhost:5173
2. You see home page with navigation
3. Click register to create account
4. Verify email with OTP
5. Login to dashboard
6. Browse/post jobs
7. Track applications

## Customization

You can customize:
- **Styling** - Edit `frontend/src/styles.css`
- **Colors** - Update CSS variables in styles.css
- **Logo/Brand** - Replace in home page
- **Email Templates** - Update in backend config
- **Job Fields** - Modify Job model in backend

## Next Steps

1. **Learn the Code** - Review frontend pages and backend controllers
2. **Add Features** - Implement Google Maps, Zoom, OAuth
3. **Deploy** - Follow DEPLOYMENT.md for production
4. **Scale** - Add caching, load balancing, CDN

## Need Help?

1. Check the relevant documentation file above
2. Review error messages in browser console or terminal
3. Verify all environment variables
4. Check MongoDB connection
5. Review API response in browser Network tab

## Support Resources

- Backend errors: Check `backend/src/controllers/`
- Frontend errors: Check browser console (F12)
- Database errors: Check MongoDB/MongoDB Atlas
- Email errors: Check backend logs + Gmail app password

## Deployment (When Ready)

When you want to go live:

1. **Backend** → Deploy to Render.com (free tier available)
2. **Frontend** → Deploy to Vercel (free tier available)
3. **Database** → Use MongoDB Atlas (free tier available)

See GITHUB_DEPLOYMENT.md for step-by-step instructions.

---

## You're All Set!

Everything is ready to run. Just:

1. Create .env files (copy examples above)
2. Run `npm install` in both folders
3. Run `npm run dev` in both folders
4. Open http://localhost:5173

**Enjoy building TeacherWorld!**

Questions? Check the documentation files or review the code comments.
