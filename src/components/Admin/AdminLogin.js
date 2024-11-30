import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Welcome.css';


function AdminLogin({ onLogin }) {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();


 const handleLogin = (e) => {
   e.preventDefault();


   const users = JSON.parse(localStorage.getItem('users')) || [];
   const user = users.find(
     (user) => user.email === email && user.password === password && user.role === 'Admin'
   );


   if (user) {
     localStorage.setItem('currentUser', JSON.stringify(user));
     onLogin('Admin');
     navigate('/admin/dashboard');
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
       <h3>Admin Login</h3>

      <div className="input-box">
       <label htmlFor="username" className="label-l">Username</label>
       <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email"
         required
         className="input-put"
       />


       <label htmlFor="password" className="label-l">Password</label>
       <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Password"
         required
         className="input-put"
       />
      </div>


       <button type="submit" className="button-btn login">Login</button>
       <button type="button" className="button-btn back" onClick={handlePowerClick}>Go Back</button>
      
       <p>Don't have an account? <Link to="/register/admin" className="link-hov">Register</Link></p>
     </form>
   </div>
 );
}


export default AdminLogin;