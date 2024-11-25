import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminRestaurantNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <ul>
      <li>
          <NavLink to="/restaurant-admin/all-reservations" activeClassName="active">
            All Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurant-admin/check-in" activeClassName="active">
            Check In
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurant-admin/manage-reservation" activeClassName="active">
            Manage Reservation
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

export default AdminRestaurantNavbar;
