<template>
  <div>
    <div>
      <select v-model="ratingQuery" @change="searchMovies">
        <option value="">Filter by rating</option>
        <option v-for="rating in directors" :key="rating">
          {{ rating }}
        </option>
      </select>
      <select v-model="yearQuery" @change="searchMovies">
        <option value="">Filter by year</option>
        <option v-for="movie in filteredMovies" :key="movie">
          {{ movie.year }}
        </option>
      </select>
      <button @click="clearFilters">Clear Filters</button>
    </div>
    <input
      type="text"
      v-model="query"
      placeholder="Search for a movie"
      @keyup.enter="searchMovies"
    />
    <button @click="searchMovies">Search</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        @click="handleMovieClick(movie)"
      >
        <img
          :src="`${movie.image}`"
          alt="Movie poster"
          style="width: 100px; height: auto"
        />
        <div>
          <strong>{{ movie.title }}</strong>
        </div>
        <div>
          <strong>({{ movie.year }})</strong>
        </div>
        <div>{{ movie.overview }}</div>
        <div>Rating: {{ movie.rating }}</div>
        <div>Genres: {{ movie.genre }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      query: "",
      yearQuery: "",
      ratingQuery: "",
    };
  },
  computed: {
    ...mapGetters(["movies", "loading", "error"]),
    years() {
      return [...new Set(this.movies.map((movie) => movie.release_year))];
    },
    directors() {
      return [...new Set(this.movies.map((movie) => movie.rating))];
    },
    filteredMovies() {
      let filteredMovies = this.movies;
      if (this.ratingQuery) {
        filteredMovies = filteredMovies.filter(
          (movie) =>
            movie.rating.toLowerCase() === this.ratingQuery.toLowerCase()
        );
      }
      if (this.yearQuery) {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.year === parseInt(this.yearQuery)
        );
      }
      if (this.query) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.title.toLowerCase().includes(this.query.toLowerCase())
        );
      }
      return filteredMovies;
    },
  },
  methods: {
    ...mapActions(["fetchMovies", "searchMovies", "selectMovies"]),
    handleMovieClick(movie) {
      this.selectMovies(movie);
      this.$router.push(`/movieDetail/${movie.id}`);
    },
    searchMovies() {
      this.$store.dispatch("searchMovies", {
        query: this.query,
        year: this.yearQuery,
        rating: this.ratingQuery,
      });
    },
    clearFilters() {
      this.ratingQuery = "";
      this.yearQuery = "";
      this.searchMovies();
    },
  },
  mounted() {
    this.$store.dispatch("fetchMovies");
  },
};
</script>
