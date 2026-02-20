import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Video, User, AlertCircle } from 'lucide-react';

const statusStyles = {
  scheduled: { backgroundColor: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' },
  pending: { backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fde68a' },
  completed: { backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' },
  accepted: { backgroundColor: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' },
  rejected: { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' },
  rescheduled: { backgroundColor: '#f3e8ff', color: '#6b21a8', borderColor: '#e9d5ff' },
  cancelled: { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' }
};

const getStatusIcon = (status) => {
  const iconStyle = { height: '14px', width: '14px' };
  switch (status) {
    case 'scheduled':
    case 'accepted':
      return <CheckCircle style={iconStyle} />;
    case 'pending':
      return <Clock style={iconStyle} />;
    case 'completed':
      return <CheckCircle style={iconStyle} />;
    case 'rejected':
    case 'cancelled':
      return <XCircle style={iconStyle} />;
    case 'rescheduled':
      return <AlertCircle style={iconStyle} />;
    default:
      return null;
  }
};

const InterviewList = ({ interviews, onJoinLiveInterview, onUpdateStatus }) => {
  const [expandedId, setExpandedId] = useState(null);

  const styles = {
    interviewCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '24px',
      border: '1px solid #f3f4f6',
      marginBottom: '16px',
      transition: 'all 0.3s ease',
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    institutionName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
    },
    infoRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      fontSize: '14px',
      color: '#4b5563',
      marginTop: '12px',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      marginRight: '8px',
      marginTop: '12px',
      transition: 'all 0.2s ease',
    },
    primaryButton: {
      backgroundColor: '#1a5490',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#f59e0b',
      color: 'white',
    },
    statusUpdateButton: {
      backgroundColor: '#10b981',
      color: 'white',
      fontSize: '12px',
      padding: '6px 12px',
    },
    rejectButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      fontSize: '12px',
      padding: '6px 12px',
    },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isTimeToJoin = (scheduledDate) => {
    const now = new Date();
    const interview = new Date(scheduledDate);
    const timeDiff = interview - now;
    return timeDiff > 0 && timeDiff < 3600000; // Within 1 hour before
  };

  if (!interviews || interviews.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <Calendar style={{ height: '64px', width: '64px', color: '#d1d5db', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>No Interviews Yet</h3>
        <p style={{ color: '#4b5563' }}>Your scheduled interviews will appear here</p>
      </div>
    );
  }

  return (
    <>
      {interviews.map((interview) => (
        <div
          key={interview._id}
          style={styles.interviewCard}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ ...styles.statusBadge, ...statusStyles[interview.status] }}>
                {getStatusIcon(interview.status)}
                {interview.status.toUpperCase()}
              </span>
              {isTimeToJoin(interview.scheduledDate) && (
                <span style={{
                  backgroundColor: '#fbbf24',
                  color: '#78350f',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Ready to Join
                </span>
              )}
            </div>
            <button
              onClick={() => setExpandedId(expandedId === interview._id ? null : interview._id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
            >
              {expandedId === interview._id ? '−' : '+'}
            </button>
          </div>

          <h3 style={styles.institutionName}>
            {interview.institution?.name || interview.teacher?.name || "N/A"}
          </h3>

          {interview.position && (
            <p style={{ color: '#374151', fontWeight: '500', marginBottom: '12px', fontSize: '15px' }}>
              {interview.position}
            </p>
          )}

          <div style={styles.infoRow}>
            <div style={styles.infoItem}>
              <Calendar style={{ height: '16px', width: '16px', color: '#f59e0b' }} />
              <span>{formatDate(interview.scheduledDate)}</span>
            </div>
            {interview.interviewerName && (
              <div style={styles.infoItem}>
                <User style={{ height: '16px', width: '16px', color: '#f59e0b' }} />
                <span>{interview.interviewerName}</span>
              </div>
            )}
          </div>

          {expandedId === interview._id && (
            <div style={{ marginTop: '16px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
              {interview.notes && (
                <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '12px' }}>
                  <strong>Notes:</strong> {interview.notes}
                </p>
              )}

              {interview.status === 'pending' && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock style={{ height: '16px', width: '16px' }} />
                  <span>Waiting for confirmation</span>
                </div>
              )}

              {interview.status === 'pending' && onUpdateStatus && (
                <div style={{ marginBottom: '12px' }}>
                  <button
                    onClick={() => onUpdateStatus(interview._id, 'accepted')}
                    style={{ ...styles.button, ...styles.statusUpdateButton }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onUpdateStatus(interview._id, 'rejected')}
                    style={{ ...styles.button, ...styles.rejectButton }}
                  >
                    Reject
                  </button>
                </div>
              )}

              {interview.liveInterviewRoom && ['scheduled', 'accepted', 'pending'].includes(interview.status) && (
                <button
                  onClick={() => onJoinLiveInterview(interview.liveInterviewRoom)}
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    marginBottom: '12px'
                  }}
                  title="Join Live Interview"
                >
                  <Video style={{ height: '16px', width: '16px' }} />
                  Join Live Interview
                </button>
              )}

              {interview.zoomJoinUrl && ['scheduled', 'accepted', 'pending'].includes(interview.status) && (
                <a
                  href={interview.zoomJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    textDecoration: 'none',
                    display: 'inline-flex',
                  }}
                >
                  <Video style={{ height: '16px', width: '16px' }} />
                  Join Zoom Meeting
                </a>
              )}

              {interview.status === 'completed' && interview.feedback && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginTop: '12px'
                }}>
                  <strong>Feedback:</strong> {interview.feedback}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default InterviewList;