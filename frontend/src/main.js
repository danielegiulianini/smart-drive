import { createApp } from "vue";

import axios from "axios";
axios.create();
axios.defaults.baseURL = "http://localhost:8082/api/v1/"; //using backend api gateway here
//"http://localhost:8086/api/v1/"//for testing direct nteraction with microservice

import Vue from "vue";
import App from "./App.vue";
import { io } from "socket.io-client";

import router from "./router/index";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/style/scss/global.scss";

Vue.prototype.$socket = io("http://localhost:8082/api/v1/notifications"); //io(process.env.APP_API_URL_BASE);

createApp(App)
  //declaring all the packages used by the Vue instance (that pull their components in scope) (aka asset registration)
  //.use(VueApexCharts);

  .use(router)
  .use(store)
  .mount("#app");
//The .mount() method should always be called after all app configurations and asset
//registrations are done. Also note that its return value, unlike the asset registration methods,
//is the root component instance instead of the application instance.
