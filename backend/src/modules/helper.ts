import Genre from "../schema/models/genre";
import Company from "../schema/models/company";
import CompanyImage from "../schema/models/companyImage";
import Country from "../schema/models/country";
import Language from "../schema/models/language";
import Image from "../schema/models/image";
import Cast from "../schema/models/cast";
import Crew from "../schema/models/crew";
import People from "../schema/models/people";
import {
  CastDetails,
  CrewDetails,
  ProductionCountry,
  personDetails,
  GetImagesResponse,
  VideoDetails,
  GetReleaseDatesResponse,
  ReleaseDates,
  ReleaseDateDetails,
  releaseTypes,
  ReviewInput,
} from "../utils/types";

import Job from "../schema/models/job";
import Video from "../schema/models/video";
import ReleaseDate from "../schema/models/releaseDate";
import Movie from "../schema/models/movie";
import CustomGraphqlError from "../shared-lib/errors";
import { getMessage } from "../utils/message";
import Review from "../schema/models/review";
import Series from "../schema/models/series";
import User from "../schema/models/user";
import UserWatchlist from "../schema/models/user_watchlist";
import Seasons from "../schema/models/seasons";
import Network from "../schema/models/network";

export const storeReview = async (reviewData: ReviewInput, userId: string): Promise<boolean> => {
  try {
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new CustomGraphqlError(getMessage("INVALID_RATING"), "INVALID_RATING");
    }
    if (reviewData.reviewText.length < 10) {
      throw new CustomGraphqlError(getMessage("REVIEW_TEXT_TOO_SHORT"), "REVIEW_TEXT_TOO_SHORT");
    }
    if (reviewData.reviewText.length > 500) {
      throw new CustomGraphqlError(getMessage("REVIEW_TEXT_TOO_LONG"), "REVIEW_TEXT_TOO_LONG");
    }

    if (reviewData.media_type !== "movie" && reviewData.media_type !== "tv") {
      throw new CustomGraphqlError(getMessage("INVALID_MEDIA_TYPE"), "INVALID_MEDIA_TYPE");
    }

    if (reviewData.media_type === "movie") {
      if (!await Movie.findOne({ where: { id: reviewData.media_id } })) {
        throw new CustomGraphqlError(getMessage("MOVIE_NOT_FOUND"), "MOVIE_NOT_FOUND");
      }
    } else {
      if (!await Series.findOne({ where: { id: reviewData.media_id } })) {
        throw new CustomGraphqlError(getMessage("TV_NOT_FOUND"), "TV_NOT_FOUND");
      }
    }

    if (!await User.findOne({ where: { id: userId } })) {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }

    const review = await Review.create({
      user_id: userId,
      media_id: reviewData.media_id,
      media_type: reviewData.media_type,
      rating: reviewData.rating,
      reviewText: reviewData.reviewText,
      reviewDate: new Date()
    });
    if (!review) {
      throw new CustomGraphqlError(getMessage("REVIEW_NOT_CREATED"), "REVIEW_NOT_CREATED");
    }
    return true;
  } catch (error) {
    throw error;
  }
}

export const getMovie = async (id: number): Promise<Movie | null> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("INVALID_MOVIE_ID"), "INVALID_MOVIE_ID");
    }
    const movie: Movie | null = await Movie.findOne({ where: { id } });
    if (!movie) {
      throw new CustomGraphqlError(getMessage("MOVIE_NOT_FOUND"), "MOVIE_NOT_FOUND");
    }
    return movie;
  } catch (error) {
    throw error;
  }
};

export const getPerson = async (id: number): Promise<personDetails> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("INVALID_PERSON_ID"), "INVALID_PERSON_ID");
    }
    const person: People | null = await People.findOne({ where: { id } });
    if (!person) {
      return {} as personDetails;
    }
    return person;
  } catch (error) {
    throw error;
  }
};

