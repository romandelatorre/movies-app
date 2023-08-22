<template>
  <NavBar :showButton="false" @inputData="searchNavBarMovies" />
  <div class="flex flex-row items-center justify-center h-[calc(100%-5rem)]">
    <div class="flex flex-row w-2/4">
      <div class="flex-none overflow-hidden">
        <img
          :src="`${selectedMovieData.image}`"
          alt="Imagen"
          class="object-cover h-full w-full"
        />
      </div>
      <div
        class="bg-slate-900 p-7 flex flex-col justify-center leading-normal text-white"
      >
        <div class="mb-8">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-10">
              {{ selectedMovieData.title }} ({{ selectedMovieData.year }})
            </div>
            <p class="text-justify">
              {{ selectedMovieData.overview }}
            </p>
          </div>
          <div class="font-bold text-l mb-2">
            Rating: {{ selectedMovieData.rating }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(["selectedMovie"]),
    selectedMovieData() {
      return this.selectedMovie;
    },
    movieId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.selectMovies({ id: this.movieId });
  },
  methods: {
    ...mapActions(["selectMovies"]),
  },
};
</script>
