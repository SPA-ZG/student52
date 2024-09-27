<template>
  <nav class="navbar top-div" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">


      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/list" class="navbar-item">
          List of expenses
        </router-link>

        <router-link to="/add" class="navbar-item">
          Add new expense
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button  class="button is-link is-light" @click="logout">Log out</button>

          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// Composition API
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const auth0 = useAuth0();
    

    return {
      logout() {
        auth0.logout({ 
          logoutParams: { 
            returnTo: "http://localhost:5173/"
          } 
        });
      }
    };
  }
};


</script>

<style>

@import "bulma/css/bulma.min.css";

  .top-div {
    position: absolute;
    top: 0; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 1; 
  }








</style>
