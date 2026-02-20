# TeacherWorld Portal - Complete File Structure

## Project Overview
This is a comprehensive teacher-institution job portal built with React (frontend), Node.js/Express (backend), and MongoDB database. The system supports real-time messaging, application tracking, interview scheduling, and user management for both teachers and educational institutions.

## Root Directory Structure

```
real me 2/
├── .gitignore
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── render.yaml
├── components.json
├── README_FINAL.md
├── QUICK_START.md
├── PROJECT_SUMMARY.md
├── PROJECT_CHECKLIST.md
├── PROJECT_STRUCTURE_COMPLETE.md
├── TODO.md
├── TODO_FIX_APPLICATIONS.md
├── TODO_WELCOME_ENHANCEMENTS.md
├── API_REFERENCE.md
├── COMPLETE_SETUP_GUIDE.md
├── COMPLETE_SETUP_INSTRUCTIONS.md
├── ENVIRONMENT_SETUP.md
├── DEPLOYMENT.md
├── DEPLOYMENT_GUIDE.md
├── GITHUB_DEPLOYMENT.md
├── INSTALLATION_GUIDE.md
├── INSTALLATION_STEPS.md
├── SETUP_GUIDE.md
├── SETUP_INSTRUCTIONS.md
├── START_HERE.md
├── GET_STARTED.md
├── FILE_STRUCTURE.md
├── FILE_STRUCTURE_GUIDE.md
├── DATA_FLOW_ARCHITECTURE.md
├── DEBUGGING_REGISTRATION_ISSUES.md
├── GOOGLE_MAPS_SETUP.md
├── INTEGRATION_SETUP.md
├── MONGODB_SETUP.md
├── MONGODB_SETUP_GUIDE.md
├── TEACHER_PORTAL_DOCUMENTATION.md
├── app/                          # Next.js App Router
├── backend/                      # Express.js Backend
├── frontend/                     # React Frontend (Vite)
├── components/                   # Shared UI Components
├── hooks/                        # Custom React Hooks
├── lib/                          # Utility Libraries
├── public/                       # Static Assets
└── styles/                       # Global Styles
```

## Frontend Structure (React + Vite)

```
frontend/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README_FRONTEND.md
├── test-api.js
├── public/
│   └── logo.png
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── ProfilePhotoDisplay.jsx
    │   └── Logo.jsx
    ├── hooks/
    ├── lib/
    │   └── auth.js
    ├── pages/                     # Page Components
    │   ├── Home.jsx
    │   ├── Jobs.jsx
    │   ├── JobDetail.jsx
    │   ├── Profile.jsx
    │   ├── Contact.jsx
    │   ├── Policy.jsx
    │   ├── Service.jsx
    │   ├── SocialCallback.jsx
    │   ├── RegisterTeacher.jsx
    │   ├── Applications.jsx
    │   ├── ForgotPassword.jsx
    │   ├── ForgotUsername.jsx
    │   ├── TeacherDashboard.jsx
    │   ├── TeacherProfile.jsx
    │   ├── TeacherApplications.jsx
    │   ├── TeacherMessages.jsx
    │   ├── TeacherInterviews.jsx
    │   ├── TeacherNotifications.jsx
    │   ├── TeacherAnalytics.jsx
    │   ├── TeacherSettings.jsx
    │   ├── InstitutionDashboard.jsx
    │   ├── InstitutionPostJob.jsx
    │   ├── InstitutionApplications.jsx
    │   ├── InstitutionSearchTeachers.jsx
    │   ├── InstitutionSettings.jsx
    │   ├── InstitutionBilling.jsx
    │   └── InstitutionEditJob.jsx
    ├── screens/                   # Screen Components (Alternative Structure)
    │   ├── index.js
    │   ├── institution/
    │   │   ├── Dashboard.jsx
    │   │   ├── PostJob.jsx
    │   │   ├── JobsManagement.jsx
    │   │   ├── Applications.jsx
    │   │   ├── LoginRegister.jsx
    │   │   └── Profile.jsx
    │   └── teacher/
    │       ├── Dashboard.jsx
    │       ├── Profile.jsx
    │       ├── Settings.jsx
    │       ├── Notifications.jsx
    │       ├── Interviews.jsx
    │       ├── Applications.jsx
    │       ├── JobDetail.jsx
    │       ├── JobSearch.jsx
    │       └── LoginRegister.jsx
    └── styles/                    # Component-specific styles
```

## Backend Structure (Node.js + Express)

```
backend/
├── package.json
├── package-lock.json
├── README_BACKEND.md
├── server.js
├── test-connection.js
├── seeds/
│   └── seed.js
├── uploads/                      # File Upload Directories
│   ├── resumes/
│   ├── certificates/
│   ├── materials/
│   ├── marksCards/
│   ├── photos/
│   └── institution-photos/
└── src/
    ├── config/                   # Configuration Files
    │   ├── apiConfig.js
    │   ├── db.js
    │   ├── jwt.js
    │   ├── mailer.js
    │   └── passport.js
    ├── controllers/              # Route Controllers
    │   ├── authController.js
    │   ├── profileController.js
    │   ├── jobController.js
    │   ├── applicationController.js
    │   ├── messageController.js
    │   ├── interviewController.js
    │   ├── materialController.js
    │   ├── zoomController.js
    │   ├── locationController.js
    │   └── socialAuthController.js
    ├── models/                   # Mongoose Models
    │   ├── User.js
    │   ├── TeacherProfile.js
    │   ├── InstitutionProfile.js
    │   ├── Job.js
    │   ├── Application.js
    │   ├── Message.js
    │   ├── Interview.js
    │   ├── ActivityLog.js
    │   └── Material.js
    ├── routes/                   # API Routes
    │   ├── authRoutes.js
    │   ├── socialAuthRoutes.js
    │   ├── jobRoutes.js
    │   ├── applicationRoutes.js
    │   ├── messageRoutes.js
    │   ├── interviewRoutes.js
    │   ├── profileRoutes.js
    │   ├── materialRoutes.js
    │   ├── zoomRoutes.js
    │   └── locationRoutes.js
    ├── middleware/               # Custom Middleware
    │   ├── auth.js
    │   └── upload.js
    └── lib/                      # Utility Libraries
        └── activityLogger.js
```

