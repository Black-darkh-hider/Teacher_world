# 🎉 Welcome to TeacherWorld

Your complete Teacher Job Portal is ready to run!

## ⚡ 30-Second Setup

\`\`\`bash
# Terminal 1 - Backend
cd backend
cp .env.example .env
# Edit .env with your Gmail & MongoDB details
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
cp .env.example .env
npm install
npm run dev

# Terminal 3 - MongoDB (if local)
mongod
\`\`\`

Visit **http://localhost:5173** 🚀

## ✨ What's Included

### Backend (Node.js + Express)
- Complete authentication system with OTP
- 7 MongoDB models (User, Job, Application, etc)
- 30+ API endpoints
- File upload system
- Email notifications
- Role-based access control
- Secure JWT tokens

### Frontend (React + Vite)
- 10+ pages (Home, Jobs, Dashboard, Profile, etc)
- Responsive design
- Real-time application tracking
- Job search & filtering
- Professional UI (Naukri-style)

### Database (MongoDB)
- User management
- Job postings
- Applications tracking
- Profile management
- Study materials
- Complete schemas

## 🎯 Quick Features Test

### As a Teacher:
1. Register → Verify OTP → Complete Profile
2. Browse Jobs → Apply → Track Status

### As an Institution:
1. Register → Verify OTP → Complete Profile
2. Post Job → View Applications → Update Status

## 📝 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend configuration |
| `frontend/.env` | Frontend configuration |
| `backend/src/models/` | Database schemas |
| `backend/src/controllers/` | API logic |
| `frontend/src/pages/` | React pages |
| `SETUP_GUIDE.md` | Detailed setup |

## 🔑 Key Credentials (After Seed)

\`\`\`
Admin:
  Email: admin@teacherworld.com
  Pass: Admin@123

Institution:
  Email: school@teacherworld.com
  Pass: School@123
\`\`\`

## 🚀 Next Steps

1. **Gmail Setup**: Get App Password from Gmail
2. **Test Registration**: Try the full OTP flow
3. **Customize**: Edit colors in styles.css
4. **Deploy**: Follow deployment guide
5. **Monetize**: Add Stripe for premium

## 📞 Common Issues

**OTP not sending?**
- Check Gmail App Password
- Ensure GMAIL_USER is set

**Connection refused?**
- Start MongoDB: `mongod`
- Check backend is running

**Frontend not loading?**
- Check VITE_API_URL in .env
- Ensure backend is on port 5000

## 📚 Documentation

- `SETUP_GUIDE.md` - Complete setup & deployment
- `backend/README.md` - Backend details
- `frontend/README.md` - Frontend details
- `backend/src/` - All source code

---

**Ready to build your Teacher Portal? Let's go!** 🎓

Need help? Check the docs or reach out to support.
