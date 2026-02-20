// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

// transporter.verify(function(error, success) {
//   if (error) {
//     console.error('[MAILER] Transporter verification failed:', error);
//   } else {
//     console.log('[MAILER] Transporter verified successfully');
//   }
// });

// const sendOTP = async (email, otp) => {
//   if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
//     console.error('[MAILER] Gmail credentials not configured in environment variables');
//     throw new Error('Email service is not properly configured. Please check Gmail credentials.');
//   }

//   const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: 'TeacherWorld - Email Verification OTP',
//     html:
//       '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
//       '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">' +
//       '<h1 style="color: white; margin: 0;">TeacherWorld</h1>' +
//       '</div>' +
//       '<div style="padding: 30px; background: #f9f9f9;">' +
//       '<h2 style="color: #333; margin-top: 0;">Email Verification</h2>' +
//       '<p style="color: #666; font-size: 16px;">Your OTP for TeacherWorld registration is:</p>' +
//       '<div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">' +
//       '<h1 style="color: #667eea; letter-spacing: 5px; margin: 0; font-size: 32px;">' + otp + '</h1>' +
//       '</div>' +
//       '<p style="color: #666; font-size: 14px;">This OTP will expire in <strong>10 minutes</strong>.</p>' +
//       '<p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px;">If you didn\'t request this, please ignore this email.</p>' +
//       '</div>' +
//       '</div>',
//   };

//   try {
//     const result = await transporter.sendMail(mailOptions);
//     console.log('[MAILER] Email sent successfully to:', email);
//     return result;
//   } catch (error) {
//     console.error('[MAILER] Error sending email:', error.message);
//     throw new Error('Failed to send OTP email: ' + error.message);
//   }
// };

// const sendStatusUpdate = async (email, jobTitle, status, notes = '', institutionName = '', teacherName = '', institutionLogo = '', coverLetter = '') => {
//   const logoUrl = institutionLogo || 'https://yourdomain.com/logo.png';

//   const safeCoverLetter = coverLetter ? coverLetter.replace(/</g, "<").replace(/>/g, ">").replace(/\n/g, "<br>") : 'No cover letter provided.';

//   const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: 'Application Status Update - ' + jobTitle,
//     html:
//       '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">' +
//       '<div style="background-color: #0070f3; padding: 15px; display: flex; align-items: center;">' +
//       '<img src="' + logoUrl + '" alt="Institution Logo" style="height: 50px; margin-right: 15px; border-radius: 5px;" />' +
//       '<h1 style="color: #fff; font-size: 24px; margin: 0;">TeacherWorld</h1>' +
//       '</div>' +
//       '<div style="padding: 30px; background: #f7f7f7;">' +
//       '<h2 style="color: #1a5490; margin-top: 0;">Application Status for ' + (institutionName || 'your institution') + '</h2>' +
//       '<p><strong>Dear ' + (teacherName || 'Teacher') + ',</strong></p>' +
//       '<p>Congratulations on your application for <strong>' + jobTitle + '</strong>. Your application status is currently: <strong>' + status + '</strong>.</p>' +
//       (notes ? '<p><strong>Notes:</strong> ' + notes + '</p>' : '') +
//       '<h3>Application Form Details:</h3>' +
//       '<div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ccc; font-style: italic; color: #333;">' +
//       safeCoverLetter +
//       '</div>' +
//       '<p style="color: #666;">Log in to your account for more details.</p>' +
//       '</div>' +
//       '</div>',
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = { sendOTP, sendStatusUpdate, transporter };
// </create_file><edit_file>
// <path>real me 2/backend/src/controllers/applicationController.js</path>
// <content>
// const Application = require("../models/Application")
// const { sendStatusUpdate } = require("../config/mailer")
// const User = require("../models/User")
// const Job = require("../models/Job")
// const TeacherProfile = require("../models/TeacherProfile")
// const { logActivity } = require("../lib/activityLogger")

// exports.applyJob = async (req, res) => {
//   try {
//     const { jobId, coverLetter } = req.body
//     const userId = req.user.userId

//     // Get teacher profile
//     const teacherProfile = await TeacherProfile.findOne({ userId })
//     if (!teacherProfile) {
//       return res.status(404).json({ message: "Teacher profile not found" })
//     }

//     // Check if already applied
//     const existingApp = await Application.findOne({ jobId, teacherId: teacherProfile._id })
//     if (existingApp) {
//       return res.status(400).json({ message: "Already applied to this job" })
//     }

//     // Fetch the job to get the institutionId
//     const job = await Job.findById(jobId)
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" })
//     }

//     const application = new Application({
//       jobId,
//       teacherId: teacherProfile._id,
//       institutionId: job.institutionId,
//       coverLetter,
//       statusHistory: [{ status: "applied" }],
//     })

