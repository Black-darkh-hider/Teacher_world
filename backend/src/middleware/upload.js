const multer = require("multer")
const path = require("path")

const fs = require("fs")

// Helper: sanitize filenames to remove spaces and path characters
function sanitizeFilename(name) {
  return name
    .replace(/\s+/g, "-") // spaces -> dashes
    .replace(/[^a-zA-Z0-9-_.]/g, "") // remove unusual chars
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "uploads/materials"
    if (file.fieldname === "resume") dir = "uploads/resumes"
    if (file.fieldname === "certificate") dir = "uploads/certificates"
    if (file.fieldname === "marksCard" || file.fieldname === "marksCards") dir = "uploads/marksCards"
    if (file.fieldname === "photo") {
      if (req.path.includes("institution")) dir = "uploads/institution-photos"
      else dir = "uploads/photos"
    }
    if (file.fieldname === "institutionPhoto") dir = "uploads/institution-photos"

    const full = path.join(__dirname, "../../", dir)
    try {
      if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true })
      cb(null, full)
    } catch (err) {
      cb(err)
    }
  },
  filename: (req, file, cb) => {
    const clean = sanitizeFilename(file.originalname)
    cb(null, `${Date.now()}-${clean}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG"))
    }
  },
})

module.exports = upload
