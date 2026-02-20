"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

export default function TeacherFeaturesOverview() {
  const [expandedSection, setExpandedSection] = React.useState(null)

  const features = [
    {
      id: "dashboard",
      title: "Home Dashboard",
      icon: "📊",
      description: "Get a comprehensive overview of your job search journey",
      details: [
        "Profile Strength Indicator with Score (0-100%)",
        "Quick Stats: Total Applied Jobs, Shortlisted Count, Interviews Scheduled, New Messages",
        "Recommended Jobs Based on Your Profile & Preferences",
        "Quick Action Buttons: Update Profile, Upload Resume, Find Jobs",
        "Recent Activity Timeline with All Updates",
      ],
    },
    {
      id: "profile",
      title: "Complete Profile Management",
      icon: "👤",
      description: "Build a complete professional profile to attract opportunities",
      details: [
        "Basic Info: Full Name, Email, Phone, Gender, Date of Birth, Photo Upload",
        "Professional Details: Total Experience, Teaching Experience, Subjects Taught",
        "Class Levels: 1-5, 6-10, 11-12, College Level Teaching",
        "Specializations: Physics, Math, English, Science, Social Studies, etc.",
        "Resume Builder: Create or Upload PDF Resume",
        "Skills Tags: Add Multiple Professional Skills",
        "Languages: Spoken Languages Input",
        "Education Section: Degrees, B.Ed, M.Ed, D.Ed, Diplomas, Online Certificates",
        "Job Preferences: Expected Salary Range, Preferred Location",
        "Job Type Preferences: Full-time, Part-time, Online Teaching",
        "Remote/Hybrid Availability Options",
        "Shift Preferences: Morning, Afternoon, Evening",
        "Location Settings: GPS Pin Live Location, Current Address",
        "Relocation Willingness Toggle",
      ],
    },
    {
      id: "jobs",
      title: "Job Search & Discovery",
      icon: "🔍",
      description: "Find perfect teaching opportunities with advanced filters",
      details: [
        "Advanced Search: By Subject, School Name, Region",
        "Smart Filters: Experience Level, Salary Range, Job Type, Institution Type",
        "Distance Filter: Jobs Near Your Live Location",
        "Location-based Recommendations with Map Integration",
        "Save Jobs for Later with Auto-Expiry (30 days)",
        "Job Details Page: Full Description, Responsibilities, Pay & Perks",
        "Institution Rating & Reviews Display",
        "Location Map Integration for Each Job",
        "Similar Jobs Recommendations Section",
        "One-Click Apply Button",
        "Job Comparison Tools",
      ],
    },
    {
      id: "applications",
      title: "Application Tracking System",
      icon: "📋",
      description: "Track all your job applications in one centralized place",
      details: [
        "View All Applied Jobs with Complete List",
        "Application Status Updates: Sent, Viewed, Shortlisted, Rejected, Accepted",
        "Application Timeline with Dates & Timestamps",
        "Withdraw Application Option",
        "Status Color Coding: Green (Accepted), Yellow (Shortlisted), Red (Rejected), Gray (Pending)",
        "Detailed Application History & Previous Interactions",
        "Expected Response Timeline Information",
        "Follow-up Options for Each Application",
      ],
    },
    {
      id: "interviews",
      title: "Interview & Demo Class System",
      icon: "🎥",
      description: "Prepare and attend interviews with professional tools",
      details: [
        "Interview Scheduling: Choose from Available Time Slots",
        "Auto-Reminders: Email & SMS Before Interview",
        "Reschedule Option: Propose New Time Slots",
        "High-Quality Video Call Interface",
        "Interactive Whiteboard Tools for Demo Teaching",
        "Screen Sharing Capability",
        "Document Upload & Sharing During Session",
        "Automatic Class Recording & Session Playback",
        "Interview Duration Timer",
        "Chat Sidebar for Communication During Interview",
      ],
    },
    {
      id: "messaging",
      title: "Real-time Communication Hub",
      icon: "💬",
      description: "Connect directly with institutions in real-time",
      details: [
        "Real-time Chat with Institutions",
        "Typing Indicators & Seen Status",
        "Send Resume, Documents, Videos, Files",
        "Auto-Greeting Templates for First Contact",
        "Message Search & Complete History",
        "File Upload & Sharing Capabilities",
        "Chat History Export Option",
        "Push Notifications for New Messages",
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Insights",
      icon: "📈",
      description: "Understand your profile performance and job opportunities",
      details: [
        "Profile View History: See Who Viewed Your Profile",
        "Profile Strength Score (0-100%) with Detailed Breakdown",
        "Tips to Improve Profile Visibility & Ranking",
        "Job Match Percentage for Each Listing",
        "Monthly Activity Report & Statistics",
        "Search Keywords that Found Your Profile",
        "Comparative Analytics with Other Teachers",
        "Best Times to Update Profile for Maximum Visibility",
      ],
    },
    {
      id: "notifications",
      title: "Smart Notifications System",
      icon: "🔔",
      description: "Stay updated on important opportunities and events",
      details: [
        "New Job Alerts (Customizable by Subject, Location, Salary)",
        "Interview Update Notifications in Real-time",
        "Chat Message Alerts & Reminders",
        "Job Expiry Warnings Before Posting Ends",
        "Application Status Change Notifications",
        "Profile Completeness Reminders",
        "Message Read Receipts",
        "Multiple Alert Options: Push, Email & SMS",
      ],
    },
    {
      id: "settings",
      title: "Account Settings & Security",
      icon: "⚙️",
      description: "Manage your account security and preferences",
      details: [
        "Reset Password & Change Password Options",
        "Two-Factor Authentication (2FA) Setup",
        "Privacy Settings & Profile Visibility Control",
        "Block/Unblock Specific Institutions",
        "Account Deactivation Options",
        "Data Export & Complete Backup Download",
        "Download All Documents & Certificates",
        "Activity Log & Complete Login History",
      ],
    },
  ]

  return (
    <div style={{ padding: "2rem 0" }}>
      <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "600" }}>Your Features & Capabilities</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              backgroundColor: "#fff",
            }}
          >
            <button
              onClick={() => setExpandedSection(expandedSection === feature.id ? null : feature.id)}
              style={{
                width: "100%",
                padding: "1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
                <div>
                  <h4 style={{ margin: "0", fontSize: "1rem", fontWeight: "600" }}>{feature.title}</h4>
                  <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>{feature.description}</p>
                </div>
              </div>
              <ChevronDown
                size={20}
                style={{
                  transform: expandedSection === feature.id ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {expandedSection === feature.id && (
              <div style={{ borderTop: "1px solid #e5e7eb", padding: "1rem", backgroundColor: "#f9fafb" }}>
                <ul
                  style={{
                    margin: "0",
                    paddingLeft: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {feature.details.map((detail, idx) => (
                    <li key={idx} style={{ color: "#555", fontSize: "0.875rem", lineHeight: "1.5" }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
