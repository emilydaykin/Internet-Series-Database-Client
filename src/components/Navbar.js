import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser, isAdmin } from '../lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [adminState, setAdminState] = useState(isAdmin());
  const [isLoggedInUser, setIsLoggedInUser] = useState(getLoggedInUser());
  const navigate = useNavigate();
  let location = useLocation(); // detects if routes have changed in the site

  // function checkUserLoggedIn() {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) return false;
  // }

  useEffect(() => {
    console.log('-------- useEffect being run!!!');
    setAdminState(isAdmin());
    setIsLoggedInUser(getLoggedInUser());
  }, [location, sessionStorage]);

  console.log('location', location);

  function logoutUser() {
    sessionStorage.removeItem('token');
    setAdminState(false);
    setIsLoggedInUser(false);
    navigate('/login');
  }

  // console.log('getLoggedInUser:', getLoggedInUser);

  return (
    <header>
      <nav className='navbar'>
        <div className='navbar__left'>
          <Link className='navbar__item' to={'/'}>
            🎬 Home 🎥
          </Link>
          {/* isAdmin() */}
          {isLoggedInUser && (
            <Link className='navbar__item' to={'/addSeries'}>
              📺 Add Series 📀
            </Link>
          )}
        </div>

        <div className='navbar__right'>
          {isLoggedInUser === false ? (
            <>
              <Link className='navbar__item' to={'/login'}>
                🍿 Log in 🎫
              </Link>
              <Link className='navbar__item' to={'/register'}>
                🎭 Register 🎞
              </Link>
            </>
          ) : (
            <>
              <Link className='navbar__item' to={'/userprofile'}>
                👑 My profile 😎
              </Link>
              <div className='navbar__item navbar__item--logout' onClick={logoutUser}>
                ⛔️ Logout ↗️
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
