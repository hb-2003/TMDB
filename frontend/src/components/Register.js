import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/mutations';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { input: formData } });
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="form">
        <h1>Register</h1>
        {successMessage ? (
          <p>{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>Register</button>
          </form>

        )}
        {error && <p>Error: {error.message}</p>}
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
