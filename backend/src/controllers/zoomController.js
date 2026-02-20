const axios = require("axios");
const Interview = require('../models/Interview');

const ZOOM_API_BASE = "https://zoom.us/v2";
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

let accessToken = null;
let tokenExpiry = null;

// Get Zoom access token with OAuth
const getZoomToken = async () => {
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken;
  }

  try {
    const auth = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(`https://zoom.us/oauth/token`, null, {
      params: { grant_type: "account_credentials", account_id: ZOOM_ACCOUNT_ID },
      headers: { Authorization: `Basic ${auth}` },
    });

    accessToken = response.data.access_token;
    tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error("Zoom token error:", error.message);
    throw error;
  }
};

// Create Zoom meeting
exports.createMeeting = async (req, res) => {
  try {
    const { topic, startTime, duration, interviewId, agenda, timezone } = req.body;

    // If Zoom not configured, return demo mode
    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      const meeting = {
        id: Math.floor(Math.random() * 1000000),
        topic: topic || "Teacher Interview Session",
        startTime,
        duration: duration || 60,
        joinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 1000000)}`,
        agenda: agenda || "Professional interview for teaching position",
        timezone: timezone || "Asia/Kolkata"
      };

      if (interviewId) {
        await Interview.findByIdAndUpdate(
          interviewId,
          {
            zoomMeetingId: meeting.id,
            zoomJoinUrl: meeting.joinUrl
          }
        );
      }

      return res.status(201).json({
        message: "Meeting created (demo mode)",
        meeting
      });
    }

    try {
      const token = await getZoomToken();

      // Enhanced meeting settings for professional interviews
      const meetingData = {
        topic: topic || "Teacher Interview Session",
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: duration || 60,
        timezone: timezone || "Asia/Kolkata",
        agenda: agenda || "Professional interview for teaching position",
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: false,
          join_before_host: true,
          jbh_time: 10, // Allow join 10 minutes before
          mute_upon_entry: false,
          watermark: false,
          use_pmi: false,
          approval_type: 0, // Automatically approve
          audio: "both", // Both telephone and computer audio
          auto_recording: "none",
          waiting_room: false,
          registrants_email_notification: false,
          meeting_authentication: false,
          encryption_type: "enhanced_encryption",
          approved_or_denied_countries_or_regions: {
            enable: false
          },
          breakout_room: {
            enable: false
          },
          alternative_hosts: "",
          show_share_button: true,
          allow_multiple_devices: true,
          enable_dedicated_group_chat: false,
          private_meeting: false,
          email_notification: true,
          host_save_video_order: false,
          internal_meeting: false,
          continuous_meeting_chat: {
            enable: true
          },
          participant_focused_meeting: false,
          push_change_to_calendar: false,
          resources: [],
          auto_start_meeting_summary: false,
          auto_start_ai_companion_questions: false,
          device_testing: false,
          meeting_invitees: [],
          tracking_fields: []
        }
      };

      const response = await axios.post(
        `${ZOOM_API_BASE}/users/me/meetings`,
        meetingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const meeting = {
        meetingId: response.data.id,
        joinUrl: response.data.join_url,
        startUrl: response.data.start_url,
        topic: response.data.topic,
        startTime: response.data.start_time,
        duration: response.data.duration,
        timezone: response.data.timezone,
        agenda: response.data.agenda,
        password: response.data.password,
        hostId: response.data.host_id,
        status: response.data.status
      };

      if (interviewId) {
        await Interview.findByIdAndUpdate(
          interviewId,
          {
            zoomMeetingId: response.data.id,
            zoomJoinUrl: response.data.join_url,
            zoomStartUrl: response.data.start_url,
            zoomPassword: response.data.password
          }
        );
      }

      res.status(201).json({
        message: "Zoom meeting created successfully",
        meeting
      });
    } catch (zoomError) {
      console.error("Zoom API error:", zoomError.response?.data || zoomError.message);

      // Handle specific Zoom API errors
      if (zoomError.response?.status === 429) {
        return res.status(429).json({
          message: "Zoom API rate limit exceeded. Please try again later.",
          retryAfter: zoomError.response.headers['retry-after']
        });
      }

      if (zoomError.response?.status === 401) {
        // Token might be expired, try to refresh
        accessToken = null;
        return res.status(401).json({
          message: "Zoom authentication failed. Please try again."
        });
      }

      throw new Error(`Failed to create Zoom meeting: ${zoomError.response?.data?.message || zoomError.message}`);
    }
  } catch (error) {
    console.error("Error in createMeeting:", error);
    res.status(500).json({
      message: error.message || "Failed to create meeting"
    });
  }
};

// Get all meetings
exports.getMeetings = async (req, res) => {
  try {
    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.json([]);
    }

    const token = await getZoomToken();
    const response = await axios.get(
      `${ZOOM_API_BASE}/users/me/meetings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data.meetings || []);
  } catch (error) {
    console.error("Error fetching meetings:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.status(400).json({ message: "Zoom not configured" });
    }

    const token = await getZoomToken();
    const response = await axios.get(
      `${ZOOM_API_BASE}/meetings/${meetingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching meeting:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.status(400).json({ message: "Zoom not configured" });
    }

    const token = await getZoomToken();
    await axios.delete(
      `${ZOOM_API_BASE}/meetings/${meetingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update meeting
exports.updateMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { topic, startTime, duration } = req.body;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.status(400).json({ message: "Zoom not configured" });
    }

    const token = await getZoomToken();
    await axios.patch(
      `${ZOOM_API_BASE}/meetings/${meetingId}`,
      {
        topic,
        start_time: startTime,
        duration: duration || 60,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json({ message: "Meeting updated successfully" });
  } catch (error) {
    console.error("Error updating meeting:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get meeting recordings
exports.getMeetingRecordings = async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.json([]);
    }

    const token = await getZoomToken();
    const response = await axios.get(
      `${ZOOM_API_BASE}/meetings/${meetingId}/recordings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data.recording_files || []);
  } catch (error) {
    console.error("Error fetching recordings:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Add meeting registrant
exports.addRegistrant = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { email, first_name, last_name } = req.body;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.status(400).json({ message: "Zoom not configured" });
    }

    const token = await getZoomToken();
    const response = await axios.post(
      `${ZOOM_API_BASE}/meetings/${meetingId}/registrants`,
      {
        email,
        first_name,
        last_name
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error adding registrant:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get meeting participants
exports.getMeetingParticipants = async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      return res.json([]);
    }

    const token = await getZoomToken();
    const response = await axios.get(
      `${ZOOM_API_BASE}/meetings/${meetingId}/participants`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data.participants || []);
  } catch (error) {
    console.error("Error fetching participants:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create instant meeting
exports.createInstantMeeting = async (req, res) => {
  try {
    const { topic, agenda } = req.body;

    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
      const meeting = {
        id: Math.floor(Math.random() * 1000000),
        topic: topic || "Instant Teacher Interview Session",
        joinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 1000000)}`,
        agenda: agenda || "Instant professional interview for teaching position"
      };

      return res.status(201).json({
        message: "Instant meeting created (demo mode)",
        meeting
      });
    }

    const token = await getZoomToken();

    const meetingData = {
      topic: topic || "Instant Teacher Interview Session",
      type: 1, // Instant meeting
      agenda: agenda || "Instant professional interview for teaching position",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: false,
        watermark: false,
        use_pmi: false,
        approval_type: 0,
        audio: "both",
        auto_recording: "none",
        waiting_room: false
      }
    };

    const response = await axios.post(
      `${ZOOM_API_BASE}/users/me/meetings`,
      meetingData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const meeting = {
      meetingId: response.data.id,
      joinUrl: response.data.join_url,
      startUrl: response.data.start_url,
      topic: response.data.topic,
      agenda: response.data.agenda,
      password: response.data.password,
      hostId: response.data.host_id,
      status: response.data.status
    };

    res.status(201).json({
      message: "Instant Zoom meeting created successfully",
      meeting
    });
  } catch (error) {
    console.error("Error creating instant meeting:", error);
    res.status(500).json({
      message: error.message || "Failed to create instant meeting"
    });
  }
};
