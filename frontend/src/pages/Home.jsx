 "use client"

import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import {
  MapPin,
  Briefcase,
  Users,
  FileText,
  Video,
  TrendingUp,
  ChevronRight,
  Star,
  Award,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import ChatBot from "../components/ChatBot"

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
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
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link to="/" className="navbar-brand" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <Link
                to="/jobs"
                style={{
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#1a5490")}
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                style={{
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#1a5490")}
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#1a5490")}
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login-teacher" style={{ color: "#1a5490", textDecoration: "none", fontWeight: "500" }}>
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register-teacher"
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "linear-gradient(135deg, #1a5490 0%, #0f3a63 100%)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0 8px 20px rgba(26, 84, 144, 0.3)"
                  e.target.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "none"
                  e.target.style.transform = "translateY(0)"
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a5490 0%, #0f3a63 100%)",
          color: "white",
          padding: "8rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            Land Your Dream Teaching Position
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "3rem",
              opacity: 0.95,
              lineHeight: "1.8",
              fontWeight: "300",
            }}
          >
            Connect with top educational institutions. Build your teaching career with opportunities tailored to your
            expertise and location.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/register-teacher"
              style={{
                padding: "1rem 2.5rem",
                background: "white",
                color: "#1a5490",
                textDecoration: "none",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Register as Teacher <ChevronRight size={20} />
            </Link>
            <Link
              to="/register-institution"
              style={{
                padding: "1rem 2.5rem",
                background: "transparent",
                color: "white",
                textDecoration: "none",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "1rem",
                border: "2px solid white",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent"
              }}
            >
              Hire Teachers
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", background: "#f9fafb" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { number: "0+", label: "Active Job Postings", icon: Briefcase },
            { number: "0+", label: "Teachers Registered", icon: Users },
            { number: "0+", label: "Institutions Hiring", icon: Award },
            { number: "0%", label: "Success Rate", icon: Star },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <stat.icon
                size={32}
                style={{ color: "#1a5490", marginBottom: "1rem", display: "block", margin: "0 auto 1rem" }}
              />
              <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#1a5490", marginBottom: "0.5rem" }}>
                {stat.number}
              </div>
              <p style={{ color: "#666", fontWeight: "500" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
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
            Why Choose TeacherWorld?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: Briefcase,
                title: "Job Opportunities",
                desc: "Browse thousands of verified teaching positions from top institutions.",
              },
              {
                icon: MapPin,
                title: "Location-Based Search",
                desc: "Find jobs nearest to you with our advanced location filtering system.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                desc: "Build your professional profile and track your career progression.",
              },
              {
                icon: Users,
                title: "Direct Connection",
                desc: "Apply directly to institutions and network with hiring managers.",
              },
              {
                icon: FileText,
                title: "Document Upload",
                desc: "Showcase your certificates, qualifications, and academic achievements.",
              },
              {
                icon: Video,
                title: "Live Sessions",
                desc: "Join live interviews and connect with institutions in real-time.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: "2rem",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(26, 84, 144, 0.12)"
                  e.currentTarget.style.transform = "translateY(-6px)"
                  e.currentTarget.querySelector("svg").style.color = "#0f3a63"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.querySelector("svg").style.color = "#1a5490"
                }}
              >
                <feature.icon size={40} style={{ color: "#1a5490", marginBottom: "1rem", transition: "color 0.3s" }} />
                <h4 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>
                  {feature.title}
                </h4>
                <p style={{ color: "#666", lineHeight: "1.6", margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", background: "#f3f8ff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a5490",
              marginBottom: "3rem",
            }}
          >
            Platform Highlights
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              {
                icon: Shield,
                title: "Verified Institutions",
                desc: "Every institution on our platform is verified and authenticated",
              },
              {
                icon: Globe,
                title: "Pan-India Coverage",
                desc: "Access job opportunities across all major cities and regions",
              },
              {
                icon: Zap,
                title: "Quick Matching",
                desc: "Our AI matches you with the best opportunities instantly",
              },
              {
                icon: Award,
                title: "Fair Pricing",
                desc: "Transparent pricing with no hidden fees or charges",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.5rem",
                  background: "white",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                <item.icon size={28} style={{ color: "#1a5490", marginBottom: "0.75rem" }} />
                <h4 style={{ color: "#1a5490", marginBottom: "0.5rem" }}>{item.title}</h4>
                <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a5490 0%, #0f3a63 100%)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            Ready to Transform Your Teaching Career?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: "2rem",
              opacity: 0.95,
              lineHeight: "1.8",
            }}
          >
            Join thousands of teachers already finding their next opportunity on TeacherWorld
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
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "none"
            }}
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1f2937", color: "white", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Logo />
              </div>
              <p style={{ fontSize: "0.875rem", color: "#d1d5db", margin: 0 }}>
                Connecting educators with opportunities worldwide
              </p>
            </div>
            <div>
              <h5 style={{ fontWeight: "600", marginBottom: "1rem" }}>Quick Links</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <Link to="/jobs" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem" }}>
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/services" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem" }}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem" }}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontWeight: "600", marginBottom: "1rem" }}>Legal</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <Link to="/policy" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem" }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/services" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.875rem" }}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #4b5563", paddingTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
              © 2025 TeacherWorld. Made by Gecclk Students.
            </p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  )
}
