import React, { useState, useEffect } from 'react';

function ManageReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [selectedRestaurant, setSelectedRestaurant] = useState('All');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get logged-in user
    if (currentUser) {
      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      // Filter the reservations to only include those for the current user
      const userReservations = allReservations.filter((res) => res.userId === currentUser.id);
      setReservations(userReservations);
      setFilteredReservations(userReservations);
    } else {
      alert('No user is logged in.');
    }

    // Load restaurant data from localStorage for filtering
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  }, []);

  // Filter by restaurant
  const filterByRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    if (restaurant === 'All') {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter((res) => res.restaurant === restaurant);
      setFilteredReservations(filtered);
    }
  };

  // Sorting function
  const sortReservations = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedReservations = [...filteredReservations].sort((a, b) => {
      if (key === 'date') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setFilteredReservations(sortedReservations);
    setSortConfig({ key, direction });
  };

  const handleEditClick = (reservation) => {
    setCurrentReservation({ ...reservation }); // Create a copy to avoid direct mutation
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate the time (8:00 AM to 10:00 PM)
    const [hours, minutes] = currentReservation.time.split(':').map(Number);
    if (hours < 8 || (hours === 22 && minutes > 0) || hours > 22) {
      alert('Time must be between 08:00 AM and 10:00 PM.');
      return;
    }

    // Validate number of guests (1-20)
    const guests = parseInt(currentReservation.guests, 10);
    if (guests < 1 || guests > 20) {
      alert('Number of guests must be between 1 and 20.');
      return;
    }

    // Update reservation locally
    const updatedReservations = reservations.map((res) =>
      res.id === currentReservation.id ? { ...res, ...currentReservation } : res
    );
    setReservations(updatedReservations);

    // Update reservation in localStorage
    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedAllReservations = allReservations.map((res) =>
      res.id === currentReservation.id ? { ...res, ...currentReservation } : res
    );
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));

    setIsEditing(false);
    alert('Reservation updated successfully!');
  };

  const handleCancel = (id) => {
    // Remove reservation locally
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);

    // Remove reservation from localStorage
    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedAllReservations = allReservations.filter((res) => res.id !== id);
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));

    alert(`Reservation ID: ${id} has been canceled.`);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  return (
    <div className="regular-user-container">
      <h1>Manage Reservations</h1>

      {/* Restaurant Filter */}
      <div className="filter-options">
        <label htmlFor="restaurantFilter">Filter by Restaurant:</label>
        <select
          id="restaurantFilter"
          onChange={(e) => filterByRestaurant(e.target.value)}
          value={selectedRestaurant}
        >
          <option value="All">All</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting Options */}
      <div className="sorting-options">
        <label htmlFor="sortDate">Sort by Date:</label>
        <select
          id="sortDate"
          onChange={() => sortReservations('date')}
          value={sortConfig.key === 'date' ? sortConfig.direction : 'asc'}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {filteredReservations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id}>
                <td>{res.restaurant}</td>
                <td>{res.date}</td>
                <td>{formatTime(res.time)}</td>
                <td>{res.guests}</td>
                <td>
                  <button onClick={() => handleEditClick(res)}>Update</button>
                  <button onClick={() => handleCancel(res.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}

      {isEditing && currentReservation && (
        <div className="modal">
          <form onSubmit={handleUpdate}>
            <h2>Edit Reservation</h2>
            <label>
              Time:
              <input
                type="time"
                value={currentReservation.time || ''}
                onChange={(e) =>
                  setCurrentReservation({
                    ...currentReservation,
                    time: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              Number of Guests:
              <input
                type="number"
                value={currentReservation.guests || ''}
                onChange={(e) =>
                  setCurrentReservation({
                    ...currentReservation,
                    guests: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              Additional Requests:
              <textarea
                value={currentReservation.requests || ''}
                onChange={(e) =>
                  setCurrentReservation({
                    ...currentReservation,
                    requests: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageReservations;
