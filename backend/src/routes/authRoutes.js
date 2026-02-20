const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.post("/register-teacher", authController.registerTeacher)
router.post("/register-institution", authController.registerInstitution)
router.post("/verify-otp", authController.verifyOTP)
router.post("/login", authController.login)
router.post("/refresh", authController.refreshToken)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)

router.post("/forgot-username", authController.forgotUsername)
router.post("/verify-username-recovery", authController.verifyUsernameRecovery)
router.post("/google/callback", authController.googleCallback)

module.exports = router
