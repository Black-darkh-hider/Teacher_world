const mongoose = require("mongoose")

const institutionTeamMemberSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstitutionProfile",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Recruiter", "Viewer"],
    default: "Recruiter",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("InstitutionTeamMember", institutionTeamMemberSchema)
