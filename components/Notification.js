import React from 'react';
import { FaTimes, FaEnvelope, FaUser, FaBell } from 'react-icons/fa';
import '@/styles/Notification.css';

const dummyData = [
  {
    id: 1,
    icon: <FaEnvelope />,
    time: '2 minutes ago',
    heading: 'New Message',
    description: 'You have a new message from John.',
  },
  {
    id: 2,
    icon: <FaUser />,
    time: '1 hour ago',
    heading: 'Profile Update',
    description: 'Your profile has been updated successfully.',
  },
  {
    id: 3,
    icon: <FaBell />,
    time: '5 hours ago',
    heading: 'System Alert',
    description: 'There was a scheduled maintenance earlier today.',
  },
];

const Notification = ({ isOpen, onClose }) => {
  return (
    <div className={`notification-container ${isOpen ? 'open' : ''}`}>
      <button className="notification-close-button" onClick={onClose}>
        <FaTimes />
      </button>
      <div className="notification-header">
        <h3>Notifications</h3>
        <p>{dummyData.length} new notifications</p>
      </div>
      <div className="notification-list">
        {dummyData.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon">{notification.icon}</div>
            <div className="notification-details">
              <p className="notification-time">{notification.time}</p>
              <h4 className="notification-heading">{notification.heading}</h4>
              <p className="notification-description">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
