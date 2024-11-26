import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to SavorEat</h1>
      <p>Please choose your role to continue:</p>
      <div className="role-buttons">
        <button onClick={() => navigate('/login/customer')}>Customer</button>
        <button onClick={() => navigate('/login/restaurant-admin')}>Restaurant Admin</button>
        <button onClick={() => navigate('/login/admin')}>Admin</button>
      </div>
    </div>
  );
}

export default Welcome;
