import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface TranslationAttributes {
  id?: string;
  movie_tv_id: number;
  language_id: string;
  country_id: string;
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface TranslationCreationAttributes extends TranslationAttributes {
  id?: string;
}

export default class Translation
  extends Model<TranslationAttributes, TranslationCreationAttributes>
  implements TranslationAttributes
{
  declare id: string;
  declare movie_tv_id: number;
  declare language_id: string;
  declare country_id: string;
  declare homepage: string;
  declare overview: string;
  declare runtime: number;
  declare tagline: string;
  declare title: string;

  static associate: (models: typeof db) => void;
}

export const translation = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Translation => {
  Translation.init(
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
      language_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      runtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tagline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "translations",
    }
  );

  return Translation;
};
