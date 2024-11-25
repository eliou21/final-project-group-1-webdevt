import React, { useState, useEffect } from 'react';

function AllReservations() {
  const [reservations, setReservations] = useState([]);
  const [sortBy, setSortBy] = useState('id'); // Default sort by 'id'
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role === 'Restaurant Admin') {
      setRestaurantName(currentUser.restaurantName);

      // Fetch all reservations from localStorage
      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];

      // Filter reservations based on the restaurant name
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
    setSearchQuery(event.target.value.toLowerCase()); // Convert search query to lowercase
  };

  const filteredReservations = reservations.filter((res) => {
    const searchName = res.reservedUnder.toLowerCase(); // Normalize name for comparison
    const searchId = res.id.toString().toLowerCase(); // Convert ID to string for comparison
    return (
      searchName.includes(searchQuery) || searchId.includes(searchQuery) // Check if name or ID matches search query
    );
  });

  const sortedReservations = filteredReservations.sort((a, b) => {
    const compareValueA = a[sortBy];
    const compareValueB = b[sortBy];

    if (sortBy === 'id') {
      return sortOrder === 'asc' ? compareValueA - compareValueB : compareValueB - compareValueA;
    } else if (sortBy === 'name') {
      const normalize = (str) => str?.trim().toLowerCase() || ''; // Normalize string for comparison
      const valueA = normalize(a.reservedUnder);
      const valueB = normalize(b.reservedUnder);
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortBy === 'date' || sortBy === 'time') {
      const parseTime = (time) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const valueA = sortBy === 'time' ? parseTime(compareValueA) : new Date(compareValueA);
      const valueB = sortBy === 'time' ? parseTime(compareValueB) : new Date(compareValueB);

      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } else if (sortBy === 'status') {
      const valueA = (compareValueA || '').toString().trim().toLowerCase();
      const valueB = (compareValueB || '').toString().trim().toLowerCase();
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  return (
    <div>
      <h1>All Reservations for {restaurantName}</h1>
      {reservations.length === 0 ? (
        <p>No Reservations Available.</p>
      ) : (
        <>
          <div>
            <label>Sort by: </label>
            <select name="sortBy" onChange={handleSortChange}>
              <option value="id">Reservation ID</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="status">Status</option>
            </select>
            <label> Order: </label>
            <select name="sortOrder" onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div>
            <label>Search (by Name or ID): </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Name or Reservation ID"
            />
          </div>

          <table>
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
                  <td>{res.date}</td>
                  <td>{res.time}</td>
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
