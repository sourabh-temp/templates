"use client";
import React, { useState, useEffect } from 'react';
import '@/styles/admin/Sidebar.css';
import { FaUser, FaBox, FaList, FaEnvelope } from 'react-icons/fa';


function Sidebar({ setActiveComponent }) {
  const [activeItem, setActiveItem] = useState('');

  // useEffect(() => {
  //   // Ensure we're on the client side by checking for the existence of window
  //   if (window !== "undefined") {
  //     const storedActiveItem = localStorage.getItem('activeComponent');
  //     if (storedActiveItem) {
  //       setActiveItem(storedActiveItem);
  //       setActiveComponent(storedActiveItem);
  //     }
  //   }
  // }, [setActiveComponent]);

  const handleItemClick = (item) => {
    setActiveComponent(item);
    setActiveItem(item);
    
    // Ensure we're on the client side before accessing localStorage
    // if (typeof window !== "undefined") {
    //   localStorage.setItem('activeComponent', item);
    // }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav>
        <ul>
          <li
            className={activeItem === 'Users' ? 'active' : ''}
            onClick={() => handleItemClick('Users')}
          >
            <FaUser className="sidebar-icon" /> Users
          </li>
          <li
            className={activeItem === 'Category' ? 'active' : ''}
            onClick={() => handleItemClick('Category')}
          >
            <FaList className="sidebar-icon" /> Category
          </li>
          <li
            className={activeItem === 'Products' ? 'active' : ''}
            onClick={() => handleItemClick('Products')}
          >
            <FaBox className="sidebar-icon" /> Products
          </li>
          <li
            className={activeItem === 'Orders' ? 'active' : ''}
            onClick={() => handleItemClick('Orders')}
          >
            <FaList className="sidebar-icon" /> Orders
          </li>
          <li
            className={activeItem === 'Contact' ? 'active' : ''}
            onClick={() => handleItemClick('Contact')}
          >
            <FaEnvelope className="sidebar-icon" /> Contact
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
