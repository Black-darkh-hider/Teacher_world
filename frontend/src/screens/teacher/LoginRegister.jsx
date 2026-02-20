import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRegister() {
  return (
    <div style={{ padding: '2rem', background: 'var(--gray-50)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Teacher Login / Register</h1>
        <p>Supports email/password, OTP, and optional resume upload during signup.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login-teacher" className="btn btn-primary">Login</Link>
          <Link to="/register-teacher" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  )
}
