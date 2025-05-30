import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface CompanyImageAttributes {
  id?: string;
  company_id: number;
  file_path: string;
  height: number;
  width: number;
  aspect_ratio: number;
  file_type: string;
  vote_average: number;
  vote_count: number;
}

export interface CompanyImageCreationAttributes
  extends CompanyImageAttributes {}

export default class CompanyImage
  extends Model<CompanyImageAttributes, CompanyImageCreationAttributes>
  implements CompanyImageAttributes
{
  declare id: string;
  declare company_id: number;
  declare file_path: string;
  declare height: number;
  declare width: number;
  declare aspect_ratio: number;
  declare file_type: string;
  declare vote_average: number;
  declare vote_count: number;

  static associate: (models: typeof db) => void;
}

export const companyImage = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof CompanyImage => {
  CompanyImage.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '', // Ensure a default value is provided
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Ensure a default value is provided
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Ensure a default value is provided
      },
      aspect_ratio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Ensure a default value is provided
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '', // Ensure a default value is provided
      },
      vote_average: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Ensure a default value is provided
      },
      vote_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Ensure a default value is provided
      },
    },
    {
      sequelize,
      tableName: "company_images",
    }
  );
  return CompanyImage;
};
