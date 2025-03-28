"use client";

import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaHome } from 'react-icons/fa';
import '@/styles/Header.css';
import Link from "next/link";
import Notification from '@/components/Notification';
import SearchBar from '@/components/SearchBar';
import Cookies from 'js-cookie';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [token, setToken] = useState(null);

  // Effect to handle client-side logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = Cookies.get('userToken')?.value;
      setToken(storedToken);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCombinedButtonClick = () => {
    setIsSignup(!isSignup);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
    }
    setToken(null); // Clear the local state after logout
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <FaHome size={20} color="black" className="logoImage" />
        </div>
        
        {/* Search Icon inside Nav */}
        <div className="msearchIcon" onClick={toggleSearch}>
          <FaSearch size={20} color="black" />
        </div>

        <button className="mobileNavButton" onClick={toggleMobileMenu}>
          ☰
        </button>

        <nav className="nav">
          <Link href="/">
            <div className="navLink">Home</div>
          </Link>
          <Link href="/aboutus">
            <div className="navLink">About</div>
          </Link>
          <Link href="/templates">
            <div className="navLink">{token}Templates</div>
          </Link>
          
          {/* Search Icon inside Nav */}
          <div className="navLink" onClick={toggleSearch}>
            <FaSearch size={20} color="black" />
          </div>
          
          <div className="navLink" onClick={toggleNotification}>
            <FaBell color="black" style={{ fontSize: '20px' }} />
          </div>
          <Link href="/Profile">
            <div className="navLink">
              <FaUser color="black" style={{ fontSize: '20px' }} />
            </div>
          </Link>
          {!token ? (
            <button className="combinedButton" onClick={handleCombinedButtonClick}>
              {isSignup ? "Login" : "Signup"}
            </button>
          ) : (
            <button className="combinedButton" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobileNav">
            <div className="monavLink">Home</div>
            <div className="monavLink">About</div>
            <div className="monavLink">Templates</div>
            <div className="monavLink" onClick={toggleNotification}>
              <FaBell color="#fff" />
            </div>
            <div className="monavLink">
              <FaUser color="#fff" />
            </div>
            <button className="mobcombinedButton" onClick={handleCombinedButtonClick}>
              {isSignup ? "Login" : "Signup"}
            </button>
          </div>
        )}
      </header>

      {/* Render the Search Bar Overlay */}
      {isSearchOpen && (
        <div className="search-bar-overlay">
          <SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
        </div>
      )}

      <Notification isOpen={isNotificationOpen} onClose={toggleNotification} />
    </>
  );
};

export default Header;
