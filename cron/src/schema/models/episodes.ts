import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";
export interface IEpisode
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

export interface EpisodeCreationAttributes extends EpisodeAttributes {}

export default class Episode
  extends Model<EpisodeAttributes, EpisodeCreationAttributes>
  implements EpisodeAttributes
{
  declare id: number;
  declare air_date: Date;
  declare episode_number: number;
  declare episode_type: string;
  declare name: string;
  declare overview: string;
  declare production_code: string;
  declare season_number: number;
  declare still_path: string;
  declare vote_average: number;
  declare series_id: number;

  static associate: (models: typeof db) => void;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const episodes = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Episode => {
  Episode.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      air_date: {
        type: DataTypes.DATE,
      },
      episode_number: {
        type: DataTypes.INTEGER,
      },
      episode_type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      overview: {
        type: DataTypes.STRING,
      },
      production_code: {
        type: DataTypes.STRING,
      },
      season_number: {
        type: DataTypes.INTEGER,
      },
      still_path: {
        type: DataTypes.STRING,
      },
      vote_average: {
        type: DataTypes.FLOAT,
      },
      series_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "episodes",
    }
  );
  return Episode;
};