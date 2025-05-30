import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

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

export interface SeriesCreationAttributes extends SeriesAttributes {}

export default class Series
  extends Model<SeriesAttributes, SeriesCreationAttributes>
  implements SeriesAttributes
{
  declare id: number;
  declare name: string;
  declare overview: string;
  declare poster_path: string;
  declare backdrop_path: string;
  declare first_air_date: Date;
  declare last_air_date: Date;
  declare number_of_episodes: number;
  declare number_of_seasons: number;
  declare vote_average: number;
  declare vote_count: number;
  declare type: string;
  declare homepage: string;
  declare in_production: boolean;
  declare original_language: string;
  declare original_name: string;
  declare popularity: number;
  declare tagline: string;
  declare status: string;
  declare origin_country: string[];
  declare languages: string[];
  declare production_companies: number[];
  declare production_countries: string[];
  declare spoken_languages: string[];
  declare genre_ids: number[];
  declare episode_run_time: number[];
  declare network: number[];
  declare created_by: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const series = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Series => {
  Series.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      poster_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      backdrop_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_air_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      last_air_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      number_of_episodes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      number_of_seasons: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      vote_average: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      vote_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      in_production: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      original_language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      popularity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      tagline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin_country: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      production_companies: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      production_countries: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      spoken_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      genre_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      episode_run_time: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      network: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      created_by: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: "series",
    }
  );

  return Series;
};
