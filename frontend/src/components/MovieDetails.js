import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MOVIE_DETAILS_QUERY, MOVIE_RECOMMENDATIONS_QUERY } from "../graphql/query";
import "../css/MovieDetails.css";
import MovieCard from "./MovieCard";
import Header from "./Header";

const MovieDetails = () => {
  const { id } = useParams();
  const movieId = parseInt(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const { loading: detailsLoading, error: detailsError, data: detailsData } = useQuery(MOVIE_DETAILS_QUERY, {
    variables: { movieDetailsId: movieId },
    onCompleted: (data) => {
      setIsFavorite(data.movieDetails.favorite);
      setIsInWatchlist(data.movieDetails.watchlist);
    }
  });

  const { loading: recommendationsLoading, error: recommendationsError, data: recommendationsData } = useQuery(MOVIE_RECOMMENDATIONS_QUERY, {
    skip: !movieId,
    variables: { movieRecommendationsId: movieId },
  });

  if (detailsLoading || recommendationsLoading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (detailsError) return <p>Error loading movie details: {detailsError.message}</p>;
  if (recommendationsError) return <p>Error loading recommendations: {recommendationsError.message}</p>;

  const movie = detailsData.movieDetails;
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  const trailerUrl = `https://www.youtube.com/watch?v=${movie.youtube_key}`;

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Add logic to update favorite status in the backend
  };

  const handleWatchlistClick = () => {
    setIsInWatchlist(!isInWatchlist);
    // Add logic to update watchlist status in the backend
  };

  return (
    <>
      <Header />
      <div className="movie-container">
        <div className="backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-content">
          <img className="movie-poster" src={posterUrl} alt={movie.title} />
          <div className="movie-info">
            <h2 className="tagline">"{movie.tagline}"</h2>
            <p className="overview">{movie.overview}</p>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toDateString()}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
            <p><strong>Production:</strong> {movie.production_companies.map((p) => p.name).join(", ")}</p>
            <p><strong>Language:</strong> {movie.spoken_languages.map((l) => l.english_name).join(", ")}</p>
            <div className="buttons">
              <a className="trailer-btn" href={trailerUrl} target="_blank" rel="noopener noreferrer">
                🎥 Watch Trailer
              </a>
              <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
                ❤️ {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button className={`watchlist-btn ${isInWatchlist ? 'active' : ''}`} onClick={handleWatchlistClick}>
                📺 {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {recommendationsData?.movieRecommendations?.results?.length > 0 && (
        <div className="recommended-movies">
          <h2>Recommended Movies</h2>
          <div className="movies-grid">
            {recommendationsData.movieRecommendations.results.map((recommendedMovie) => (
              <MovieCard key={recommendedMovie.id} movie={recommendedMovie} />
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .recommended-movies {
          padding: 20px;
        }
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .movie-container {
          position: relative;
        }
        .backdrop {
          height: 300px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          color: white;
        }
        .movie-poster {
          width: 200px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .movie-content {
          display: flex;
          padding: 20px;
          gap: 20px;
        }

        .movie-info {
          flex: 1;
        }

        .tagline {
          font-size: 1.5em;
          font-style: italic;
        }

        .overview {
          margin: 20px 0;
        } 

        .buttons {
          margin-top: 20px;
        }

        .trailer-btn {
          background-color: #ff0000;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        .favorite-btn {
          background-color: #ffcc00;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }

        .favorite-btn.active {
          background-color: #ff9900;
        }

        .watchlist-btn {
          background-color: #00cc00;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }

        .watchlist-btn.active {
          background-color: #009900;
        }

        .spinner-border {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 768px) {
          .movie-content {
            flex-direction: column;
          }
          .movie-poster {
            width: 100%;
          }
        }
          
          `}
      </style>
    </>
  );
};

export default MovieDetails;
