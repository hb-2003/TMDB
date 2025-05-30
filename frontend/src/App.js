import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
const App = () => {
  const token = localStorage.getItem('token');
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={token ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
