import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantAdminRegister() {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Email format validation
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      alert('Invalid email format!');
      return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      alert('Email already exists!');
      return;
    }

    // Create a new user object
    const newUser = {
      restaurantName,
      email,
      phone,
      password,  // For real-world use, remember to hash this
      role: 'Restaurant Admin'
    };

    // Add new user to the list and save in localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Navigate to the login page
    navigate('/login/restaurant-admin');
    alert('Registration successful! Please log in.');
  };

  return (
    <div>
      <h2>Restaurant Admin Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Restaurant Name"
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
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
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
    </div>
  );
}

export default RestaurantAdminRegister;