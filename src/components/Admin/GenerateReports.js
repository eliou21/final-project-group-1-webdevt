import React, { useState, useEffect } from 'react';

function GenerateReports() {
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
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
    <div className="dashboard">
      <h1 className="dashboard-title">Generate Restaurant Reservations</h1>

      {/* Dropdown for restaurant filter */}
      <div className="dropdown-container">
        <label htmlFor="restaurantFilter">Filter by Restaurant:</label>
        <select id="restaurantFilter" className="input-field" onChange={handleRestaurantFilter}>
          <option value="">All Restaurants</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>

        <div className="sorting">
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" className="input-field" onChange={handleSortChange}>
            <option value="restaurant">Restaurant</option>
            <option value="reservedUnder">Reserved Under</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>

          <label htmlFor="sortOrder">Sort Order:</label>
          <select id="sortOrder" className="input-field" onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table to display reservations */}
      <table className="dashboard-table">
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
              <tr key={index} className="dashboard-row">
                <td>{reservation.restaurant}</td>
                <td>{reservation.reservedUnder || 'N/A'}</td>
                <td>{reservation.date ? formatDate(reservation.date) : 'N/A'}</td>
                <td>{reservation.time ? formatTime(reservation.time) : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-image-text">
                No reservations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GenerateReports;
