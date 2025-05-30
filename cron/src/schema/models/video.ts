import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";
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

export interface VideoCreationAttributes extends VideoAttributes {}

export default class Video
  extends Model<VideoAttributes, VideoCreationAttributes>
  implements VideoAttributes
{
  public id!: string;
  public movie_tv_id!: number;
  public iso_639_1!: string;
  public iso_3166_1!: string;
  public key!: string;
  public name!: string;
  public site!: string;
  public size!: number;
  public type!: string;
  public official!: boolean;
  public published_at!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const video = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Video => {
  Video.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      movie_tv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      iso_639_1: {
        type: DataTypes.STRING,
      },
      iso_3166_1: {
        type: DataTypes.STRING,
      },
      key: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      site: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      official: {
        type: DataTypes.BOOLEAN,
      },
      published_at: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "video",
    }
  );

  return Video;
};
