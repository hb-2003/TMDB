export interface PersonDetails {
  adult: boolean;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface MediaDetail {
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
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

export interface PersonCredits {
  cast: MediaDetail[];
  crew: MediaDetail[];
  id: number;
}

export interface ExternalIdsData {
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  id: number;
}