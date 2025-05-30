import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";
export interface IAccessToken {
  id: string;
  token: string;
  userId: string;

  save(): Promise<void>;
}
export interface AccessTokenModelCreationAttributes {
  token: string;
  userId: string;
}

export interface AccessTokenModelAttributes
  extends AccessTokenModelCreationAttributes {
  id: string;
}

export default class AccessToken extends Model<
  AccessTokenModelAttributes,
  AccessTokenModelCreationAttributes
> {
  declare id: CreationOptional<string>;
  declare token: string;
  declare userId: string;
  static associate: (models: typeof db) => void;
}

export const accessToken = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
) => {
  AccessToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "access_tokens",
    }
  );

  AccessToken.associate = (models: typeof db) => {
    AccessToken.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
  return AccessToken;
};
