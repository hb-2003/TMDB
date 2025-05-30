import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove authentication token
    window.location.href = '/'; // Redirect to home page
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const userGreeting = user ? user.username : null;
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 The Movie DB</Link>

      </div>
      <nav className="nav-links">

        {token ? userGreeting : null}
        <div className="auth-links">
          {token ? null : <Link to="/login">Login</Link>}
          {token ? null : <Link to="/register">Register</Link>}
          {token ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </nav>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: white;
          color: black;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .logo a {
          font-size: 24px;
          font-weight: bold;
          color: #ffcc00;
          text-decoration: none;
          margin-right: 20px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .nav-links a {
          color: black;
          text-decoration: none;
          font-size: 18px;
          transition: color 0.3s;
        }
        .nav-links a:hover {
          color: #ffcc00;
        }
        .auth-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .auth-links a {
          color: black;
          text-decoration: none;
          font-size: 18px;
          transition: color 0.3s;
        }
        .auth-links a:hover {
          color: #ffcc00;
        }
        .logout-button {
          display: flex;
          background: none;
          color: black;
          border: none;
          padding: 8px 15px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
        }
        .logout-button:hover {
          background-color: #ffcc00;
          color: white;
        }
      `}
      </style>
    </header>
  );
};

export default Header;
