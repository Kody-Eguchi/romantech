<template>
  <header>
     
      <div>
        <router-link :to="{name: 'home'}">Home</router-link>
        <router-link :to="{name: 'favourite'}">Favourite</router-link>
        
        <div v-if="!isLoggedIn">
          <router-link :to="{name: 'sign-up'}">Sign Up</router-link>
          <router-link :to="{name: 'log-in'}">Log In</router-link>
        </div>
        <div v-else>
          <button @click="logoutUser" class="logout-button" >Logout</button>
        </div>
        
       
      </div>
    </header>
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