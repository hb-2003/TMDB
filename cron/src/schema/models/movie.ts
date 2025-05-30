import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";

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

export interface MovieModelCreationAttributes
  extends Partial<MovieModelAttributes> {
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
  release_date?: Date | null;
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  youtube_key?: string;
  production_countries?: string[];
  production_companies?: number[];
  spoken_languages?: string[];
}

export default class Movie
  extends Model<MovieModelAttributes, MovieModelCreationAttributes>
  implements MovieModelAttributes
{
  declare id: CreationOptional<number>;
  declare title: string;
  declare original_title: string;
  declare overview: string;
  declare genre_ids: number[];
  declare vote_average: number;
  declare vote_count: number;
  declare popularity: number;
  declare adult: boolean;
  declare original_language: string;
  declare poster_path: string;
  declare backdrop_path: string;
  declare video: boolean;
  declare release_date: Date | null;
  declare budget: number;
  declare revenue: number;
  declare runtime: number;
  declare status: string;
  declare tagline: string;
  declare homepage: string;
  declare youtube_key: string;
  declare imdb_id: string;
  declare production_countries: string[];
  declare production_companies: number[];
  declare spoken_languages: string[];

  static associate: (models: typeof db) => void;
}

export const movie = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Movie => {
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
      },
      genre_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      vote_average: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      vote_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      popularity: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      adult: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      original_language: {
        type: DataTypes.STRING,
      },
      poster_path: {
        type: DataTypes.STRING,
      },
      backdrop_path: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      release_date: {
        type: DataTypes.DATE,
      },
      budget: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      revenue: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      runtime: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Unknown",
      },
      tagline: {
        type: DataTypes.STRING,
      },
      homepage: {
        type: DataTypes.STRING,
      },
      youtube_key: {
        type: DataTypes.STRING,
      },
      imdb_id: {
        type: DataTypes.STRING,
      },
      production_countries: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      production_companies: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      spoken_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: "movies",
      timestamps: true,
    }
  );

  return Movie;
};
