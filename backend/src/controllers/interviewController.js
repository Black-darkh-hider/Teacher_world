const Interview = require('../models/Interview');
const zoomController = require('./zoomController');

// Create new interview
exports.scheduleInterview = async (req, res) => {
  try {
    const { teacher, institution, scheduledDate, jobId, position, notes, interviewerName } = req.body;

    // Validate required fields
    if (!teacher || !institution || !scheduledDate) {
      return res.status(400).json({ message: 'Teacher, institution, and scheduled date are required' });
    }

    // Create interview with Zoom integration
    const interview = new Interview({
      teacher,
      institution,
      scheduledDate,
      jobId,
      position,
      notes,
      interviewerName,
      interviewType: 'zoom' // Default to Zoom meetings
    });

    await interview.save();
    await interview.populate('teacher institution');

    // Create Zoom meeting for the interview
    try {
      const zoomMeeting = await createZoomMeetingForInterview(interview);
      if (zoomMeeting) {
        interview.zoomMeetingId = zoomMeeting.meetingId || zoomMeeting.id;
        interview.zoomJoinUrl = zoomMeeting.joinUrl;
        interview.interviewType = 'zoom';
        await interview.save();
      }
    } catch (zoomError) {
      console.error('Failed to create Zoom meeting:', zoomError.message);
      // Continue without Zoom meeting - don't fail the interview creation
      interview.interviewType = 'other'; // Fallback to other type
      await interview.save();
    }

    // Emit socket event for real-time updates/notifications
    const io = global.io;
    if (io) {
      io.to(interview.teacher._id.toString()).emit("interview_scheduled", {
        interviewId: interview._id,
        teacherId: interview.teacher._id,
        institutionId: interview.institution._id,
        scheduledDate: interview.scheduledDate,
        jobId: interview.jobId,
        position: interview.position,
        status: interview.status,
        notes: interview.notes || '',
        zoomJoinUrl: interview.zoomJoinUrl,
        interviewType: interview.interviewType,
      });

      io.to(interview.institution._id.toString()).emit("interview_scheduled", {
        ...interview.toObject(),
        zoomJoinUrl: interview.zoomJoinUrl,
      });
    }

    res.status(201).json({
      ...interview.toObject(),
      zoomJoinUrl: interview.zoomJoinUrl,
    });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to create Zoom meeting for interview
const createZoomMeetingForInterview = async (interview) => {
  try {
    const mockReq = {
      body: {
        topic: `Interview: ${interview.teacher.name || 'Teacher'} - ${interview.institution.institutionName || 'Institution'}`,
        startTime: new Date(interview.scheduledDate).toISOString(),
        duration: 60, // 1 hour default
        interviewId: interview._id,
      }
    };

    let mockRes = { status: () => ({ json: () => {} }) };
    let meetingData = null;

    mockRes.status = (code) => ({
      json: (data) => {
        meetingData = data;
        return data;
      }
    });

    await zoomController.createMeeting(mockReq, mockRes);
    return meetingData?.meeting;
  } catch (error) {
    console.error('Error creating Zoom meeting for interview:', error);
    return null;
  }
};

// Get all interviews for authenticated user (teacher or institution)
exports.getInterviews = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;

    let query = {};

    if (userRole === 'teacher') {
      // Teachers see interviews scheduled for them
      const teacherProfile = await require('../models/TeacherProfile').findOne({ userId });
      if (teacherProfile) {
        query.teacher = teacherProfile._id;
      }
    } else if (userRole === 'institution') {
      // Institutions see interviews they scheduled
      const institutionProfile = await require('../models/InstitutionProfile').findOne({ userId });
      if (institutionProfile) {
        query.institution = institutionProfile._id;
      }
    }

    // Allow filtering by specific teacher/institution if provided in query
    const { teacherId, institutionId } = req.query;
    if (teacherId) query.teacher = teacherId;
    if (institutionId) query.institution = institutionId;

    const interviews = await Interview.find(query)
      .populate({
        path: 'teacher',
        select: 'name experience subjects photo userId'
      })
      .populate({
        path: 'institution',
        select: 'institutionName phoneNumber photo'
      })
      .sort({ scheduledDate: 1 })
      .exec();

    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single interview by ID
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('teacher institution');
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update interview by ID
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('teacher institution');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Emit socket event for update notifications
    const io = global.io;
    if (io) {
      io.to(interview.teacher._id.toString()).emit("interviewUpdated", interview);
      io.to(interview.institution._id.toString()).emit("interviewUpdated", interview);
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel (Delete) interview by ID
exports.cancelInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Emit socket event for cancel notifications
    const io = global.io;
    if (io) {
      io.to(interview.teacher.toString()).emit("interviewCancelled", {
        interviewId: interview._id,
        message: 'Interview has been cancelled'
      });
      io.to(interview.institution.toString()).emit("interviewCancelled", {
        interviewId: interview._id,
        message: 'Interview has been cancelled'
      });
    }

    res.json({ message: 'Interview cancelled', interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update interview status
exports.updateInterviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'accepted', 'rejected', 'rescheduled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('teacher institution');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Emit socket event for status update
    const io = global.io;
    if (io) {
      io.to(interview.teacher._id.toString()).emit("interviewStatusUpdated", interview);
      io.to(interview.institution._id.toString()).emit("interviewStatusUpdated", interview);
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};