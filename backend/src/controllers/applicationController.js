 const Application = require("../models/Application")
const { sendStatusUpdate } = require("../config/mailer")
const User = require("../models/User")
const Job = require("../models/Job")
const TeacherProfile = require("../models/TeacherProfile")
const { logActivity } = require("../lib/activityLogger")

exports.applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body
    const userId = req.user.userId

    // Get teacher profile
    const teacherProfile = await TeacherProfile.findOne({ userId })
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher profile not found" })
    }

    // Check if already applied
    const existingApp = await Application.findOne({ jobId, teacherId: teacherProfile._id })
    if (existingApp) {
      return res.status(400).json({ message: "Already applied to this job" })
    }

    // Fetch the job to get the institutionId
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const application = new Application({
      jobId,
      teacherId: teacherProfile._id,
      institutionId: job.institutionId,
      coverLetter,
      statusHistory: [{ status: "applied" }],
    })

    await application.save()

    // Increment application count on job automatically
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1 } })

    // Log user application action
    await logActivity({ userId, action: "job.apply", targetType: "Job", targetId: jobId, req })
    res.status(201).json({ message: "Application submitted", application })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId

    // Get teacher profile
    const teacherProfile = await TeacherProfile.findOne({ userId })
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher profile not found" })
    }

    const applications = await Application.find({ teacherId: teacherProfile._id })
      .populate({
        path: "jobId",
        populate: { path: "institutionId", select: "institutionName phoneNumber photo" },
      })
      .populate({
        path: "teacherId",
        model: "TeacherProfile",
        select: "name experience subjects",
      })
      .sort({ appliedAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params

    const applications = await Application.find({ jobId }).populate("teacherId").sort({ appliedAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getApplicationsForInstitution = async (req, res) => {
  try {
    const userId = req.user.userId

    // Get institution profile
    const InstitutionProfile = require("../models/InstitutionProfile")
    const institutionProfile = await InstitutionProfile.findOne({ userId })
    if (!institutionProfile) {
      return res.status(404).json({ message: "Institution profile not found" })
    }

    // Find all jobs posted by this institution
    const jobs = await Job.find({ institutionId: institutionProfile._id })
    const jobIds = jobs.map(job => job._id)

    // Find all applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate({
        path: "jobId",
        select: "title subject city state"
      })
      .populate({
        path: "teacherId",
        model: "TeacherProfile",
        select: "resumeUrl experience name subjects photo userId",
      })
      .sort({ appliedAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params
    const { status, notes } = req.body
    const userId = req.user.userId

    const application = await Application.findById(applicationId)
    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Get institution profile to verify authorization
    const InstitutionProfile = require("../models/InstitutionProfile")
    const institutionProfile = await InstitutionProfile.findOne({ userId })
    if (!institutionProfile) {
      return res.status(403).json({ message: "Institution profile not found" })
    }

    // Check if the application belongs to a job posted by this institution
    const job = await Job.findById(application.jobId)
    if (!job || job.institutionId.toString() !== institutionProfile._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application" })
    }

    // Validate status transitions
    const validStatuses = ['applied', 'viewed', 'shortlisted', 'interview-scheduled', 'accepted', 'rejected']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    application.status = status
    application.statusHistory.push({ status, notes, updatedBy: userId })

    await application.save()

    // Respond immediately to client to avoid blocking
    res.json({ message: "Status updated", application })

    // Send email notification to teacher (await to catch immediate errors)
    try {
      const teacherProfile = await TeacherProfile.findById(application.teacherId)
      const teacherUser = await User.findById(teacherProfile.userId)

      // Fetch institution name and logo URL from institution document
      const InstitutionProfile = require("../models/InstitutionProfile")
      const institution = await InstitutionProfile.findById(job.institutionId)

      const institutionName = institution?.institutionName || ''
      // Assuming institution photo field contains logo url, fallback to empty string
      const institutionLogo = institution?.photo || ''

          if (teacherUser && teacherUser.email) {
            console.log("[EMAIL NOTIFICATION] Sending status update email to:", teacherUser.email)
            try {
              await sendStatusUpdate(teacherUser.email, job.title, status, notes, institutionName, teacherProfile.name, institutionLogo)
              console.log("[EMAIL NOTIFICATION] Email sent successfully to:", teacherUser.email)
            } catch (emailError) {
              console.error("[EMAIL NOTIFICATION] Failed to send email:", emailError)
            }
          } else {
            console.warn("[EMAIL NOTIFICATION] No valid email found for user:", teacherUser ? teacherUser._id : "unknown")
          }

      // Send automatic message if status is accepted
      if (status === "accepted") {
        const Message = require("../models/Message")
        const welcomeMessage = new Message({
          senderId: institutionProfile.userId, // Institution's user ID
          receiverId: teacherProfile.userId, // Teacher's user ID
          applicationId: application._id,
          content: `Congratulations! Your application for the ${job.title} position at ${job.institutionId?.institutionName} has been accepted. Please check your messages for further details.`,
          messageType: "text",
        })
        await welcomeMessage.save()

        // Emit message via Socket.io
        const io = global.io
        if (io) {
          io.to(teacherProfile.userId.toString()).emit("new_message", {
            ...welcomeMessage.toObject(),
            senderId: institutionProfile.userId,
            receiverId: teacherProfile.userId,
          })
        }
      }

      // Emit real-time update to teacher via Socket.io
      const io = global.io
      if (io) {
        io.to(teacherProfile.userId.toString()).emit("application_status_updated", {
          applicationId: application._id,
          newStatus: status,
          jobTitle: job.title,
          institutionName: job.institutionId?.institutionName,
          updatedAt: application.updatedAt
        })

        if (status === "interview-scheduled") {
          // Emit interview scheduled event to teacher
          io.to(teacherProfile.userId.toString()).emit("interview_scheduled", {
            applicationId: application._id,
            jobTitle: job.title,
            institutionName: job.institutionId?.institutionName,
            scheduledAt: application.updatedAt // Could adjust to actual interview date if available
          })
        }
      }

      // Log activity
      await logActivity({
        userId,
        action: "application.status_update",
        targetType: "Application",
        targetId: applicationId,
        req,
        details: { oldStatus: application.statusHistory[application.statusHistory.length - 2]?.status, newStatus: status }
      })
    } catch (asyncError) {
      console.error("[ASYNC STATUS UPDATE] Error processing notifications or socket emissions:", asyncError)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params
    const { coverLetter } = req.body
    const userId = req.user.userId

    // Get teacher profile
    const teacherProfile = await TeacherProfile.findOne({ userId })
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher profile not found" })
    }

    const application = await Application.findOne({ _id: applicationId, teacherId: teacherProfile._id })
    if (!application) {
      return res.status(404).json({ message: "Application not found or not authorized" })
    }

    // Only allow updates if status is still "applied"
    if (application.status !== "applied") {
      return res.status(400).json({ message: "Cannot update application that has been reviewed" })
    }

    application.coverLetter = coverLetter
    await application.save()

    res.json({ message: "Application updated", application })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params
    const userId = req.user.userId

    // Get teacher profile
    const teacherProfile = await TeacherProfile.findOne({ userId })
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher profile not found" })
    }

    const application = await Application.findOne({ _id: applicationId, teacherId: teacherProfile._id })
    if (!application) {
      return res.status(404).json({ message: "Application not found or not authorized" })
    }

    // Allow deletion even with associated interviews or messages

    // Allow deletion for all statuses
    // Decrement application count on job
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicationCount: -1 } })

    await Application.findByIdAndDelete(applicationId)

    res.json({ message: "Application deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteApplicationByInstitution = async (req, res) => {
  try {
    const { applicationId } = req.params
    const institutionProfileId = req.user.institutionProfileId

    if (!institutionProfileId) {
      return res.status(403).json({ message: "Institution profile not found" })
    }

    const application = await Application.findById(applicationId)
    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check if the application belongs to a job posted by this institution
    const job = await Job.findById(application.jobId)
    if (!job || job.institutionId.toString() !== institutionProfileId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this application" })
    }

    // Only allow deletion if status is 'applied'
    if (application.status !== 'applied') {
      return res.status(400).json({ message: "Can only delete applications with 'applied' status" })
    }

    // Decrement application count on job
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicationCount: -1 } })

    await Application.findByIdAndDelete(applicationId)

    res.json({ message: "Application deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getInstitutionStats = async (req, res) => {
  try {
    const userId = req.user.userId

    // Get institution profile
    const InstitutionProfile = require("../models/InstitutionProfile")
    const institutionProfile = await InstitutionProfile.findOne({ userId })
    if (!institutionProfile) {
      return res.status(404).json({ message: "Institution profile not found" })
    }

    // Find all jobs posted by this institution
    const jobs = await Job.find({ institutionId: institutionProfile._id })
    const jobIds = jobs.map(job => job._id)

    // Aggregate stats from applications
    const stats = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    // Convert to object format
    const statsObj = {
      applied: 0,
      viewed: 0,
      shortlisted: 0,
      interviewed: 0,
      accepted: 0,
      rejected: 0,
    }

    stats.forEach(stat => {
      if (stat._id === 'applied') statsObj.applied = stat.count
      else if (stat._id === 'viewed') statsObj.viewed = stat.count
      else if (stat._id === 'shortlisted') statsObj.shortlisted = stat.count
      else if (stat._id === 'interview-scheduled') statsObj.interviewed = stat.count
      else if (stat._id === 'accepted') statsObj.accepted = stat.count
      else if (stat._id === 'rejected') statsObj.rejected = stat.count
    })

    res.json(statsObj)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
