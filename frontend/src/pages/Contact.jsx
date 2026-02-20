"use client"

import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import Logo from "../components/Logo"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setMessage("Message sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch (error) {
      setMessage("Failed to send message")
    }
    setLoading(false)
  }

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
              <Link to="/contact" style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>
                Contact
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
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem" }}>Contact Us</h1>
          <p style={{ fontSize: "1.125rem", opacity: 0.95 }}>Get in touch with our support team. We're here to help!</p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: "2rem", fontSize: "2rem", fontWeight: "700", color: "#1a5490" }}>
                Get in Touch
              </h2>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                  <Mail size={28} style={{ color: "#1a5490", flexShrink: 0 }} />
                  <div>
                    <h5 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Email</h5>
                    <p style={{ color: "#666", margin: 0 }}>support@teacherworld.com</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                  <Phone size={28} style={{ color: "#1a5490", flexShrink: 0 }} />
                  <div>
                    <h5 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Phone</h5>
                    <p style={{ color: "#666", margin: 0 }}>+91 98765 43210</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <MapPin size={28} style={{ color: "#1a5490", flexShrink: 0 }} />
                  <div>
                    <h5 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Address</h5>
                    <p style={{ color: "#666", margin: 0 }}>
                      TeacherWorld HQ
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} style={{ background: "#f9fafb", padding: "2rem", borderRadius: "0.75rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1.5rem",
                    background: "#1a5490",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Send size={18} /> {loading ? "Sending..." : "Send Message"}
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "1rem",
                      textAlign: "center",
                      color: message.includes("successfully") ? "#10b981" : "#ef4444",
                      fontWeight: "500",
                    }}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1f2937", color: "white", padding: "3rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>© 2025 TeacherWorld. All rights reserved.</p>
      </footer>
    </div>
  )
}
