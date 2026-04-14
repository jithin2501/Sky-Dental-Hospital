import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from './adminlayout';
import './adminstyle/UserAnalyticsDetail.css';

const UserAnalyticsDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || 'Unknown User';

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [sessionId]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/user/${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch user details');
      const data = await response.json();
      setDetails(data.userDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const formatSessionId = (sid) => {
    if (!sid) return '00000';
    const hash = sid.split('_').pop() || sid;
    const numericHash = hash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return String(numericHash % 100000).padStart(5, '0');
  };

  return (
    <AdminLayout>
      <div className="analytics-detail-container">
        <div className="detail-header">
          <button onClick={() => navigate('/admin/analytics')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>USER ANALYTICS DETAILS</h1>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading session details...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Details</h3>
            <p>{error}</p>
            <button onClick={fetchUserDetails} className="retry-btn">Retry</button>
          </div>
        ) : !details ? (
          <div className="empty-state">
            <p>No details found for this session.</p>
          </div>
        ) : (
          <div className="detail-content">
            {/* User Summary Card */}
            <div className="user-summary-card">
              <div className="summary-header">
                <div className="user-avatar">{formatSessionId(sessionId).charAt(0)}</div>
                <div className="user-main-info">
                  <h2>User {formatSessionId(sessionId)}</h2>
                  <p className="user-id-full">Session ID: <code>{sessionId}</code></p>
                </div>
              </div>
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Last Activity</span>
                  <span className="stat-value">{new Date(details.lastVisit).toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Duration</span>
                  <span className="stat-value">{formatTime(details.totalTime)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Pages Visited</span>
                  <span className="stat-value">{details.visits?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Visit History */}
            <div className="visit-history-card">
              <h3>Detailed Visit Path</h3>
              <div className="table-responsive">
                <table className="visit-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Location / Page</th>
                      <th>District</th>
                      <th>Time Spent</th>
                      <th>Exit Reason</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.visits?.map((visit, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="location-cell">{visit.location}</td>
                        <td>{visit.district || 'N/A'}</td>
                        <td className="time-cell">{formatTime(visit.timeSpent)}</td>
                        <td className="reason-cell">
                          <span className={`reason-badge ${visit.exitReason?.toLowerCase().replace(/\s+/g, '-')}`}>
                            {visit.exitReason || 'N/A'}
                          </span>
                        </td>
                        <td className="timestamp-cell">
                          {new Date(visit.timestamp).toLocaleString([], { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit',
                            day: '2-digit',
                            month: 'short'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserAnalyticsDetail;
