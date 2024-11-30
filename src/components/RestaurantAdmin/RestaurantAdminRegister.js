import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Welcome.css';


function RestaurantAdminRegister() {
 const [restaurantName, setRestaurantName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const navigate = useNavigate();


 const handleRegister = (e) => {
   e.preventDefault();


   if (password !== confirmPassword) {
     alert('Passwords do not match.');
     return;
   }


   const isValidEmail = /\S+@\S+\.\S+/.test(email);
   if (!isValidEmail) {
     alert('Invalid email format!');
     return;
   }


   const users = JSON.parse(localStorage.getItem('users')) || [];
   const existingUser = users.find(user => user.email === email);


   if (existingUser) {
     alert('Email already exists!');
     return;
   }


   const newUser = {
     restaurantName,
     email,
     password,
     role: 'Restaurant Admin'
   };


   users.push(newUser);
   localStorage.setItem('users', JSON.stringify(users));


   navigate('/login/restaurant-admin');
   alert('Registration successful! Please log in.');
 };


 return (
   <div className="background">
     <div className="shape"></div>
     <div className="shape"></div>
     <form onSubmit={handleRegister} className="form-form reg">
       <h3>Restaurant Admin Registration</h3>

      <div className="input-box">
       <label htmlFor="restaurantName" className="label-l" >Restaurant Name</label>
       <input
         type="text"
         placeholder="Enter your restaurant name"
         id="restaurantName"
         value={restaurantName}
         onChange={(e) => setRestaurantName(e.target.value)}
         required
         className="input-put"
       />


       <label htmlFor="email" className="label-l">Email</label>
       <input
         type="email"
         placeholder="Enter your email"
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         className="input-put"
       />


       <label htmlFor="password" className="label-l">Password</label>
       <input
         type="password"
         placeholder="Enter your password"
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
         className="input-put"
       />


       <label htmlFor="confirmPassword" className="label-l">Confirm Password</label>
       <input
         type="password"
         placeholder="Confirm your password"
         id="confirmPassword"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         required
         className="input-put"
       />
       </div>


       <button type="submit" className="button-btn">Register</button>
       <p>
         Already have an account?{' '}
         <Link to="/login/restaurant-admin" className="link-hov">Log in</Link>
       </p>
     </form>
   </div>
 );
}


export default RestaurantAdminRegister;