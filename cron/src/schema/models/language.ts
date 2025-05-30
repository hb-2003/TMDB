import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";

export interface LanguageAttributes {
  id?: string;
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface LanguageCreationAttributes extends LanguageAttributes {
  id?: string;
}

export default class Language
  extends Model<LanguageAttributes, LanguageCreationAttributes>
  implements LanguageAttributes
{
  declare id: string;
  declare iso_639_1: CreationOptional<string>;
  declare english_name: string;
  declare name: string;

  static associate: (models: typeof db) => void;
}

export const language = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Language => {
  Language.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      iso_639_1: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      english_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "languages",
    }
  );

  Language.associate = (models: typeof db) => {};

  return Language;
};
