const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { authenticateToken } = require("../middleware/auth");

// Job routes
// Lightweight request logger for jobs to help debug auth/payload issues.
const logJobRequest = (req, res, next) => {
	try {
		const rawAuth = req.headers["authorization"] || null
		let masked = null
		if (rawAuth) {
			const parts = rawAuth.split(/\s+/)
			const token = parts.length > 1 ? parts[1] : parts[0]
			if (token && token.length > 12) {
				masked = `${token.slice(0,6)}...${token.slice(-6)} (len:${token.length})`
			} else if (token) {
				masked = `${token} (len:${token.length})`
			}
		}

		const hasLat = req.body && (req.body.latitude !== undefined || req.body.longitude !== undefined)

		console.log(`[JOB-REQ] ${req.method} ${req.originalUrl} - authHeaderPresent:${!!rawAuth} masked:${masked} latPresent:${hasLat} bodyKeys:${Object.keys(req.body||{}).join(',')}`)
	} catch (e) {
		// ignore logging errors
	}
	next()
}

router.post("/", logJobRequest, authenticateToken, jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/nearby", authenticateToken, jobController.nearbyJobs);
router.get("/institution/jobs", authenticateToken, jobController.getJobsByInstitution);
router.get("/:id", jobController.getJobById);
router.put("/:id", authenticateToken, jobController.updateJob);
router.delete("/:id", authenticateToken, jobController.deleteJob);

module.exports = router;
