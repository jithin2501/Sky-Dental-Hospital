import React, { useEffect, useState } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/admincontact.css';

function AdminContact() {
  const [messages, setMessages] = useState([]);
  // 1. Add state to hold the message being viewed
  const [viewingMessage, setViewingMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(msg => msg._id !== id));
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
              <th>DATE</th>
              <th>TYPE</th>
              <th>APPLICANT</th>
              <th>CONTACT</th>
              <th>CLASS / MESSAGE</th>
              <th className="text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className="date-text">{new Date(msg.receivedOn).toLocaleDateString('en-GB')}</td>
                <td><span className="type-badge">Contact</span></td>
                <td className="bold-text">{msg.name}</td>
                <td>
                  <div className="contact-primary">{msg.phone || 'N/A'}</div>
                  <div className="contact-secondary">{msg.email}</div>
                </td>
                <td className="msg-preview">
                  <span className="msg-label">Msg:</span> {msg.message.substring(0, 35)}...
                </td>
                <td className="text-right">
                  {/* 2. Update the View button to set the state */}
                  <button className="view-pill" onClick={() => setViewingMessage(msg)}>View</button>
                  <button className="delete-pill" onClick={() => handleDelete(msg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Add the Modal JSX */}
      {viewingMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Message Details</h2>
            <hr />
            <p><strong>Name:</strong> {viewingMessage.name}</p>
            <p><strong>Email:</strong> {viewingMessage.email}</p>
            <p><strong>Phone:</strong> {viewingMessage.phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <div className="message-box">{viewingMessage.message}</div>
            <button className="close-btn" onClick={() => setViewingMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminContact;