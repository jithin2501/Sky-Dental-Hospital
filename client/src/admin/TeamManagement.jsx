import React, { useState, useEffect } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/teammanagement.css';

const API = 'http://localhost:5000/api/doctors';

const EMPTY_FORM = { name: '', specialty: '' };

const TeamManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setFetching(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch {
      setDoctors([]);
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) return alert('Please fill in all fields');
    if (!editingId && !imageFile) return alert('Please select a doctor photo');

    setLoading(true);
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('specialty', formData.specialty);
    if (imageFile) fd.append('image', imageFile);

    try {
      const url = editingId ? `${API}/${editingId}` : API;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: fd });
      if (res.ok) {
        resetForm();
        fetchDoctors();
      } else {
        const err = await res.json();
        alert('Failed: ' + (err.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingId(doctor._id);
    setFormData({ name: doctor.name, specialty: doctor.specialty });
    setImagePreview(doctor.image_url);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor from the website?')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDoctors();
      else alert('Delete failed');
    } catch {
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="tm-wrapper">

        {/* ── Page Header ── */}
        <div className="admin-page-header">
          <h1>TEAM MANAGEMENT</h1>
        </div>

        {/* ── Add / Edit Form ── */}
        <div className="user-management-container">
          <h2>{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
          <p>{editingId ? 'Update the doctor\'s details below.' : 'Add a new doctor to the Meet Our Team section on the homepage.'}</p>

          <form onSubmit={handleSubmit} className="user-form">

            {/* Image Upload */}
            <div className="user-form-group">
              <label className="input-label">Doctor Photo:</label>
              <div
                className={`tm-dropzone ${dragOver ? 'drag-over' : ''} ${imagePreview ? 'has-image' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImageChange(e.dataTransfer.files[0]); }}
                onClick={() => document.getElementById('tm-image-input').click()}
              >
                <input
                  id="tm-image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                {imagePreview ? (
                  <div className="tm-image-preview-wrap">
                    <img src={imagePreview} alt="Preview" className="tm-image-preview" />
                    <span className="tm-change-hint">Click to change photo</span>
                  </div>
                ) : (
                  <div className="tm-drop-placeholder">
                    <div className="tm-drop-icon">📷</div>
                    <p className="tm-drop-title">Drag & drop or click to upload</p>
                    <p className="tm-drop-sub">JPG, PNG, WEBP · Max 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="user-form-group">
              <label className="input-label">Doctor Name:</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Dr. John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Specialty */}
            <div className="user-form-group">
              <label className="input-label">Specialization:</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Orthodontics"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>

            <div className="tm-form-actions">
              {editingId && (
                <button type="button" className="tm-btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-create-admin" disabled={loading}>
                {loading
                  ? (editingId ? 'Saving Changes…' : 'Adding Doctor…')
                  : (editingId ? 'Save Changes' : 'Add Doctor')
                }
              </button>
            </div>
          </form>
        </div>

        {/* ── Doctors Preview Grid ── */}
        <div className="admin-table-card">
          <div className="existing-users-header">
            <h2>Current Team Members</h2>
          </div>

          {fetching ? (
            <div className="tm-loading">
              <div className="tm-spinner" />
              <p>Loading team…</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="tm-empty">
              <div className="tm-empty-icon">👥</div>
              <p>No doctors added yet.</p>
              <p className="tm-empty-sub">Use the form above to add your first team member.</p>
            </div>
          ) : (
            <div className="tm-doctors-grid">
              {doctors.map((doc) => (
                <div className="tm-doctor-card" key={doc._id}>
                  <div className="tm-doctor-img-wrap">
                    <img src={doc.image_url} alt={doc.name} className="tm-doctor-img" />
                  </div>
                  <div className="tm-doctor-info">
                    <p className="tm-doctor-specialty">{doc.specialty}</p>
                    <p className="tm-doctor-name">{doc.name}</p>
                  </div>
                  <div className="tm-doctor-actions">
                    <button className="tm-btn-edit" onClick={() => handleEdit(doc)}>
                      ✏️ Edit
                    </button>
                    <button className="tm-btn-delete" onClick={() => handleDelete(doc._id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default TeamManagement;