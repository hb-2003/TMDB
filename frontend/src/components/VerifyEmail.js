import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from '../graphql/mutations';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyEmail({ variables: { token } });
      if (data.verifyEmail.success) {
        alert(data.verifyEmail.message);
        window.location.href = '/login';
      } else {
        alert(data.verifyEmail.message);
      }
    } catch (err) {
      if (err.message.includes('Email already verified')) {
        alert('Email already verified. Redirecting to home page.');
        window.location.href = '/';
      } else {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      handleSubmit({ preventDefault: () => {} });
    }
  }, []);

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Verify Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Verification Token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>Verify</button>
            </form>
            {error && <p className="text-danger mt-3">Error: {error.message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
