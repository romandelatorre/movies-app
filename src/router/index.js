import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "../views/MoviesList.vue";

const routes = [
  {
    path: "/",
    name: "moviesList",
    component: MoviesList,
  },
  {
    path: "/movieDetail/:id",
    name: "movieDetail",
    component: () => import("../views/MooviesDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
