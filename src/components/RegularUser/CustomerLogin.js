import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';


function CustomerLogin({ onLogin }) {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate(); 

 const handleLogin = (e) => {
   e.preventDefault();
   const users = JSON.parse(localStorage.getItem('users')) || [];
   const user = users.find(
     (user) =>
       user.email === email &&
       user.password === password &&
       user.role === 'Customer'
   );

   if (user) {
     localStorage.setItem('currentUser', JSON.stringify(user));
     onLogin('Regular User');
   } else {
     alert('Invalid email or password');
   }
 };

 const handlePowerClick = (e) => {
   e.preventDefault();
   navigate('/'); 
 };
 
 return (
   <div className="background">
     <form onSubmit={handleLogin} className="form-form">
       <h3>Customer Login </h3>

        <div className="input-box">
       <label htmlFor="username" className="label-l">Email</label>
       <input
         type="text"
         placeholder="Email or Phone"
         id="username"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         className="input-put"
       />


       <label htmlFor="password" className="label-l">Password</label>
       <input
         type="password"
         placeholder="Password"
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
         className="input-put"
       />
       </div>


       <button type="submit" className="button-btn login">Log In</button>
       <button type="button" className="button-btn back" onClick={handlePowerClick}>
         Go Back
       </button>
       <p>
         Don't have an account? <Link to="/register/customer" className="link-hov">Register</Link>
       </p>
     </form>
   </div>
 );
}


export default CustomerLogin;