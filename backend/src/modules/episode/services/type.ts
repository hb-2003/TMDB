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
  profile_path: string;
}

export interface GuestStarDetails {
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
export interface CastDetails {
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

export interface EpisodeDetails {
  air_date: string;
  crew: CrewMember[];
  episode_number: number;
  guest_stars: GuestStarDetails[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ExternalIDDetails {
  id: number;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
}

export interface VideoDetails {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  published_at: string;
  id: string;
}

export interface GetVideosResponse {
  id: number;
  results: VideoDetails[];
}

export interface TranslationDetails {
  language: string;
  country_code: string;
  title: string;
  tagline: string;
  overview: string;
  runtime: number;
  homepage: string;
}

export interface GetSeasonTranslationsResponse {
  id: number;
  translations: TranslationDetails[];
}