import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';

function AdminRegister() {
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
      role: 'Admin',
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login/admin');
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-box">
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister} className="register-form">
        
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="form-input"
          />
      
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
        
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="form-input"
          />
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p>
          Already have an account?{' '}
          <Link to="/login/admin">Log in</Link>
        </p>
    </div>
    </div>
  );
}

export default AdminRegister;