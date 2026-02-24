import React, { useEffect, useState } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/admincontact.css';

function AdminContact() {
  const [messages, setMessages] = useState([]);

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
                  <div className="contact-primary">{msg.phone || '9061058123'}</div>
                  <div className="contact-secondary">{msg.email}</div>
                </td>
                <td className="msg-preview">
                  <span className="msg-label">Msg:</span> {msg.message.substring(0, 35)}...
                </td>
                <td className="text-right">
                  <button className="view-pill">View</button>
                  <button className="delete-pill" onClick={() => handleDelete(msg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminContact;