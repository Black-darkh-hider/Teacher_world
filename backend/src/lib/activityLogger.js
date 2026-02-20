const ActivityLog = require("../models/ActivityLog")

async function logActivity({ userId, email, action, purpose, targetType, targetId, req, metadata }) {
  try {
    const doc = new ActivityLog({
      userId,
      email,
      action,
      purpose,
      targetType,
      targetId,
      ip: req?.ip || req?.headers?.['x-forwarded-for'] || null,
      userAgent: req?.headers?.['user-agent'] || null,
      metadata,
    })
    await doc.save()
  } catch (err) {
    console.error('[ACTIVITY_LOG] Failed to write log:', err.message)
  }
}

module.exports = { logActivity }
