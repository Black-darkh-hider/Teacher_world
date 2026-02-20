"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Logo from "../components/Logo"

export default function ForgotUsername() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        const data = await response.json()
        setUsername(data.username)
        setMessage("Username found! Check your email for details.")
      } else {
        setMessage("Email not found in our system")
      }
    } catch (error) {
      setMessage("Error retrieving username")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="navbar">
        <div className="container flex justify-between">
          <Link to="/" className="navbar-brand" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Recover Username</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Searching..." : "Find Username"}
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f0fdf4",
                borderRadius: "0.375rem",
                borderLeft: "4px solid #10b981",
              }}
            >
              <p style={{ color: "#065f46", margin: 0 }}>{message}</p>
              {username && (
                <p style={{ color: "#1f2937", margin: "0.5rem 0 0 0", fontWeight: "500" }}>Username: {username}</p>
              )}
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/login-teacher" style={{ color: "#1a5490", textDecoration: "none" }}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
