import React, { useState, useEffect } from 'react';

function GenerateRestaurant() {
  const [reservations, setReservations] = useState([]);
  const [sortBy, setSortBy] = useState('restaurant');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredRestaurant, setFilteredRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const availableRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(availableRestaurants);
    setReservations(storedReservations);
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleRestaurantFilter = (e) => {
    setFilteredRestaurant(e.target.value);
  };

  const sortedReservations = reservations
    .filter((reservation) =>
      filteredRestaurant ? reservation.restaurant === filteredRestaurant : true
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'restaurant') {
        comparison = a.restaurant.localeCompare(b.restaurant);
      } else if (sortBy === 'reservedUnder') {
        comparison = (a.reservedUnder || '').localeCompare(b.reservedUnder || '');
      } else if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'time') {
        comparison = new Date(a.time) - new Date(b.time);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="admin-container">
      <h1>Generate Restaurant Reservations</h1>
      <div className="dropdown-container">
        <label htmlFor="restaurantFilter">Filter by Restaurant: </label>
        <select id="restaurantFilter" onChange={handleRestaurantFilter}>
          <option value="">All Restaurants</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="sortBy">Sort by: </label>
        <select id="sortBy" onChange={handleSortChange}>
          <option value="restaurant">Restaurant</option>
          <option value="reservedUnder">Reserved Under</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="sortOrder">Sort Order: </label>
        <select id="sortOrder" onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Reserved Under</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.length > 0 ? (
            sortedReservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.restaurant}</td>
                <td>{reservation.reservedUnder || 'N/A'}</td>
                <td>{reservation.date || 'N/A'}</td>
                <td>{reservation.time || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No reservations available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GenerateRestaurant;
