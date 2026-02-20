import React, { useState } from "react"


const states = [
  { code: "KA", name: "Karnataka" },
  { code: "MH", name: "Maharashtra" },
  { code: "DL", name: "Delhi" },
  // Add more states as needed
]

export default function LocationFilter({ onFilterChange }) {
  const [pinCode, setPinCode] = useState("")
  const [state, setState] = useState("")

  const handlePinCodeChange = (e) => {
    const value = e.target.value
    setPinCode(value)
    onFilterChange({ pinCode: value, state })
  }

  const handleStateChange = (e) => {
    const value = e.target.value
    setState(value)
    onFilterChange({ pinCode, state: value })
  }

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
      <div>
        <label htmlFor="state-select" style={{ display: "block", marginBottom: "0.25rem" }}>State</label>
        <select id="state-select" value={state} onChange={handleStateChange} style={{ padding: "0.5rem", minWidth: "150px" }}>
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pincode-input" style={{ display: "block", marginBottom: "0.25rem" }}>Pin Code</label>
        <input
          id="pincode-input"
          type="text"
          value={pinCode}
          onChange={handlePinCodeChange}
          placeholder="Enter Pin Code"
          style={{ padding: "0.5rem", minWidth: "150px" }}
        />
      </div>
    </div>
  )
}
