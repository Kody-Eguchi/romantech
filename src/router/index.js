import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Favourite from "../views/Favourite.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/favourite",
    name: "favourite",
    component: Favourite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
