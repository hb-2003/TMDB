import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";
export interface ITitles {
  id?: string;
  movie_tv_id: number;
  title: string;
  type: string;
  country_id: string;
}

export interface TitlesAttributes {
  id?: string;
  movie_tv_id: number;
  title: string;
  type: string;
  country_id: string;
}

export interface TitlesCreationAttributes extends TitlesAttributes {}

export default class Titles
  extends Model<TitlesAttributes, TitlesCreationAttributes>
  implements TitlesAttributes
{
  declare id:string;
  declare movie_tv_id: number;
  declare title: string;
  declare type: string;
  declare country_id: string;

  static associate: (models: typeof db) => void;
}

export const titles = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Titles => {
  Titles.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "titles",
    }
  );

  Titles.associate = () => {};

  return Titles;
};
