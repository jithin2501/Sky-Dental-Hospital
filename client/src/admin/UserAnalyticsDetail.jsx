import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from './adminlayout';
import './adminstyle/UserAnalyticsDetail.css';

const UserAnalyticsDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

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
      setDetails(data);
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
    if (hours > 0) return `${hours}s`; // Simulating the format in image "14s"
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const formatSessionId = (sid) => {
    if (!sid) return '00000';
    const hash = sid.split('_').pop() || sid;
    const numericHash = hash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return String(numericHash % 100000).padStart(5, '0');
  };

  const exportHistory = () => {
    if (!details || !details.visits) return;
    const headers = ['Visit #', 'Location', 'Time Spent', 'Exit Reason', 'Timestamp'];
    const rows = details.visits.map((v, i) => [
      details.visits.length - i,
      v.location,
      formatTime(v.timeSpent),
      `"${v.exitReason || ''}"`,
      new Date(v.timestamp).toLocaleString()
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `User_History_${formatSessionId(sessionId)}.csv`;
    a.click();
  };

  const generateMapHTML = (loc) => {
    if (!loc || !loc.latitude) return '';
    const centerLat = loc.latitude;
    const centerLng = loc.longitude;
    const city = (loc.city || 'Visitor').replace(/'/g, "\\'");
    
    return `<!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin:0; padding:0; }
        html, body, #map { height:100%; width:100%; }
        .custom-marker { background:#ef4444; border:3px solid #fff; border-radius:50%; width:16px; height:16px; box-shadow:0 0 10px rgba(0,0,0,0.3); }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([${centerLat}, ${centerLng}], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        
        const myIcon = L.divIcon({ className: 'custom-marker', iconSize: [16,16] });
        L.marker([${centerLat}, ${centerLng}], {icon: myIcon}).addTo(map)
          .bindPopup("<b>${city}</b><br>Lat: ${centerLat}<br>Lng: ${centerLng}<br>Approximate location based on IP")
          .openPopup();
      </script>
    </body>
    </html>`;
  };

  return (
    <AdminLayout>
      <div className="analytics-detail-container">
        
        <div className="detail-header-wrapper">
            <div className="detail-header-left">
                <h1>User Details</h1>
                <div className="header-title-row">
                    <button onClick={() => navigate('/admin/analytics')} className="back-btn">
                        ← Back to Analytics
                    </button>
                    <div className="session-badge">Session ID: {formatSessionId(sessionId)}</div>
                </div>
            </div>
            <button className="export-btn-full" onClick={exportHistory}>
                📊 EXPORT THIS USER'S FULL HISTORY
            </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading analytics data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <h3>Error Loading Details</h3>
            <p>{error}</p>
          </div>
        ) : !details ? (
          <div className="empty-state">
            <p>No details found for this session.</p>
          </div>
        ) : (
          <div className="detail-content">
            
            {/* Location Section */}
            <div className="location-info-card">
                <div className="card-title">📍 User Location Information</div>
                <div className="location-grid">
                    <div className="loc-field">
                        <span className="loc-label">City:</span>
                        <span className="loc-value">{details.location?.city || 'N/A'}</span>
                    </div>
                    <div className="loc-field">
                        <span className="loc-label">Region:</span>
                        <span className="loc-value">{details.location?.region || 'N/A'}</span>
                    </div>
                    <div className="loc-field">
                        <span className="loc-label">Country:</span>
                        <span className="loc-value">{details.location?.country || 'India'}</span>
                    </div>
                    <div className="loc-field">
                        <span className="loc-label">Coordinates:</span>
                        <span className="loc-value">
                            {details.location?.latitude?.toFixed(4)}, {details.location?.longitude?.toFixed(4)}
                        </span>
                    </div>
                </div>
                
                <div className="map-wrapper">
                    {details.location?.latitude ? (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            srcDoc={generateMapHTML(details.location)}
                            title="User Map"
                        />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#94a3b8' }}>
                            Location data not available for this session
                        </div>
                    )}
                </div>
            </div>

            {/* Visit History Section */}
            <div className="visit-history-wrapper">
                <h3>📊 Visit History ({details.visits?.length || 0} visits)</h3>
                <div className="visits-list">
                    {details.visits?.map((visit, index) => (
                        <div className="visit-card" key={index}>
                            <div className="visit-card-header">
                                <span className="visit-number">Visit #{details.visits.length - index}</span>
                                <span className="visit-timestamp">
                                    {new Date(visit.timestamp).toLocaleString('en-GB')}
                                </span>
                            </div>
                            <div className="visit-card-grid">
                                <div className="v-item">
                                    <span className="v-label">Location:</span> 
                                    <span className="v-value" style={{color: '#3b82f6'}}>{visit.location}</span>
                                </div>
                                <div className="v-item">
                                    <span className="v-label">Time Spent:</span> 
                                    <span className="v-value">{formatTime(visit.timeSpent)}</span>
                                </div>
                                <div className="v-item">
                                    <span className="v-label">Exit Reason:</span> 
                                    <span className="v-value">{visit.exitReason || 'Tab closed or left website'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserAnalyticsDetail;
