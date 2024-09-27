import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: "dev-lue7xxax52ldwsvl.us.auth0.com",
    clientId: "OH95L8q9Mn383VFfj5RQdYTDknU4l87W",  
    /* domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENT_ID, */
    authorizationParams: {
      redirect_uri: "http://localhost:5173/list"
      //redirect_uri: "https://proradipls.onrender.com/list"
    }
  })
);
app.use(createPinia())
app.use(router)
app.mount('#app');