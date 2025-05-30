import { movieAccountStates } from "../../episode/resolvers/queries/episode-account-states";
import { movieCredits } from "./queries/credits";
import { movieDetails } from "./queries/details";
import { movieExternalIds } from "./queries/external-Ids";
import { filterMovies } from "./queries/filter";
import { movieImages } from "./queries/images";
import { movieRecommendations } from "./queries/recommendations";
import { movieReleaseDates } from "./queries/releaseDate";
import { movieTranslations } from "./queries/translations";
import { MovieUpcoming } from "./queries/upcoming";
import { nowPlayingMovies } from "./queries/now-playing";
import { popularMovies } from "./queries/popular";
import { userRated } from "./mutations/user-rated";
import { userFavorite } from "./mutations/user-favorite";
import { userWatchlist } from "./mutations/user-watchlist";
import { topRatedMovies } from "./queries/top-rated";
import { getReview } from "./queries/review";
import { addReview } from "./mutations/add-review";
import { watchlist } from "./queries/watchlist";
import { getAlternativeTitles } from "./queries/get-alternative-titles";
import { movieVideos } from "./queries/video";
import { getMovieDetailsOptions } from "./queries/Movie-details-options";
import { deleteReview } from "./mutations/delete-review";
const resolvers = {
  Query: {
    movieCredits,
    movieDetails,
    movieExternalIds,
    movieImages,
    movieReleaseDates,
    movieAccountStates,
    movieRecommendations,
    movieTranslations,
    MovieUpcoming,
    filterMovies,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    getReview,
    watchlist,
    getAlternativeTitles,
    movieVideos,
    getMovieDetailsOptions
  },
  Mutation: {
    userRated,
    userFavorite,
    userWatchlist,
    addReview,
    deleteReview
  },
};

export default resolvers;
