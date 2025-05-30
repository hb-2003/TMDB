import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import '../css/Login.css';

const movies = [
  "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/original/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
];

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % movies.length);
    }, 5000); // Change background every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { input: credentials } });
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
      alert('Login successful');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${movies[currentMovie]})`,
      }}
    >
      <div className="login-overlay"></div>
      <div className="login-form">
        <h1>Welcome Back</h1>
        <p>Login to continue exploring the world of movies.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>Login</button>
        </form>
        {error && <p>Error: {error.message}</p>}
        <div className="signup-link">
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
