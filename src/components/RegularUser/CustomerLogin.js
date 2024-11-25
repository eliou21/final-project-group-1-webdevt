import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Welcome.css';


function CustomerLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password && user.role === 'Customer');

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin('Regular User');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register/customer">Register</Link></p>
      </div>
    </div>
  );
}

export default CustomerLogin;
