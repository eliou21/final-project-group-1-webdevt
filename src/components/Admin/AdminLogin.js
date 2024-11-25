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

      // Notify parent App component about login
      onLogin('Admin'); // Notify parent (you can customize this role if needed)

      // Redirect to the add restaurant page for admin
      navigate('/admin/dashboard');
    } else {
      // Show error as an alert
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register/admin">Register</Link></p>
    </div>
  );
}

export default AdminLogin;
