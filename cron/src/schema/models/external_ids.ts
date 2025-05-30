import Sequelize, { Model } from "sequelize";
import db from "../../utils/sequelize-client";
import { UUIDV4 } from "sequelize";

export interface IExternalIds {
  id: string;
  movie_tv_person_id: number;
  type: string;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface ExternalIdsAttributes {
  id?: string;
  movie_tv_person_id: number;
  type: string;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export default class ExternalIds extends Model<ExternalIdsAttributes> {
  declare id?: string;
  declare movie_tv_person_id: number;
  declare type: string;
  declare imdb_id: string;
  declare freebase_mid: string;
  declare freebase_id: string;
  declare tvdb_id: number;
  declare tvrage_id: number;
  declare wikidata_id: string;
  declare facebook_id: string;
  declare instagram_id: string;
  declare twitter_id: string;

  static associate: (models: typeof db) => void;
}

export const externalIds = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): typeof ExternalIds => {
  ExternalIds.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      movie_tv_person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imdb_id: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      freebase_mid: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      freebase_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      tvdb_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      tvrage_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wikidata_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      facebook_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      instagram_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      twitter_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "external_ids",
      timestamps: false,
    }
  );
  return ExternalIds;
};
