import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import GenerateReports from './components/Admin/GenerateReports';
import CheckIn from './components/RestaurantAdmin/CheckIn';
import ManageRestaurant from './components/RestaurantAdmin/ManageRestaurant';
import BrowseRestaurants from './components/RegularUser/BrowseRestaurants';
import ReservationForm from './components/RegularUser/ReservationForm';
import ManageReservations from './components/RegularUser/ManageReservations';
import UserNavbar from './components/RegularUser/UserNavbar';
import AdminNavbar from './components/Admin/AdminNavbar';
import AdminRestaurantNavbar from './components/RestaurantAdmin/RestaurantAdminNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import RestaurantAdminLogin from './components/RestaurantAdmin/RestaurantAdminLogin';
import RestaurantAdminRegister from './components/RestaurantAdmin/RestaurantAdminRegister';
import CustomerLogin from './components/RegularUser/CustomerLogin';
import CustomerRegister from './components/RegularUser/CustomerRegister';
import RestaurantDashboard from './components/Admin/RestaurantDashboard';
import AllReservations from './components/RestaurantAdmin/AllReservations';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Fetched currentUser from localStorage:", currentUser); // Debugging log
    if (currentUser && currentUser.role) {
      setIsLoggedIn(true);
      setUserRole(currentUser.role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('currentUser', JSON.stringify({ role }));
    if (role === 'Admin') navigate('/admin/dashboard');
    else if (role === 'Restaurant Admin') navigate('/restaurant-admin/check-in');
    else navigate('/user/browse');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="App">
      {/* Conditional Navbar */}
      {isLoggedIn && userRole === 'Regular User' && <UserNavbar onLogout={handleLogout} />}
      {isLoggedIn && userRole === 'Admin' && <AdminNavbar onLogout={handleLogout} />}
      {isLoggedIn && userRole === 'Restaurant Admin' && <AdminRestaurantNavbar onLogout={handleLogout} />}

      <Routes>
        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Login and Registration for each role */}
        <Route path="/login/customer" element={<CustomerLogin onLogin={handleLogin} />} />
        <Route path="/register/customer" element={<CustomerRegister />} />
        <Route path="/login/admin" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/login/restaurant-admin" element={<RestaurantAdminLogin onLogin={handleLogin} />} />
        <Route path="/register/restaurant-admin" element={<RestaurantAdminRegister />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/generate-reports"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
              <GenerateReports />
            </ProtectedRoute>
          }
        />

        {/* Restaurant Admin Routes */}
        <Route
          path="/restaurant-admin/all-reservations"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Restaurant Admin']}>
              <AllReservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-admin/check-in"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Restaurant Admin']}>
              <CheckIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-admin/manage-reservation"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Restaurant Admin']}>
              <ManageRestaurant />
            </ProtectedRoute>
          }
        />

        {/* Regular User Routes */}
        <Route
          path="/user/browse"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Regular User']}>
              <BrowseRestaurants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/reservation-form"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Regular User']}>
              <ReservationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/manage-reservations"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Regular User']}>
              <ManageReservations />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
