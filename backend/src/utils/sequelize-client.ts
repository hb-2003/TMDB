import { Sequelize, DataTypes } from "sequelize";
import { Config } from "../config/config";
import { config } from "dotenv";
import { movie } from "../schema/models/movie";
import { genre } from "../schema/models/genre";
import { image } from "../schema/models/image";
import { video } from "../schema/models/video";
import { language } from "../schema/models/language";
import { country } from "../schema/models/country";
import { job } from "../schema/models/job";
import { people } from "../schema/models/people";
import { translation } from "../schema/models/translation";
import { certification } from "../schema/models/certification";
import { company } from "../schema/models/company";
import { companyImage } from "../schema/models/companyImage";
import { network } from "../schema/models/network";
import { series } from "../schema/models/series";
import { seasons } from "../schema/models/seasons";
import { episodes } from "../schema/models/episodes";
import { releaseDate } from "../schema/models/releaseDate";
import { guestStar } from "../schema/models/guestStar";
import { cast } from "../schema/models/cast";
import { crew } from "../schema/models/crew";
import { titles } from "../schema/models/titles";
import { user } from "../schema/models/user";
import { accessToken } from "../schema/models/accessToken";
import { externalIds } from "../schema/models/external_ids";
import { userWatchlist } from "../schema/models/user_watchlist";
import QueryTypes from "sequelize";
import { review } from "../schema/models/review";

const NODE_ENV = Config.NODE_ENV;
const env = NODE_ENV || "development";

if (env === "development") {
  config();
}

const sequelize = new Sequelize(
  Config.DB_CONFIG.DB_NAME || "",
  Config.DB_CONFIG.DB_USER || "",
  Config.DB_CONFIG.DB_PASSWORD || "",
  {
    host: Config.DB_CONFIG.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging
  }
);
const db = {
  sequelize,
  Movie: movie(sequelize, DataTypes),
  Genre: genre(sequelize, DataTypes),
  Image: image(sequelize, DataTypes),
  Video: video(sequelize, DataTypes),
  Language: language(sequelize, DataTypes),
  Job: job(sequelize, DataTypes),
  People: people(sequelize, DataTypes),
  Country: country(sequelize, DataTypes),
  Translation: translation(sequelize, DataTypes),
  Certification: certification(sequelize, DataTypes),
  Company: company(sequelize, DataTypes),
  CompanyImage: companyImage(sequelize, DataTypes),
  Network: network(sequelize, DataTypes),
  Series: series(sequelize, DataTypes),
  ReleaseDate: releaseDate(sequelize, DataTypes),
  Seasons: seasons(sequelize, DataTypes),
  Episodes: episodes(sequelize, DataTypes),
  GuestStar: guestStar(sequelize, DataTypes),
  Cast: cast(sequelize, DataTypes),
  Crew: crew(sequelize, DataTypes),
  Titles: titles(sequelize, DataTypes),
  User: user(sequelize, DataTypes),
  AccessToken: accessToken(sequelize, DataTypes),
  ExternalIds: externalIds(sequelize, DataTypes),
  UserWatchlist: userWatchlist(sequelize, DataTypes),
  Review: review(sequelize, DataTypes),

  models: sequelize.models,
  queryTypes: QueryTypes,

};

type Model = (typeof db)[keyof typeof db];
type ModelWithAssociate = Model & { associate: (model: typeof db) => void };
const checkAssociation = (model: Model): model is ModelWithAssociate =>
  "associate" in model;

Object.entries(db).forEach(([, model]: [string, Model]) => {
  if (checkAssociation(model)) {
    model.associate(db);
  }
});

export default db;
