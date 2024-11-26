import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CustomerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      alert('Email already exists!');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: 'Customer',
      id: email,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login/customer');
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-box">
        <h2>Customer Registration</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login/customer">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerRegister;
