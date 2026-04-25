import React, { useState, useEffect } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/GalleryManagement.css';

const GalleryManagement = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newSectionTitle })
      });
      if (res.ok) {
        setNewSectionTitle('');
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSection = async (id) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle })
      });
      if (res.ok) {
        setEditingSectionId(null);
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm('Delete this entire section and all its media?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (sectionId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);

    setUploading(true);
    try {
      const res = await fetch(`/api/gallery/${sectionId}/items`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = null; // reset input
    }
  };

  const handleDeleteItem = async (sectionId, itemId) => {
    if (!window.confirm('Remove this item?')) return;
    try {
      const res = await fetch(`/api/gallery/${sectionId}/items/${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="gallery-mgmt-container">
        <div className="gm-header">
          <h1>Gallery Management</h1>
          <form className="add-section-form" onSubmit={handleAddSection}>
            <input
              type="text"
              placeholder="Section Heading (e.g. Hospital Gallery)"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              required
            />
            <button type="submit" className="gm-add-btn">Create New Section</button>
          </form>
        </div>

        {loading ? (
          <div className="gm-loading">Loading gallery data...</div>
        ) : (
          <div className="gm-sections-list">
            {sections.length === 0 ? (
              <p className="no-sections">No gallery sections created yet.</p>
            ) : (
              sections.map((section) => (
                <div key={section._id} className="gm-section-card">
                  <div className="gm-section-header">
                    {editingSectionId === section._id ? (
                      <div className="gm-edit-title-group">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <button onClick={() => handleUpdateSection(section._id)}>Save</button>
                        <button onClick={() => setEditingSectionId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <h2 className="gm-section-title">{section.title}</h2>
                        <div className="gm-section-actions">
                          <button onClick={() => {
                            setEditingSectionId(section._id);
                            setEditTitle(section.title);
                          }}>Edit Title</button>
                          <button 
                            className="gm-delete-btn" 
                            onClick={() => handleDeleteSection(section._id)}
                          >Delete Section</button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="gm-upload-box">
                    <label className="gm-file-label">
                      {uploading ? 'Uploading...' : '+ Add Image or Video'}
                      <input 
                        type="file" 
                        accept="image/*,video/*" 
                        onChange={(e) => handleFileUpload(section._id, e)} 
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  <div className="gm-items-grid">
                    {section.items.map((item) => (
                      <div key={item._id} className="gm-item-card">
                        <div className="gm-media-preview">
                          {item.resource_type === 'video' ? (
                            <video src={item.url} muted />
                          ) : (
                            <img src={item.url} alt="Gallery" />
                          )}
                          <div className="gm-type-badge">{item.resource_type}</div>
                        </div>
                        <button 
                          className="gm-item-delete" 
                          onClick={() => handleDeleteItem(section._id, item._id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
