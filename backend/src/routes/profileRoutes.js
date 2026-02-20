const express = require("express")
const router = express.Router()
const profileController = require("../controllers/profileController")
const { authenticateToken, authorizeRole } = require("../middleware/auth")
const upload = require("../middleware/upload")

// Teacher routes
router.get("/teacher", authenticateToken, profileController.getTeacherProfile)
router.get("/teacher/:teacherId", authenticateToken, profileController.getTeacherProfileById)
router.put(
  "/teacher",
  authenticateToken,
  authorizeRole(["teacher"]),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "marksCard", maxCount: 1 },
  ]),
  profileController.updateTeacherProfile,
)

router.post(
  "/teacher/photo",
  authenticateToken,
  authorizeRole(["teacher"]),
  upload.single("photo"),
  profileController.uploadPhoto,
)

router.post(
  "/teacher/resume",
  authenticateToken,
  authorizeRole(["teacher"]),
  upload.single("resume"),
  profileController.uploadResume,
)

router.post(
  "/teacher/marks-card",
  authenticateToken,
  authorizeRole(["teacher"]),
  upload.single("marksCard"),
  profileController.uploadMarksCard,
)

router.post("/teacher/education", authenticateToken, authorizeRole(["teacher"]), profileController.addEducation)
router.post(
  "/teacher/certificate",
  authenticateToken,
  authorizeRole(["teacher"]),
  upload.single("certificate"),
  profileController.uploadCertificate,
)

// Institution routes
router.get("/institution", authenticateToken, profileController.getInstitutionProfile)
router.put(
  "/institution",
  authenticateToken,
  authorizeRole(["institution"]),
  profileController.updateInstitutionProfile,
)

router.post(
  "/institution/photo",
  authenticateToken,
  authorizeRole(["institution"]),
  upload.single("photo"),
  profileController.uploadInstitutionPhoto,
)

module.exports = router
