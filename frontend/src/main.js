import { createApp } from "vue";

import axios from "axios";
axios.create();
axios.defaults.baseURL = "http://localhost:8082/api/v1/"; //using backend api gateway here

import VueNativeNotification from "vue3-native-notification"; 

import App from "./App.vue";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import router from "./router/index";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/style/scss/global.scss";

const app = createApp(App);

//declaring all the packages used by the Vue instance (that pull their components in scope) (aka asset registration)
app.config.globalProperties.window = window;

app
  .use(VueNativeNotification, {
    requestOnNotify: true,
  })
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc",
    },
  })
  .use(router)
  .use(store)
  .mount("#app");

//The .mount() method should always be called after all app configurations and asset
//registrations are done. Also note that its return value, unlike the asset registration methods,
//is the root component instance instead of the application instance.
