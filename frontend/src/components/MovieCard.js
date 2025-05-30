import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ margin: '15px', textAlign: 'center', width: '220px' }}>
        <img 
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
          alt={movie.title} 
          style={{ borderRadius: '10px', width: '100%' }}
        />
        <h4>{movie.title}</h4>
        <p>📅 {new Date(movie.release_date).toLocaleDateString()}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
