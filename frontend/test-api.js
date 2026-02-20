// Frontend: Quick test to verify API connectivity

async function testAPIConnection() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

  console.log("\n🧪 Testing Frontend to Backend Connection...\n")

  try {
    console.log(`Testing API at: ${API_URL}\n`)

    // Test health endpoint
    const response = await fetch(`${API_URL}/health`)
    if (response.ok) {
      console.log("✅ Backend API is responding")
      const data = await response.json()
      console.log("Status:", data.status)
    } else {
      console.log("❌ Backend returned error:", response.status)
    }
  } catch (error) {
    console.log("❌ Cannot reach backend:", error.message)
    console.log("   Make sure backend is running on port 5000")
    console.log("   Check VITE_API_URL in frontend .env file")
  }

  console.log("\n✅ API Test Complete!\n")
}

// Run test when this file is imported
testAPIConnection()
