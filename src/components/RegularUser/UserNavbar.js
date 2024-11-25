import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserNavbar.css'; // Add styling if needed

function UserNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <NavLink to="/user/browse" activeClassName="active">
            Browse Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/reservation-form" activeClassName="active">
            Make Reservation
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/manage-reservations" activeClassName="active">
            Manage Reservations
          </NavLink>
        </li>
        <li>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavbar;
