"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '@/styles/signup.css';  // Importing the external CSS file

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleButtonClick = () => {
    router.push('/login');
  };

  const handleButtonAdminClick = () => {
    router.push('/admin/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful! Please log in.');
        setTimeout(() => {
          router.push('/login');
        }, 3000); // Redirect to login after 3 seconds
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 8000); // Dismiss error after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        {error && (
          <div className="alert error">
            <strong className="alert-title">Error!</strong>
            <span>{error}</span>
            <button className="alert-close" onClick={handleCloseError}>X</button>
          </div>
        )}
        {success && <div className="alert success">{success}</div>}

        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="Name" value={formData.firstName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <label className="sign-checkbox-label">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
            I agree to the terms and conditions
          </label>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>

        <div className="auth-links">
          <p className="auth-text">
            Already have an account?
            <button className="login-link" onClick={handleButtonClick}>Login here</button>
          </p>
          <p>
            Are you an admin?
            <button className="admin-login-btn" onClick={handleButtonAdminClick}>Admin Login</button>
          </p>
        </div>

        <div className="social-icons">
          <a href="#FaFacebook" className="social-icon facebook"><FaFacebook /></a>
          <a href="#FaGoogle" className="social-icon google"><FaGoogle /></a>
          <a href="#FaTwitter" className="social-icon twitter"><FaTwitter /></a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
