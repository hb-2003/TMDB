import db from "../../utils/sequelize-client";
import Sequelize, { Model } from "sequelize";


export interface NetworkAttributes {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
  homepage: string;
  headquarters: string;
}

export interface NetworkCreationAttributes extends NetworkAttributes {}

export default class Network
  extends Model<NetworkAttributes, NetworkCreationAttributes>
  implements NetworkAttributes
{
  declare id: number;
  declare name: string;
  declare logo_path: string;
  declare origin_country: string;
  declare homepage: string;
  declare headquarters: string;

  static associate: (model: typeof db) => void;
}

export const network = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Network => {
  Network.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      headquarters: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Network",
      tableName: "networks",
      timestamps: false,
    }
  );

  return Network;
};
