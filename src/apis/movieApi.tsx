import axios from "axios";
import { BASE_URL } from "../utils/constant";
import axiosAuth from "./apiService";

export const movieApi = {
  searchMovie: (payload: any) => {
    return axios.post(`${BASE_URL}/api/movies/search`, payload);
  },
  getMovieById: (id: any) => {
    return axios.get(`${BASE_URL}/api/movies/${id}`);
  },
  searchGenre: (payload: any) => {
    return axios.post(`${BASE_URL}/api/genres/search`, payload);
  },
  comment: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/comments`, payload);
  },
  ratingMovie: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/ratings/movie`, payload);
  },
  ratingEpisode: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/ratings/episode`, payload);
  },
  getRatingMovieByAccount: (payload: any) => {
    return axiosAuth.post(
      `${BASE_URL}/api/ratings/movie/get-by-account`,
      payload
    );
  },
  getRatingEpisodeByAccount: (payload: any) => {
    return axiosAuth.post(
      `${BASE_URL}/api/ratings/episode/get-by-account`,
      payload
    );
  },
  getActorById: (id: any) => {
    return axios.get(`${BASE_URL}/api/actors/${id}`);
  },
  getDirectorById: (id: any) => {
    return axios.get(`${BASE_URL}/api/directors/${id}`);
  },
  getListMoviesByActor: (actorId: any) => {
    return axios.get(`${BASE_URL}/api/actors/movie/${actorId}`);
  },
  getListMoviesByDirector: (directorId: any) => {
    return axios.get(`${BASE_URL}/api/directors/movie/${directorId}`);
  },
  getEpisodeById: (id: any) => {
    return axios.get(`${BASE_URL}/api/episodes/${id}`);
  },
  getTrendingMovie: () => {
    return axios.get(`${BASE_URL}/api/movies/trending`);
  },
  getListMoviesSimilar: (id: any) => {
    return axios.get(`${BASE_URL}/api/movies/similar/${id}`);
  },
};
