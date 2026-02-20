const mongoose = require("mongoose")
require("dotenv").config()

const User = require("../src/models/User")
const InstitutionProfile = require("../src/models/InstitutionProfile")
const Job = require("../src/models/Job")

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/teacher-portal")

    // Clear existing data
    await User.deleteMany({})
    await InstitutionProfile.deleteMany({})
    await Job.deleteMany({})

    // Create test admin
    const admin = new User({
      email: "admin@teacherworld.com",
      password: "Admin@123",
      name: "Admin",
      role: "admin",
      verified: true,
    })
    await admin.save()

    // Create test institution
    const institutionUser = new User({
      email: "school@teacherworld.com",
      password: "School@123",
      name: "School Admin",
      role: "institution",
      verified: true,
    })
    await institutionUser.save()

    const institutionProfile = new InstitutionProfile({
      userId: institutionUser._id,
      institutionName: "XYZ International School",
      type: "school",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      verified: true,
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777,
      },
    })
    await institutionProfile.save()

    // Create sample jobs
    const jobs = []

    await Job.insertMany(jobs)

    console.log("Database seeded successfully")
    process.exit(0)
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()
