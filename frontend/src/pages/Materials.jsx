"use client"

import { Link } from "react-router-dom"
import { Upload, Download, FileText } from "lucide-react"
import { useState, useEffect } from "react"

export default function Materials() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/materials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setMaterials(data)
      }
    } catch (error) {
      console.log("[v0] Error fetching materials:", error)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile || !title) {
      alert("Please select a file and enter a title")
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("file", selectedFile)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/materials/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (response.ok) {
        setTitle("")
        setSelectedFile(null)
        fetchMaterials()
      }
    } catch (error) {
      console.log("[v0] Error uploading material:", error)
    }
    setLoading(false)
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container flex justify-between">
          <Link to="/" className="navbar-brand">
            TeacherWorld
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link to="/materials">Materials</Link>
            </li>
            <li>
              <Link to="/dashboard/teacher">Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <h1 style={{ marginBottom: "2rem" }}>Study Materials</h1>

          <div className="grid grid-2 gap-4">
            <div className="card">
              <h3>Upload Materials</h3>
              <form onSubmit={handleUpload}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>File</label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0])}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
                  <Upload size={18} style={{ marginRight: "0.5rem", display: "inline" }} />
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>

            <div>
              <h3>Your Materials ({materials.length})</h3>
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                {materials.length > 0 ? (
                  materials.map((material) => (
                    <div key={material._id} className="card" style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <FileText size={24} style={{ color: "#1a5490", marginTop: "0.25rem" }} />
                        <div style={{ flex: 1 }}>
                          <h5>{material.title}</h5>
                          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {new Date(material.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <a href={material.fileUrl} download className="btn btn-sm" style={{ padding: "0.5rem 1rem" }}>
                          <Download size={16} />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#6b7280" }}>No materials uploaded yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
