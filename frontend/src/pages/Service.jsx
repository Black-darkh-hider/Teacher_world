"use client"

import { Link } from "react-router-dom"
import { Briefcase, MapPin, Users, FileText, Video, Search, Award, Clock, CheckCircle } from "lucide-react"
import Logo from "../components/Logo"

export default function Service() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Navigation */}
      <nav
        style={{
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <Link to="/jobs" style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/services" style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/" style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>
                Back
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "linear-gradient(135deg, #1a5490 0%, #0f3a63 100%)",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem" }}>Our Services</h1>
          <p style={{ fontSize: "1.125rem", opacity: 0.95, maxWidth: "600px" }}>
            Comprehensive solutions for teachers and educational institutions to connect and grow together
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a5490",
            }}
          >
            What We Offer
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              {
                icon: Briefcase,
                title: "Job Posting & Management",
                desc: "Institutions can post job openings, manage applications, and track hiring process efficiently.",
              },
              {
                icon: Users,
                title: "Teacher Profiles",
                desc: "Teachers can create comprehensive profiles showcasing qualifications, experience, and skills.",
              },
              {
                icon: MapPin,
                title: "Location-Based Search",
                desc: "Find teaching opportunities based on proximity, with real-time distance calculations.",
              },
              {
                icon: FileText,
                title: "Document Management",
                desc: "Upload and manage certificates, degrees, and teaching credentials securely.",
              },
              {
                icon: Video,
                title: "Live Interview Sessions",
                desc: "Conduct live interviews and sessions using integrated Zoom functionality.",
              },
              {
                icon: Search,
                title: "Smart Job Matching",
                desc: "Get matched with opportunities based on skills, experience, and preferences.",
              },
              {
                icon: Award,
                title: "Application Tracking",
                desc: "Track all your job applications with real-time status updates and communications.",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Get help anytime with our dedicated customer support team.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                style={{
                  padding: "2rem",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(26, 84, 144, 0.12)"
                  e.currentTarget.style.transform = "translateY(-6px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <service.icon size={40} style={{ color: "#1a5490", marginBottom: "1rem" }} />
                <h4 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>
                  {service.title}
                </h4>
                <p style={{ color: "#666", lineHeight: "1.6", margin: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "4rem 2rem", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a5490",
            }}
          >
            Why Choose TeacherWorld?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { number: "5000+", text: "Active Job Listings" },
              { number: "50K+", text: "Registered Teachers" },
              { number: "1000+", text: "Verified Institutions" },
              { number: "99%", text: "Success Rate" },
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#1a5490", marginBottom: "0.5rem" }}>
                  {stat.number}
                </div>
                <p style={{ color: "#666", fontWeight: "500", margin: 0 }}>{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a5490",
            }}
          >
            Key Features
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              "Advanced job filtering and search",
              "Real-time application status tracking",
              "Secure document upload and storage",
              "Video interview integration",
              "Verified institution profiles",
              "Career growth analytics",
            ].map((feature, idx) => (
              <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <CheckCircle size={24} style={{ color: "#1a5490", flexShrink: 0, marginTop: "0.25rem" }} />
                <p style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a5490 0%, #0f3a63 100%)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Ready to Get Started?</h2>
          <p style={{ fontSize: "1.125rem", marginBottom: "2rem", opacity: 0.95 }}>
            Join thousands of teachers and institutions on TeacherWorld
          </p>
          <Link
            to="/register-teacher"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: "white",
              color: "#1a5490",
              textDecoration: "none",
              borderRadius: "9999px",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1f2937", color: "white", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>© 2025 TeacherWorld. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
