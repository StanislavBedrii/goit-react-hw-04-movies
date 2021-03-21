import axios from 'axios';

const API_KEY = 'a0af0405af148f9ebed934a58d0f59de';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = { api_key: API_KEY };

const fetchTrendingMovies = async (page = 1) => {
  try {
    const { data } = await axios.get(`/trending/movie/day?page=${page}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchMovies = async (query, page = 1) => {
  try {
    const { data } = await axios.get(
      `/search/movie?language=en-US&page=${page}&include_adult=false&query=${query}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchMovieDetails = async movieID => {
  try {
    const { data } = await axios.get(`/movie/${movieID}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchMovieCredits = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchMovieReviews = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {
  fetchTrendingMovies,
  fetchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};

// https://developers.themoviedb.org/3/trending/get-trending - список самых популярных фильмов на сегодня для создания коллекции на главной странице.
// https://developers.themoviedb.org/3/search/search-movies - поиск кинофильма по ключевому слову на странице фильмов.
// https://developers.themoviedb.org/3/movies/get-movie-details - запрос полной информации о фильме для страницы кинофильма.
// https://developers.themoviedb.org/3/movies/get-movie-credits - запрос информации о актёрском составе для страницы кинофильма.
// https://developers.themoviedb.org/3/movies/get-movie-reviews - запрос обзоров для страницы кинофильма.
