const express = require('express');
const router = express.Router();
const liveInterviewController = require('../controllers/liveInterviewController');
const { authenticateToken } = require('../middleware/auth');

// Protect all live interview routes with authentication middleware
router.use(authenticateToken);

// Create live interview room
router.post('/create-room', liveInterviewController.createLiveInterviewRoom);

// Get room info
router.get('/room-info/:roomName', liveInterviewController.getRoomInfo);

// Get room participants
router.get('/participants/:roomName', liveInterviewController.getRoomParticipants);

// Join live interview room
router.post('/join/:roomName', liveInterviewController.joinLiveInterview);

// End room session
router.delete('/room/:roomName', liveInterviewController.endRoomSession);

module.exports = router;