"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import '@/styles/login.css';  // Importing the external CSS file

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('userToken', data.token, { expires: 7, secure: true });
        setSuccess('Login successful!');
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert error">
              {error}
            </div>
          )}
          {success && (
            <div className="alert success">
              {success}
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p className="signup-link">
          Create new account?
          <button onClick={() => router.push('/signup')} className="signup-btn">Signup here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
