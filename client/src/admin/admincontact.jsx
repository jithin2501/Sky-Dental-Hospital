import React, { useEffect, useState } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/admincontact.css';

function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [viewingMessage, setViewingMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>CONTACT MESSAGES</h1>
      </div>
      
      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="text-center">DATE</th>
              <th className="text-center">TYPE</th>
              <th className="text-center">APPLICANT</th>
              <th className="text-center">CONTACT</th>
              <th className="text-center">CLASS / MESSAGE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className="date-text text-center">
                  {new Date(msg.receivedOn).toLocaleDateString('en-GB')}
                </td>
                <td className="text-center">
                  <span className="type-badge">Contact</span>
                </td>
                <td className="bold-text text-center">{msg.name}</td>
                <td className="text-center">
                  <div className="contact-info-stack">
                    <div className="contact-primary">{msg.phone || 'N/A'}</div>
                    <div className="contact-secondary">{msg.email}</div>
                  </div>
                </td>
                <td className="msg-preview text-center">
                  <span className="msg-label">Msg:</span> {msg.message.substring(0, 35)}...
                </td>
                <td className="text-center">
                  <div className="action-btns">
                    <button className="view-pill" onClick={() => setViewingMessage(msg)}>View</button>
                    <button className="delete-pill" onClick={() => handleDelete(msg._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewingMessage && (
        <div className="modal-overlay" onClick={() => setViewingMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Message Details</h2>
            <div className="modal-body">
              <p><strong>Name:</strong> {viewingMessage.name}</p>
              <p><strong>Email:</strong> {viewingMessage.email}</p>
              <p><strong>Phone:</strong> {viewingMessage.phone || 'N/A'}</p>
              <p><strong>Message:</strong></p>
              <div className="message-box">{viewingMessage.message}</div>
            </div>
            <button className="close-btn" onClick={() => setViewingMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminContact;