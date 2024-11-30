import React, { useState, useEffect } from 'react';
import '../styles/RestoAdmin.css';

function AllReservations() {
  const [reservations, setReservations] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role === 'Restaurant Admin') {
      setRestaurantName(currentUser.restaurantName);
      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const restaurantReservations = allReservations.filter(
        (reservation) => reservation.restaurant === currentUser.restaurantName
      );
      setReservations(restaurantReservations);
    } else {
      alert('Please log in as a Restaurant Admin.');
    }
  }, []);

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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  };

  const filteredReservations = reservations.filter((res) => {
    const searchName = res.reservedUnder.toLowerCase();
    const searchId = res.id.toString().toLowerCase();
    const statusMatches = statusFilter ? res.status.toLowerCase() === statusFilter : true;
    return (
      (searchName.includes(searchQuery) || searchId.includes(searchQuery)) && statusMatches
    );
  });

  const statusOrder = ['pending', 'checked in', 'checked out'];

  const sortedReservations = filteredReservations.sort((a, b) => {
    const compareValueA = a[sortBy];
    const compareValueB = b[sortBy];

    if (sortBy === 'id') {
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    } else if (sortBy === 'name') {
      const normalize = (str) => str?.trim().toLowerCase() || '';
      const valueA = normalize(a.reservedUnder);
      const valueB = normalize(b.reservedUnder);
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortBy === 'date') {
      const valueA = new Date(a.date);
      const valueB = new Date(b.date);
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } else if (sortBy === 'status') {
      const statusA = statusOrder.indexOf(a.status.toLowerCase());
      const statusB = statusOrder.indexOf(b.status.toLowerCase());
      return sortOrder === 'asc' ? statusA - statusB : statusB - statusA;
    }
    return 0;
  });

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">All Reservations for {restaurantName}</h1>
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
                <option value="status">Status</option>
              </select>
              <label>Order:</label>
              <select name="sortOrder" className="reservations-dropdown" onChange={handleSortChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Conditionally render Filter by Status only when "Status" is selected in Sort by */}
              {sortBy === 'status' && (
                <div className="reservations-filter-wrapper">
                  <label>Filter by Status:</label>
                  <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="reservations-dropdown"
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="checked in">Checked In</option>
                    <option value="checked out">Checked Out</option>
                  </select>
                </div>
              )}
          </div>

          <table className="reservations-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Requests</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedReservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.reservedUnder}</td>
                  <td>{res.email}</td>
                  <td>{res.phone}</td>
                  <td>{formatDate(res.date)}</td>
                  <td>{formatTime(res.time)}</td>
                  <td>{res.guests}</td>
                  <td>{res.requests}</td>
                  <td>{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AllReservations;