import React from 'react'
import { Link } from 'react-router-dom'

export default function InstitutionLoginRegister() {
  return (
    <div style={{ padding: '2rem', background: 'var(--gray-50)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Institution Login / Register</h1>
        <p>HR name, institution name, email, password, logo upload, address + map location.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login-institution" className="btn btn-primary">Login</Link>
          <Link to="/register-institution" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  )
}
