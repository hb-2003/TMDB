import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface CompanyAttributes {
  id: number;
  name: string;
  description: string;
  headquarters: string;
  homepage: string;
  logo_path: string;
  origin_country: string;
}

export interface CompanyCreationAttributes extends CompanyAttributes {}

export default class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare headquarters: string;
  declare homepage: string;
  declare logo_path: string;
  declare origin_country: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const company = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Company => {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      headquarters: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "companies",
    }
  );

  return Company;
};
