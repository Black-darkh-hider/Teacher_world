import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Application from "./src/models/Application.js";
import Interview from "./src/models/Interview.js";
import InstitutionProfile from "./src/models/InstitutionProfile.js";
import { protect } from "./src/middleware/authMiddleware.js"; // Assuming you have this middleware

dotenv.config();
const router = express.Router();

/**
 * @route   GET /zoom/login
 * @desc    Redirects the user to the Zoom authorization URL to start the OAuth flow.
 */
router.get("/zoom/login", (req, res) => {
  const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URL}`;
  // The user's ID should be passed in the state to identify them on callback
  // For now, we assume the user is logged in and we can get their ID via middleware on callback.
  res.redirect(zoomAuthUrl);
});

/**
 * @route   GET /zoom/callback
 * @desc    Handles the callback from Zoom after user authorization.
 *          Exchanges the code for an access token and saves it to the user's profile.
 */
router.get("/zoom/callback", protect, async (req, res) => { // protect middleware adds req.user
  const code = req.query.code;
  const userId = req.user.id; // Get user ID from auth middleware

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    // Create the Basic Auth header (client_id:client_secret)
    const authHeader =
      "Basic " +
      Buffer.from(
        `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
      ).toString("base64");

    // The body must be URL-encoded
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.ZOOM_REDIRECT_URL);

    // Exchange the code for an Access Token
    const tokenResponse = await axios.post(
      "https://zoom.us/oauth/token",
      params,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Save the token to the institution's profile
    await InstitutionProfile.findOneAndUpdate(
      { userId: userId },
      {
        zoomAccessToken: access_token,
        zoomRefreshToken: refresh_token,
        zoomTokenExpiresAt: new Date(Date.now() + expires_in * 1000),
      }
    );

    // --- REALISTIC FIX: Redirect user back to the frontend interview page ---
    // The frontend will save the original URL in localStorage. We redirect to a generic
    // page that will read localStorage and complete the redirect.
    // A query parameter indicates success.
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?zoom_auth=success`);

  } catch (error) {
    console.error("Zoom OAuth Error:", error.response?.data || error.message);
    res.status(500).send("OAuth Token Exchange Failed");
  }
});

/**
 * @route   POST /api/interviews/schedule
 * @desc    Schedules a Zoom meeting for an interview.
 */
router.post("/api/interviews/schedule", protect, async (req, res) => {
  const institutionProfile = await InstitutionProfile.findOne({ userId: req.user.id });

  if (!institutionProfile || !institutionProfile.zoomAccessToken) {
    return res.status(400).json({
      success: false,
      message: "Zoom account not authenticated. Please login with Zoom first.",
    });
  }

  // TODO: Add logic here to check if the token is expired and use the refresh token to get a new one.
  // This is an important step for a production application.

  const zoomAccessToken = institutionProfile.zoomAccessToken;

  const { topic, start_time, duration, applicationId } = req.body;
  if (!topic || !start_time || !duration || !applicationId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: topic, start_time, duration, applicationId.",
    });
  }

  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // Scheduled meeting
        start_time, // ISO 8601 format: "YYYY-MM-DDTHH:mm:ssZ"
        duration, // In minutes
        settings: {
          join_before_host: true,
          mute_upon_entry: true,
          participant_video: true,
          host_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${zoomAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const meetingData = response.data;

    // Find the application to link the interview
    // --- ROBUST FIX: Ensure all required fields exist on the application before proceeding ---
    const application = await Application.findById(applicationId)
      .populate("teacherId", "name") // Populate teacher's name
      .populate("jobId", "title") // Populate job title
      .populate("institutionId", "institutionName"); // Populate institution name

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    // Validate that the application has all necessary linked data
    if (!application.institutionId || !application.teacherId || !application.jobId) {
      return res.status(400).json({
        success: false,
        message: "The application is incomplete and cannot be scheduled for an interview. It is missing institution, teacher, or job information."
      });
    }

    // Create a new Interview document in the database
    // This now correctly matches the Interview schema
    const newInterview = new Interview({
      // Renamed fields to match schema
      institution: application.institutionId._id, // --- FIX: Pass the ObjectId, not the full object
      teacher: application.teacherId._id, // --- FIX: Pass the ObjectId, not the full object
      jobId: application.jobId.toString(),

      // Corrected enum values and field names
      scheduledDate: meetingData.start_time,
      status: 'pending', // 'Scheduled' is not in the enum, 'pending' is the default
      interviewType: 'zoom', // 'online' is not in the enum

      // Mapped Zoom data to the correct flat fields
      zoomMeetingId: meetingData.id.toString(),
      zoomJoinUrl: meetingData.join_url,
      notes: `Interview for application ${application._id}`,
    });
    await newInterview.save();

    // Update the application status
    application.status = 'interview-scheduled'; // Match the enum in the Application model
    await application.save();

    // Populate the new interview with details before sending it back to the frontend
    const populatedInterview = await Interview.findById(newInterview._id)
      .populate('institution', 'institutionName')
      .populate('teacher', 'name');

    res.status(201).json({
      success: true,
      message: "Zoom meeting created and interview scheduled successfully!",
      interview: populatedInterview,
    });

  } catch (error) {
    console.error(
      "Error creating Zoom meeting:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to create Zoom meeting.",
      error: error.response?.data || "Server Error",
    });
  }
});

export default router;