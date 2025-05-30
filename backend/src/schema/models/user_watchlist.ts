import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface IUserWatchlist {
  id?: string;
  user_id: string;
  media_id: number;
  media_type: "movie" | "tv";
  favorite?: boolean;
  rated?: boolean;
  rating?: number;
  watchlist?: boolean;
  watchlist_updated_at?: Date;
  created_at?: Date;
}

export interface UserWatchlistAttributes {
  id?: string;
  user_id: string;
  media_id: number;
  media_type: "movie" | "tv";
  favorite?: boolean;
  rated?: boolean;
  rating?: number;
  watchlist?: boolean;
  watchlist_updated_at?: Date;
  created_at?: Date;
}

export interface UserWatchlistCreationAttributes
  extends UserWatchlistAttributes {
  id?: string;
}

export default class UserWatchlist
  extends Model<UserWatchlistAttributes, UserWatchlistCreationAttributes>
  implements UserWatchlistAttributes
{
  declare id: string;
  declare user_id: string;
  declare media_id: number;
  declare media_type: "movie" | "tv";
  declare favorite: boolean;
  declare rated: boolean;
  declare rating: number;
  declare watchlist: boolean;
  declare watchlist_updated_at: Date;
  declare created_at: Date;

  static associate: (models: typeof db) => void;
}

export const userWatchlist = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof UserWatchlist => {
  UserWatchlist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media_type: {
        type: DataTypes.ENUM("movie", "tv"),
        allowNull: false,
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rated: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      watchlist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      watchlist_updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      tableName: "user_watchlist",
      modelName: "UserWatchlist",
      underscored: true,
    }
  );

  return UserWatchlist;
};
