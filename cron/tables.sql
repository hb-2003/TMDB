CREATE TABLE Genres (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Movie (
    id INT PRIMARY KEY,                 -- Unique movie ID
    title VARCHAR(255) NOT NULL,        -- Movie title
    original_title VARCHAR(255),        -- Original title (if different)
    overview TEXT,                      -- Brief description of the movie
    genre_ids VARCHAR(255),             -- Comma-separated list of genre IDs
    vote_average DECIMAL(3,1),          -- Average user rating
    vote_count INT,                     -- Number of votes
    popularity DECIMAL(10,3),           -- Popularity score
    adult BOOLEAN DEFAULT FALSE,        -- Whether the movie is adult content
    original_language CHAR(2),          -- Original language code
    poster_path VARCHAR(255),           -- Path to the poster image
    backdrop_path VARCHAR(255),         -- Path to the backdrop image
    video BOOLEAN DEFAULT FALSE,        -- Whether the movie has a video
    budget INT,                         -- Budget of the movie
    revenue INT,                        -- Revenue of the movie
    runtime INT,                        -- Runtime of the movie in minutes
    status VARCHAR(50),                 -- Status of the movie (e.g., Released)
    tagline VARCHAR(255),               -- Tagline of the movie
    homepage VARCHAR(255)              -- Homepage URL of the movie
    youtube_key VARCHAR(255),           -- Youtube key for the trailer null
    release_date DATE,                  -- Release date null
);





CREATE TABLE UserMovies (
    user_id INT,                        -- ID of the user
    movie_id INT,                       -- ID of the movie
    favorite BOOLEAN DEFAULT FALSE,     -- Whether the movie is a favorite
    rated BOOLEAN DEFAULT FALSE,        -- Whether the movie is rated
    watchlist BOOLEAN DEFAULT FALSE,    -- Whether the movie is in the watchlist
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
);

CREATE TABLE People (
    id INT PRIMARY KEY,                 -- Unique person ID
    name VARCHAR(255) NOT NULL,         -- Person's name
    original_name VARCHAR(255),         -- Original name (if different)
    gender INT,                         -- Gender (1 = female, 2 = male, 0 = not specified)
    known_for_department VARCHAR(100),  -- Department the person is known for
    popularity DECIMAL(10,3),           -- Popularity score
    profile_path VARCHAR(255),          -- Path to the profile image
    adult BOOLEAN DEFAULT FALSE         -- Whether the person is adult content
);

CREATE TABLE Cast (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique cast ID
    movie_id INT,                       -- ID of the movie
    person_id INT,                      -- ID of the person
    character_name VARCHAR(255),        -- Name of the character played
    credit_id VARCHAR(255),             -- Credit ID
    cast_order INT,                     -- Order of appearance in the cast
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (person_id) REFERENCES People(id)
);

CREATE TABLE Reviews (
    id VARCHAR(255) PRIMARY KEY,        -- Unique review ID
    movie_id INT,                       -- ID of the movie
    username VARCHAR(255),              -- Username of the reviewer
    content TEXT,                       -- Content of the review
    created_at TIMESTAMP,               -- Creation timestamp
    updated_at TIMESTAMP,               -- Update timestamp
    url VARCHAR(255),                   -- URL of the review
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
);

CREATE TABLE PersonDetails (
    id INT PRIMARY KEY,                 -- Unique person ID
    name VARCHAR(255) NOT NULL,         -- Person's name
    alias_name VARCHAR(255),            -- Alias name (if different)
    biography TEXT,                     -- Biography of the person
    birthday DATE,                      -- Birthday of the person
    deathday DATE,                      -- Deathday of the person (if applicable)
    place_of_birth VARCHAR(255),        -- Place of birth
    imdb_id VARCHAR(255),               -- IMDb ID
    profile_path VARCHAR(255),          -- Path to the profile image
    popularity DECIMAL(10,3),           -- Popularity score
    homepage VARCHAR(255),              -- Homepage URL of the person
    adult BOOLEAN DEFAULT FALSE         -- Whether the person is adult content
);




CREATE TABLE Jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique job ID
    department VARCHAR(255) NOT NULL,   -- Department name
    job_title VARCHAR(255) NOT NULL     -- Job title
);

