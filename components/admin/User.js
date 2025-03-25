"use client";
import React, { useState, useEffect, useCallback } from 'react';
import UserForm from '@/components/admin/UserForm';
import UserView from '@/components/admin/UserView';
import '@/styles/admin/User.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://temp-rails-1.onrender.com/api/users');
      const data = await response.json();
      
      if (Array.isArray(data.users) && data.users.length > 0) {
        setUsers(data.users);
        console.log('Users state updated:', data.users);
      } else {
        console.error('No records found');
        setUsers([]);
        showPopupMessage('No record found');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      showPopupMessage('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const openView = (user) => {
    setViewingUser(user);
  };

  const closeView = () => {
    setViewingUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
      showPopupMessage('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      showPopupMessage('Error deleting user.');
    }
  };

  const handleCreateOrUpdateUser = async (user) => {
    if (editingUser) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        if (data.error) {
          setErrorMessage(data.error);
          setPopupMessage(data.error);
          setShowPopup(true);
          return;
        }
        setErrorMessage('');
        setPopupMessage('User updated successfully.');
      } catch (error) {
        console.error('Error updating user:', error);
        setPopupMessage('Error updating user.');
      }
    } else {
      try {
        const response = await fetch('https://temp-rails-1.onrender.com/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        if (data.error) {
          setErrorMessage(data.error);
          setPopupMessage(data.error);
          setShowPopup(true);
          return;
        }
        setErrorMessage('');
        setPopupMessage('User created successfully.');
      } catch (error) {
        console.error('Error creating user:', error);
        setPopupMessage('Error creating user.');
      }
    }

    closeForm();
    setShowPopup(true);
    fetchUsers();
    setTimeout(() => setShowPopup(false), 3000);
  };

  const filteredUsers = Array.isArray(users)
    ? users
        .filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase())) // Adjust filter to use email
        .sort((a, b) =>
          filterBy === 'latest'
            ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // Sort based on `created_at`
            : 0
        )
    : [];

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="content">
      <h2>User Management</h2>
      <div className="user-controls">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">By Name</option>
          <option value="latest">Latest Created</option>
        </select>
        <button onClick={() => openForm()} className="create-user">Create User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="loader-cell">
                <div className="loader"></div>
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={4} className="error-message">
                No Record found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id} className="tableRow">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => openView(user)}>View</button>
                  <button className="edit-bt-button" onClick={() => openForm(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isFormOpen && (
        <UserForm
          onClose={closeForm}
          onSubmit={handleCreateOrUpdateUser}
          editingUser={editingUser}
          errorMessage={errorMessage}
        />
      )}

      {viewingUser && (
        <UserView user={viewingUser} onClose={closeView} /> // Display the UserView modal
      )}

      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default Users;
