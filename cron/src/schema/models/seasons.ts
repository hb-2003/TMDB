import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface SeasonsAttributes {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  series_id: number;
  episode_count: number;
  air_date: Date;
}

export interface SeasonsCreationAttributes extends SeasonsAttributes {}

export default class Seasons
  extends Model<SeasonsAttributes, SeasonsCreationAttributes>
  implements SeasonsAttributes
{
  declare id: number;
  declare name: string;
  declare overview: string;
  declare poster_path: string;
  declare season_number: number;
  declare series_id: number;
  declare episode_count: number;
  declare air_date: Date;

  static associate: (models: typeof db) => void;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const seasons = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Seasons => {
  Seasons.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      overview: {
        type: DataTypes.TEXT,
      },
      poster_path: {
        type: DataTypes.STRING,
      },
      season_number: {
        type: DataTypes.INTEGER,
      },
      series_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "series",
          key: "id",
        },
      },
      episode_count: {
        type: DataTypes.INTEGER,
      },
      air_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Seasons",
    }
  );

  Seasons.associate = (models) => {
    Seasons.belongsTo(models.Series, {
      foreignKey: "series_id",
      as: "series",
    });
  };

  return Seasons;
};
