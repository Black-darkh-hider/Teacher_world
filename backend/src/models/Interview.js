const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstitutionProfile',
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherProfile',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: false, // Can be null if not tied to a specific job post
  },
  position: {
    type: String,
    default: null,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'rescheduled', 'completed', 'cancelled'],
    default: 'pending',
  },
  // Live Interview (Daily.co) fields
  liveInterviewRoom: {
    type: String,
    default: null,
  },
  // Zoom meeting fields
  zoomMeetingId: {
    type: String,
    default: null,
  },
  zoomJoinUrl: {
    type: String,
    default: null,
  },
  // Interview details
  notes: {
    type: String,
    default: '',
  },
  interviewerName: {
    type: String,
    default: null,
  },
  interviewType: {
    type: String,
    enum: ['daily', 'zoom', 'other'],
    default: 'daily',
  },
  // Recording and metadata
  recordingUrl: {
    type: String,
    default: null,
  },
  isRecorded: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: null,
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

// Update the updatedAt field before saving
interviewSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Interview', interviewSchema);