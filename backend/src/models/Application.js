const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherProfile",
    required: true,
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstitutionProfile",
    required: true,
  },

  status: {
    type: String,
    enum: ["applied", "viewed", "shortlisted", "rejected", "interview-scheduled", "accepted"],
    default: "applied",
  },

  statusHistory: [
    {
      status: String,
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      notes: String,
    },
  ],

  coverLetter: String,
  appliedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Application", applicationSchema)
