import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";

export interface ReviewAttributes {
  id?: string;
  media_id: number;
  media_type: string;
  user_id: string;
  rating: number;
  reviewText: string;
  reviewDate: Date;
}

export interface ReviewCreationAttributes extends ReviewAttributes { }

export default class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes {
  declare id: string;
  declare media_id: number;
  declare media_type: string;
  declare user_id: string;
  declare rating: number;
  declare reviewText: string;
  declare reviewDate: Date;

  static associate: (models: typeof db) => void;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const review = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Review => {
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reviewDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "reviews",
    }
  );

  return Review;
};