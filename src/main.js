import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import store from "./store";

// LOAD JWT FROM LOCAL STORAGE ON REFRESH
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefined" && auth_token !== null;
  if (authTokenExists) {
    store.dispatch("loginUserWithToken", { auth_token });
  }
}

createApp(App).use(store).use(router).mount("#app");
