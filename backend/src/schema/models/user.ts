import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";
export interface IUser {
  id: string;
  username: string;
  email: string;
  refreshtoken?: string;
  emailVerified?: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  save: () => Promise<IUser>;
}
export interface UserAttributes {
  id?: string;
  username: string;
  email: string;
  refreshtoken?: string;
  emailVerified?: boolean;
  password: string;
}

export interface USerAttributesCreation extends UserAttributes {}

export default class User
  extends Model<UserAttributes, USerAttributesCreation>
  implements UserAttributes
{
  declare id: string;
  declare username: string;
  declare email: string;
  declare refreshtoken: string;
  declare emailVerified: boolean;
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate: (models: typeof db) => void;
}

export const user = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshtoken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
