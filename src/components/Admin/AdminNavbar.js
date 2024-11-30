import React from 'react';
import { NavLink } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import '../styles/Navbar.css';


function AdminNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        {/* Title */}
        <div className="admin-navbar-title">
          Admin Dashboard
        </div>


        {/* Navbar Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/admin/dashboard" className="nav-link" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/generate-reports" className="nav-link" activeClassName="active">
              Reports
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


export default AdminNavbar;