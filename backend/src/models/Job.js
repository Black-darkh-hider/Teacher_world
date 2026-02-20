const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstitutionProfile",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  subject: String,
  qualifications: [String],
  responsibilities: [String],
  requirements: [String],
  benefits: [String],
  experienceRequired: String,
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "temporary"],
    default: "full-time",
  },
  salaryRange: String,

  // Location
  city: String,
  state: String,
  location: String,
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      default: undefined
    }
  },

  // Details
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "temporary"],
  },
  salary: {
    min: Number,
    max: Number,
    currency: String,
  },

  // Dates
  startDate: Date,
  deadline: Date,

  status: {
    type: String,
    enum: ["active", "closed", "archived"],
    default: "active",
  },

  // Automatic counters
  viewCount: {
    type: Number,
    default: 0,
  },
  applicationCount: {
    type: Number,
    default: 0,
  },

  // Institution details for display
  institutionRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  employeeCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create geospatial index for coordinates
jobSchema.index({ coordinates: "2dsphere" })

module.exports = mongoose.model("Job", jobSchema)
