const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { authenticateToken } = require('../middleware/auth');

// Protect all interview routes with authentication middleware
router.use(authenticateToken);

// Create new interview
router.post('/', interviewController.scheduleInterview);

// Get all interviews (filter by teacher or institution via query params)
router.get('/', interviewController.getInterviews);

// Get single interview by ID
router.get('/:id', interviewController.getInterviewById);

// Update interview by ID
router.put('/:id', interviewController.updateInterview);

// Update interview status only
router.patch('/:id/status', interviewController.updateInterviewStatus);

// Cancel (delete) interview by ID
router.delete('/:id', interviewController.cancelInterview);

module.exports = router;