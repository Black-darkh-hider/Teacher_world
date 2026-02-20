const express = require("express")
const router = express.Router()
const materialController = require("../controllers/materialController")
const { authenticateToken, authorizeRole } = require("../middleware/auth")
const upload = require("../middleware/upload")

router.post(
  "/",
  authenticateToken,
  authorizeRole(["institution"]),
  upload.single("material"),
  materialController.uploadMaterial,
)
router.get("/", materialController.getMaterials)
router.get("/my-materials", authenticateToken, authorizeRole(["institution"]), materialController.getMyMaterials)
router.delete("/:id", authenticateToken, authorizeRole(["institution"]), materialController.deleteMaterial)

module.exports = router
