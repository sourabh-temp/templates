"use client";

import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaHome } from 'react-icons/fa';
import '@/styles/Header.css';
import Link from "next/link";
// import Image from "next/image";
// import logo from "@/public/image/ruby.png";
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
      // const storedToken = localStorage.getItem('token');
      const storedToken = Cookies.get('userToken')?.value;
      setToken(storedToken);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCombinedButtonClick = () => {
    setIsSignup(!isSignup);
    // navigate('/signup');
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
          {/*<Image src={logo} alt="Logo" className="logoImage" width={150} height={50} />*/}
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

          <div className="navLink" onClick={toggleSearch}>
            <FaSearch size={20} color="black" />
          </div>

          {token && (
            <>
              <div className="navLink" onClick={toggleNotification}>
                <FaBell color="#fff" style={{ fontSize: '20px' }} />
              </div>
              <Link href="/Profile">
                <div className="navLink">
                  <FaUser color="#fff" style={{ fontSize: '20px' }} />
                </div>
              </Link>
            </>
          )}

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

        {mobileMenuOpen && (
          <div className="mobileNav">
            <div className="navLink">Home</div>
            <div className="navLink">About</div>
            <div className="navLink">Templates</div>
            <div className="navLink" onClick={toggleNotification}>
              <FaBell color="#fff" />
            </div>
            <div className="navLink">
              <FaUser color="#fff" />
            </div>
            <button className="combinedButton" onClick={handleCombinedButtonClick}>
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
