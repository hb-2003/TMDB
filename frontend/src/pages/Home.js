import React from 'react';
import { useQuery } from '@apollo/client';
import { POPULAR_MOVIES_QUERY } from '../graphql/query';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

const Home = () => {
  const { loading, error, data } = useQuery(POPULAR_MOVIES_QUERY);
  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;

  return (<>
    <Header />
    <div className="home-container">
      <h2 className="home-title">🎬 Popular Movies</h2>
      <div className="movies-grid">
        {data.popularMovies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <style jsx>{`
        .home-container {
          padding: 20px;
        }
        .home-title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  </>
  );
};

export default Home;
