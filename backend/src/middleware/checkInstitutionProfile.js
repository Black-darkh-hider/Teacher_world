module.exports = (req, res, next) => {
  if (!req.user || !req.user.institutionProfileId) {
    return res.status(400).json({ error: "User is not associated with a valid institution profile" })
  }
  next()
}
