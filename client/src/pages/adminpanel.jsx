import React, { useEffect, useState } from 'react';
import '../adminstyles/adminpanel.css';

function AdminPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' })
      .then(() => setMessages(messages.filter(msg => msg._id !== id)));
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Mariya Homes</h2>
        <ul>
          <li className="active">Contact Messages</li>
          <li>Upload Video</li>
          <li>Manage Properties</li>
        </ul>
      </div>
      <div className="admin-content">
        <h1>CONTACT MESSAGES</h1>
        <table className="msg-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Message</th><th>Received On</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="msg-text">{msg.message}</td>
                <td>{new Date(msg.receivedOn).toLocaleDateString()}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="del-btn" onClick={() => handleDelete(msg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminPanel;