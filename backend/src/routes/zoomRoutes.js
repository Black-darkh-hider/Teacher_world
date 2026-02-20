const express = require('express');
const router = express.Router();
const zoomController = require('../controllers/zoomController');
const { authenticateToken } = require('../middleware/auth');

// Protect all zoom routes with authentication middleware
router.use(authenticateToken);

// Create Zoom meeting
router.post('/create-meeting', zoomController.createMeeting);

// Get all meetings
router.get('/meetings', zoomController.getMeetings);

// Get meeting by ID
router.get('/meeting/:meetingId', zoomController.getMeetingById);

// Update meeting
router.patch('/meeting/:meetingId', zoomController.updateMeeting);

// Delete meeting
router.delete('/meeting/:meetingId', zoomController.deleteMeeting);

// Get meeting recordings
router.get('/meeting/:meetingId/recordings', zoomController.getMeetingRecordings);

// Add meeting registrant
router.post('/meeting/:meetingId/registrants', zoomController.addRegistrant);

// Get meeting participants
router.get('/meeting/:meetingId/participants', zoomController.getMeetingParticipants);

// Create instant meeting
router.post('/instant-meeting', zoomController.createInstantMeeting);

module.exports = router;
