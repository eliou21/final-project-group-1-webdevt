import React, { useState, useEffect } from 'react';

function ReservationForm() {
  const [reservationName, setReservationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [requests, setRequests] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Load restaurants from local storage
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the values to verify they are being correctly filled
    console.log('Form Values:', {
      restaurant,
      date,
      time,
      guests,
      reservationName,
      phone,
      email,
    });

    // Check if all required fields are filled
    if (!restaurant || !date || !time || !guests || !reservationName || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate the reservation date
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      alert('The reservation date cannot be in the past.');
      return;
    }

    // Validate the time: it should be between 08:00 AM and 10:00 PM
    const [hours, minutes] = time.split(':').map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0); // 08:00 AM

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // 10:00 PM

    if (selectedTime < startTime || selectedTime > endTime) {
      alert('Time must be between 08:00 AM and 10:00 PM.');
      return;
    }

    // Validate number of guests (ensure it's a valid number and within the range)
    const guestsNumber = parseInt(guests, 10);
    if (isNaN(guestsNumber) || guestsNumber <= 0 || guestsNumber > 20) {
      alert('Number of guests should be between 1 and 20.');
      return;
    }

    // Validate phone number: ensure it's a 10-digit number
    const phonePattern = /^\d{11}$/;
    if (!phone.match(phonePattern)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate email if provided
    if (email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Create the reservation object
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

    // Save the reservation to local storage
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
    setRestaurant('');
    setPhone('');
    setEmail('');
  };

  const handleRestaurantChange = (e) => {
    const selectedRestaurantName = e.target.value;
    setRestaurant(selectedRestaurantName);
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reservation Name </label>
          <input
            type="text"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label>Restaurant </label>
          <select
            value={restaurant}
            onChange={handleRestaurantChange}
            required
          >
            <option value="">Select Restaurant </option>
            {restaurants.map((restaurant, index) => (
              <option key={index} value={restaurant.name}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Number of guests </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Number of guests"
            required
          />
        </div>

        <div>
          <label>Phone Number </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email (optional)"
          />
        </div>

        <div>
          <label>Additional Requests </label>
          <textarea
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="Any special requests? (optional)"
          />
        </div>

        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default ReservationForm;
