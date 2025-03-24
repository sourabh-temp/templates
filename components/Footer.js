"use client";

import React from 'react';
import '@/styles/Footer.css';
import Image from "next/image";
import logo from "@/public/image/ruby.png"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {

  const handleAbout = () => {
    // router.push('/about');
  };

  const handleContact = () => {
    // router.push('/contact');
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Image src={logo} alt="Logo" className="logo-image" width={50} height={50} />
          </div>
          <nav className="foot-nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#templates" className="nav-link">Templates</a>
            <a onClick={handleContact} className="nav-link">Contact</a>
            <a onClick={handleAbout} className="nav-link">About Us</a>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Products</h4>
          <nav className="foot-nav">
            <a href="#website-templates" className="nav-link">Website Templates</a>
            <a href="#website-builder" className="nav-link">Website Builder</a>
            <a href="#website-design" className="nav-link">Templates Design</a>
            <a href="#mobile-app-builder" className="nav-link">Mobile App Builder</a>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Solutions</h4>
          <nav className="foot-nav">
            <a href="#online-store" className="nav-link">Online Store</a>
            <a href="#ecommerce-website" className="nav-link">eCommerce Website</a>
            <a href="#online-booking" className="nav-link">Online Booking</a>
            <a href="#restaurant-website" className="nav-link">Restaurant Website</a>
            <a href="#blog-website" className="nav-link">Blog Website</a>
            <a href="#portfolio-website" className="nav-link">Portfolio Website</a>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <nav className="foot-nav">
            <a href="#help-center" className="nav-link">Help Center</a>
            <a href="#hire-professional" className="nav-link">Hire a Professional</a>
            <a href="#report-abuse" className="nav-link">Report Abuse</a>
            <a href="#system-status" className="nav-link">System Status</a>
          </nav>
        </div>
      </div>

      <div className="social-links">
        <h4 style={{ color: '#f39c12' }}>Follow Us</h4>
        <a href="#facebook"><FaFacebook size={20} /></a>
        <a href="#twitter"><FaTwitter size={20} /></a>
        <a href="#linkedin"><FaLinkedin size={20} /></a>
        <a href="#instagram"><FaInstagram size={20} /></a>
      </div>

      <div className="subscription-container">
        <h4 style={{ color: '#f39c12' }}>Subscribe to our newsletter</h4>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <input type="email" placeholder="Enter your email" required className="subscription-input" />
          <button className="subscription-button">Subscribe</button>
        </div>
      </div>

      <p className="copyright">© {new Date().getFullYear()} MyWebsite. All rights reserved.Own by Sourabh</p>
    </footer>
  );
};

export default Footer;
