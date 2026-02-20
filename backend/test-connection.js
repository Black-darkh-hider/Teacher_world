// Quick test to verify all connections are working

const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config()

async function testConnections() {
  console.log("\n🧪 Testing TeacherWorld Connections...\n")

  // 1. MongoDB Connection
  console.log("1️⃣  Testing MongoDB Connection...")
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/teacher-portal", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ MongoDB Connected Successfully\n")

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log("📦 Database Collections:", collections.map((c) => c.name).join(", ") || "None yet\n")

    await mongoose.disconnect()
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message, "\n")
  }

  // 2. Gmail SMTP Connection
  console.log("2️⃣  Testing Gmail SMTP Configuration...")
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    await transporter.verify()
    console.log("✅ Gmail SMTP Configured Successfully\n")
  } catch (error) {
    console.log("⚠️  Gmail SMTP Configuration Issue:", error.message, "\n")
  }

  // 3. Environment Variables Check
  console.log("3️⃣  Checking Environment Variables...")
  const requiredVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "GMAIL_USER",
    "GMAIL_PASSWORD",
    "GOOGLE_CLIENT_ID",
    "FRONTEND_URL",
  ]

  let allVarsPresent = true
  requiredVars.forEach((varName) => {
    if (process.env[varName]) {
      console.log(
        `✅ ${varName}: ${varName.includes("SECRET") || varName.includes("PASSWORD") ? "***hidden***" : process.env[varName]}`,
      )
    } else {
      console.log(`❌ ${varName}: NOT SET`)
      allVarsPresent = false
    }
  })

  console.log(
    "\n" + (allVarsPresent ? "✅ All required variables set!" : "⚠️  Some variables missing - see .env.example"),
  )

  // 4. API Endpoints Summary
  console.log("\n4️⃣  API Endpoints Summary:")
  console.log("   Auth: POST /api/auth/register-teacher, /api/auth/login, /api/auth/verify-otp")
  console.log("   Jobs: GET /api/jobs, POST /api/jobs, GET /api/jobs/:id")
  console.log("   Applications: POST /api/applications, GET /api/applications")
  console.log("   Profile: GET /api/profile, PUT /api/profile")

  console.log("\n✅ Connection Test Complete!\n")
}

testConnections()