//     await application.save()

//     // Increment application count on job automatically
//     await Job.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1 } })

//     // Log user application action
//     await logActivity({ userId, action: "job.apply", targetType: "Job", targetId: jobId, req })
//     res.status(201).json({ message: "Application submitted", application })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// exports.getMyApplications = async (req, res) => {
//   try {
//     const userId = req.user.userId

//     // Get teacher profile
//     const teacherProfile = await TeacherProfile.findOne({ userId })
//     if (!teacherProfile) {
//       return res.status(404).json({ message: "Teacher profile not found" })
//     }

//     const applications = await Application.find({ teacherId: teacherProfile._id })
//       .populate({
//         path: "jobId",
//         populate: { path: "institutionId", select: "institutionName phoneNumber photo" },
//       })
//       .populate({
//         path: "teacherId",
//         model: "TeacherProfile",
//         select: "name experience subjects",
//       })
//       .sort({ appliedAt: -1 })

//     res.json(applications)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// exports.getApplicationsForJob = async (req, res) => {
//   try {
//     const { jobId } = req.params

//     const applications = await Application.find({ jobId }).populate("teacherId").sort({ appliedAt: -1 })

//     res.json(applications)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// exports.getApplicationsForInstitution = async (req, res) => {
//   try {
//     const userId = req.user.userId

//     // Get institution profile
//     const InstitutionProfile = require("../models/InstitutionProfile")
//     const institutionProfile = await InstitutionProfile.findOne({ userId })
//     if (!institutionProfile) {
//       return res.status(404).json({ message: "Institution profile not found" })
//     }

//     // Find all jobs posted by this institution
//     const jobs = await Job.find({ institutionId: institutionProfile._id })
//     const jobIds = jobs.map(job => job._id)

//     // Find all applications for these jobs
//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .populate({
//         path: "jobId",
//         select: "title subject city state institutionId"
//       })
//       .populate({
//         path: "teacherId",
//         model: "TeacherProfile",
//         select: "resumeUrl experience name subjects photo userId",
//       })
//       .sort({ appliedAt: -1 })

//     res.json(applications)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params
//     const { status, notes } = req.body
//     const userId = req.user.userId

//     const application = await Application.findById(applicationId)
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" })
//     }

//     // Get institution profile to verify authorization
//     const InstitutionProfile = require("../models/InstitutionProfile")
//     const institutionProfile = await InstitutionProfile.findOne({ userId })
//     if (!institutionProfile) {
//       return res.status(403).json({ message: "Institution profile not found" })
//     }

//     // Check if the application belongs to a job posted by this institution
//     const job = await Job.findById(application.jobId)
//     if (!job || job.institutionId.toString() !== institutionProfile._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to update this application" })
//     }

//     // Validate status transitions
//     const validStatuses = ['applied', 'viewed', 'shortlisted', 'interview-scheduled', 'accepted', 'rejected']
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" })
//     }

//     application.status = status
//     application.statusHistory.push({ status, notes, updatedBy: userId })

//     await application.save()

//     // Respond immediately to client to avoid blocking
//     res.json({ message: "Status updated", application })

//     // Send email notification to teacher (await to catch immediate errors)
//     try {
//       const teacherProfile = await TeacherProfile.findById(application.teacherId)
//       const teacherUser = await User.findById(teacherProfile.userId)

//       // Fetch institution name and logo URL from institution document
//       const InstitutionProfile = require("../models/InstitutionProfile")
//       const institution = await InstitutionProfile.findById(job.institutionId)

//       const institutionName = institution?.institutionName || ''
//       const institutionLogo = institution?.photo || ''

//       if (teacherUser && teacherUser.email) {
//         console.log("[EMAIL NOTIFICATION] Sending status update email to:", teacherUser.email)
//         try {
//           // Pass coverLetter from application to email template
//           await sendStatusUpdate(
//             teacherUser.email,
//             job.title,
//             status,
//             notes,
//             institutionName,
//             teacherProfile.name,
//             institutionLogo,
//             application.coverLetter || ''
//           )
//           console.log("[EMAIL NOTIFICATION] Email sent successfully to:", teacherUser.email)
//         } catch (emailError) {
//           console.error("[EMAIL NOTIFICATION] Failed to send email:", emailError)
//         }
//       } else {
//         console.warn("[EMAIL NOTIFICATION] No valid email found for user:", teacherUser ? teacherUser._id : "unknown")
//       }

