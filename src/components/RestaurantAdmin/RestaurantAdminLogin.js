import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RestaurantAdminLogin({ onLogin }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setAvailableRestaurants(restaurants);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.removeItem('currentUser');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        user.restaurantName === restaurantName &&
        user.password === password &&
        user.role === 'Restaurant Admin'
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/restaurant-admin/all-reservations');
    } else {
      alert('Invalid restaurant or password');
    }
  };

  const handlePowerClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-box">
        <h2>Restaurant Admin Login</h2>
        <form onSubmit={handleLogin}>
          {availableRestaurants.length > 0 ? (
            <select
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            >
              <option value="">Select Restaurant</option>
              {availableRestaurants.map((restaurant, index) => (
                <option key={index} value={restaurant.name}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No available restaurants</p>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
          <button type="button" className="back-btn" onClick={handlePowerClick}>
            Go Back
          </button>
        </form>

        <p>
          Don't have an account?{' '}
          <Link to="/register/restaurant-admin">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default RestaurantAdminLogin;
