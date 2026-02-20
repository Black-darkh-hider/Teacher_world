"use client"

import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function SocialCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const type = searchParams.get("type")

    if (token) {
      localStorage.setItem("token", token)
      localStorage.setItem("userType", type)

      if (type === "teacher") {
        navigate("/dashboard/teacher")
      } else if (type === "institution") {
        navigate("/dashboard/institution")
      } else {
        navigate("/profile")
      }
    } else {
      navigate("/login-teacher")
    }
  }, [searchParams, navigate])

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ textAlign: "center", maxWidth: "400px" }}>
        <h2>Authenticating...</h2>
        <p style={{ color: "#6b7280", marginTop: "1rem" }}>Please wait while we complete your login.</p>
      </div>
    </div>
  )
}
