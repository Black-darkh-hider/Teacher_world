module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/job-portal",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_key",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1h",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  OTP_EXPIRY: Number.parseInt(process.env.OTP_EXPIRY || "600000"),
}