## Next.js App Router Structure

```
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── components/                  # App-specific Components
│   ├── alert-error.tsx
│   ├── error-boundary.tsx
│   ├── experience-timeline.tsx
│   ├── info-card.tsx
│   ├── loading-spinner.tsx
│   ├── profile-header.tsx
│   ├── profile-stats.tsx
│   ├── protected-route.tsx
│   ├── social-links.tsx
│   └── teacher-info-section.tsx
├── dashboard/
│   └── page.tsx
├── institution/
│   └── dashboard/
│       └── page.tsx
├── teacher/
│   └── dashboard/
│       └── page.tsx
└── lib/                        # App-specific Utilities
    ├── api-client.ts
    ├── auth-context.tsx
    └── profile-api.ts
```

## Shared Components & Utilities

```
components/                      # Shadcn/UI Components
├── theme-provider.tsx
└── ui/
    ├── accordion.tsx
    ├── alert-dialog.tsx
    ├── alert.tsx
    ├── aspect-ratio.tsx
    ├── avatar.tsx
    ├── badge.tsx
    ├── breadcrumb.tsx
    ├── button-group.tsx
    ├── button.tsx
    ├── calendar.tsx
    ├── card.tsx
    ├── carousel.tsx
    ├── chart.tsx
    ├── checkbox.tsx
    ├── collapsible.tsx
    ├── command.tsx
    ├── context-menu.tsx
    ├── dialog.tsx
    ├── drawer.tsx
    ├── dropdown-menu.tsx
    ├── empty.tsx
    ├── field.tsx
    ├── form.tsx
    ├── hover-card.tsx
    ├── input-group.tsx
    ├── input-otp.tsx
    ├── input.tsx
    ├── item.tsx
    ├── kbd.tsx
    ├── label.tsx
    ├── menubar.tsx
    ├── navigation-menu.tsx
    ├── pagination.tsx
    ├── popover.tsx
    ├── progress.tsx
    ├── radio-group.tsx
    ├── resizable.tsx
    ├── scroll-area.tsx
    ├── select.tsx
    ├── separator.tsx
    ├── sheet.tsx
    ├── sidebar.tsx
    ├── skeleton.tsx
    ├── slider.tsx
    ├── sonner.tsx
    ├── spinner.tsx
    ├── switch.tsx
    ├── table.tsx
    ├── tabs.tsx
    ├── textarea.tsx
    ├── toast.tsx
    ├── toaster.tsx
    ├── toggle-group.tsx
    ├── toggle.tsx
    ├── tooltip.tsx
    ├── use-mobile.tsx
    └── use-toast.ts

hooks/                          # Custom React Hooks
├── use-mobile.ts
└── use-toast.ts

lib/                            # Utility Functions
└── utils.ts

public/                         # Static Assets
├── apple-icon.png
├── icon-dark-32x32.png
├── icon-light-32x32.png
├── icon.svg
├── placeholder-logo.png
├── placeholder-logo.svg
├── placeholder-user.jpg
├── placeholder.jpg
└── placeholder.svg

styles/                         # Global Styles
└── globals.css
```

## Key Features & Architecture

### Multi-Framework Setup
- **Frontend**: React with Vite (main application)
- **Next.js App**: Alternative Next.js implementation
- **Backend**: Node.js with Express and Socket.io

### Real-time Features
- Socket.io integration for real-time messaging
- Live application status updates
- Instant notifications

### User Roles
- **Teachers**: Job search, applications, messaging, interviews
- **Institutions**: Job posting, application management, teacher search

### File Upload System
- Resume uploads for teachers
- Certificate uploads
- Institution photos
- Material sharing
- Profile photos

### Authentication & Security
- JWT-based authentication
- Social login integration
- Role-based access control
- File upload security

### Database Models
- User management with profiles
- Job postings with applications
- Messaging system
- Interview scheduling
- Activity logging
- Material sharing

### API Structure
- RESTful API endpoints
- File upload handling
- Real-time socket events
- Authentication middleware
- Error handling

## Development Setup

### Prerequisites
- Node.js 18+
- MongoDB
- npm/pnpm/yarn

### Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup
- Copy `.env.example` to `.env`
- Configure MongoDB connection
- Set up JWT secrets
- Configure email service
- Set up Google Maps API (if needed)

### Running the Application
```bash
# Start backend
cd backend
npm start

# Start frontend (in new terminal)
cd frontend
npm run dev

# Start Next.js app (alternative)
npm run dev
```

## Deployment
- Backend: Node.js server with PM2
- Frontend: Static hosting (Vercel, Netlify)
- Database: MongoDB Atlas
- File Storage: Local or cloud storage

## Contributing
1. Follow the established file structure
2. Use consistent naming conventions
3. Add proper error handling
4. Update documentation
5. Test thoroughly before committing

## File Naming Conventions
- Components: PascalCase (e.g., `TeacherApplications.jsx`)
- Utilities: camelCase (e.g., `auth.js`)
- Models: PascalCase (e.g., `User.js`)
- Routes: camelCase with Routes suffix (e.g., `authRoutes.js`)
- Controllers: camelCase with Controller suffix (e.g., `authController.js`)

This structure supports a scalable, maintainable application with clear separation of concerns and multiple frontend implementations.
