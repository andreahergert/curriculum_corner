import React from 'react';
import Curriculum from '../assets/Curriculum.svg';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-brand p-3">
      <div>
        <Link style={{textDecoration: 'none'}} to="/">
        <center><img className='img-fluid mt-3' src={Curriculum} alt='logo' width='25%'/></center>
        </Link>
      </div>
      
  
      
        {Auth.loggedIn() ? (
          <>
            <span>Welcome back, {Auth.getProfile().data.username}!</span>
            <button className="btn btnBlue m-3" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <div><center>
              <Link className="btn btnBlue m-2" to='/Login'>
                Login
              </Link>
              <Link className="btn btnBlue m-2" to='/Signup'>
                Signup
              </Link>
              </center></div>
          </>
        )}
      
    </header>
  );
};

export default Navbar;