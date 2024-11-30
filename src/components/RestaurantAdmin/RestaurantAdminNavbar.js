import React from 'react';
import { NavLink } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import '../styles/Navbar.css';

function AdminRestaurantNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        {/* Title */}
        <div className="resto-navbar-title">
          Restaurant Admin
        </div>


        {/* Navbar Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/restaurant-admin/all-reservations" className="nav-link" activeClassName="active">
              All Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurant-admin/check-in" className="nav-link" activeClassName="active">
              Check In
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurant-admin/manage-reservation" className="nav-link" activeClassName="active">
              Manage Reservation
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


export default AdminRestaurantNavbar;