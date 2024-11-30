import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Welcome.css';

function RestaurantAdminLogin({ onLogin }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    console.log("Fetched Restaurants from localStorage:", restaurants); 
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
      console.log("Login Successful:", user);

      navigate('restaurant-admin/all-reservations');
      window.location.reload(); 
    } else {
      alert('Invalid restaurant or password');
    }
  };

  const handlePowerClick = (e) => {
    e.preventDefault();
    navigate('/'); 
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleLogin} className="form-form">
        <h3>Restaurant Admin Login</h3>

        {/* Input Box */}
        <div className="input-box">

          {/* Restaurant Selection */}
          <div className="select-resto">
            <label htmlFor="restaurant" className="label-l">Restaurant: </label>
            {availableRestaurants.length > 0 ? (
              <select
                id="restaurant"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                className="input-put"
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
          </div>

          {/* Password Input */}
          <label htmlFor="password" className="label-l">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-put"
          />
        </div>

        {/* Buttons */}
        <button type="submit" className="button-btn login">Login</button>
        <button type="button" className="button-btn back" onClick={handlePowerClick}>
          Go Back
        </button>

        {/* Register Link */}
        <p>
          Don't have an account?{' '}
          <Link to="/register/restaurant-admin" className="link-hov">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default RestaurantAdminLogin;
