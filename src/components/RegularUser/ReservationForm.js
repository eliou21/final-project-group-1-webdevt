import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import '../styles/ReservationForm.css';
import reservation_img from '../image/reservation.jpg';

function ReservationForm() {
  const location = useLocation(); // Access state passed via navigate
  const preSelectedRestaurant = location.state?.restaurantName || ''; // Retrieve pre-selected restaurant

  const [reservationName, setReservationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [requests, setRequests] = useState('');
  const [restaurant, setRestaurant] = useState(preSelectedRestaurant); // Set pre-selected restaurant
  const [restaurants, setRestaurants] = useState([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation and reservation logic remains unchanged
    if (!restaurant || !date || !time || !guests || !reservationName || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      alert('The reservation date cannot be in the past.');
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0);

    if (selectedTime < startTime || selectedTime > endTime) {
      alert('Time must be between 08:00 AM and 10:00 PM.');
      return;
    }

    const guestsNumber = parseInt(guests, 10);
    if (isNaN(guestsNumber) || guestsNumber <= 0 || guestsNumber > 20) {
      alert('Number of guests should be between 1 and 20.');
      return;
    }

    const phonePattern = /^\d{11}$/;
    if (!phone.match(phonePattern)) {
      alert('Please enter a valid 11-digit phone number.');
      return;
    }

    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const newReservation = {
      id: Date.now(),
      restaurant,
      date,
      time,
      guests,
      requests,
      reservedUnder: reservationName,
      phone,
      email,
    };

    const allReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    allReservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(allReservations));

    alert('Reservation successfully made.');

    // Reset form fields
    setReservationName('');
    setDate('');
    setTime('');
    setGuests('');
    setRequests('');
    setRestaurant(preSelectedRestaurant); // Reset to pre-selected restaurant
    setPhone('');
    setEmail('');
  };

  return (
    <div className="reservation-container">
      <div className="image-section">
        <img
          src={reservation_img}
          alt="Reserved Table"
          className="reservation-image"
        />
      </div>
      <div className="form-section">
        <h2>Make a Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reservation Name</label>
            <input
              type="text"
              value={reservationName}
              onChange={(e) => setReservationName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Restaurant</label>
            <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)} required>
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant, index) => (
                <option key={index} value={restaurant.name}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date-time-container">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Number of Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Number of guests"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (optional)"
            />
          </div>
          <div className="form-group">
            <label>Additional Requests</label>
            <textarea
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              placeholder="Any special requests? (optional)"
            />
          </div>
          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