CREATE TABLE Crew (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique crew ID
    movie_id INT,                       -- ID of the movie
    person_id INT,                      -- ID of the person
    job_id INT,                         -- ID of the job
    credit_id VARCHAR(255),             -- Credit ID
    department VARCHAR(255),            -- Department of the crew member
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (person_id) REFERENCES People(id),
    FOREIGN KEY (job_id) REFERENCES Jobs(id)
);

import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface CompanyAttributes {
  id: number;
  name: string;
  description: string;
  headquarters: string;
  homepage: string;
  logo_path: string;
  origin_country: string;
}

export interface CompanyCreationAttributes extends CompanyAttributes {}

export default class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare headquarters: string;
  declare homepage: string;
  declare logo_path: string;
  declare origin_country: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const company = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Company => {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      headquarters: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "companies",
    }
  );

  return Company;
};


production_companies
id
movie_id
company_id
name


 "results": [
    {
      "adult": false,
      "backdrop_path": "/f3i6Dsxm367IPNrTSFSJ6F5DulB.jpg",
      "genre_ids": [],
      "id": 282801,
      "origin_country": [
        "CN"
      ],
      "original_language": "zh",
      "original_name": "炫卡斗士之猛兽能量",
      "overview": "",
      "popularity": 0.218,
      "poster_path": "/ahSnXJD1lhM8aSGXmye2ihmFc3e.jpg",
      "first_air_date": "2024-01-01",
      "name": "炫卡斗士之猛兽能量",
      "vote_average": 0,
      "vote_count": 0
    },


    {
      "adult": false,
      "backdrop_path": "/f3i6Dsxm367IPNrTSFSJ6F5DulB.jpg",
      "created_by": [],
      "episode_run_time": [],
      "first_air_date": "2024-01-01",
      "genres": [],
      "homepage": "",
      "id": 282801,
      "in_production": true,
      "languages": [],
      "last_air_date": "2024-06-24",
      "last_episode_to_air": {
        "id": 5933439,
        "name": "Episode 26",
        "overview": "",
        "vote_average": 0,
        "vote_count": 0,
        "air_date": "2024-06-24",
        "episode_number": 26,
        "episode_type": "standard",
        "production_code": "",
        "runtime": null,
        "season_number": 1,
        "show_id": 282801,
        "still_path": null
      },
      "name": "炫卡斗士之猛兽能量",
      "next_episode_to_air": null,
      "networks": [],
      "number_of_episodes": 26,
      "number_of_seasons": 1,
      "origin_country": [
        "CN"
      ],
      "original_language": "zh",
      "original_name": "炫卡斗士之猛兽能量",
      "overview": "",
      "popularity": 0.218,
      "poster_path": "/ahSnXJD1lhM8aSGXmye2ihmFc3e.jpg",
      "production_companies": [],
      "production_countries": [],
      "seasons": [
        {
          "air_date": "2024-01-01",
          "episode_count": 26,
          "id": 439369,
          "name": "Season 1",
          "overview": "",
          "poster_path": "/ahSnXJD1lhM8aSGXmye2ihmFc3e.jpg",
          "season_number": 1,
          "vote_average": 0
        }
      ],
      "spoken_languages": [],
      "status": "Returning Series",
      "tagline": "",
      "type": "Scripted",
      "vote_average": 0,
      "vote_count": 0
    }
    
    


  `


    // tv show season
    id
    name
    air_date
    episode_count
    overview
    poster_path
    season_number
    vote_average
    
//expisode detils 
{
  "air_date": "2024-12-19",
  "crew": [],
  "episode_number": 1,
  "guest_stars": [],
  "name": "1,000 People Fight for $5,000,000",
  "overview": "I gathered 1,000 people to fight for $5,000,000, the LARGEST cash prize in TV history! I don't know why you're still reading this, go watch it right now! No more spoilers.",
  "id": 5220174,
  "production_code": "",
  "runtime": 39,
  "season_number": 1,
  "still_path": "/wXW9DAuzWwRP6cYBA83yoW0SUil.jpg",
  "vote_average": 8.764,
  "vote_count": 55
}

    // tv show episode
    id
    name
    air_date
    episode_number
    overview
    production_code
    season_number
    show_id
    still_path
    vote_average

    // tv show cast
    id
    series_id   
    season_id
    episode_id
    person_id
    character
    credit_id
    order

// tv show crew
    id
    series_id
    season_id
    episode_id
    person_id
    job
    department
    credit_id
    order


    //series images 
    id
    series_id
    file_path
    vote_average
    vote_count
    width   
    height
    aspect_ratio


    //series videos
    id
    country_id
    language_id
    key
    site
    size
    type
    official
    published_at






    

//cast 
export interface CastAttributes {
  id?: string;
  movie_tv_id: number;
  type: string;

  person_id: number;
  character: string;
  order: number;
  credit_id: string;
}

// Certification 
export interface CertificationAttributes {
  id?: number;
  country_id: string;
  certification: string;
  meaning: string;
  order: number;
}

// Company
export interface CompanyAttributes {
  id: number;
  name: string;
  description: string;
  headquarters: string;
  homepage: string;
  logo_path: string;
  origin_country: string;
}

//company images
export interface CompanyImageAttributes {
  id?: number;
  company_id: number;
  file_path: string;
  height: number;
  width: number;
  aspect_ratio: number;
  file_type: string;
  vote_average: number;
  vote_count: number;
}

//country
export interface countryAttributes {
  id?: string;
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

//crew
export interface CrewAttributes {
  id?: string;
  type: string;
  credit_id: string;
  department: string;
  job: string;
  adult: boolean;
  person_id: number;
  movie_tv_id: number;
}

//episode
export interface EpisodeAttributes
{
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

//genre
export interface GenreAttributes {
  id: number;
  name: string;
}

//guest star
export interface GuestStarAttributes {
  id?: string;
  series_id: number;
  season_id: number;
  episode_id: number;
  person_id: number;
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
}

export interface imageAttributes {
  movie_tv_id: number;
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  type: string;
}

// job
export interface jobAttributes {
  id?: number;
  department: string;
  job_title: string;
}

//language
export interface LanguageAttributes {
  id?: string;
  iso_639_1: string;
  english_name: string;
  name: string;
}

//movie

export interface MovieModelAttributes {
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
  release_date: Date | null;
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

//network
export interface NetworkAttributes {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
  homepage: string;
  headquarters: string;
}

//person
export interface PeopleAttributes {
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

//release date
export interface ReleaseDateAttributes {
  movie_id: number;
  iso_3166_1: string;
  release_date: string;
  certification: string;
  type: number; 
}

//season
export interface SeasonsAttributes {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  series_id: number;
  episode_count: number;
  air_date: Date;
}

//series
export interface SeriesAttributes {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: Date;
  last_air_date: Date;
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
  production_companies: number[];
  production_countries: string[];
  spoken_languages: string[];
  genre_ids: number[];
  episode_run_time: number[];
  network: number[];
  created_by: string[];
}

//translations
export interface TranslationAttributes {
  id?: string;
  movie_tv_id: number;
  language_id: string;
  country_id: string;
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

//video
export interface VideoAttributes {
  id: string;
  movie_tv_id: number;
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


CREATE TABLE MovieProviders (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique provider ID
  provider_name VARCHAR(255) NOT NULL, -- Name of the provider
  logo_path VARCHAR(255)               -- Path to the provider's logo
);

CREATE TABLE MovieProviderDisplayPriorities (
  provider_id INT,                     -- ID of the provider
  country_code CHAR(2),                -- ISO 3166-1 alpha-2 country code
  display_priority INT,                -- Display priority in the country
  PRIMARY KEY (provider_id, country_code),
  FOREIGN KEY (provider_id) REFERENCES MovieProviders(id)
);

CREATE TABLE MovieProviderLinks (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique link ID
  movie_id INT,                       -- ID of the movie
  country_code CHAR(2),               -- ISO 3166-1 alpha-2 country code
  link VARCHAR(255),                  -- URL link to the movie
  FOREIGN KEY (movie_id) REFERENCES Movie(id)
);

CREATE TABLE MovieProviderOptions (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique option ID
  movie_id INT,                       -- ID of the movie
  country_code CHAR(2),               -- ISO 3166-1 alpha-2 country code
  provider_id INT,                    -- ID of the provider
  provider_name VARCHAR(255),         -- Name of the provider
  logo_path VARCHAR(255),             -- Path to the provider's logo
  display_priority INT,               -- Display priority in the country
  option_type ENUM('buy', 'rent', 'free'), -- Type of option (buy, rent, free)
  FOREIGN KEY (movie_id) REFERENCES Movie(id),
  FOREIGN KEY (provider_id) REFERENCES MovieProviders(id)
);