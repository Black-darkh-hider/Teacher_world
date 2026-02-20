import { Routes, Route, Navigate } from "react-router-dom"  // Removed BrowserRouter and GoogleOAuthProvider

// Pages
import Home from "./pages/Home"
import LoginTeacher from "./pages/LoginTeacher"
import RegisterTeacher from "./pages/RegisterTeacher"
import TeacherInterviews from "./pages/TeacherInterviews"
import InstitutionInterviews from "./pages/InstitutionInterviews"

import LoginInstitution from "./pages/LoginInstitution"
import RegisterInstitution from "./pages/RegisterInstitution"
import VerifyOTP from "./pages/VerifyOTP"
import Jobs from "./pages/Jobs"
import JobDetail from "./pages/JobDetail"

import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherProfile from "./pages/TeacherProfile"
import TeacherApplications from "./pages/TeacherApplications"
import TeacherMessages from "./pages/TeacherMessages"
import TeacherAnalytics from "./pages/TeacherAnalytics"
import TeacherNotifications from "./pages/TeacherNotifications"
import TeacherSettings from "./pages/TeacherSettings"
import TeacherJobDetail from "./pages/TeacherJobDetail"

import InstitutionDashboard from "./pages/InstitutionDashboard"
import InstitutionPostJob from "./pages/InstitutionPostJob"
import InstitutionEditJob from "./pages/InstitutionEditJob"
import InstitutionSearchTeachers from "./pages/InstitutionSearchTeachers"

import InstitutionApplications from "./pages/InstitutionApplications"
import InstitutionMessages from "./pages/InstitutionMessages"
import InstitutionTeams from "./pages/InstitutionTeams"
import InstitutionBilling from "./pages/InstitutionBilling"
import InstitutionSettings from "./pages/InstitutionSettings"

import Profile from "./pages/Profile"
import Contact from "./pages/Contact"
import Service from "./pages/Service"
import Policy from "./pages/Policy"
import Materials from "./pages/Materials"
import Applications from "./pages/Applications"
import ForgotPassword from "./pages/ForgotPassword"
import ForgotUsername from "./pages/ForgotUsername"
import SocialCallback from "./pages/SocialCallback"
import Zoom from "./pages/Zoom"

import ChatBot from "./components/ChatBot"

import "./styles.css"

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login-teacher" element={<LoginTeacher />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
        <Route path="/login-institution" element={<LoginInstitution />} />
        <Route path="/register-institution" element={<RegisterInstitution />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        {/* Teacher Dashboard */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/applications" element={<TeacherApplications />} />
        <Route path="/teacher/messages" element={<TeacherMessages />} />
        <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
        <Route path="/teacher/interviews" element={<TeacherInterviews />} />
        <Route path="/teacher/settings" element={<TeacherSettings />} />
        <Route path="/teacher/jobs/:jobId" element={<TeacherJobDetail />} />

        {/* Institution Dashboard */}
        <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
        <Route path="/institution/post-job" element={<InstitutionPostJob />} />
        <Route path="/institution/edit-job/:id" element={<InstitutionEditJob />} />
        <Route path="/institution/search-teachers" element={<InstitutionSearchTeachers />} />
        <Route path="/institution/applications" element={<InstitutionApplications />} />
        <Route path="/institution/messages" element={<InstitutionMessages />} />
        <Route path="/institution/teams" element={<InstitutionTeams />} />
        <Route path="/institution/billing" element={<InstitutionBilling />} />
        <Route path="/institution/settings" element={<InstitutionSettings />} />

        {/* Other Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/applications" element={<Applications />} />

        {/* Auth Helpers */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-username" element={<ForgotUsername />} />
        <Route path="/social-callback" element={<SocialCallback />} />
        <Route path="/zoom" element={<Zoom />} />

        {/* NEW INTERVIEW PAGE */}
        <Route path="/teacher-interviews" element={<TeacherInterviews />} />
        <Route path="/institution/interviews" element={<InstitutionInterviews />} />

        {/* Redirects */}
        <Route path="/teacher/dashboard" element={<Navigate to="/dashboard/teacher" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ChatBot />
    </>
  )
}

export default App
