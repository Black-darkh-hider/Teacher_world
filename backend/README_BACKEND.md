# TeacherWorld Backend

Node.js + Express backend for Teacher Job Portal.

## Installation

\`\`\`bash
npm install
\`\`\`

## Configuration

Create `.env` file - see `.env.example`

Key variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing JWTs
- `SMTP_*` - Email configuration (Gmail)

## Running

\`\`\`bash
npm run dev
\`\`\`

Server runs on: http://localhost:5000/api

## Database

MongoDB with these collections:
- `users` - User accounts
- `otptokens` - OTP verification tokens
- `teacherprofiles` - Teacher details
- `institutionprofiles` - Institution details
- `jobs` - Job postings
- `applications` - Job applications
- `studymaterials` - Study resources

## API Routes

- `/api/auth/*` - Authentication
- `/api/jobs/*` - Job management
- `/api/applications/*` - Application tracking
- `/api/profile/*` - User profiles
- `/api/materials/*` - Study materials
- `/api/zoom/*` - Zoom integration

## Architecture

\`\`\`
server.js (Express app setup)
├── config/ (Database, JWT, Email, OAuth)
├── middleware/ (Auth, Upload, CORS)
├── models/ (Mongoose schemas)
├── controllers/ (Business logic)
├── routes/ (API endpoints)
├── services/ (Email, OTP)
└── uploads/ (File storage)
\`\`\`

## Security

- Passwords hashed with bcrypt
- JWT-based authentication
- Role-based access control
- CORS enabled for frontend
- File upload validation
- Input validation & sanitization
