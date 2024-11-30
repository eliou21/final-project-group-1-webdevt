import React, { useState, useEffect } from 'react';
import '../styles/RestoAdmin.css';

function CheckIn() {
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
      const restaurantReservations = allReservations.filter(
        (reservation) => reservation.restaurant === currentUser.restaurantName
      );

      const updatedReservations = restaurantReservations.map((reservation) => ({
        ...reservation,
        status: reservation.status || 'pending',
      }));

      setReservations(updatedReservations);
    } else {
      alert('Please log in as a Restaurant Admin.');
    }
  }, []);

  const handleCheckIn = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId ? { ...reservation, status: 'Checked In' } : reservation
    );
    setReservations(updatedReservations);
    updateLocalStorage(updatedReservations);
    alert('Reservation checked in successfully!');
  };

  const handleCheckOut = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId ? { ...reservation, status: 'Checked Out' } : reservation
    );
    setReservations(updatedReservations);
    updateLocalStorage(updatedReservations);
    alert('Reservation checked out successfully!');
  };

  const updateLocalStorage = (updatedReservations) => {
    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedAllReservations = allReservations.map(
      (reservation) =>
        updatedReservations.find((updatedReservation) => updatedReservation.id === reservation.id) || reservation
    );
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}`);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = String(minutes).padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  };

  const filteredReservations = reservations.filter((res) => {
    const searchName = res.reservedUnder.toLowerCase();
    const searchId = res.id.toString().toLowerCase();
    return searchName.includes(searchQuery) || searchId.includes(searchQuery);
  });

  const sortedReservations = filteredReservations.sort((a, b) => {
    const compareValueA = a[sortBy];
    const compareValueB = b[sortBy];

    if (sortBy === 'id') {
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    } else if (sortBy === 'name') {
      const normalize = (str) => str?.trim().toLowerCase() || '';
      const valueA = normalize(a.reservedUnder);
      const valueB = normalize(b.reservedUnder);
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    return 0;
  });

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">Check In Customers for {restaurantName}</h1>
      {reservations.length === 0 ? (
        <p className="no-reservations-text">No Reservations Available.</p>
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
                <option value="time">Time</option>
                <option value="status">Status</option>
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
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.reservedUnder}</td>
                  <td>{res.phone}</td>
                  <td>{res.email}</td>
                  <td>{formatDate(res.date)}</td>
                  <td>{formatTime(res.time)}</td>
                  <td>{res.guests}</td>
                  <td>{res.status}</td>
                  <td>
                    {res.status === 'Pending' && (
                      <button onClick={() => handleCheckIn(res.id)} className="action-button check-in-btn">
                        Check In
                      </button>
                    )}
                    {res.status === 'Checked In' && (
                      <button onClick={() => handleCheckOut(res.id)} className="action-button check-out-btn">
                        Check Out
                      </button>
                    )}
                    {res.status === 'Checked Out' && (
                      <button disabled className="action-button">
                        Checked Out
                      </button>
                    )}
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

export default CheckIn;
