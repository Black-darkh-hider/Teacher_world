const express = require("express")
const socialAuthController = require("../controllers/socialAuthController")

const router = express.Router()

router.post("/google/callback", socialAuthController.googleCallback)
router.post("/linkedin/callback", socialAuthController.linkedInCallback)

module.exports = router
