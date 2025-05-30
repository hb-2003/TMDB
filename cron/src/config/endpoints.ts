import e from "express";
import { Config } from "./config";

const baseUrl = Config.BASE_URL;
const key = Config.API_KEY;

const endpoints = {
  movies: {
    nowPlaying: `${baseUrl}/movie/now_playing?api_key=${key}`,
    popular: `${baseUrl}/movie/popular?api_key=${key}`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
    upcoming:(page: number = 1): string => `${baseUrl}/movie/upcoming?api_key=${key}&language=en-US&page=${page}`,  
    details: (id: number): string => `${baseUrl}/movie/${id}?api_key=${key}`,
    credits: (id: number): string =>
      `${baseUrl}/movie/${id}/credits?api_key=${key}`,
    videos: (id: number): string =>
      `${baseUrl}/movie/${id}/videos?api_key=${key}`,
    images: (id: number): string =>
      `${baseUrl}/movie/${id}/images?api_key=${key}`,
    releaseDates: (id: number): string =>
      `${baseUrl}/movie/${id}/release_dates?api_key=${key}`,
    translations: (id: number): string =>
      `${baseUrl}/movie/${id}/translations?api_key=${key}`,
    changes: (id: number): string =>
      `${baseUrl}/movie/${id}/changes?api_key=${key}`,
    alternativeTitles: (id: number): string =>
      `${baseUrl}/movie/${id}/alternative_titles?api_key=${key}`,
    externalIds: (id: number): string =>
      `${baseUrl}/movie/${id}/external_ids?api_key=${key}`,
  },
  tv: {
    popular: `${baseUrl}/tv/popular?api_key=${key}`,
    topRated: `${baseUrl}/tv/top_rated?api_key=${key}`,
    airingToday: `${baseUrl}/tv/airing_today?api_key=${key}`,
    details: (id: number): string => `${baseUrl}/tv/${id}?api_key=${key}`,
    credits: (id: number): string =>
      `${baseUrl}/tv/${id}/credits?api_key=${key}`,
    videos: (id: number): string => `${baseUrl}/tv/${id}/videos?api_key=${key}`,
    images: (id: number): string => `${baseUrl}/tv/${id}/images?api_key=${key}`,
    translations: (id: number): string =>
      `${baseUrl}/tv/${id}/translations?api_key=${key}`,
    alternativeTitles: (id: number): string =>
      `${baseUrl}/tv/${id}/alternative_titles?api_key=${key}`,
    externalIds: (id: number): string =>
      `${baseUrl}/tv/${id}/external_ids?api_key=${key}`,
  },
  seasons: {
    details: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}?api_key=${key}&language=en-US`,
    videos: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/videos?api_key=${key}&language=en-US`,
    images: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/images?api_key=${key}&language=en-US`,
    translations: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/translations?api_key=${key}&language=en-US`,
    credits: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/credits?api_key=${key}&language=en-US`,
    externalIds: (id: number, season_number: number): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/external_ids?api_key=${key}`,
  },
  episodes: {
    details: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${key}&language=en-US`,
    credits: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}/credits?api_key=${key}&language=en-US`,
    videos: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}/videos?api_key=${key}&language=en-US`,
    images: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}/images?api_key=${key}&language=en-US`,
    translations: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}/translations?api_key=${key}&language=en-US`,
    externalIds: (
      id: number,
      season_number: number,
      episode_number: number
    ): string =>
      `${baseUrl}/tv/${id}/season/${season_number}/episode/${episode_number}/external_ids?api_key=${key}`,
  },
  company: {
    details: (id: number): string => `${baseUrl}/company/${id}?api_key=${key}`,
    images: (id: number): string =>
      `${baseUrl}/company/${id}/images?api_key=${key}`,
  },
  configuration: {
    languages: `${baseUrl}/configuration/languages?api_key=${key}`,
    countries: `${baseUrl}/configuration/countries?api_key=${key}`,
    jobs: `${baseUrl}/configuration/jobs?api_key=${key}`,
  },
  genres: {
    movieList: `${baseUrl}/genre/movie/list?api_key=${key}`,
    tvList: `${baseUrl}/genre/tv/list?api_key=${key}`,
  },
  certification: {
    movie: `${baseUrl}/certification/movie/list?api_key=${key}`,
    tv: `${baseUrl}/certification/tv/list?api_key=${key}`,
  },
  discover: {
    movie: (
      page: number = 1,
      releaseDateStart: string = "2024-01-01"
    ): string =>
      `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${releaseDateStart}&sort_by=primary_release_date.asc&api_key=${key}`,
    tv: (page: number = 1): string =>
      `${baseUrl}/discover/tv?first_air_date.gte=2024-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=first_air_date.asc&api_key=${key}`,
  },
  changes: {
    movie: (
      page: number = 1,
      endDate: string = new Date().toISOString()
    ): string =>
      `${baseUrl}/movie/changes?api_key=${key}&page=${page}&end_date=${endDate}`,
    tv: (
      page: number = 1,
      endDate: string = new Date().toISOString()
    ): string =>
      `${baseUrl}/tv/changes?api_key=${key}&page=${page}&end_date=${endDate}`,
    people: (
      page: number = 1,
      endDate: string = new Date().toISOString()
    ): string =>
      `${baseUrl}/person/changes?api_key=${key}&page=${page}&end_date=${endDate}`,
  },
  people: {
    details: (id: number): string => `${baseUrl}/person/${id}?api_key=${key}`,
    images: (id: number): string =>
      `${baseUrl}/person/${id}/images?api_key=${key}`,
    externalIds: (id: number): string =>
      `${baseUrl}/person/${id}/external_ids?api_key=${key}`,
  },
  network: {
    details: (id: number): string => `${baseUrl}/network/${id}?api_key=${key}`,
  },
};

export { endpoints };
