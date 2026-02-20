import React from 'react'
import { Link } from 'react-router-dom'

export default function InstitutionJobsManagement() {
  return (
    <div style={{ padding: '2rem', background: 'var(--gray-50)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/institution/dashboard" className="btn btn-secondary">
            ← Back to Dashboard
          </Link>
        </div>
        <h1>Manage Jobs</h1>
        <p>Active jobs, closed jobs, job analytics (views, saves, applies).</p>
      </div>
    </div>
  )
}
