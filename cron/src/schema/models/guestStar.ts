import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

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

export interface GuestStarCreationAttributes extends GuestStarAttributes {}

export default class GuestStar
  extends Model<GuestStarAttributes, GuestStarCreationAttributes>
  implements GuestStarAttributes
{
  declare id: string;
  declare series_id: number;
  declare season_id: number;
  declare episode_id: number;
  declare person_id: number;
  declare character: string;
  declare credit_id: string;
  declare order: number;
  declare adult: boolean;

  static associate: (models: typeof db) => void;
}

export const guestStar = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof GuestStar => {
  GuestStar.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      series_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      episode_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      character: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adult: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "guest_stars",
    }
  );
  return GuestStar;
};
