const mongoose = require("mongoose")

const institutionProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  registrationNumber: String,
  phoneNumber: String,

  photo: String,
  description: String,

  // Location
  address: String,
  city: String,
  state: String,
  country: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },

  // Details
  type: {
    type: String,
    enum: ["school", "college", "university", "coaching"],
  },
  established: Number,
  website: String,

  // Verification
  verified: {
    type: Boolean,
    default: false,
  },
  verificationDocs: [String],

  // Zoom Integration
  zoomAccessToken: String,
  zoomRefreshToken: String,
  zoomTokenExpiresAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("InstitutionProfile", institutionProfileSchema)
