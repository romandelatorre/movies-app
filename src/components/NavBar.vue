<template>
  <nav class="bg-slate-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <span
        class="flex items-centerself-center text-2xl font-semibold whitespace-nowrap text-white"
        >Movies App</span
      >
      <div v-if="showButton">
        <div class="flex md:order-2">
          <div class="relative hidden md:block">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <span class="sr-only">Search icon</span>
            </div>

            <input
              type="text"
              autocomplete="off"
              v-model="query"
              placeholder="Search for a movie"
              @input="searchMovies"
              id="search-navbar"
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <router-link to="/">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-blu-700 rounded"
          >
            Back To Home
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    showButton: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    searchMovies() {
      this.$emit("inputData", this.query);
    },
  },
};
</script>
