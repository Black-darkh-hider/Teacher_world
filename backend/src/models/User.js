const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  name: String,
  role: {
    type: String,
    enum: ["teacher", "institution", "admin"],
    default: "teacher",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  googleId: String,
  linkedInId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    // No password set, cannot compare
    return false
  }
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)
