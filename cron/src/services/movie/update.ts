import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

import Movie from "../../schema/models/movie";
import Crew from "../../schema/models/crew";
import Country from "../../schema/models/country";
import Cast from "../../schema/models/cast";
import { updateMovieService, IItem, IValue } from "../../utils/types";
import Job, { jobAttributes } from "../../schema/models/job";

export const updateService = async (
  id: number
): Promise<void> => {
  try {
    const { data }: { data: updateMovieService } = await axios.get(
      endpoints.movies.changes(id)
    );
    await updateProcessed(data, id);
  } catch (error) {
    throw error;
  }
};

export const updateProcessed = async (data: updateMovieService, id: number) => {
  for (const change of data.changes) {
    for (const item of change.items) {
      switch (change.key) {
        case "overview":
          await handleStringUpdate(Movie, "overview", item, id);
          break;
        case "imdb_id":
          await handleStringUpdate(Movie, "imdb_id", item, id);
          break;
        case "original_title":
          await handleStringUpdate(Movie, "original_title", item, id);
          break;
        case "title":
          await handleStringUpdate(Movie, "title", item, id);
          break;
        case "status":
          await handleStringUpdate(Movie, change.key, item, id);
          break;
        case "budget":
          await handleNumberUpdate(Movie, "budget", item, id);
          break;
        case "runtime":
          await handleNumberUpdate(Movie, "runtime", item, id);
          break;
        case "revenue":
          await handleNumberUpdate(Movie, change.key, item, id);
          break;
        case "spoken_languages":
          await handleArrayUpdate(Movie, "spoken_languages", item, id);
          break;
        case "release_dates":
          await handleDateUpdate(Movie, "release_date", item, id);
          break;
        case "images":
          await handlePosterUpdate(Movie, item, id);
          break;
        case "crew":
          await handleCrewUpdate(Crew, item, id);
          break;
        case "genres":
          await handleGenreUpdate(Movie, item, id);
          break;
        case "production_countries":
          await handleCountryUpdate(Movie, Country, item, id);
          break;
        case "cast":
          await handleCastUpdate(Cast, item, id);
          break;
        default:
          break;
      }
    }
  }
};

const handleStringUpdate = async (
  model: typeof Movie,
  key: string,
  item: IItem,
  id: number
) => {
  const value = item.value as string;
  switch (item.action) {
    case "added":
    case "updated":
      await model.update({ [key]: value }, { where: { id } });
      break;
    case "deleted":
      await model.update({ [key]: "" }, { where: { id } });
      break;
  }
};

const handleNumberUpdate = async (
  model: typeof Movie,
  key: string,
  item: IItem,
  id: number
) => {
  const value = item.value as number;
  switch (item.action) {
    case "added":
    case "updated":
      await model.update({ [key]: value }, { where: { id } });
      break;
    case "deleted":
      await model.update({ [key]: 0 }, { where: { id } });
      break;
  }
};

const handleArrayUpdate = async (
  model: typeof Movie,
  key: string,
  item: IItem,
  id: number
) => {
  const value = item.value as string[];
  switch (item.action) {
    case "added":
      break;
    case "updated":
      await model.update({ [key]: value }, { where: { id } });
      break;
    case "deleted":
      await model.update({ [key]: [] }, { where: { id } });
      break;
  }
};

const handleDateUpdate = async (
  model: typeof Movie,
  key: string,
  item: IItem,
  id: number
) => {
  const value = (item.value as IValue)?.release_date;
  switch (item.action) {
    case "added":
    case "updated":
      await model.update(
        { [key]: value ? new Date(value) : null },
        { where: { id } }
      );
      break;
    case "deleted":
      await model.update({ [key]: null }, { where: { id } });
      break;
  }
};

const handlePosterUpdate = async (model: any, item: IItem, id: number) => {
  const value = (item.value as IValue)?.poster?.file_path;
  switch (item.action) {
    case "created":
    case "updated":
      await model.update({ poster_path: value }, { where: { id } });
      break;
    case "deleted":
      await model.update({ poster_path: "" }, { where: { id } });
      break;
  }
};

const handleCrewUpdate = async (
  model: typeof Crew,
  item: IItem,
  id: number
) => {
  const value = item.value as IValue;
  switch (item.action) {
    case "created":
      const data: jobAttributes | null = await Job.findOne({
        where: { job_title: value.job },
      });

      await model.create({
        movie_tv_id: id,
        type: "movie",
        job_id: data?.id ?? "",
        person_id: value.person_id ?? 0,
        credit_id: value.credit_id ?? "",
        adult: value.adult ?? false,
      });
      break;
    case "updated":
      const job: jobAttributes | null = await Job.findOne({
        where: { job_title: value.job },
      });

      if (value && value.credit_id) {
        await model.update(
          {
            job_id: job?.id ?? "",
            person_id: value.person_id ?? 0,
            credit_id: value.credit_id ?? "",
          },
          {
            where: {
              movie_tv_id: id,
              credit_id: value.credit_id,
            },
          }
        );
      }
      break;
    case "deleted":
      if (value && value.credit_id) {
        await model.destroy({
          where: {
            movie_tv_id: id,
            credit_id: value.credit_id,
          },
        });
      }
      break;
  }
};
const handleGenreUpdate = async (
  model: typeof Movie,
  item: IItem,
  id: number
) => {
  const value = (item.value as IValue)?.id;
  switch (item.action) {
    case "added":
      await model.update({ genre_ids: [value ?? 0] }, { where: { id } });
      break;
    case "deleted":
      await model.update({ genre_ids: [] }, { where: { id } });
      break;
  }
};

const handleCountryUpdate = async (
  model: typeof Movie,
  countryModel: typeof Country,
  item: IItem,
  id: number
) => {
  const iso_3166_1: string = item.iso_3166_1;
  const countryId: string | null = await countryModel
    .findOne({
      where: { iso_3166_1 },
      attributes: ["id"],
    })
    .then((country: Country | null) => country?.id ?? null);

  if (countryId) {
    const movie = await model.findOne({ where: { id } });
    if (movie) {
      switch (item.action) {
        case "added":
          movie.production_countries.push(countryId);
          break;
        case "deleted":
          const index = movie.production_countries.indexOf(countryId);
          if (index !== -1) {
            movie.production_countries.splice(index, 1);
          }
          break;
      }
      await movie.save();
    }
  }
};

const handleCastUpdate = async (
  model: typeof Cast,
  item: IItem,
  id: number
) => {
  const value = item.value as IValue;
  switch (item.action) {
    case "added":
      await model.create({
        movie_tv_id: id,
        type: "movie",
        person_id: value.person_id ?? 0,
        character: value.character ?? "",
        order: value.order ?? 0,
        credit_id: value.credit_id ?? "",
      });
      break;
    case "updated":
      await model.update(
        {
          person_id: value.person_id,
          character: value.character ?? "",
          order: value.order ?? 0,
          credit_id: value.credit_id,
        },
        {
          where: {
            movie_tv_id: id,
            credit_id: value.credit_id,
          },
        }
      );
      break;
    case "deleted":
      await model.destroy({
        where: {
          movie_tv_id: id,
          credit_id: value.credit_id,
        },
      });
      break;
  }
};
