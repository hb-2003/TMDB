import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";

export interface PeopleAttributes {
  id: number;
  name: string;
  original_name: string;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  biography: string;
  birthday: Date;
  deathday: Date | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
  profile_path: string;
}

export interface PeopleCreationAttributes extends PeopleAttributes {}

export default class People
  extends Model<PeopleAttributes, PeopleCreationAttributes>
  implements PeopleAttributes
{
  declare id: number;
  declare name: string;
  declare original_name: string;
  declare gender: number;
  declare known_for_department: string;
  declare popularity: number;
  declare adult: boolean;
  declare biography: string;
  declare birthday: Date;
  declare deathday: Date | null;
  declare homepage: string | null;
  declare imdb_id: string;
  declare place_of_birth: string;
  declare profile_path: string;

  static associate: (models: typeof db) => void;
}

export const people = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof People => {
  People.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.INTEGER,
      },
      known_for_department: {
        type: DataTypes.STRING,
      },
      popularity: {
        type: DataTypes.FLOAT,
      },
      adult: {
        type: DataTypes.BOOLEAN,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      deathday: {
        type: DataTypes.DATE,
      },
      homepage: {
        type: DataTypes.STRING,
      },
      imdb_id: {
        type: DataTypes.STRING,
      },
      place_of_birth: {
        type: DataTypes.STRING,
      },
      profile_path: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "people",
      timestamps: false,
    }
  );

  People.associate = () => {};

  return People;
};