//       // Send automatic message if status is accepted
//       if (status === "accepted") {
//         const Message = require("../models/Message")
//         const welcomeMessage = new Message({
//           senderId: institutionProfile.userId, // Institution's user ID
//           receiverId: teacherProfile.userId, // Teacher's user ID
//           applicationId: application._id,
//           content: `Congratulations! Your application for the ${job.title} position at ${job.institutionId?.institutionName} has been accepted. Please check your messages for further details.`,
//           messageType: "text",
//         })
//         await welcomeMessage.save()

//         // Emit message via Socket.io
//         const io = global.io
//         if (io) {
//           io.to(teacherProfile.userId.toString()).emit("new_message", {
//             ...welcomeMessage.toObject(),
//             senderId: institutionProfile.userId,
//             receiverId: teacherProfile.userId,
//           })
//         }
//       }

//       // Emit real-time update to teacher via Socket.io
//       const io = global.io
//       if (io) {
//         io.to(teacherProfile.userId.toString()).emit("application_status_updated", {
//           applicationId: application._id,
//           newStatus: status,
//           jobTitle: job.title,
//           institutionName: job.institutionId?.institutionName,
//           updatedAt: application.updatedAt
//         })

//         if (status === "interview-scheduled") {
//           // Emit interview scheduled event to teacher
//           io.to(teacherProfile.userId.toString()).emit("interview_scheduled", {
//             applicationId: application._id,
//             jobTitle: job.title,
//             institutionName: job.institutionId?.institutionName,
//             scheduledAt: application.updatedAt // Could adjust to actual interview date if available
//           })
//         }
//       }

//       // Log activity
//       await logActivity({
//         userId,
//         action: "application.status_update",
//         targetType: "Application",
//         targetId: applicationId,
//         req,
//         details: { oldStatus: application.statusHistory[application.statusHistory.length - 2]?.status, newStatus: status }
//       })
//     } catch (asyncError) {
//       console.error("[ASYNC STATUS UPDATE] Error processing notifications or socket emissions:", asyncError)
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// exports.updateApplication = async (req, res) => {
//   try {
//     const { applicationId } = req.params
//     const { coverLetter } = req.body
//     const userId = req.user.userId

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read and normalize credentials (trim and remove accidental spaces)
const GMAIL_USER = process.env.GMAIL_USER ? process.env.GMAIL_USER.trim() : null;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD ? process.env.GMAIL_PASSWORD.replace(/\s+/g, '').trim() : null;

let transporter
let usingEthereal = false
let gmailTransport = null

const initTransporter = async () => {
  // If Gmail creds are present, try to use Gmail for real delivery.
  if (GMAIL_USER && GMAIL_PASSWORD) {
    try {
      gmailTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD },
      })

      // Verify once at startup; if verification fails, fallback to Ethereal
      await gmailTransport.verify()
      transporter = gmailTransport
      usingEthereal = false
      console.log('[MAILER] Gmail transporter ready; real emails will be sent')
      return
    } catch (gmailErr) {
      console.error('[MAILER] Gmail transporter verification failed; falling back to Ethereal:', gmailErr.message || gmailErr)
      gmailTransport = null
      transporter = null
      // fallthrough to create Ethereal
    }
  }

  // Create Ethereal test account (development fallback)
  try {
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    })
    usingEthereal = true
    console.log('[MAILER] Using Ethereal test account for emails (development)')
  } catch (err) {
    console.error('[MAILER] Failed to create Ethereal test account:', err)
    // Network may be offline (no DNS). Fall back to a local JSON transport so the
    // server can still start and emails are captured as JSON objects in logs.
    try {
      transporter = nodemailer.createTransport({ jsonTransport: true })
      usingEthereal = false
      console.log('[MAILER] Network unavailable - using local JSON transport for emails (development fallback)')
    } catch (fallbackErr) {
      console.error('[MAILER] Failed to create fallback JSON transport:', fallbackErr)
      transporter = null
    }
  }
}

// initialize immediately
initTransporter()

// Send OTP using Gmail SMTP explicitly (used for registration flows)
const sendOTPViaGmail = async (email, otp) => {

  if (!GMAIL_USER || !GMAIL_PASSWORD) {
    throw new Error('Gmail credentials not configured. Set GMAIL_USER and GMAIL_PASSWORD in .env')
  }

  // Reuse verified gmailTransport if available
  let transportToUse = gmailTransport
  if (!transportToUse) {
    transportToUse = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD } })
    // verify once for this temporary transport
    await transportToUse.verify()
  }

  const mailOptions = {
    from: GMAIL_USER,
    to: email,
    subject: 'TeacherWorld - Email Verification OTP',
    html: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">' +
      '<h1 style="color: white; margin: 0;">TeacherWorld</h1>' +
      '</div>' +
      '<div style="padding: 30px; background: #f9f9f9;">' +
      '<h2 style="color: #333; margin-top: 0;">Email Verification</h2>' +
      '<p style="color: #666; font-size: 16px;">Your OTP for TeacherWorld registration is:</p>' +
      '<div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">' +
      `<h1 style="color: #667eea; letter-spacing: 5px; margin: 0; font-size: 32px;">${otp}</h1>` +
      '</div>' +
      '<p style="color: #666; font-size: 14px;">This OTP will expire in <strong>10 minutes</strong>.</p>' +
      '<p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px;">If you didn\'t request this, please ignore this email.</p>' +
      '</div>' +
      '</div>'
  }

  // Send via the selected gmail transport
  const result = await transportToUse.sendMail(mailOptions)
  console.log('[MAILER] Gmail send result for', email, result.messageId ? result.messageId : '')
  return result
}

