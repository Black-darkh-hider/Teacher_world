const mongoose = require("mongoose")

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  email: { type: String, required: false },
  action: { type: String, required: true }, // e.g., 'otp.sent', 'otp.verify', 'material.upload', 'job.apply'
  purpose: { type: String, required: false },
  targetType: { type: String, required: false },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: false },
  ip: { type: String, required: false },
  userAgent: { type: String, required: false },
  metadata: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("ActivityLog", activityLogSchema)
