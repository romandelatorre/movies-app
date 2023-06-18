<template>
  <div class="relative inline-block w-64 my-8">
    <select
      class="block appearance-none w-full bg-gray-700 border border-gray-200 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
      v-model="selectedValueYear"
      @change="searchMovies"
    >
      <option disabled value="">Filter By Year</option>
      <option
        class="bg-gray-800"
        v-for="option in options.year"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
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
      class="block appearance-none w-full bg-gray-700 border border-gray-200 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
      v-model="selectedValueGenre"
      @change="searchMovies"
    >
      <option disabled value="">Filter By Genre</option>
      <option
        class="bg-gray-800"
        v-for="option in options.genre"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
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
</template>

<script>
export default {
  name: "FilterMovies",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedValueYear: "",
      selectedValueGenre: "",
    };
  },
  methods: {
    searchMovies() {
      this.$emit("selected-option", {
        selectedValueGenre: this.selectedValueGenre,
        selectedValueYear: this.selectedValueYear,
      });
      this.$store.dispatch("filterMoviesBy", {
        selectedValueGenre: this.selectedValueGenre,
        selectedValueYear: this.selectedValueYear,
      });
    },
  },
};
</script>
