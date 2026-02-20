const User = require("../models/User")
const TeacherProfile = require("../models/TeacherProfile")
const InstitutionProfile = require("../models/InstitutionProfile")
const { generateAccessToken, generateRefreshToken } = require("../config/jwt")
const axios = require("axios")

exports.googleCallback = async (req, res) => {
  try {
    const { token } = req.body

    // Verify Google token
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
    const { email, name, picture, id: googleId } = response.data

    // Find or create user
    let user = await User.findOne({ email })

    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        verified: true,
        role: req.body.role || "teacher",
      })
      await user.save()

      // Create profile
      if (req.body.role === "teacher") {
        await TeacherProfile.create({ userId: user._id })
      } else {
        await InstitutionProfile.create({ userId: user._id, institutionName: name })
      }
    } else if (!user.googleId) {
      user.googleId = googleId
      await user.save()
    }

    const accessToken = generateAccessToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.linkedInCallback = async (req, res) => {
  try {
    const { idToken } = req.body

    // Verify LinkedIn token - similar to Google
    const response = await axios.get(`https://api.linkedin.com/v2/me`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })

    const { email, localizedFirstName, localizedLastName, id: linkedInId } = response.data
    const name = `${localizedFirstName} ${localizedLastName}`

    let user = await User.findOne({ email })

    if (!user) {
      user = new User({ email, name, linkedInId, verified: true, role: "teacher" })
      await user.save()
      await TeacherProfile.create({ userId: user._id })
    }

    const accessToken = generateAccessToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
