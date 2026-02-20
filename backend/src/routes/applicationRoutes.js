const express = require("express")
const router = express.Router()
const appController = require("../controllers/applicationController")
const { authenticateToken, authorizeRole } = require("../middleware/auth")

router.post("/", authenticateToken, appController.applyJob)
router.get("/my-applications", authenticateToken, appController.getMyApplications)
router.get("/job/:jobId", authenticateToken, appController.getApplicationsForJob)
router.get("/institution/applications", authenticateToken, authorizeRole(["institution"]), appController.getApplicationsForInstitution)
router.patch("/:applicationId", authenticateToken, appController.updateApplicationStatus)
router.put("/:applicationId", authenticateToken, appController.updateApplication)
router.delete("/:applicationId", authenticateToken, appController.deleteApplication)
router.delete("/institution/:applicationId", authenticateToken, authorizeRole(["institution"]), appController.deleteApplicationByInstitution)
router.get("/stats/institution", authenticateToken, authorizeRole(["institution"]), appController.getInstitutionStats)

module.exports = router
