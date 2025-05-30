import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        refreshtoken
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      message
      status
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      message
      status
      token
    }
  }
`;

export const POPULAR_MOVIES_QUERY = gql`
  query PopularMovies {
    popularMovies {
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