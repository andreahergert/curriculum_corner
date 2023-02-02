import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to="/">
          <h1>Curriculum Corner</h1>
        </Link>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
        <span>Welcome back, {Auth.getProfile().data.username}!</span>
        <button onClick={logout}>Logout</button>
        </>
        ) : (
          <>
        <Link>
        Login
        </Link>
        <Link>
        Signup
        </Link>
        </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
