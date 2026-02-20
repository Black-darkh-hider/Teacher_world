const axios = require("axios");
const Interview = require('../models/Interview');

const DAILY_API_KEY = process.env.DAILY_API_KEY;
const DAILY_API_URL = "https://api.daily.co/v1";

// Create live interview room
exports.createLiveInterviewRoom = async (req, res) => {
  try {
    const { interviewId, roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({ message: 'Room name is required' });
    }

    // Create or get existing room
    const roomRes = await axios.post(
      `${DAILY_API_URL}/rooms`,
      {
        name: roomName,
        properties: {
          enable_screenshare: true,
          start_video_off: false,
          start_audio_off: false,
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    // Generate meeting token
    const tokenRes = await axios.post(
      `${DAILY_API_URL}/meeting-tokens`,
      {
        properties: {
          room_name: roomName,
          user_name: req.user?.name || "Participant",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    // Update interview with room ID
    if (interviewId) {
      await Interview.findByIdAndUpdate(
        interviewId,
        { liveInterviewRoom: roomRes.data.name }
      );
    }

    res.json({
      room: roomRes.data,
      token: tokenRes.data.token,
      roomName: roomRes.data.name,
    });
  } catch (error) {
    console.error("Error creating live interview room:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to create live interview room",
      message: error.message 
    });
  }
};

// Get room info
exports.getRoomInfo = async (req, res) => {
  try {
    const { roomName } = req.params;

    const response = await axios.get(
      `${DAILY_API_URL}/rooms/${roomName}`,
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error getting room info:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to get room info",
      message: error.message 
    });
  }
};

// Get room participants
exports.getRoomParticipants = async (req, res) => {
  try {
    const { roomName } = req.params;

    const response = await axios.get(
      `${DAILY_API_URL}/rooms/${roomName}/participants`,
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error getting participants:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to get room participants",
      message: error.message 
    });
  }
};

// End room session
exports.endRoomSession = async (req, res) => {
  try {
    const { roomName } = req.params;

    await axios.delete(
      `${DAILY_API_URL}/rooms/${roomName}`,
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    res.json({ message: 'Room session ended successfully' });
  } catch (error) {
    console.error("Error ending room session:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to end room session",
      message: error.message 
    });
  }
};

// Join existing room
exports.joinLiveInterview = async (req, res) => {
  try {
    const { roomName } = req.params;

    // Generate meeting token for existing room
    const tokenRes = await axios.post(
      `${DAILY_API_URL}/meeting-tokens`,
      {
        properties: {
          room_name: roomName,
          user_name: req.user?.name || "Participant",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      }
    );

    res.json({
      token: tokenRes.data.token,
      roomName,
    });
  } catch (error) {
    console.error("Error joining room:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to join room",
      message: error.message 
    });
  }
};