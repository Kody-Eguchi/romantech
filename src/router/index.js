import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Favourite from "../views/Favourite.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";

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
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "log-in",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
