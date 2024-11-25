import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar({ onLogout }) {
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/generate-reports" activeClassName="active">
            Reports
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

export default AdminNavbar;
