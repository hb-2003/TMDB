import { IUser } from "../schema/models/user";
import messages from "../config/messages.json";

export type MessageType = keyof typeof messages;
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type ReleaseType = {
  [key: number]: string;
};

export const releaseTypes: ReleaseType = {
  1: "Premiere",
  2: "Theatrical (limited)",
  3: "Theatrical",
  4: "Digital",
  5: "Physical",
  6: "TV",
};
export interface Response {
  message: string;
  status: boolean;
}

export interface VerificationUrlInput {
  newUser: IUser;
}

export interface EmailVerificationResponse {
  message: string;
  status: boolean;
  token?: string;
}

export interface ResetPasswordInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordVerifyResponse {
  message: string;
  status: boolean;
  username: string;
}

export interface ResetPasswordUpdateInput {
  token: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface payload {
  email: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: IUser;
}
export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  release_date?: string;
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  youtube_key?: string;
}
export interface MovieDetails {
  title: string;
  original_title: string;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  release_date?: string;
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  youtube_key?: string;
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieList {
  dates: DateRange;
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}

export interface GetMovieDetailsResponse {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  release_date?: string;
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  youtube_key?: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  favorite: boolean;
  watchlist: boolean;
  rating: number; // rating is a number
}

export interface CastDetails {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id?: string;
  character?: string;
  credit_id: string;
  order?: number;
}

export interface CrewDetails {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface GetMovieCreditsResponse {
  id: number;
  cast: CastDetails[];
  crew: CrewDetails[];
}
export interface GetTvShowCreditsResponse {
  id: number;
  cast: CastDetails[];
  crew: CrewDetails[];
}

export interface personDetails {
  id: number;
  name: string;
  original_name: string;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  biography: string;
  birthday: Date;
  deathday: Date | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
  profile_path: string;
}

export interface GetMovieExternalIdsResponse {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface ImageDetails {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface GetImagesResponse {
  id: number;
  backdrops: ImageDetails[];
  logos: ImageDetails[];
  posters: ImageDetails[];
}

export interface VideoDetails {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface GetVideosResponse {
  id: number;
  results: VideoDetails[];
}

export interface ReleaseDateDetails {
  certification: string;
  descriptors: string[];
  language: string;
  note: string;
  release_date: string;
  type: string;
}

export interface ReleaseDates {
  name: string;
  release_dates: ReleaseDateDetails[];
}

export interface GetReleaseDatesResponse {
  id: number;
  results: ReleaseDates[];
}

export interface Rated {
  value: number;
}

interface RatedOrBooleanResponse {
  value: number | boolean;
}

export interface GetMovieAccountStatesResponse {
  id: number;
  rated: RatedOrBooleanResponse;
  favorite: boolean;
  watchlist: boolean;
}

export interface GetEpisodeAccountStatesResponse {
  id: number;
  rated: RatedOrBooleanResponse;
  favorite: boolean;
  watchlist: boolean;
}
export interface GetTvShowAccountStatesResponse {
  id: number;
  rated: RatedOrBooleanResponse;
  favorite: boolean;
  watchlist: boolean;
}

export interface GetMovieRecommendationsResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}

export interface TranslationDetails {
  language: string;
  country_code: string;
  title: string;
  tagline: string;
  overview: string;
  runtime?: number;
  homepage?: string;
}

export interface GetMovieTranslationsResponse {
  id: number;
  translations: TranslationDetails[];
}

export interface GetSeasonTranslationsResponse {
  id: number;
  translations: TranslationDetails[];
}
export interface DateRange {
  maximum: string;
  minimum: string;
}

export interface GetMovieUpcomingResponse {
  dates: DateRange;
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}

export enum SortBy {
  POPULARITY_DESC = "POPULARITY_DESC",
  POPULARITY_ASC = "POPULARITY_ASC",
  VOTE_AVERAGE_DESC = "VOTE_AVERAGE_DESC",
  VOTE_AVERAGE_ASC = "VOTE_AVERAGE_ASC",
  RELEASE_DATE_DESC = "RELEASE_DATE_DESC",
  RELEASE_DATE_ASC = "RELEASE_DATE_ASC",
  TITLE_ASC = "TITLE_ASC",
  TITLE_DESC = "TITLE_DESC",
}

export interface Filter {
  from: string;
  to: string;
  limit: number;
  country?: string;
  release_type?: number;
  sortBy: SortBy;
  genres?: number[];
  language: string;
  minimum_vote_count: number;
  runtime: number;
  page: number;
}

export interface NowPlayingFilter {
  release_date_gte: string;
  release_date_lte: string;
  page: number;
}

export interface ReviewDetails {
  rating: number;
  username: string;
  reviewText: string;
  reviewDate: string;
}

export interface ReviewResult {
  movie_id: number;
  review: ReviewDetails[];
}

export interface ReviewResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: ReviewResult;
}
export interface ReviewMovieInput {
  movie_id: number;
  username: string;
  content: string;
  rating: number;
}

export interface WatchListDetails {
  media_type: string;
  media_id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
}

export interface WatchListResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: WatchListDetails[];
}

export interface ReviewInput {
  media_id: number;
  media_type: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
}

export interface MovieDetailsOptions {
  videos: boolean;
  credits: boolean;
  externalIds: boolean;
  releaseDates: boolean;
  alternativeTitles: boolean;
  translations: boolean;
  backdrops: boolean;
  logos: boolean;
  posters: boolean;
  reviews: boolean;
}


export interface EpisodeDetails {
  id: number;
  name: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  air_date?: string;
  episode_number?: number;
  episode_type?: string;
  production_code?: string;
  runtime?: number;
  season_number?: number;
  show_id?: number;
  still_path?: string;
}

export interface NetworkDetails {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date?: string;
  episode_count?: number;
  id: number;
  name: string;
  overview?: string;
  poster_path?: string;
  season_number?: number;
}

export interface SeriesDetails {
  adult?: boolean;
  backdrop_path?: string;
  created_by?: string[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres?: Genre[];
  homepage?: string;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: EpisodeDetails;
  name: string;
  next_episode_to_air?: EpisodeDetails;
  networks?: NetworkDetails[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: Season[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
}


export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type?: string;
}

export interface GetAlternativeTitlesResponse {
  id: number;
  titles: AlternativeTitle[];
}


export interface SeriesExternalIdsResponse {
  id: number;
  imdb_id?: string;
  freebase_mid?: string;
  freebase_id?: string;
  tvdb_id?: number;
  tvrage_id?: number;
  wikidata_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

export interface SeriesData {
  id: number;
  name: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface GetSeriesListResponse {
  page: number;
  results: SeriesData[];
  total_pages: number;
  total_results: number;
}

export interface GetSeriesRecommendationsResponse {
  page: number;
  results: SeriesData[];
  total_pages: number;
  total_results: number;
}

export interface SeriesDetailsOptions {
  alternativeTitles: boolean;
  seasons: boolean;
  translations: boolean;
  backdrops: boolean;
  logos: boolean;
  posters: boolean;
  videos: boolean;
  credits: boolean;
  externalIds: boolean;
  reviews: boolean;
}

export interface CrewMember {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export interface CastMemberData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  total_episode_count: number;
  order: number;
}

export interface SeasonCreditsResponse {
  cast: CastMemberData[];
  crew: CrewMember[];
  id: number;
}