"use client"

import { Link } from "react-router-dom"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Logo from "../components/Logo"

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.log("[v0] Error fetching applications:", error)
    }
    setLoading(false)
  }

  const getStatusIcon = (status) => {
    if (status === "accepted") return <CheckCircle size={20} style={{ color: "#10b981" }} />
    if (status === "rejected") return <XCircle size={20} style={{ color: "#ef4444" }} />
    return <Clock size={20} style={{ color: "#f59e0b" }} />
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true
    return app.status === filter
  })

  return (
    <div>
      <nav className="navbar">
        <div className="container flex justify-between">
          <Link to="/" className="navbar-brand" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link to="/applications">Applications</Link>
            </li>
            <li>
              <Link to="/dashboard/teacher">Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <h1 style={{ marginBottom: "2rem" }}>My Applications</h1>

          <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "0.375rem",
                background: filter === "all" ? "#1a5490" : "#e5e7eb",
                color: filter === "all" ? "white" : "#374151",
                cursor: "pointer",
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "0.375rem",
                background: filter === "pending" ? "#f59e0b" : "#e5e7eb",
                color: filter === "pending" ? "white" : "#374151",
                cursor: "pointer",
              }}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("accepted")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "0.375rem",
                background: filter === "accepted" ? "#10b981" : "#e5e7eb",
                color: filter === "accepted" ? "white" : "#374151",
                cursor: "pointer",
              }}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilter("rejected")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "0.375rem",
                background: filter === "rejected" ? "#ef4444" : "#e5e7eb",
                color: filter === "rejected" ? "white" : "#374151",
                cursor: "pointer",
              }}
            >
              Rejected
            </button>
          </div>

          {loading ? (
            <p>Loading applications...</p>
          ) : (
            <div>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <div key={app._id} className="card" style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h4>{app.jobTitle}</h4>
                        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>{app.institutionName}</p>
                        <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.25rem" }}>
                          Applied on {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {getStatusIcon(app.status)}
                        <span style={{ textTransform: "capitalize", fontWeight: "500" }}>{app.status}</span>
                      </div>
                    </div>
                    {app.statusHistory && app.statusHistory.length > 0 && (
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
                        <h6>Status Updates:</h6>
                        {app.statusHistory.map((update, idx) => (
                          <p key={idx} style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
                            {new Date(update.date).toLocaleDateString()} - {update.status}
                            {update.message && `: ${update.message}`}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#6b7280" }}>No applications found</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
