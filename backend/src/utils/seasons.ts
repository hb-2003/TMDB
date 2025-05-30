export interface SeasonDetail {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  show_id: number;
  episodes: EpisodeDetail[];
}

export interface EpisodeDetail {
  air_date?: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew?: CrewMember[];
  guest_stars?: GuestStar[];
}
export interface GuestStar {
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
export interface CrewMember {
  gender: number;
  id: number;
  adult: boolean;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
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
  roles: Role[];
  total_episode_count: number;
  order: number;
}

export interface Role {
  credit_id: string;
  character: string;
  episode_count: number;
}

type CrewMemberExtended = {
  gender: number;
  id: number;
  adult: boolean;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string; // Changed from string | undefined to string
  credit_id: string;
  department: string;
  job: string;
  jobs: JobData[];
  total_episode_count: number;
};

export interface JobData {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface AggregateCreditsResponse {
  cast: CastMember[];
  crew: CrewMemberExtended[];
  id: number;
}


export interface SeasonExternalIds {
  id: number;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
}
