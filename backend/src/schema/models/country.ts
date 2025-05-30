import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";

export interface ICountries {
  id?: string;
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface countryAttributes {
  id?: string;
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface countryCreationAttributes extends countryAttributes {
  id?: string;
}

export default class Country
  extends Model<countryAttributes, countryCreationAttributes>
  implements countryAttributes
{
  declare id: string;
  declare iso_3166_1: string;
  declare english_name: string;
  declare native_name: string;

  static associate: (models: typeof db) => void;
}

export const country = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Country => {
  Country.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      iso_3166_1: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      english_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      native_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "countries",
    }
  );


  return Country;
};
