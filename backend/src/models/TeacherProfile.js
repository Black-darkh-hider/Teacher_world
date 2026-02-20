const mongoose = require("mongoose")

const teacherProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  phone: String,
  photo: String,
  bio: String,

  // Experience & Professional
  experience: Number,
  subjects: [String],
  classesLevel: [String],
  specializations: [String],
  skills: [String],

  // Education - Extended to support multiple education types
  degrees: [
    {
      degree: String,
      specialization: String,
      institution: String,
      year: Number,
    },
  ],

  // Certificates
  certificates: [
    {
      name: String,
      year: Number,
    },
  ],

  // Marks Cards - Support multiple mark types (SSLC, PUC, Bachelor, Master, etc.)
  marksCards: [
    {
      type: {
        type: String,
        enum: ["SSLC", "PUC", "Intermediate", "Bachelor", "Master", "Diploma", "Other"],
      },
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],

  // Files
  resumeUrl: String,
  marksCardUrl: String,
  certificateUrls: [String],

  // Job Preferences
  expectedSalary: String,
  jobType: [String],
  preferredLocations: [String],
  remoteAvailable: Boolean,
  readyToRelocate: Boolean,
  availability: String,
  currentAddress: String,
  preferredShifts: [String],

  // Location
  city: String,
  state: String,
  country: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("TeacherProfile", teacherProfileSchema)