export const getGenresData = async (ids: number[]): Promise<Genre[]> => {
  try {
    let data: Genre[] = [];

    for (const id of ids) {
      const genre: Genre | null = await Genre.findOne({ where: { id } });
      if (genre) {
        data.push(genre);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyImagesData = async (companyId: number): Promise<CompanyImage[]> => {
  try {
    if (!companyId) {
      throw new CustomGraphqlError(getMessage("INVALID_COMPANY_ID"), "INVALID_COMPANY_ID");
    }
    const images: CompanyImage[] = await CompanyImage.findAll({
      where: { company_id: companyId },
    });
    return images;
  } catch (error) {
    throw error;
  }
};

export const getVideosData = async (id: number): Promise<Video[]> => {
  try {
    const videos: Video[] = await Video.findAll({
      where: { movie_tv_id: id },
    });
    return videos ?? [];
  } catch (error) {
    throw error;
  }
};

export const getImagesData = async (id: number): Promise<GetImagesResponse> => {
  try {
    console.log("id", id);
    const images: Image[] = await Image.findAll({ where: { movie_tv_id: id } });
    console.log("images", images);
    const categorizeImages = (type: string) =>
      images
        .filter((image) => image.type === type)
        .map(
          ({
            aspect_ratio,
            height,
            file_path,
            vote_average,
            vote_count,
            width,
          }) => ({
            aspect_ratio,
            height,
            file_path,
            vote_average,
            vote_count,
            width,
          })
        );
    console.log(images);
    return {
      id,
      backdrops: categorizeImages("backdrops"),
      logos: categorizeImages("logos"),
      posters: categorizeImages("posters"),
    };
  } catch (error) {
    throw error;
  }
};

export const getCastData = async (id: number, type: string): Promise<CastDetails[]> => {
  try {
    if (!id || !type) {
      throw new CustomGraphqlError(getMessage("INVALID_CAST_DATA"), "INVALID_CAST_DATA");
    }
    const cast: Cast[] = await Cast.findAll({
      where: { movie_tv_id: id, type },
    });
    const castData: CastDetails[] = await Promise.all(
      cast.map(async (cast) => {
        const personData: personDetails = await getPerson(cast.person_id);
        return {
          adult: personData.adult || false,
          gender: personData.gender || 0,
          id: personData.id || 0,
          known_for_department: personData.known_for_department || "",
          name: personData.name || "",
          original_name: personData.original_name || "",
          popularity: personData.popularity || 0,
          profile_path: personData.profile_path || "",
          cast_id: cast.id,
          character: cast.character || "",
          credit_id: cast.credit_id || "",
          order: cast.order || 0,
        };
      })
    );
    return castData;
  } catch (error) {
    throw error;
  }
};

export const getCrewData = async (id: number, type: string): Promise<CrewDetails[]> => {
  try {
    if (!id || !type) {
      throw new CustomGraphqlError(getMessage("INVALID_CREW_DATA"), "INVALID_CREW_DATA");
    }
    const crew: Crew[] = await Crew.findAll({
      where: { movie_tv_id: id, type },
    });
    const crewData: CrewDetails[] = await Promise.all(
      crew.map(async (crew) => {
        const personData: personDetails = await getPerson(crew.person_id);
        const jobData = await Job.findOne({ where: { id: crew.job_id } });

        return {
          adult: personData.adult || false,
          gender: personData.gender || 0,
          id: personData.id,
          known_for_department: personData.known_for_department,
          name: personData.name,
          original_name: personData.original_name || "",
          popularity: personData.popularity,
          profile_path: personData.profile_path,
          credit_id: crew.credit_id,
          department: jobData?.department || "",
          job: jobData?.job_title || "",
        };
      })
    );
    return crewData;
  } catch (error) {
    throw error;
  }
};

export const getSpokenLanguagesData = async (ids: string[]): Promise<Language[]> => {
  try {
    if (!ids) return [];
    let data: Language[] = [];

    for (const id of ids) {
      const language: Language | null = await Language.findOne({
        where: { iso_639_1: id },
      });
      if (language) {
        data.push(language);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductionCompaniesData = async (ids: number[]): Promise<Company[]> => {
  try {
    let data: Company[] = [];

    for (const id of ids) {
      const company: Company | null = await Company.findOne({ where: { id } });
      if (company) {
        data.push(company);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductionCountriesData = async (ids: string[]): Promise<ProductionCountry[]> => {
  try {

    let data: ProductionCountry[] = [];

    for (const id of ids) {
      const country: Country | null = await Country.findOne({ where: { id } });
      if (country) {
        data.push({
          iso_3166_1: country.iso_3166_1,
          name: country.english_name,
        });
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getReleaseDatesData = async (id: number): Promise<GetReleaseDatesResponse> => {
  try {
    const releaseDates: ReleaseDate[] = await ReleaseDate.findAll({ where: { movie_id: id } });
    const countryData: Country[] = await Country.findAll();
    if (!releaseDates.length) {
      return { id, results: [] };
    }

    const releaseDatesData: ReleaseDates[] = releaseDates.map(
      (releaseDate) => ({
        name:
          countryData.find((country) => country.id === releaseDate.country_id)
            ?.native_name || "",
        release_dates: [
          {
            certification: releaseDate.certification || "",
            descriptors: [],
            language: releaseDate.language,
            note: "",
            release_date: releaseDate.release_date || "",
            type: releaseTypes[releaseDate.type] || "",
          },
        ],
      })
    );

    const groupedData = releaseDatesData.reduce((acc, curr) => {
      if (!acc[curr.name]) acc[curr.name] = [];
      acc[curr.name].push(...curr.release_dates);
      return acc;
    }, {} as { [key: string]: ReleaseDateDetails[] });

    const data = Object.keys(groupedData).map((key) => ({
      iso_3166_1:
        countryData.find((country) => country.english_name === key)
          ?.iso_3166_1 || "",
      name: key,
      release_dates: groupedData[key],
    }));

    return { id, results: data };
  } catch (error) {
    throw error;
  }
};

export const getSeries = async (id: number): Promise<Series | null> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("INVALID_TV_ID"), "INVALID_TV_ID");
    }
    const series: Series | null = await Series.findOne({ where: { id } });
    if (!series) {
      throw new CustomGraphqlError(getMessage("TV_NOT_FOUND"), "TV_NOT_FOUND");
    }
    return series;
  } catch (error) {
    throw error;
  }
}

export const storeRate = async (
  userId: string,
  media_id: number,
  media_type: "movie" | "tv",
  rating: number
): Promise<boolean> => {
  try {
    if (rating < 1 || rating > 10) {
      throw new CustomGraphqlError(getMessage("INVALID_RATING"), "INVALID_RATING");
    }
    if (media_type !== "movie" && media_type !== "tv") {
      throw new CustomGraphqlError(getMessage("INVALID_MEDIA_TYPE"), "INVALID_MEDIA_TYPE");
    }
    if (media_type === "movie") {
      await getMovie(media_id);
    }
    if (media_type === "tv") {
      await getSeries(media_id);
    }
    if (
      await UserWatchlist.findOne({
        where: { user_id: userId, media_id, media_type },
      })
    ) {
      await UserWatchlist.update(
        { rating },
        { where: { user_id: userId, media_id, media_type } }
      );
    } else {
      await UserWatchlist.create({
        user_id: userId,
        media_id,
        media_type,
        rating,
      });
    }
    return true;
  } catch (error) {
    throw error;
  }
}

export const deleteReview = async (userId: string, reviewId: string, media_type: "movie" | "tv"): Promise<boolean> => {
  try {
    if (!userId || !reviewId || !media_type) {
      throw new CustomGraphqlError(getMessage("INVALID_REVIEW_DATA"), "INVALID_REVIEW_DATA");
    }
    const reviewExist = await Review.findOne({
      where: {
        id: reviewId,
        user_id: userId,
        media_type
      },
    });
    if (!reviewExist) {
      throw new CustomGraphqlError(getMessage("REVIEW_NOT_FOUND"), "REVIEW_NOT_FOUND");
    }
    await reviewExist.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

export const getReviews = async (media_id: number, media_type: "movie" | "tv"): Promise<Review[]> => {
  try {
    if (!media_id || !media_type) {
      throw new CustomGraphqlError(getMessage("INVALID_REVIEW_DATA"), "INVALID_REVIEW_DATA");
    }
    const reviews = await Review.findAll({
      where: {
        media_id,
        media_type
      },
    });
    return reviews;
  } catch (error) {
    throw error;
  }
}

export const getWatchlist = async (userId: string): Promise<UserWatchlist[]> => {
  try {
    if (!userId) {
      throw new CustomGraphqlError(getMessage("INVALID_USER_ID"), "INVALID_USER_ID");
    }
    const watchlist = await UserWatchlist.findAll({
      where: { user_id: userId },
    });
    return watchlist;
  } catch (error) {
    throw error;
  }
}

export const getWatchlistByType = async (userId: string, media_type: "movie" | "tv"): Promise<UserWatchlist[]> => {
  try {
    if (!userId || !media_type) {
      throw new CustomGraphqlError(getMessage("INVALID_WATCHLIST_DATA"), "INVALID_WATCHLIST_DATA");
    }
    const watchlist = await UserWatchlist.findAll({
      where: { user_id: userId, media_type },
    });
    return watchlist;
  } catch (error) {
    throw error;
  }
}

export const getWatchlistByRating = async (userId: string, rating: number): Promise<UserWatchlist[]> => {
  try {
    if (!userId || !rating) {
      throw new CustomGraphqlError(getMessage("INVALID_WATCHLIST_DATA"), "INVALID_WATCHLIST_DATA");
    }
    const watchlist = await UserWatchlist.findAll({
      where: { user_id: userId, rating },
    });
    return watchlist;
  } catch (error) {
    throw error;
  }
}

export const getSeasons = async (id: number, season_number: number): Promise<Seasons[]> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("INVALID_TV_ID"), "INVALID_TV_ID");
    }
    const series: Series | null = await Series.findOne({ where: { id } });
    if (!series) {
      throw new CustomGraphqlError(getMessage("TV_NOT_FOUND"), "TV_NOT_FOUND");
    }

    const seasons = await Seasons.findAll({
      where: { series_id: id, season_number }
    });

    return seasons;
  } catch (error) {
    throw error;
  }
}


export const getNetwork = async (ids: number[]): Promise<Network[]> => {
  try {
    let data: Network[] = [];

    for (const id of ids) {
      const network: Network | null = await Network.findOne({ where: { id } });
      if (network) {
        data.push(network);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
}