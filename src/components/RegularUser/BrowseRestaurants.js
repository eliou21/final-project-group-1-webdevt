import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoIosRestaurant } from "react-icons/io";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import '../styles/RegularUser.css';
import logo from '../image/SavorEat2.png';


function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const updateRestaurants = () => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  };


  useEffect(() => {
    updateRestaurants();
    const intervalId = setInterval(updateRestaurants, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleReservation = (restaurantName) => {
    navigate('/user/reservation-form', { state: { restaurantName } });
  };


  return (
    <div className="browse">
      <div className="browse-container">
        <div className="top-section">
          <div className="logo-container">
            <img src={logo} alt="Restaurant Logo" className="logo" />
          </div>
          <p className="quote">"Find the best dining experiences, just a click away!"</p>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search Restaurants"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="search-icon" />
          </div>
        </div>


        <div className="regular-user-container">
          <h1 className="restoInfo">Restaurant Information</h1>
          {filteredRestaurants.length > 0 ? (
            <div className="cards-container">
              {filteredRestaurants.map((restaurant, index) => (
                <div className="card" key={index}>
                  <img
                    src={restaurant.image || 'https://via.placeholder.com/300'}
                    alt={`${restaurant.name} Cover`}
                  />
                  <h2>{restaurant.name}</h2>
                  <p><strong>Location:</strong> {restaurant.location}</p>
                  <p><strong>Description:</strong> {restaurant.description}</p>
                  <p><strong>Capacity:</strong> {restaurant.capacity} guests</p>
                  <button
                    className="reserve-button"
                    onClick={() => handleReservation(restaurant.name)}
                  >
                    Make Reservation
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No restaurants available at the moment. Please check back later.</p>
          )}
        </div>
      </div>
       
      {/* Reserve Now Section */}
      <div className="reserve-now-section">
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            Reserve Now • Reserve Now • Reserve Now • Reserve Now • Reserve Now •
          </div>
          <div className="scrolling-text">
            Reserve Now • Reserve Now • Reserve Now • Reserve Now • Reserve Now •
          </div>
        </div>
      </div>


      {/* Overview Section */}
      <section className="overview">
        <div className="overview-section">
          <h2 className="overview-title">Why Choose SavorEat?</h2>
          <div className="overview-cards-container">
            <div className="overview-card">
              <HiOutlineBuildingStorefront />
              <h3>Discover Top Restaurants</h3>
              <p>
                Explore a curated list of the best dining experiences in your area.
                Find the perfect place to enjoy a meal with family and friends.
              </p>
            </div>
            <div className="overview-card">
              <MdOutlineMenuBook />
              <h3>Convenient Reservations</h3>
              <p>
                Book your table in just a few clicks. Avoid the hassle of long waits and secure your spot at your favorite restaurant.
              </p>
            </div>
            <div className="overview-card">
              <IoIosRestaurant />
              <h3>Personalized Dining</h3>
              <p>
                Customize your experience with special requests. Whether it’s dietary preferences or celebrations, we’ve got you covered.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer Section */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-logo-container">
      <img src={logo} alt="Restaurant Logo" className="footer-logo" />
      <p className="footer-title">SavorEat</p> {/* Title next to logo */}
    </div>


    <div className="footer-socials">
      <ul className="social-icons">
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><IoLogoFacebook className="social-icon" /></a></li>
        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><IoLogoTwitter className="social-icon" /></a></li>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><IoLogoInstagram className="social-icon" /></a></li>
        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><IoLogoLinkedin className="social-icon" /></a></li>
      </ul>
    </div>
  </div>


  <div className="footer-bottom">
    <p>&copy; 2024 SavorEat | All Rights Reserved</p>
  </div>
</footer>


    </div>
  );
}


export default BrowseRestaurants;