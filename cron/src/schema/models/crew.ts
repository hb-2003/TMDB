import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";
export interface ICrew {
  id?: string;
  movie_tv_id: number;
  type: string;
  person_id: number;
  credit_id: string;
  job_id: string;
  adult: boolean;
}
export interface CrewAttributes {
  id?: string;
  type: string;
  credit_id: string;
  job_id: string;
  adult: boolean;
  person_id: number;
  movie_tv_id: number;
}

export interface CrewCreationAttributes extends CrewAttributes {}

export default class Crew
  extends Model<CrewAttributes, CrewCreationAttributes>
  implements CrewAttributes
{
  declare id: string;
  declare type: string;
  declare credit_id: string;
  declare job_id: string;
  declare adult: boolean;
  declare person_id: number;
  declare movie_tv_id: number;

  static associate: (models: typeof db) => void;
}

export const crew = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Crew => {
  Crew.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      movie_tv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adult: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "crew",
    }
  );

  return Crew;
};