const sendOTP = async (email, otp) => {
  const fromAddress = GMAIL_USER || 'no-reply@example.com'

  const mailOptions = {
    from: fromAddress,
    to: email,
    subject: 'TeacherWorld - Email Verification OTP',
    html:
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">' +
      '<h1 style="color: white; margin: 0;">TeacherWorld</h1>' +
      '</div>' +
      '<div style="padding: 30px; background: #f9f9f9;">' +
      '<h2 style="color: #333; margin-top: 0;">Email Verification</h2>' +
      '<p style="color: #666; font-size: 16px;">Your OTP for TeacherWorld registration is:</p>' +
      '<div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">' +
      `<h1 style="color: #667eea; letter-spacing: 5px; margin: 0; font-size: 32px;">${otp}</h1>` +
      '</div>' +
      '<p style="color: #666; font-size: 14px;">This OTP will expire in <strong>10 minutes</strong>.</p>' +
      '<p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px;">If you didn\'t request this, please ignore this email.</p>' +
      '</div>' +
      '</div>',
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('[MAILER] Email send result for', email, result.messageId ? result.messageId : '')
    // If using Ethereal (development), print preview URL
    try {
      const preview = nodemailer.getTestMessageUrl(result)
      if (preview) console.log('[MAILER] Preview URL:', preview)
    } catch (e) {}
    return result;
  } catch (error) {
    console.error('[MAILER] Error sending email:', error && error.message ? error.message : error)
    throw new Error('Failed to send OTP email: ' + (error && error.message ? error.message : String(error)))
  }
};


const sendStatusUpdate = async (email, jobTitle, status, notes = '', institutionName = '', teacherName = '') => {
  // Sanitize additional notes for HTML
  const safeNotes = notes
    ? notes
        .replace(/&/g, '&amp;')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br>')
    : '';

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Application Status Update - ' + jobTitle,
    html:
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">' +
      '<div style="background-color: #0070f3; padding: 15px; text-align: center;">' +
      `<h1 style="color: #fff; font-size: 24px; margin: 0;">TeacherWorld</h1>` +
      '</div>' +
      '<div style="padding: 30px; background: #f7f7f7;">' +
      `<h2 style="color: #1a5490; margin-top: 0;">Application Status Update</h2>` +
      `<p><strong>Dear ${teacherName || 'Teacher'},</strong></p>` +
      `<p>Your application for the position of <strong>${jobTitle}</strong> at <strong>${institutionName || 'the institution'}</strong> has been updated.</p>` +
      '<div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0070f3;">' +
      `<p style="margin: 0;"><strong>Current Status:</strong> <span style="color: #0070f3; text-transform: uppercase; font-weight: bold;">${status}</span></p>` +
      '</div>' +
      (safeNotes ? `<div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;"><p style="margin: 0;"><strong>Additional Notes:</strong></p><p style="margin: 10px 0 0 0;">${safeNotes}</p></div>` : '') +
      '<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">' +
      '<p style="color: #666; font-size: 14px; margin: 0;">Log in to your TeacherWorld account for more details and to track your application progress.</p>' +
      '</div>' +
      '</div>' +
      '<div style="background: #333; padding: 15px; text-align: center;">' +
      '<p style="color: #999; font-size: 12px; margin: 0;">© 2024 TeacherWorld. All rights reserved.</p>' +
      '</div>' +
      '</div>',
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('[MAILER] Status update email send result for', email, result.messageId ? result.messageId : '')
    try {
      const preview = nodemailer.getTestMessageUrl(result)
      if (preview) console.log('[MAILER] Preview URL:', preview)
    } catch (e) {}
    return result;
  } catch (error) {
    console.error('[MAILER] Error sending status update email:', error && error.message ? error.message : error);
    throw new Error('Failed to send status update email: ' + (error && error.message ? error.message : String(error)));
  }
};

module.exports = { sendOTP, sendStatusUpdate, transporter, sendOTPViaGmail };
