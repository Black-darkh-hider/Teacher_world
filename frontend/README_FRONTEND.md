# TeacherWorld Frontend

React-based frontend for the Teacher Job Portal platform.

## Installation

\`\`\`bash
npm install
\`\`\`

## Configuration

Create `.env` file:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

## Running

\`\`\`bash
npm run dev
\`\`\`

Visit: http://localhost:5173

## Pages

- **Home** - Landing page with features
- **Register Teacher** - Teacher registration
- **Register Institution** - Institution registration
- **Login** - Separate login for both roles
- **Verify OTP** - Email verification
- **Jobs** - Browse and search jobs
- **Job Detail** - Job details and apply
- **Teacher Dashboard** - Track applications
- **Institution Dashboard** - Manage jobs & applicants
- **Profile** - User profile management

## Features

- Separate auth for Teacher & Institution roles
- Email-based OTP verification
- Job search with location filtering
- Application tracking
- File uploads (resume, certificates)
- Real-time status updates
- Responsive design

## API Integration

All pages connect to backend API at `VITE_API_URL`.

Authentication tokens stored in localStorage:
- `accessToken` - JWT token
- `refreshToken` - Refresh token
- `user` - User data (JSON)
