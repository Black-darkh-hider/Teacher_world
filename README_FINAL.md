# TeacherWorld - Teacher Job Portal

A comprehensive full-stack platform connecting teachers with educational institutions for job opportunities.

## Live Demo

Frontend: http://localhost:5173  
Backend API: http://localhost:5000/api

## Quick Start (5 minutes)

\`\`\`bash
# Terminal 1: Backend
cd backend && npm install
# Create .env (see QUICK_START.md)
mongod  # Start MongoDB in another window
npm run dev

# Terminal 2: Frontend  
cd frontend && npm install
# Create .env with VITE_API_URL=http://localhost:5000/api
npm run dev
\`\`\`

Visit http://localhost:5173

## Features

### For Teachers
- Register with email verification (OTP)
- Browse jobs with location-based search
- Apply for jobs with one profile
- Track application status in real-time
- Upload resume and certificates
- Get notifications on status updates

### For Institutions
- Post job openings easily
- View all applicants
- Update application statuses
- Search teacher profiles
- Manage multiple job postings
- Email notifications for new applications

### General
- Secure authentication (JWT)
- Email-based OTP verification (Nodemailer/Gmail)
- Google & LinkedIn OAuth login (optional)
- Zoom integration for interviews
- Location-based filtering (Google Maps)
- Responsive design (mobile-friendly)

## Tech Stack

**Frontend:**
- React.js 18+
- Vite (fast bundler)
- React Router v6
- Axios
- CSS3

**Backend:**
- Node.js 16+
- Express.js
- MongoDB
- Mongoose ODM
- JWT
- Nodemailer
- Multer (file uploads)
- Passport.js (OAuth)

**Database:**
- MongoDB (local or MongoDB Atlas cloud)

**Email:**
- Nodemailer with Gmail SMTP

## Project Structure

\`\`\`
teacher-portal/
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── config/            # Database, JWT, Email setup
│   │   ├── middleware/        # Auth, file upload
│   │   ├── models/            # MongoDB schemas
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API endpoints
│   │   └── services/          # Utilities (email, OTP)
│   ├── uploads/               # File storage
│   ├── seeds/                 # Sample data
│   ├── server.js              # Main app
│   └── package.json
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── pages/             # React components
│   │   ├── App.jsx            # Main app
│   │   ├── main.jsx           # Entry point
│   │   └── styles.css         # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   ├── COMPLETE_SETUP_GUIDE.md   # Detailed setup
│   ├── QUICK_START.md             # 5-minute setup
│   ├── DEPLOYMENT.md              # Production guide
│   └── API_DOCS.md                # API reference
│
└── README_FINAL.md           # This file
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB
- Git

### Step-by-Step

**1. Clone the repository**
\`\`\`bash
git clone <repository-url>
cd teacher-portal
\`\`\`

**2. Setup Backend**
\`\`\`bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI, Gmail credentials, JWT secrets

# Start MongoDB
mongod

# Run backend
npm run dev
\`\`\`

**3. Setup Frontend**
\`\`\`bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
\`\`\`

**4. Open in Browser**
- Frontend: http://localhost:5173
- API Docs: http://localhost:5000/api/health

## Environment Configuration

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/teacher-portal
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SENDER_EMAIL=your-email@gmail.com
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

## Usage

### Register as Teacher
1. Go to http://localhost:5173/register-teacher
2. Enter details (name, email, password, qualifications)
3. Verify email with OTP
4. Login and browse jobs
5. Apply for jobs

### Register as Institution
1. Go to http://localhost:5173/register-institution
2. Enter institution details (name, email, location)
3. Verify email with OTP
4. Login to dashboard
5. Post job openings
6. Manage applications

## API Endpoints

### Authentication
- `POST /api/auth/register-teacher` - Register teacher
- `POST /api/auth/register-institution` - Register institution
- `POST /api/auth/login` - Login
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/refresh-token` - Get new token

### Jobs
- `GET /api/jobs` - List jobs (with filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Post new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `GET /api/applications` - Get applications
- `POST /api/applications` - Apply for job
- `PATCH /api/applications/:id/status` - Update status

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/upload-resume` - Upload resume
- `POST /api/profile/upload-certificate` - Upload certificate

For full API docs, see `COMPLETE_SETUP_GUIDE.md`

## Testing

### Test Teacher Flow
- Email: teacher@example.com
- Password: password123 (after seeding)

### Test Institution Flow
- Email: institution@example.com
- Password: password123 (after seeding)

To seed test data:
\`\`\`bash
cd backend
node seeds/seed.js
\`\`\`

## Features in Detail

### Email Verification (OTP)
- 6-digit OTP sent to email
- Valid for 10 minutes
- Resend option available
- Gmail SMTP via Nodemailer

### Authentication
- JWT-based
- Access token (1 hour)
- Refresh token (7 days)
- Role-based access control

### File Uploads
- Resume upload (PDF, DOC)
- Certificate upload
- Study materials
- Max 5MB per file

### Notifications
- Email on application status change
- Welcome email on registration
- Job recommendations

## Production Deployment

### Deploy Backend
\`\`\`bash
# Option 1: Render.com
# Push to GitHub, connect in Render dashboard, add .env

# Option 2: Railway
# Connect GitHub, deploy automatically

# Option 3: Heroku
# heroku create app-name
# git push heroku main
\`\`\`

### Deploy Frontend
\`\`\`bash
# Option 1: Vercel
# Connect GitHub, select frontend folder

# Option 2: Netlify
# Run: npm run build
# Upload dist/ folder

# Option 3: AWS S3
# Run: npm run build
# Upload dist/ to S3, setup CloudFront
\`\`\`

### Deploy Database
- Use MongoDB Atlas (cloud version)
- Update connection string in production .env

See `DEPLOYMENT.md` for detailed instructions.

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- CORS protection
- Rate limiting recommended
- Input validation on all endpoints
- Environment variables for secrets (not hardcoded)
- HTTPS enforced in production

## Troubleshooting

### MongoDB connection fails
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For Atlas: whitelist your IP in security settings

### OTP email not received
- Check SMTP credentials in .env
- Verify Gmail App Password (16 characters)
- Check spam folder
- Check backend console for logs

### CORS errors
- Ensure FRONTEND_URL matches frontend URL in .env
- Restart backend after .env changes

### Port already in use
\`\`\`bash
# Kill port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
\`\`\`

## Roadmap

- [ ] Advanced job search filters
- [ ] Video interview capability
- [ ] Teacher rating system
- [ ] Saved jobs feature
- [ ] Job recommendations AI
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] Real-time chat
- [ ] Video resume support

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open pull request

## License

MIT License - feel free to use this project

## Support

- Email: support@teacherworld.com
- Issues: GitHub Issues
- Docs: See `/docs` folder

## Credits

Built with:
- React - UI library
- Express - Backend framework
- MongoDB - Database
- Nodemailer - Email service

## FAQ

**Q: Can I use this with PostgreSQL instead of MongoDB?**
A: Yes, update models to use Sequelize or TypeORM

**Q: How do I enable Google OAuth login?**
A: See `COMPLETE_SETUP_GUIDE.md` "Additional Features" section

**Q: Can I customize the design?**
A: Yes, all CSS in `frontend/src/styles.css`, update as needed

**Q: Is this suitable for production?**
A: Yes, with proper security hardening and environment setup

---

## Getting Started Now

1. Clone repo
2. Follow Quick Start above
3. Run `npm run dev` in both folders
4. Open http://localhost:5173
5. Start exploring!

Happy coding! 🎓
