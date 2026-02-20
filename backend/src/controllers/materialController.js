const StudyMaterial = require("../models/StudyMaterial")
const InstitutionProfile = require("../models/InstitutionProfile")
const { logActivity } = require("../lib/activityLogger")

exports.uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" })
    }

    const { title, description, subject, grade } = req.body
    const institutionProfile = await InstitutionProfile.findOne({ userId: req.user.userId })

    if (!institutionProfile) {
      return res.status(400).json({ message: "Institution profile not found" })
    }

    const material = new StudyMaterial({
      institutionId: institutionProfile._id,
      title,
      description,
      subject,
      grade,
      fileUrl: `/uploads/materials/${req.file.filename}`,
      fileType: req.file.mimetype,
    })

    await material.save()
  // Log material upload
  await logActivity({ userId: institutionProfile.userId, action: "material.upload", targetType: "StudyMaterial", targetId: material._id, req })
    res.status(201).json({ message: "Material uploaded", material })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getMaterials = async (req, res) => {
  try {
    const { subject, grade, skip = 0, limit = 20 } = req.query

    const filter = {}
    if (subject) filter.subject = subject
    if (grade) filter.grade = grade

    const materials = await StudyMaterial.find(filter)
      .skip(Number.parseInt(skip))
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await StudyMaterial.countDocuments(filter)

    res.json({ materials, total, pages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getMyMaterials = async (req, res) => {
  try {
    const institutionProfile = await InstitutionProfile.findOne({ userId: req.user.userId })

    if (!institutionProfile) {
      return res.status(400).json({ message: "Institution profile not found" })
    }

    const materials = await StudyMaterial.find({ institutionId: institutionProfile._id }).sort({ createdAt: -1 })

    res.json(materials)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id)

    if (!material) {
      return res.status(404).json({ message: "Material not found" })
    }

    const institutionProfile = await InstitutionProfile.findOne({ userId: req.user.userId })

    if (material.institutionId.toString() !== institutionProfile._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await StudyMaterial.deleteOne({ _id: req.params.id })
    res.json({ message: "Material deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
