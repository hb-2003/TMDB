export interface ICastMovie {
  movie_id: number;
  cast_id: number;
  person_id: number;
  character: string;
  order: number;
  creditsId: string;
}
export interface IGuestStar {
  series_id: number;
  season_id: number;
  episode_id: number;
  person_id: number;
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
}
export interface TranslationDetail {
  id?: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  english_name: string;
  data: {
    name: string;
    overview: string;
    homepage: string;
    tagline: string;
    runtime: number;
    title: string;
  };
}

export interface IEpisode {
  id: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  series_id: number;
}

export interface ICrewMember {
  credit_id: string;
  department: string;
  job: string;
  adult: boolean;
  id: number;
}

export interface ICrewMovie extends ICrewMember {
  movie_id: number;
  person_id?: number;
}

export interface ImageDetails {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImageResponse {
  id: number;
  backdrops?: ImageDetails[];
  posters?: ImageDetails[];
  logos?: ImageDetails[];
}

export interface VideoDetailTV {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: VideoDetailTV[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IImage extends ImageDetails {
  movie_tv_id: number;
  type: string;
}

export interface TranslationResponse {
  id: number;
  translations: TranslationDetail[];
}

export interface CertificationResponse {
  certifications: {
    [key: string]: {
      certification: string;
      meaning: string;
      order: number;
    }[];
  };
}

export interface ITranslation {
  movie_tv_id: number;
  country_id: number;
  language_id: number;
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: Date | null;
  runtime: number;
  vote_average: number;
  vote_count: number;
  revenue: number;
  budget: number;
  tagline: string;
  status: string;
  adult: boolean;
  homepage: string;
  imdb_id: string;
  original_language: string;
  popularity: number;
  video: boolean;
  genres: IGenre[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  production_companies?: { id: number }[];
}
export interface ICrewSeries {
  id?: number;
  series_id: number;
  session_number: number;
  episode_number: number;
  person_id: number;
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
}
export interface ICastSeries {
  id: number;
  series_id: number;
  season_number: number;
  episode_number: number;
  person_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface VideoResult {
  type: string;
  key: string;
}

export interface IMovie {
  id?: number;
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
  release_date: Date;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  youtube_key?: string;
  imdb_id: string;
  production_countries?: string[];
  production_companies?: number[];
  spoken_languages?: string[];
}

export interface IPeople {
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

export interface IVideos extends VideoDetailTV {
  movie_tv_id: number;
}

export interface ISeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  series_id: number;
  episode_count: number;
  air_date: Date;
}

export interface ILanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface SeriesResponse {
  page: number;
  results: { id: number }[];
  total_pages: number;
}

export interface SeriesDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  vote_average: number;
  vote_count: number;
  type: string;
  homepage: string;
  in_production: boolean;
  original_language: string;
  original_name: string;
  popularity: number;
  tagline: string;
  status: string;
  origin_country: string[];
  languages: string[];
  production_companies: { id: number }[];
  production_countries: { iso_3166_1: string }[];
  spoken_languages: { iso_639_1: string }[];
  genres: IGenre[];
  episode_run_time: number[];
  networks: { id: number; name: string }[];
  created_by: { credit_id: string }[];
  seasons: ISeason[];
}
export interface INetwork {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
  homepage: string;
  headquarters: string;
}
export interface crewDetail {
  department: string;

  job: string;

  credit_id: string;

  adult: boolean;

  gender: number;

  id: number;

  known_for_department: string;

  name: string;

  original_name: string;

  popularity: number;

  profile_path: string;
}

export interface SeasonResponse {
  _id: string;
  air_date: string;
  episodes: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: crewDetail[];
    guest_stars: {
      character: string;
      credit_id: string;
      order: number;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
  }[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface episodeResponse {
  episodes: Array<{
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    crew: Array<{
      department: string;
      job: string;
      credit_id: string;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }>;
    guest_stars: Array<{
      character: string;
      credit_id: string;
      order: number;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }>;
  }>;
}

export interface CompanyImageResponse {
  id: number;
  logos: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    file_type: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
}

export interface release_dates {
  certification: string;
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface releaseDateResponse {
  iso_3166_1: string;
  release_dates: release_dates[];
}

export interface IReleaseDate {
  movie_id: number;
  country_id: string;
  release_date: string;
  certification: string;
  language: string | null;
  type: number;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface TVCredits {
  cast: CastMember[];
  crew: CrewMember[];
  id: number;
}

export interface IChanges {
  id: number;
  adult: boolean | null;
}

export interface IResponseData {
  page: number;
  total_pages: number;
  results: IChanges[];
}

export interface CompanyResponse {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: string | null;
}

export interface SeriesChanges {
  id: number;
  adult: boolean;
}

export interface SeriesChangesResponse {
  page: number;
  results: SeriesChanges[];
  total_pages: number;
  total_results: number;
}

export interface IValue {
  person_id?: number;
  department?: string;
  job?: string;
  cast_id?: number;
  credit_id?: string;
  poster?: {
    file_path: string;
    iso_639_1?: string | null;
  };
  name?: string;
  id?: number;
  certification?: string;
  descriptors?: string[];
  iso_3166_1?: string;
  iso_639_1?: string;
  note?: string;
  release_date?: string;
  type?: number;
  character?: string;
  order?: number;
  status?: string;
  adult?: boolean;
}

export type actionType = "created" | "updated" | "deleted" | "added";

export type keys =
  | "general"
  | "overview"
  | "budget"
  | "imdb_id"
  | "original_title"
  | "_type"
  | "spoken_languages"
  | "release_dates"
  | "runtime"
  | "translations"
  | "title"
  | "images"
  | "status"
  | "revenue"
  | "crew"
  | "genres"
  | "production_countries"
  | "cast";

export interface IItem {
  id: string;
  action: actionType;
  time: string;
  iso_639_1: string;
  iso_3166_1: string;
  value: IValue | string;
  original_value?: IValue | string;
}

interface change {
  key: keys;
  items: IItem[];
}

export interface updateMovieService {
  changes: change[];
}

export interface guestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface guestStarResponse {
  guest_stars: guestStar[];
}

export interface NetworkResponse {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
  headquarters: string;
  homepage: string;
}

export interface MovieApiResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface title {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TitlesResponse {
  id: number;
  results: title[];
}

export interface ExternalIdsData {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  freebase_mid?: string;
  freebase_id?: string;
  tvdb_id?: number;
  tvrage_id?: number;
}

export interface MovieExternalIds extends ExternalIdsData {}

export interface TvExternalIds extends ExternalIdsData {
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
}

export interface SeasonExternalIds extends ExternalIdsData {
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
}

export interface EpisodeExternalIds extends ExternalIdsData {
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
}

export interface PersonExternalIds extends ExternalIdsData {
  tiktok_id?: string;
  youtube_id?: string;
}