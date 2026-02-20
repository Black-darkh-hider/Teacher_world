"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

export default function InstitutionFeaturesOverview() {
  const [expandedSection, setExpandedSection] = React.useState(null)

  const features = [
    {
      id: "dashboard",
      title: "Home Dashboard",
      icon: "📊",
      description: "Complete overview of your hiring activities",
      details: [
        "Total Job Posts Published Count",
        "New Applicants This Week/Month",
        "Shortlisted Candidates Count",
        "Interviews Scheduled Count",
        "Quick Actions: Post Job, Search Teachers, Open Applications",
        "Recent Activity Timeline",
        "Hiring Progress Charts & Analytics",
      ],
    },
    {
      id: "profile",
      title: "Institution Profile & Branding",
      icon: "🏢",
      description: "Build your institution's complete professional presence",
      details: [
        "Basic Info: Institution Name, Logo, Cover Banner Upload",
        "Description: About Institution, Mission & Vision Statements",
        "Institution Type: School, College, or Coaching Center",
        "Establishment Year & Complete History",
        "Full Address with GPS Map Location Integration",
        "Multiple Branch Locations Support & Management",
        "Contact Details: HR Name, Mobile, Email, Website",
        "Accreditation Details & Certifications Display",
        "Facilities Listing: Hostel, Labs, Transport, Sports, WiFi",
        "Photo Gallery: Up to 10 Images for Institution Showcase",
        "Ratings & Reviews Section from Teachers",
      ],
    },
    {
      id: "jobs",
      title: "Complete Job Management",
      icon: "📝",
      description: "Create, manage, and track job openings effectively",
      details: [
        "Create Job Posts: Full Details Entry Form",
        "Job Title & Subject Requirements",
        "Minimum Experience Required Input",
        "Salary Range & Job Schedule Setup",
        "Employment Type: Full-time, Part-time, Contract, Internship",
        "Detailed Responsibilities Section",
        "Requirements & Qualifications List",
        "Additional Benefits & Perks Listing",
        "View Active & Archived Jobs Dashboard",
        "Job Performance Stats: Views, Saves, Applications",
        "Boost/Sponsor Jobs for Increased Visibility",
        "Quick Edit & Delete Options",
        "Job Expiry Settings & Auto-Archive",
        "Duplicate Job Posting Feature",
      ],
    },
    {
      id: "applications",
      title: "Application Management System",
      icon: "📨",
      description: "Manage and track candidate applications efficiently",
      details: [
        "View All Applicants per Job Posting",
        "Advanced Filters: Experience, Salary Expectation, Skills, Location Distance",
        "Profile Completeness Filter",
        "Applicant Profile View with Full Resume Download",
        "Verified Credentials & Subject Expertise Display",
        "Quick Action Buttons: Schedule Interview, Shortlist, Reject",
        "Send Customized Feedback to Candidates",
        "Track Full Application History & Changes",
        "Bulk Actions: Shortlist Multiple, Reject Multiple",
        "Candidate Comparison Tools",
        "Rating & Note System for Each Candidate",
      ],
    },
    {
      id: "search",
      title: "Global Teacher Talent Search",
      icon: "🔎",
      description: "Find perfect teachers from the entire portal database",
      details: [
        "Search Teachers: By Name, Subject, Location, Experience",
        "Location-based Search with Radius Filter",
        "Filter by: Experience Level, Skills, Qualifications, Certifications",
        "Online Teachers Filter (for Remote Positions)",
        "Distance from Institution Location Filter",
        "Availability Status Filter: Available, Interviewing, Not Interested",
        "Sort Options: By Relevance, Profile Strength, Recently Active",
        "View Full Teacher Profiles & Complete Resume",
        "Save Teacher Profiles for Later Reference",
        "Bulk Search & Filter Results",
      ],
    },
    {
      id: "interviews",
      title: "Advanced Interview & Demo Tools",
      icon: "🎥",
      description: "Conduct professional interviews with advanced features",
      details: [
        "Schedule Interviews: Choose from Teacher Availability Slots",
        "Send Interview Invites with Calendar Attachment (Google/Outlook)",
        "Automatic SMS/Email Reminders to Candidates",
        "Interview Type Selection: Online, In-person, Hybrid",
        "Interview Panel Information Management",
        "High-Quality Video Call Interface",
        "Interactive Whiteboard for Demo Teaching Sessions",
        "Screen Sharing & Document Upload Capabilities",
        "Automatic Session Recording & Playback",
        "Timed Sessions with Countdown Timer",
        "Interview Notes & Evaluation Forms",
        "Audio/Video Quality Testing Before Interview",
      ],
    },
    {
      id: "messaging",
      title: "Communication & Collaboration Hub",
      icon: "💬",
      description: "Connect with candidates and manage team conversations",
      details: [
        "Real-time Chat with Candidates",
        "Share Meeting Links & Interview Details",
        "Send Assignments & Demo Requests",
        "HR Team Chat Access for Internal Collaboration",
        "Message Templates for Quick Responses",
        "Bulk Messaging for Announcements",
        "Conversation History & Search Functionality",
        "File Sharing & Document Exchange",
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Performance Insights",
      icon: "📊",
      description: "Track hiring performance and gain valuable insights",
      details: [
        "Job Performance Statistics & Metrics",
        "Views, Saves & Application Metrics per Job",
        "Candidate Quality Score & Ranking System",
        "Hiring Efficiency Metrics & KPIs",
        "Time-to-Hire Analysis & Trends",
        "View History of Teacher Profiles Accessed",
        "Monthly Hiring Trends & Detailed Reports",
        "Application Conversion Funnel Analysis",
        "Cost Per Hire Calculation",
      ],
    },
    {
      id: "teams",
      title: "Teams & Role Management",
      icon: "👥",
      description: "Manage HR team access and permissions effectively",
      details: [
        "Multiple HR Login Accounts Support",
        "Role-based Access Control: Admin, Recruiter, Viewer",
        "Add/Remove Team Members with Ease",
        "Activity Logs & Complete Audit Trail",
        "Permission Management by Role",
        "Department Assignment & Management",
        "Team Performance Analytics & Reports",
      ],
    },
    {
      id: "billing",
      title: "Billing & Subscription Management",
      icon: "💳",
      description: "Manage plans, payments, and usage limits",
      details: [
        "Subscription Plans Overview with Features Comparison",
        "Payment History & Digital Receipts",
        "Plan Upgrade/Downgrade Options",
        "Usage Statistics & Job Posting Limits",
        "Invoice Management & PDF Downloads",
        "Billing History & Detailed Statements",
      ],
    },
    {
      id: "settings",
      title: "Account Settings & Preferences",
      icon: "⚙️",
      description: "Configure account security and notification preferences",
      details: [
        "Institution Profile Management & Updates",
        "Logo & Branding Updates",
        "Notification Preferences: Email, SMS, Push",
        "Reset Password & Security Settings",
        "Two-Factor Authentication Setup",
        "Data Export & Complete Backup",
        "Activity Log & Login History Tracking",
        "Account Deactivation Options",
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
