import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password && user.role === 'Admin'
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin('Admin');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  const handlePowerClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="form-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-input"
          />
          <button type="submit" className="submit-btn">Login</button>
          <button type="button" className="back-btn" onClick={handlePowerClick}>Go Back</button>
        </form>
        <p>Don't have an account? <Link to="/register/admin">Register</Link></p>
      </div>
    </div>
  );
}

export default AdminLogin;