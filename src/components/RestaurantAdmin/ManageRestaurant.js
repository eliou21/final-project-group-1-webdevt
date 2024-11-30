import React, { useState, useEffect } from 'react';
import '../styles/RestoAdmin.css';

function ManageRestaurant() {
  const [reservations, setReservations] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id'); 
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role === 'Restaurant Admin') {
      setRestaurantName(currentUser.restaurantName);

      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const filteredReservations = allReservations.filter(
        (res) => res.restaurant === currentUser.restaurantName
      );
      setReservations(filteredReservations);
    } else {
      alert('You are not logged in as a restaurant admin.');
    }
  }, []);

  const handleCancelReservation = (id) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);

    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedAllReservations = allReservations.filter((res) => res.id !== id);
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));

    alert(`Reservation ID ${id} has been canceled.`);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (event.target.name === 'sortBy') {
      const newSortOrder = sortBy === value && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortBy(value);
      setSortOrder(newSortOrder);
    } else if (event.target.name === 'sortOrder') {
      setSortOrder(value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredReservations = reservations.filter((res) => {
    const searchName = res.reservedUnder.toLowerCase();
    const searchId = res.id.toString().toLowerCase();
    return searchName.includes(searchQuery) || searchId.includes(searchQuery);
  });

  const sortedReservations = filteredReservations.sort((a, b) => {
    const compareValueA = a[sortBy];
    const compareValueB = b[sortBy];

    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'name') {
      const normalize = (str) => str?.trim().toLowerCase() || '';
      const valueA = normalize(a.reservedUnder);
      const valueB = normalize(b.reservedUnder);
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    }
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    let hour12 = Number(hour);
    const suffix = hour12 >= 12 ? 'PM' : 'AM';
    if (hour12 > 12) hour12 -= 12;
    if (hour12 === 0) hour12 = 12; 
    return `${hour12}:${minute} ${suffix}`;
  };

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">Reservations for {restaurantName}</h1>
      {reservations.length === 0 ? (
        <p className="no-reservations-text">No reservations found for your restaurant.</p>
      ) : (
        <>
          <div className="reservations-controls">
            <label>Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="reservations-search-input"
              placeholder="Search by Name or Reservation ID"
            />
            <div className="reservations-sort-wrapper">
              <label>Sort by:</label>
              <select name="sortBy" className="reservations-dropdown" onChange={handleSortChange}>
                <option value="id">Reservation ID</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
              </select>
              <label>Order:</label>
              <select name="sortOrder" className="reservations-dropdown" onChange={handleSortChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <table className="reservations-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Reserved Under</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.reservedUnder}</td>
                  <td>{formatDate(res.date)}</td>
                  <td>{formatTime(res.time)}</td>
                  <td>{res.guests}</td>
                  <td>
                    <button
                      onClick={() => handleCancelReservation(res.id)}
                      className="action-button cancel-btn">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ManageRestaurant;
