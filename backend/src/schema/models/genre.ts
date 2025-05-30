import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";
export interface IGenre {
  id: number;
  name: string;
}

export interface GenreAttributes {
  id: number;
  name: string;
}

export interface GenreCreationAttributes extends GenreAttributes {}

export default class Genre
  extends Model<GenreAttributes, GenreCreationAttributes>
  implements GenreAttributes
{
  declare id: CreationOptional<number>;
  declare name: string;

  static associate: (models: typeof db) => void;
}

export const genre = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Genre => {
  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "genres",
    }
  );

  

  return Genre;
};
