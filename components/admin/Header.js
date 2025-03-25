"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import '@/styles/admin/AdHeader.css'

const Header = () => {
  const [token, setToken] = useState(null);
  const [adminName, setAdminName] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('authToken');
      const storedAdminName = localStorage.getItem('adminName');

      setToken(storedToken);
      setAdminName(storedAdminName);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('name');
    console.log("Logged out");
    window.location.href = '/admin/login';
  };

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex">
          <span className="text-lg font-semibold">Welcome, {capitalize(adminName || '')}</span>
        </div>

        <div className="flex">
          {!token ? (
            <Link href="/admin/login">
              <p className="text-lg font-semibold">Login</p>
            </Link>
          ) : (
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
