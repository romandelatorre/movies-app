<template>
  <nav>
    <router-link to="/">Back To Home</router-link>
  </nav>

  <div
    v-if="selectedMovieData"
    class="max-w-sm rounded overflow-hidden shadow-lg"
  >
    <h2>Movie Details</h2>
    <img
      class="w-full"
      :src="`${selectedMovieData.image}`"
      alt="Movie poster"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        {{ selectedMovieData.title }} ({{ selectedMovieData.year }})
      </div>
      <p class="text-gray-700 text-base">
        {{ selectedMovieData.overview }}
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
    <div class="font-bold text-l mb-2">
      Rating: {{ selectedMovieData.rating }}
    </div>
  </div>
  <div v-else>
    <h2>No se ha seleccionado ninguna imagen</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["selectedMovie"]),
    selectedMovieData() {
      return this.selectedMovie;
    },
  },
};
</script>
