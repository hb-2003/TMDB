import db from "../../utils/sequelize-client";
import Sequelize, { CreationOptional, Model } from "sequelize";

export interface jobAttributes {
  id?: string;
  department: string;
  job_title: string;
}

export interface jobCreationAttributes extends jobAttributes {}

export default class Job
  extends Model<jobAttributes, jobCreationAttributes>
  implements jobAttributes
{
  public id?: string;
  public department!: string;
  public job_title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: typeof db) => void;
}

export const job = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof Job => {
  Job.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "jobs",
    }
  );

  return Job;
};
