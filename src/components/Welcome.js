import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/image/SavorEat2.png';

function Welcome() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    if (currentUser.role === 'Admin') navigate('/admin/dashboard');
    else if (currentUser.role === 'Restaurant Admin') navigate('/restaurant-admin/all-reservations');
    else if (currentUser.role === 'Regular User') navigate('/user/browse');
  }


 return (
   <div className="welcome">
   <div className="container">
     <div className="modal">
       <div className="modal-container">
         <div className="modal-left">
           <img src={logo} alt="SavorEat Logo" className="welcome-logo" />
           <h1 className="modal-title">Welcome to SavorEat!</h1>
           <p className="modal-desc">Please choose your role to continue:</p>
           <div className="input-block">
             <button onClick={() => navigate('/login/customer')} className="role-btn customer-btn">
               Customer
             </button>
             <button onClick={() => navigate('/login/restaurant-admin')} className="role-btn restaurant-btn">
               Restaurant Admin
             </button>
             <button onClick={() => navigate('/login/admin')} className="role-btn admin-btn">
               Admin
             </button>
           </div>
         </div>
         <div className="modal-right">


         </div>
       </div>
     </div>
   </div>
   </div>
 );
}


export default Welcome;