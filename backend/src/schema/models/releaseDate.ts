import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";

export interface ReleaseDateAttributes {
  id?: string;
  movie_id: number;
  country_id: string;
  release_date: string;
  certification: string;
  language: string;
  type: number;
}

export interface ReleaseDateCreationAttributes extends ReleaseDateAttributes {}

export default class ReleaseDate
  extends Model<ReleaseDateAttributes, ReleaseDateCreationAttributes>
  implements ReleaseDateAttributes
{
  public id!: string;
  public movie_id!: number;
  public country_id!: string;
  public release_date!: string;
  public certification!: string;
  public language!: string;
  public type!: number; //

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const releaseDate = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof ReleaseDate => {
  ReleaseDate.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "release_dates",
    }
  );

  return ReleaseDate;
};
