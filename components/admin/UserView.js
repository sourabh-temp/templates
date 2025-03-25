import React from 'react';


function UserView({ user, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>View User</h3>
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default UserView;
