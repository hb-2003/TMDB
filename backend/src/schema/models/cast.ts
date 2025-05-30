import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";
import { UUIDV4 } from "sequelize";

export interface ICast {
  id?: string;
  movie_tv_id: number;
  type: string;
  person_id: number;
  character: string;
  order: number;
  credit_id: string;
}

export interface CastAttributes {
  id?: string;
  movie_tv_id: number;
  type: string;

  person_id: number;
  character: string;
  order: number;
  credit_id: string;
}

export interface CastCreationAttributes extends CastAttributes {}

export default class Cast
  extends Model<CastAttributes, CastCreationAttributes>
  implements CastAttributes
{
  declare id: string;
  declare movie_tv_id: number;
  declare type: string;
  declare person_id: number;
  declare character: string;
  declare order: number;
  declare credit_id: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate: (models: typeof db) => void;
}

export const cast = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Cast => {
  Cast.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      movie_tv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      character: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cast",
    }
  );

  Cast.associate = (models: typeof db) => {
    Cast.belongsTo(models.People, {
      foreignKey: "person_id",
      targetKey: "id",
    });
  };

  return Cast;
};
