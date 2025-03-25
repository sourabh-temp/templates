"use client"
import React, { useState, useEffect } from 'react';


function UserForm({ onClose, onSubmit, editingUser, errorMessage }) {
  const [formValues, setFormValues] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    created_at: '',
    is_admin: false,  // Add the is_admin field here
  });
  const [rePassword, setRePassword] = useState(''); // State for re-password
  const [passwordError, setPasswordError] = useState(''); // State for password mismatch error

  useEffect(() => {
    if (editingUser) {
      setFormValues(editingUser);
    }
  }, [editingUser]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password !== rePassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');
    onSubmit(formValues);
  };

  // Handle the toggle change for is_admin
  const handleAdminToggle = () => {
    setFormValues({ ...formValues, is_admin: !formValues.is_admin });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingUser ? 'Edit User' : 'Create User'}</h3>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          {passwordError && (
            <div className="error-message">
              {passwordError}
            </div>
          )}

          <input
            type="text"
            placeholder="Name"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formValues.phone}
            onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Re-Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />

          {/* Toggle for is_admin */}
          <div className="toggle-container">
            <label htmlFor="is_admin">Is Admin</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="is_admin"
                checked={formValues.is_admin}
                onChange={handleAdminToggle}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit">{editingUser ? 'Update User' : 'Create User'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
