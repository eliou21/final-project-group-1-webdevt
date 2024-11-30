import React from 'react';
import { NavLink } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import '../styles/Navbar.css';


function UserNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        {/* Title */}
        <div className="navbar-title">
          SavorEat
        </div>


        {/* Navbar Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/user/browse" className="nav-link" activeClassName="active">
              Browse Restaurants
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/reservation-form" className="nav-link" activeClassName="active">
              Make Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/manage-reservations" className="nav-link" activeClassName="active">
              Manage Reservations
            </NavLink>
          </li>
        </ul>


        {/* Logout Button */}
        <div className="logout-container">
          <button onClick={onLogout} className="logout-button">
            <PiSignOutBold className="logout-icon" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}


export default UserNavbar;