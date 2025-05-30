import { gql } from '@apollo/client';

export const POPULAR_MOVIES_QUERY = gql`
  query PopularMovies($page: Int) {
    popularMovies(page: $page) {
      page
      total_results
      total_pages
      results {
        id
        title
        original_title
        overview
        genre_ids
        vote_average
        vote_count
        popularity
        adult
        original_language
        poster_path
        backdrop_path
        video
        release_date
        imdb_id
        budget
        revenue
        runtime
        status
        tagline
        homepage
        youtube_key
      }
      dates {
        maximum
        minimum
      }
    }
  }
`;

export const MOVIE_UPCOMING_QUERY = gql`
  query MovieUpcoming($page: Int) {
    MovieUpcoming(page: $page) {
      dates {
        maximum
        minimum
      }
      page
      total_results
      total_pages
      results {
        id
        title
        original_title
        overview
        genre_ids
        vote_average
        vote_count
        popularity
        adult
        original_language
        poster_path
        backdrop_path
        video
        release_date
        imdb_id
        budget
        revenue
        runtime
        status
        tagline
        homepage
        youtube_key
      }
    }
  }
`;

export const NOW_PLAYING_MOVIES_QUERY = gql`
  query NowPlayingMovies($filter: NowPlayingFilter!) {
    nowPlayingMovie(filter: $filter) {
      dates {
        maximum
        minimum
      }
      page
      total_results
      total_pages
      results {
        id
        title
        original_title
        overview
        genre_ids
        vote_average
        vote_count
        popularity
        adult
        original_language
        poster_path
        backdrop_path
        video
        release_date
        imdb_id
        budget
        revenue
        runtime
        status
        tagline
        homepage
        youtube_key
      }
    }
  }
`;


export const MOVIE_DETAILS_QUERY = gql`
  query MovieDetails($movieDetailsId: Int!) {
  movieDetails(id: $movieDetailsId) {
    title
    original_title
    id
    spoken_languages {
      name
    }
    overview
    vote_average
    vote_count
    popularity
    adult
    original_language
    poster_path
    backdrop_path
    video
    release_date
    imdb_id
    budget
    revenue
    runtime
    status
    tagline
    homepage
    youtube_key
    genres {
      id
      name
    }
    production_companies {
      id
      logo_path
      name
      origin_country
    }
    production_countries {
      iso_3166_1
      name
    }
    favorite
    watchlist
    rating
  }
}
`;



export const MOVIE_RECOMMENDATIONS_QUERY = gql`
  query MovieRecommendations($movieRecommendationsId: Int!) {
    movieRecommendations(id: $movieRecommendationsId) {
      page
      total_results
      total_pages
      results {
        id
        title
        original_title
        overview
        genre_ids
        vote_average
        vote_count
        popularity
        adult
        original_language
        poster_path
        backdrop_path
        video
        release_date
        imdb_id
        budget
        revenue
        runtime
        status
        tagline
        homepage
        youtube_key
      }
    }
  }
`;