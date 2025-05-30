import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";

export interface imageAttributes {
  id?: string;
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

export interface imageCreationAttributes extends imageAttributes {}

export default class Image
  extends Model<imageAttributes, imageCreationAttributes>
  implements imageAttributes
{
  declare id: string;
  declare movie_tv_id: number;
  declare aspect_ratio: number;
  declare height: number;
  declare iso_639_1: string | null;
  declare file_path: string;
  declare vote_average: number;
  declare vote_count: number;
  declare width: number;
  declare type: string;

  static associate: (models: typeof db) => void;
}

export const image = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Image => {
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      movie_tv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aspect_ratio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      iso_639_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vote_average: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      vote_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "images",
    }
  );

  Image.associate = (models: typeof db) => {};

  return Image;
};
