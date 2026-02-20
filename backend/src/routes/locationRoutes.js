const express = require("express")
const locationController = require("../controllers/locationController")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/nearby", locationController.findNearbyJobs)
router.get("/search", locationController.searchByLocation)

module.exports = router
