import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/teamdetails.css';

const DOCTORS_API  = 'http://localhost:5000/api/doctors';
const PROFILES_API = 'http://localhost:5000/api/doctor-profiles';

const EMPTY_DETAIL = { designation: '', experience: '', bio1: '', bio2: '', email: '', facebook: '', instagram: '' };

const TeamDetails = () => {
  const [doctors,         setDoctors]         = useState([]);
  const [profiles,        setProfiles]        = useState({});
  const [fetching,        setFetching]        = useState(true);
  const [detailLoading,   setDetailLoading]   = useState(false);
  const [detailForm,      setDetailForm]      = useState(EMPTY_DETAIL);
  const [editingDetailId, setEditingDetailId] = useState(null);

  const formRef = useRef(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setFetching(true);
    try {
      const [docRes, profRes] = await Promise.all([
        fetch(DOCTORS_API),
        fetch(PROFILES_API),
      ]);
      const docs  = await docRes.json();
      const profs = await profRes.json();

      setDoctors(Array.isArray(docs) ? docs : []);

      const profMap = {};
      if (Array.isArray(profs)) {
        profs.forEach(p => { if (p.doctor?._id) profMap[p.doctor._id] = p; });
      }
      setProfiles(profMap);
    } catch {
      setDoctors([]);
      setProfiles({});
    } finally {
      setFetching(false);
    }
  };

  const handleDetailEdit = (doc) => {
    const existing = profiles[doc._id];
    setEditingDetailId(doc._id);
    setDetailForm({
      designation: existing?.designation || '',
      experience:  existing?.experience  || '',
      bio1:        existing?.bio1        || '',
      bio2:        existing?.bio2        || '',
      email:       existing?.email       || '',
      facebook:    existing?.facebook    || '',
      instagram:   existing?.instagram   || '',
    });
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    setDetailLoading(true);
    try {
      const res = await fetch(`${PROFILES_API}/${editingDetailId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detailForm),
      });
      if (res.ok) { resetForm(); fetchAll(); }
      else { const err = await res.json(); alert('Failed: ' + (err.message || 'Unknown error')); }
    } catch (err) { alert('Error: ' + err.message); }
    finally       { setDetailLoading(false); }
  };

  const handleDetailDelete = async (doctorId) => {
    if (!window.confirm('Delete the profile details for this doctor?')) return;
    try {
      const res = await fetch(`${PROFILES_API}/${doctorId}`, { method: 'DELETE' });
      if (res.ok) fetchAll();
      else alert('Delete failed');
    } catch { alert('Delete failed'); }
  };

  const resetForm = () => {
    setDetailForm(EMPTY_DETAIL);
    setEditingDetailId(null);
  };

  const hasDetails = (docId) => {
    const p = profiles[docId];
    return p && (p.designation || p.experience || p.bio1 || p.bio2 || p.email || p.facebook || p.instagram);
  };

  return (
    <AdminLayout>
      <div className="tm-wrapper">

        <div className="admin-page-header"><h1>TEAM DETAILS</h1></div>

        {/* ── Edit form (shown when a doctor is selected) ── */}
        {editingDetailId && (() => {
          const doc = doctors.find(d => d._id === editingDetailId);
          return doc ? (
            <div ref={formRef} className="user-management-container">
              <div className="td-edit-header">
                <img src={doc.image_url} alt={doc.name} className="td-edit-avatar" />
                <div>
                  <h2>Edit Profile: {doc.name}</h2>
                  <p className="td-edit-specialty">{doc.specialty}</p>
                </div>
              </div>

              <form onSubmit={handleDetailSubmit} className="user-form">
                <div className="tm-form-row">
                  <div className="user-form-group">
                    <label className="input-label">Designation:</label>
                    <input type="text" className="admin-input" placeholder="e.g. Senior Orthodontist"
                      value={detailForm.designation}
                      onChange={(e) => setDetailForm({ ...detailForm, designation: e.target.value })} />
                  </div>
                  <div className="user-form-group">
                    <label className="input-label">Experience:</label>
                    <input type="text" className="admin-input" placeholder="e.g. 12+ Years"
                      value={detailForm.experience}
                      onChange={(e) => setDetailForm({ ...detailForm, experience: e.target.value })} />
                  </div>
                </div>

                <div className="user-form-group">
                  <label className="input-label">Bio (Paragraph 1):</label>
                  <textarea className="admin-input admin-textarea" rows={4}
                    placeholder="Write the first paragraph of the doctor's profile..."
                    value={detailForm.bio1}
                    onChange={(e) => setDetailForm({ ...detailForm, bio1: e.target.value })} />
                </div>

                <div className="user-form-group">
                  <label className="input-label">Bio (Paragraph 2):</label>
                  <textarea className="admin-input admin-textarea" rows={4}
                    placeholder="Write the second paragraph of the doctor's profile..."
                    value={detailForm.bio2}
                    onChange={(e) => setDetailForm({ ...detailForm, bio2: e.target.value })} />
                </div>

                <div className="tm-form-row">
                  <div className="user-form-group">
                    <label className="input-label">Email:</label>
                    <input type="email" className="admin-input" placeholder="doctor@skydentalclinics.com"
                      value={detailForm.email}
                      onChange={(e) => setDetailForm({ ...detailForm, email: e.target.value })} />
                  </div>
                  <div className="user-form-group">
                    <label className="input-label">Facebook URL:</label>
                    <input type="text" className="admin-input" placeholder="https://facebook.com/..."
                      value={detailForm.facebook}
                      onChange={(e) => setDetailForm({ ...detailForm, facebook: e.target.value })} />
                  </div>
                  <div className="user-form-group">
                    <label className="input-label">Instagram URL:</label>
                    <input type="text" className="admin-input" placeholder="https://instagram.com/..."
                      value={detailForm.instagram}
                      onChange={(e) => setDetailForm({ ...detailForm, instagram: e.target.value })} />
                  </div>
                </div>

                <div className="tm-form-actions">
                  <button type="button" className="tm-btn-cancel" onClick={resetForm}>Cancel</button>
                  <button type="submit" className="btn-create-admin" disabled={detailLoading}>
                    {detailLoading ? 'Saving…' : 'Save Profile Details'}
                  </button>
                </div>
              </form>
            </div>
          ) : null;
        })()}

        {/* ── Doctor Profiles list ── */}
        <div className="admin-table-card">
          <div className="existing-users-header"><h2>Doctor Profiles</h2></div>

          {fetching ? (
            <div className="tm-loading"><div className="tm-spinner" /><p>Loading…</p></div>
          ) : doctors.length === 0 ? (
            <div className="tm-empty">
              <div className="tm-empty-icon">📋</div>
              <p>No doctors found.</p>
              <p className="tm-empty-sub">Add doctors in Team Management first.</p>
            </div>
          ) : (
            <div className="td-list">
              {doctors.map((doc) => {
                const p = profiles[doc._id];
                return (
                  <div className="td-list-item" key={doc._id}>
                    <div className="td-list-left">
                      <img src={doc.image_url} alt={doc.name} className="td-list-avatar" />
                      <div className="td-list-info">
                        <p className="td-list-specialty">{doc.specialty}</p>
                        <p className="td-list-name">{doc.name}</p>
                        {hasDetails(doc._id) ? (
                          <div className="td-detail-chips">
                            {p.designation && <span className="td-chip">🏷 {p.designation}</span>}
                            {p.experience  && <span className="td-chip">⏱ {p.experience}</span>}
                            {p.email       && <span className="td-chip">✉ {p.email}</span>}
                            {p.facebook    && <span className="td-chip td-chip-social">FB</span>}
                            {p.instagram   && <span className="td-chip td-chip-social">IG</span>}
                            {(p.bio1 || p.bio2) && <span className="td-chip td-chip-bio">📝 Bio added</span>}
                          </div>
                        ) : (
                          <span className="td-no-details">No profile details yet — click Edit to add</span>
                        )}
                      </div>
                    </div>
                    <div className="td-list-actions">
                      <button className="tm-btn-edit" onClick={() => handleDetailEdit(doc)}>✏️ Edit</button>
                      {hasDetails(doc._id) && (
                        <button className="tm-btn-delete" onClick={() => handleDetailDelete(doc._id)}>🗑 Delete</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default TeamDetails;