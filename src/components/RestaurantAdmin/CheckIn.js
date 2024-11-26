import React, { useState, useEffect } from 'react';

function CheckIn() {
  const [restaurantName, setRestaurantName] = useState('');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role === 'Restaurant Admin') {
      setRestaurantName(currentUser.restaurantName);

      const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];

      const restaurantReservations = allReservations.filter((reservation) => {
        return reservation.restaurant === currentUser.restaurantName;
      });

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
    const updatedAllReservations = allReservations.map((reservation) =>
      updatedReservations.find((updatedReservation) => updatedReservation.id === reservation.id) || reservation
    );
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
  };

  useEffect(() => {
    console.log(reservations);
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
                    <button disabled>Checked Out</button>
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