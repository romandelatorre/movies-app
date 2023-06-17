<template>
  <NavBar @inputData="onInputData" />
  <p>{{ text }}</p>
  <div class="relative inline-block w-64">
    <select
      class="block appearance-none w-full bg-gray-700 border border-gray-200 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-model="ratingQuery"
      @change="searchMovies"
    >
      <option value="">Filter by rating</option>
      <option v-for="rating in ratings" :key="rating" :value="rating">
        {{ rating }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white"
    >
      <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
        <path
          d="M14.707 7.293a1 1 0 0 0-1.414-1.414L10 9.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
        />
      </svg>
    </div>
  </div>
  <div class="relative inline-block w-64">
    <select
      class="block appearance-none w-full bg-gray-700 border border-gray-200 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-model="yearQuery"
      @change="searchMovies"
    >
      <option value="">Filter by year</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white"
    >
      <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
        <path
          d="M14.707 7.293a1 1 0 0 0-1.414-1.414L10 9.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
        />
      </svg>
    </div>
  </div>
  <button
    class="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="clearFilters"
  >
    Clear Filters
  </button>

  <div class="flex justify-center items-center">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <swiper
      class="w-3/4"
      :navigation="true"
      :slidesPerView="3"
      :spaceBetween="40"
      :freeMode="true"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
    >
      <swiper-slide
        v-for="movie in filteredMovies"
        :key="movie.id"
        @click="handleMovieClick(movie)"
        class="rounded overflow-hidden shadow-lg"
      >
        <img class="w-full h-96" :src="`${movie.image}`" alt="Movie poster" />

        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            {{ movie.title }} ({{ movie.year }})
          </div>
          <p class="text-gray-700 text-base">
            {{ movie.overview.substring(0, 100) + "..." }}
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
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavBar from "@/components/NavBar";

export default {
  components: {
    Swiper,
    SwiperSlide,
    NavBar,
  },
  setup() {
    return {
      modules: [FreeMode, Pagination, Navigation],
    };
  },
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
    onInputData(query) {
      this.query = query;
      !query.length ? this.$store.dispatch("fetchMovies") : this.searchMovies();
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
