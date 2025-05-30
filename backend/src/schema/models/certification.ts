import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";

export interface CertificationAttributes {
  id?: string;
  country_id: string;
  certification: string;
  meaning: string;
  order: number;
}

export interface CertificationCreationAttributes
  extends CertificationAttributes {}

export default class Certification
  extends Model<CertificationAttributes, CertificationCreationAttributes>
  implements CertificationAttributes
{
  declare id: string;
  declare country_id: string;
  declare certification: string;
  declare meaning: string;
  declare order: number;

  static associate: (models: typeof db) => void;
}

export const certification = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Certification => {
  Certification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meaning: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "certifications",
    }
  );

  Certification.associate = () => {
    // associations can be defined here
  }
  

  return Certification;
};
