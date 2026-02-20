const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const otpTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["registration", "password-reset", "username-recovery"],
    default: "registration",
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3, // Maximum 3 verification attempts
  },
  used: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Compound index for email + purpose to prevent duplicate active OTPs
otpTokenSchema.index({ email: 1, purpose: 1, used: 1 }, { unique: true, partialFilterExpression: { used: false } })

// Auto-delete expired OTPs
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// Instance method to verify OTP
otpTokenSchema.methods.verifyOTP = async function(candidateOTP) {
  if (this.used) {
    throw new Error('OTP has already been used')
  }

  if (this.attempts >= 3) {
    throw new Error('Maximum verification attempts exceeded')
  }

  if (Date.now() > this.expiresAt) {
    throw new Error('OTP has expired')
  }

  const isMatch = await bcrypt.compare(candidateOTP, this.otpHash)

  if (!isMatch) {
    this.attempts += 1
    await this.save()
    throw new Error('Invalid OTP')
  }

  // Mark as used on successful verification
  this.used = true
  await this.save()

  return true
}

// Static method to check rate limiting
otpTokenSchema.statics.checkRateLimit = async function(email) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const recentOTPs = await this.countDocuments({
    email,
    createdAt: { $gte: oneHourAgo }
  })

  return recentOTPs >= 3 // Max 3 OTPs per hour per email
}

// Static method to create hashed OTP
otpTokenSchema.statics.createHashedOTP = async function(email, otp, purpose) {
  const saltRounds = 12
  const otpHash = await bcrypt.hash(otp, saltRounds)

  // Delete any existing unused OTP for this email and purpose
  await this.deleteMany({
    email,
    purpose,
    used: false
  })

  return this.create({
    email,
    otpHash,
    purpose,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  })
}

module.exports = mongoose.model("OtpToken", otpTokenSchema)
