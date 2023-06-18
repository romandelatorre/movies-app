<template>
  <NavBar :showButton="false" @inputData="searchNavBarMovies" />
  <div class="flex justify-center items-center mx-auto max-w-4xl">
    <div
      class="flex flex-col md:flex-row bg-gray-100 rounded-lg p-4 w-full max-w-4xl"
    >
      <div class="md:w-1/2">
        <img
          :src="`${selectedMovieData.image}`"
          alt="Imagen"
          class="object-cover h-full w-full rounded-lg"
        />
      </div>
      <div class="md:w-1/2 flex flex-col justify-between px-4 py-2">
        <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
};
</script>
