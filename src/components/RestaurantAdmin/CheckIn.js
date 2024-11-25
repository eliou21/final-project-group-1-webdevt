import React, { useState, useEffect } from 'react';

function CheckIn() {
  const [restaurantName, setRestaurantName] = useState('');
  const [reservations, setReservations] = useState([]);

  // Fetch restaurant data from localStorage and filter reservations based on restaurant
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role === 'Restaurant Admin') {
      setRestaurantName(currentUser.restaurantName);

      // Fetch all reservations from localStorage
      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];

      // Filter reservations based on restaurantName
      const restaurantReservations = allReservations.filter((reservation) => {
        return reservation.restaurant === currentUser.restaurantName;
      });

      // Set status to 'pending' if not already set
      const updatedReservations = restaurantReservations.map((reservation) => ({
        ...reservation,
        status: reservation.status || 'pending', // Ensure status exists
      }));

      setReservations(updatedReservations);
    } else {
      alert('Please log in as a Restaurant Admin.');
    }
  }, []);

  // Handle check-in for a reservation
  const handleCheckIn = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId ? { ...reservation, status: 'Checked In' } : reservation
    );

    setReservations(updatedReservations);
    updateLocalStorage(updatedReservations);  // Sync with localStorage

    alert('Reservation checked in successfully!');
  };

  // Handle check-out for a reservation
  const handleCheckOut = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId ? { ...reservation, status: 'Checked Out' } : reservation
    );

    setReservations(updatedReservations);
    updateLocalStorage(updatedReservations);  // Sync with localStorage

    alert('Reservation checked out successfully!');
  };

  // Sync updated reservations to localStorage
  const updateLocalStorage = (updatedReservations) => {
    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedAllReservations = allReservations.map((reservation) =>
      updatedReservations.find((updatedReservation) => updatedReservation.id === reservation.id) || reservation
    );
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
  };

  // Check the status of the reservations and log it to debug
  useEffect(() => {
    console.log(reservations); // Debugging the reservations state
  }, [reservations]);

  return (
    <div>
      <h1>Check In Customers for {restaurantName}</h1>
      {reservations.length === 0 ? (
        <p>No reservations found for your restaurant.</p>
      ) : (
        <table>
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
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.reservedUnder}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.email}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>
                  {reservation.status === 'Checked In' ? 'Checked In' :
                   reservation.status === 'Checked Out' ? 'Checked Out' : 'Pending'}
                </td>
                <td>
                  {reservation.status === 'pending' && (
                    <button onClick={() => handleCheckIn(reservation.id)}>Check In</button>
                  )}
                  {reservation.status === 'Checked In' && (
                    <button onClick={() => handleCheckOut(reservation.id)}>Check Out</button>
                  )}
                  {reservation.status === 'Checked Out' && (
                    <button disabled>Checked Out</button> // Disable button once checked out
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CheckIn;
