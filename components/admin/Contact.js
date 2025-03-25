"use client"
import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa'; // Import the pencil icon
import '@/styles/admin/Contact.css';

const Contact = () => {
  const [contactForms, setContactForms] = useState([]); // Removed type annotation
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null); // Removed type annotation
  const [newStatus, setNewStatus] = useState('pending'); // Removed type annotation
  const [viewingContact, setViewingContact] = useState(null); // Removed type annotation
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Fetch contact forms from the API
  useEffect(() => {
    const fetchContactForms = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/contacts?search=${searchTerm}&status=${statusFilter}`);
      const data = await response.json();
      setContactForms(data);
      setLoading(false);
    };

    fetchContactForms();
  }, [searchTerm, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setContactForms(contactForms.map(form => form.id === id ? { ...form, status: newStatus } : form));
    setEditingStatusId(null); // Hide the dropdown after update
    setPopupMessage('Contact updated successfully.');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    setContactForms(contactForms.filter(form => form.id !== id));
  };

  const openViewModal = (form) => {
    setViewingContact(form);
  };

  const closeViewModal = () => {
    setViewingContact(null);
  };

  return (
    <div className="tableContainer">
      <h2>Contact Management</h2>
      <div className="filterContainer">
        <input
          className="input"
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="input"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">Filter by status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {showPopup && (
        <div className="popup">{popupMessage}</div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th className="tableHeader">Name</th>
            <th className="tableHeader">Email</th>
            <th className="tableHeader">Message</th>
            <th className="tableHeader">Status</th>
            <th className="tableHeader">Actions</th>
          </tr>
        </thead>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <tbody>
            {contactForms.map((form) => (
              <tr key={form.id} className="tableRow">
                <td className="tableCell">{form.name}</td>
                <td className="tableCell">{form.email}</td>
                <td className="tableCell">{form.message}</td>
                <td className="statusCell" data-status={form.status}>
                  {editingStatusId === form.id ? (
                    <select
                      className="editSelect"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)} // Removed TypeScript assertion
                      onBlur={() => handleStatusChange(form.id, newStatus)} // Update status when the user selects a value
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <>
                      {form.status} {/* Display the status */}
                      <FaPen
                        className="pencilIcon"
                        onClick={() => {
                          setEditingStatusId(form.id); // Show the dropdown when pencil icon is clicked
                          setNewStatus(form.status); // Pre-select current status
                        }}
                      />
                    </>
                  )}
                </td>
                <td className="tableCell">
                  <button
                    className="button"
                    onClick={() => openViewModal(form)} // View button
                  >
                    View
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDelete(form.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* View Modal */}
      {viewingContact && (
        <div className="viewModal">
          <div className="viewModalContent">
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> {viewingContact.name}</p>
            <p><strong>Email:</strong> {viewingContact.email}</p>
            <p><strong>Message:</strong> {viewingContact.message}</p>
            <p><strong>Status:</strong> {viewingContact.status}</p>
            <button className="button" onClick={closeViewModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
