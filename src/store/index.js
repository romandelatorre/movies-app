import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    movies: [],
    loading: false,
    error: null,
    selectedMovie: [],
  },
  getters: {
    movies: (state) => state.movies,
    selectedMovie: (state) => state.selectedMovie,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
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
    filterMoviesBy({ commit }, queryValue) {
      commit("setLoading");
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=4f44d17afd0023ff85f7855d3ce97fc7&sort_by=popularity.desc&with_genres=${queryValue?.selectedValueGenre}&primary_release_year=${queryValue?.selectedValueYear}`
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
