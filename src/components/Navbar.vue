<template>
      <div class="bg-pink-700 flex gap-3 h-auto mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 items-center justify-around">
        <router-link :to="{name: 'home'}" class="p-3 hover:bg-pink-800">Home</router-link>
        <router-link :to="{name: 'favourite'}" class="p-3 hover:bg-pink-800">Favourite</router-link>
        <div v-if="!isLoggedIn" class="flex gap-3 items-center justify-around ">
          <router-link :to="{name: 'sign-up'}" class="p-3 hover:bg-pink-800">Sign Up</router-link>
          
        </div>
        <div v-if="!isLoggedIn" class="flex gap-3 items-center justify-around ">
          
          <router-link :to="{name: 'log-in'}" class="p-3 hover:bg-pink-800">Log In</router-link>
        </div>
        <div v-else>
          <button @click="logoutUser" class="p-3 hover:bg-pink-800">Logout</button>
        </div>
      </div>
</template>

<script>
import "../store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SessionManager",
  computed: {
      ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  data() {
      return {
      signUpEmail: "",
      signUpPassword: "",
      loginEmail: "",
      loginPassword: "",
      };
  },
  methods: {
      ...mapActions(["registerUser", "loginUser", "logoutUser"]),
      onSignUp(event) {
          event.preventDefault();
          let data = {
          user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
          },
      };
      this.registerUser(data);
      this.resetData();
      },
      onLogin(event) {
          event.preventDefault();
          let data = {
              user: {
                  email: this.loginEmail,
                  password: this.loginPassword,
              },
          };
          this.loginUser(data);
          this.resetData();
      },
      resetData() {
          this.signUpEmail = "";
          this.signUpPassword = "";
          this.loginEmail = "";
          this.loginPassword = "";
      },
  },
}




</script>