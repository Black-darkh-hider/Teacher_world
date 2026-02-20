const express = require("express");
const router = express.Router();
const institutionTeamController = require("../controllers/institutionTeamController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const checkInstitutionProfile = require("../middleware/checkInstitutionProfile");

// Apply authentication and role authorization
router.use(authenticateToken, authorizeRole(["institution"]), checkInstitutionProfile);

// GET /institution/teams
router.get("/", institutionTeamController.getTeamMembers);

// POST /institution/teams
router.post("/", institutionTeamController.addTeamMember);

// PUT /institution/teams/:id
router.put("/:id", institutionTeamController.updateTeamMember);

// DELETE /institution/teams/:id
router.delete("/:id", institutionTeamController.removeTeamMember);

module.exports = router;
