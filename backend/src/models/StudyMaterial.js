const mongoose = require("mongoose")

const studyMaterialSchema = new mongoose.Schema({
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
  grade: String,
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema)
