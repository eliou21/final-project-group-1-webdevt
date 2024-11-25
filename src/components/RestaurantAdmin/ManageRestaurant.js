import React, { useState, useEffect } from 'react';

function ManageRestaurant() {
  const [reservations, setReservations] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');

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

  return (
    <div>
      <h1>Reservations for {restaurantName}</h1>
      {reservations.length === 0 ? (
        <p>No reservations found for your restaurant.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Reserved Under</th> {/* New column for reserved name */}
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.reservedUnder}</td> {/* Display reserved name */}
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.guests}</td>
                <td>
                  <button onClick={() => handleCancelReservation(res.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageRestaurant;
