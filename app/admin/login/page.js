"use client";
import React, { useState } from 'react';
import '@/styles/admin/AdLogin.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/auth/login'; // Use environment variable for flexibility
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const name = data.name;

        // Store in localStorage and Cookies
        localStorage.setItem('authToken', token);
        localStorage.setItem('adminName', name);
        Cookies.set('authToken', token, { expires: 7, secure: true });

        // Success message
        setMessage('You have successfully logged in!');
        
        // Navigate to admin page without full page reload
        router.push('/admin');
      } else {
        setMessage(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      setMessage('Error occurred during login.');
      console.error(error); // Log any error for debugging
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
