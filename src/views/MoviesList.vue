<template>
  <NavBar :showButton="true" @inputData="searchNavBarMovies" />
  <FilterMovies
    :options="selectOptions"
    v-model="selectedOptionYear"
    @selected-option="updateSelectedOption"
  />
  <div class="mt-5">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <swiper
      class="max-w-screen-lg"
      :effect="'coverflow'"
      :grabCursor="true"
      :slidesPerView="3"
      :spaceBetween="30"
      :freeMode="true"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :modules="modules"
    >
      <swiper-slide
        v-for="movie in filteredMovies"
        :key="movie.id"
        @click="handleMovieClick(movie)"
        class="rounded overflow-hidden shadow-lg bg-slate-900 text-white"
      >
        <img :src="`${movie.image}`" alt="Movie poster" />

        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            {{ movie.title }} ({{ movie.year }})
          </div>
          <p class="line-clamp-2 -webkit-box">
            {{ movie.overview }}
          </p>
        </div>

        <div class="font-bold text-l mb-2">Rating: {{ movie.rating }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Navigation, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavBar from "@/components/NavBar";
import FilterMovies from "@/components/FilterMovies";

export default {
  components: {
    Swiper,
    SwiperSlide,
    NavBar,
    FilterMovies,
  },
  setup() {
    return {
      modules: [FreeMode, Pagination, Navigation, EffectCoverflow],
    };
  },
  data() {
    return {
      query: "",
      selectOptions: {
        year: [
          { label: "2023", value: "2023" },
          { label: "2022", value: "2022" },
          { label: "2021", value: "2021" },
          { label: "2020", value: "2020" },
          { label: "2019", value: "2019" },
          { label: "2018", value: "2018" },
          { label: "2017", value: "2017" },
          { label: "2016", value: "2016" },
          { label: "2015", value: "2015" },
        ],
        genre: [
          { label: "Accion", value: "28" },
          { label: "Comedia", value: "35" },
          { label: "Romance", value: "10749" },
          { label: "Ficcion", value: "878" },
          { label: "Terror", value: "27" },
        ],
      },
      selectOptionGenre: "",
      selectedOptionYear: "",
    };
  },
  computed: {
    ...mapGetters(["movies", "loading", "error"]),

    filteredMovies() {
      let filteredMovies = this.movies;
      return filteredMovies;
    },
  },
  methods: {
    ...mapActions([
      "fetchMovies",
      "searchMovies",
      "selectMovies",
      "filterMoviesBy",
    ]),
    handleMovieClick(movie) {
      this.$router.push(`/movieDetail/${movie.id}`);
    },
    searchNavBarMovies(query) {
      this.query = query;
      !query.length ? this.$store.dispatch("fetchMovies") : this.searchMovies();
    },
    updateSelectedOption(movies) {
      this.selectedOptionYear = movies.year;
      this.selectedGenre = movies.genre;
    },
    searchMovies() {
      this.$store.dispatch("searchMovies", {
        query: this.query,
      });
    },
  },
  mounted() {
    this.$store.dispatch("fetchMovies");
  },
};
</script>
