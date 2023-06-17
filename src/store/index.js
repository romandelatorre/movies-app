import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    movies: [],
    loading: false,
    error: null,
    selectedMovie: [],
    selectedOption: "",
  },
  getters: {
    movies: (state) => state.movies,
    selectedMovie: (state) => state.selectedMovie,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    setSelectedOption(state, payload) {
      state.selectedOption = payload;
    },
    setSelectedMovie(state, movie) {
      state.selectedMovie = movie;
    },
    setMovies(state, movies) {
      state.movies = movies;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, error) {
      state.error = error;
      state.loading = false;
    },
  },
  actions: {
    selectMovies({ commit }, movie) {
      commit("setSelectedMovie", movie);
    },
    fetchMovies({ commit }) {
      commit("setLoading");

      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=4f44d17afd0023ff85f7855d3ce97fc7`
        )
        .then((response) => {
          const dataResponse = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            year: movie.release_date.substring(0, 4),
            genre: movie.genre_ids,
            rating: movie.vote_average,
          }));
          commit("setMovies", dataResponse);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    searchMovies({ commit }, { query }) {
      commit("setLoading");

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=4f44d17afd0023ff85f7855d3ce97fc7&query=${query}`
        )
        .then((response) => {
          const dataResponse = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            year: movie.release_date.substring(0, 4),
            genre: movie.genre_ids,
            rating: movie.vote_average,
          }));
          commit("setMovies", dataResponse);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    searchMoviesByYear({ commit }, query) {
      commit("setSelectedMovie", query);
      commit("setLoading");
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=4f44d17afd0023ff85f7855d3ce97fc7&primary_release_year=${query}`
        )
        .then((response) => {
          const dataResponse = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            year: movie.release_date.substring(0, 4),
            genre: movie.genre_ids,
            rating: movie.vote_average,
          }));
          commit("setMovies", dataResponse);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
  },
});
