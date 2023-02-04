import React from 'react';
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
          <h1 className='ccTitle'>Curriculum Corner</h1>
        </Link>
      </div>
      
  
      
        {Auth.loggedIn() ? (
          <>
            <span>Welcome back, {Auth.getProfile().data.username}!</span>
            <button className="btn btnBlue m-3" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <div className='flex-row-reverse'>
              <Link className="btn btnBlue m-2" to='/Login'>
                Login
              </Link>
              <Link className="btn btnBlue m-2" to='/Signup'>
                Signup
              </Link>
            </div>
          </>
        )}
      
    </header>
  );
};

export default Navbar;