<template>
  <div class="relative inline-block w-64">
    <select
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-model="ratingQuery"
      @change="searchMovies"
    >
      <option value="">Filter by rating</option>
      <option v-for="rating in ratings" :key="rating" :value="rating">
        {{ rating }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M14.707 7.293a1 1 0 0 0-1.414-1.414L10 9.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
        />
      </svg>
    </div>
  </div>
  <div class="relative inline-block w-64">
    <select
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-model="yearQuery"
      @change="searchMovies"
    >
      <option value="">Filter by year</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M14.707 7.293a1 1 0 0 0-1.414-1.414L10 9.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
        />
      </svg>
    </div>
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="clearFilters"
  >
    Clear Filters
  </button>

  <div class="relative">
    <input
      type="text"
      v-model="query"
      placeholder="Search for a movie"
      class="w-full rounded bg-gray-200 focus:outline-none focus:shadow-outline px-4 py-2"
      @keyup.enter="searchMovies"
    />
    <button class="absolute right-0 top-0 mt-3 mr-4" @click="searchMovies">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path
          d="M20 18.3l-5.1-5.1C15.6 11.2 16 9.7 16 8c0-4.4-3.6-8-8-8S0 3.6 0 8s3.6 8 8 8c1.7 0 3.2-.4 4.7-1.1l5.1 5.1c.2.2.4.3.6.3s.4-.1.6-.3c.3-.3.3-.8 0-1.1zM8 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
        />
      </svg>
    </button>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div
      v-for="movie in filteredMovies"
      :key="movie.id"
      @click="handleMovieClick(movie)"
      class="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <img class="w-full" :src="`${movie.image}`" alt="Movie poster" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          {{ movie.title }} ({{ movie.year }})
        </div>
        <p class="text-gray-700 text-base">
          {{ movie.overview }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >Action</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >Cars</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >Animated</span
        >
      </div>
      <div class="font-bold text-l mb-2">Rating: {{ movie.rating }}</div>
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
    ratings() {
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
