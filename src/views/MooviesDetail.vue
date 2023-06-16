<template>
  <nav>
    <router-link to="/">Back To Home</router-link>
  </nav>
  <div v-if="selectedMovieData">
    <h2>Movie Details</h2>
    <img
      :src="`${selectedMovieData.image}`"
      alt="Movie poster"
      style="width: 100px; height: auto"
    />
    <div>
      <strong>{{ selectedMovieData.title }}</strong>
    </div>
    <div>
      <strong>({{ selectedMovieData.year }})</strong>
    </div>
    <div>{{ selectedMovieData.overview }}</div>
    <div>Rating: {{ selectedMovieData.rating }}</div>
    <div>Genres: {{ selectedMovieData.genre }}</div>
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
