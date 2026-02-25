import React, { useState, useEffect } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/videomanagement.css';

const API = 'http://localhost:5000/api/media';

const VideoManagement = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // local preview before upload
  const [loading, setLoading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${API}/latest`);
      if (res.ok) {
        const data = await res.json();
        setCurrentMedia(data);
      } else {
        setCurrentMedia(null);
      }
    } catch {
      setCurrentMedia(null);
    } finally {
      setFetching(false);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview({ url: objectUrl, type: selectedFile.type.startsWith('video') ? 'video' : 'image' });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file first');

    setLoading(true);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await fetch(`${API}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        setPreview(null);
        await fetchMedia();
      } else {
        const err = await res.json();
        alert('Upload failed: ' + (err.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentMedia) return;
    if (!window.confirm('Are you sure you want to remove this media from the website?')) return;

    try {
      const res = await fetch(`${API}/${currentMedia._id}`, { method: 'DELETE' });
      if (res.ok) {
        setCurrentMedia(null);
      } else {
        const err = await res.json();
        alert('Delete failed: ' + (err.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileChange(dropped);
  };

  return (
    <AdminLayout>
      <div className="vm-wrapper">
        <div className="vm-page-header">
          <div>
            <h1>VIDEO MANAGEMENT</h1>
          </div>
        </div>

        {/* ── UPLOAD SECTION (always visible) ── */}
        <div className="vm-card">
          <div className="vm-card-header">
            <span className="vm-card-badge">Upload</span>
            <h2>Upload New Media</h2>
            <p>Replaces any existing media automatically</p>
          </div>

          <form onSubmit={handleUpload} className="vm-form">
            {/* Drop Zone */}
            <div
              className={`vm-dropzone ${dragOver ? 'drag-over' : ''} ${preview ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('vm-file-input').click()}
            >
              <input
                id="vm-file-input"
                type="file"
                accept="video/*,image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              {preview ? (
                <div className="vm-local-preview">
                  {preview.type === 'video' ? (
                    <video src={preview.url} muted className="vm-preview-thumb" />
                  ) : (
                    <img src={preview.url} alt="Preview" className="vm-preview-thumb" />
                  )}
                  <div className="vm-file-name">📎 {file?.name}</div>
                </div>
              ) : (
                <div className="vm-dropzone-placeholder">
                  <div className="vm-drop-icon">☁️</div>
                  <p className="vm-drop-title">Drag & drop or click to browse</p>
                  <p className="vm-drop-sub">MP4, MOV, JPG, PNG · Max 100MB</p>
                </div>
              )}
            </div>

            <div className="vm-form-actions">
              {preview && (
                <button
                  type="button"
                  className="vm-btn vm-btn-ghost"
                  onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                >
                  ✕ Clear
                </button>
              )}
              <button type="submit" className="vm-btn vm-btn-primary" disabled={loading || !file}>
                {loading ? (
                  <span className="vm-uploading">
                    <span className="vm-spinner" /> Uploading…
                  </span>
                ) : (
                  '⬆ Upload Media'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── CURRENT MEDIA PREVIEW ── */}
        <div className="vm-card">
          <div className="vm-card-header">
            <span className="vm-card-badge vm-badge-live">Live</span>
            <h2>Current Website Media</h2>
            <p>This is what visitors see on the homepage Virtual Tour section</p>
          </div>

          {fetching ? (
            <div className="vm-empty-state">
              <div className="vm-spinner vm-spinner-lg" />
              <p>Loading…</p>
            </div>
          ) : currentMedia ? (
            <div className="vm-current-media">
              <div className="vm-media-frame">
                {currentMedia.resource_type === 'video' ? (
                  <video src={currentMedia.url} controls className="vm-media-el" />
                ) : (
                  <img src={currentMedia.url} alt="Current media" className="vm-media-el" />
                )}
                <div className="vm-media-badge">
                  {currentMedia.resource_type === 'video' ? '🎬 Video' : '🖼 Image'}
                </div>
              </div>

              <div className="vm-media-meta">
                <div className="vm-meta-row">
                  <span className="vm-meta-label">Type</span>
                  <span className="vm-meta-value">{currentMedia.resource_type}</span>
                </div>
                <div className="vm-meta-row">
                  <span className="vm-meta-label">Cloudinary ID</span>
                  <span className="vm-meta-value vm-meta-mono">{currentMedia.public_id}</span>
                </div>
                <div className="vm-meta-row">
                  <span className="vm-meta-label">Uploaded</span>
                  <span className="vm-meta-value">
                    {new Date(currentMedia.uploadedAt).toLocaleString()}
                  </span>
                </div>
                <div className="vm-meta-row">
                  <span className="vm-meta-label">URL</span>
                  <a
                    href={currentMedia.url}
                    target="_blank"
                    rel="noreferrer"
                    className="vm-meta-link"
                  >
                    Open in Cloudinary ↗
                  </a>
                </div>
              </div>

              <div className="vm-current-actions">
                <button
                  className="vm-btn vm-btn-danger"
                  onClick={handleDelete}
                >
                  🗑 Delete Media
                </button>
              </div>
            </div>
          ) : (
            <div className="vm-empty-state">
              <div className="vm-empty-icon">📭</div>
              <p>No media currently uploaded.</p>
              <p className="vm-empty-sub">Upload a video or image above to get started.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default VideoManagement;