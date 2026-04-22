import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/reviewmanagement.css';

const API = '/api/reviews';
const REVIEW_URL = `${window.location.origin}/leave-review`;

const STARS = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

const ReviewManagement = () => {
  const [reviews,  setReviews]  = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter,   setFilter]   = useState('all'); // all | pending | approved
  const [showQR,   setShowQR]   = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => { 
    fetchReviews(); 
    fetchAutoApproveStatus();
  }, []);

  const fetchAutoApproveStatus = async () => {
    try {
      const res = await fetch(`${API}/settings/auto-approve`);
      const data = await res.json();
      setAutoApprove(data.autoApprove);
    } catch { console.error("Failed to fetch settings"); }
  };

  const handleToggleAutoApprove = async () => {
    try {
      const res = await fetch(`${API}/settings/auto-approve`, { method: 'PATCH' });
      const data = await res.json();
      setAutoApprove(data.autoApprove);
    } catch { alert("Failed to update auto-approve setting"); }
  };

  // Handle QR generation when modal opens
  useEffect(() => {
    if (showQR) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      script.onload = () => {
        if (qrRef.current && !qrRef.current.hasChildNodes()) {
          new window.QRCode(qrRef.current, {
            text: REVIEW_URL,
            width: 240,
            height: 240,
            colorDark: '#0A3D5C',
            colorLight: '#ffffff',
            correctLevel: window.QRCode.CorrectLevel.H,
          });
        }
      };
      document.body.appendChild(script);
      return () => { if (document.body.contains(script)) document.body.removeChild(script); };
    }
  }, [showQR]);

  const fetchReviews = async () => {
    setFetching(true);
    try {
      const res  = await fetch(API);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch { setReviews([]); }
    finally  { setFetching(false); }
  };

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${API}/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) fetchReviews();
    } catch { alert('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchReviews();
    } catch { alert('Delete failed'); }
  };

  const handlePrint = () => window.print();

  const filtered = reviews.filter(r => {
    if (filter === 'pending')  return !r.approved;
    if (filter === 'approved') return  r.approved;
    return true;
  });

  const pendingCount  = reviews.filter(r => !r.approved).length;
  const approvedCount = reviews.filter(r =>  r.approved).length;

  return (
    <AdminLayout>
      <div className="rm-wrapper">
        <div className="admin-page-header"><h1>REVIEW MANAGEMENT</h1></div>

        {/* Stats */}
        <div className="rm-stats">
          <div className="rm-stat-card">
            <div className="rm-stat-num">{reviews.length}</div>
            <div className="rm-stat-label">Total Reviews</div>
          </div>
          <div className="rm-stat-card rm-stat-pending">
            <div className="rm-stat-num">{pendingCount}</div>
            <div className="rm-stat-label">Pending Approval</div>
          </div>
          <div className="rm-stat-card rm-stat-approved">
            <div className="rm-stat-num">{approvedCount}</div>
            <div className="rm-stat-label">Live on Website</div>
          </div>
          <div className="rm-stat-card rm-stat-qr">
            <div className="rm-stat-label">Review QR Code</div>
            <button className="btn-stat-view" onClick={() => setShowQR(true)}>View QR</button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="admin-table-card">
          <div className="existing-users-header rm-tab-header">
            <h2>All Reviews</h2>
            <div className="rm-tabs">
              {['all', 'pending', 'approved'].map(tab => (
                <button
                  key={tab}
                  className={`rm-tab ${filter === tab ? 'active' : ''}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              
              <div className="vertical-divider"></div>

              <div className="auto-approve-toggle">
                <span className="toggle-label">Auto Approve QR Reviews</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={autoApprove} 
                    onChange={handleToggleAutoApprove}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {fetching ? (
            <div className="rm-loading"><div className="rm-spinner" /><p>Loading reviews…</p></div>
          ) : filtered.length === 0 ? (
            <div className="rm-empty">
              <div className="rm-empty-icon">💬</div>
              <p>No {filter === 'all' ? '' : filter} reviews yet.</p>
              {filter === 'pending' && <p className="rm-empty-sub">All submitted reviews have been approved.</p>}
            </div>
          ) : (
            <div className="rm-list">
              {filtered.map(review => (
                <div className={`rm-item ${review.approved ? 'rm-approved' : 'rm-pending'}`} key={review._id}>
                  <div className="rm-item-left">
                    <div className="rm-item-avatar">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="rm-item-content">
                      <div className="rm-item-top">
                        <span className="rm-item-name">{review.name}</span>
                        <span className="rm-item-stars">{STARS(review.rating)}</span>
                        <span className={`rm-status-badge ${review.approved ? 'badge-live' : 'badge-pending'}`}>
                          {review.approved ? '● Live' : '○ Pending'}
                        </span>
                      </div>
                      <p className="rm-item-text">"{review.text}"</p>
                      <p className="rm-item-date">
                        {new Date(review.createdAt).toLocaleString('en-GB')}
                      </p>
                    </div>
                  </div>
                  <div className="rm-item-actions">
                    <button
                      className={`rm-btn-approve ${review.approved ? 'rm-btn-unapprove' : ''}`}
                      onClick={() => handleToggle(review._id)}
                    >
                      {review.approved ? 'Unapprove' : '✓ Approve'}
                    </button>
                    <button className="rm-btn-delete" onClick={() => handleDelete(review._id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="qr-modal-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal-content" onClick={e => e.stopPropagation()}>
            <div className="qr-print-safe">
              <h3 className="qr-hospital-name">Sky Dental Hospital</h3>
              <p className="qr-instructions">Scan to submit a review</p>

              <div className="qr-preview-box">
                <div ref={qrRef} />
              </div>

              <p className="qr-link-text">{REVIEW_URL}</p>
            </div>

            <button className="rm-btn-print no-print modal-btn" onClick={() => window.print()}>
              Print QR Code
            </button>
            <button className="btn-stat-view no-print modal-btn" style={{marginTop: '10px'}} onClick={() => setShowQR(false)}>Close</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReviewManagement;