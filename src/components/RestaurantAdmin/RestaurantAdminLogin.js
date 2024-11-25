import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RestaurantAdminLogin({ onLogin }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const navigate = useNavigate();

  // Fetch available restaurants from localStorage
  useEffect(() => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setAvailableRestaurants(restaurants);
    console.log("Available Restaurants:", restaurants); // Debugging log
  }, []);  

  // Handle login for Restaurant Admin
  const handleLogin = (e) => {
    e.preventDefault();

    // Remove any customer role data before logging in the admin
    localStorage.removeItem('currentUser'); // Log out any previous user (customer or admin)

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (user) =>
        user.restaurantName === restaurantName &&
        user.password === password &&
        user.role === 'Restaurant Admin'
    );

    if (user) {
      // Store restaurant name correctly in currentUser
      const currentUser = {
        ...user,
        restaurantName: restaurantName, // Add the restaurant name to the currentUser
      };

      // Store admin info in localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
      console.log("Login Successful:", currentUser);

      // Navigate to the check-in page after successful login
      navigate('/restaurant-admin/all-reservations');
      window.location.reload(); // Force reload to ensure the next page is properly initialized
    } else {
      alert('Invalid restaurant or password');
    }
  };  

  return (
    <div>
      <h2>Restaurant Admin Login</h2>
      <form onSubmit={handleLogin}>
        {/* Dropdown for available restaurants */}
        {availableRestaurants.length > 0 ? (
          <select
            value={restaurantName}
            onChange={(e) => {
              setRestaurantName(e.target.value);
              console.log("Selected Restaurant:", e.target.value); // Debugging log
            }}
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

        {/* Password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register/restaurant-admin">Register</Link>
      </p>
    </div>
  );
}

export default RestaurantAdminLogin;
