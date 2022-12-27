import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

//import HelloWorld from "../components/HelloWorld.vue";
import ProfilePage from "../views/ProfilePage.vue";
import TripDetailPage2 from "../views/TripDetailPage2.vue";
import TripDetailPage from "../views/TripDetailPage.vue";

import DashboardPage from "../views/DashboardPage.vue";
import GaragePage from "../views/GaragePage.vue";
import VehicleDetailPage2 from "../views/VehicleDetailPage2.vue";
import ScorePage from "../views/ScorePage.vue";

import DriveModePage from "../views/DriveModePage.vue";
import DriveModePage2 from "../views/DriveModePage2.vue";
import DriveModePage3 from "../views/DriveModePage3.vue";

import SignupStepperPage from "../views/SignupStepperPage.vue";
import SignupStepperPage2 from "../views/SignupStepperPage2.vue";
import SignupStepperPage3 from "../views/SignupStepperPage3.vue";
import TripSummaryPage from "../views/TripSummary.vue";
import fileUpload from "../views/FileUploadPage.vue";
import AddVehicleFormPage from "../views/AddVehicleFormPage.vue";
import HomePage from "../views/HomePage.vue";
import SupabaseTestPage from "../views/SupabaseTestPage.vue";
import StartTripPage from "../views/StartTripPage.vue";
import UserSignupFormPage from "../views/UserSignupFormPage.vue";
import UserLoginFormPage from "../views/UserLoginPage.vue";
import AllAppBadgesPage from "../views/AllAppUserBadgesPage.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    component: ProfilePage,
  },
  { path: "/dashboard", component: DashboardPage },
  { path: "/garage", name: "Garage", component: GaragePage }, //or vehicles...
  { path: "/vehicle2/:_id", component: VehicleDetailPage2, props: true }, //or vehicles... HERE PROPS ARE NEEDED
  {
    path: "/drive/:id",
    component: DriveModePage,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/drive2/:id", component: DriveModePage2 },

  { path: "/score/:id", component: ScorePage },

  { path: "/signup", name: "signup", component: SignupStepperPage },
  { path: "/signup2", component: SignupStepperPage2 },
  { path: "/signup3", component: SignupStepperPage3 },
  { path: "/signup4", component: UserSignupFormPage },

  { path: "/fileUpload", component: fileUpload },

  { path: "/addVehicle", component: AddVehicleFormPage },
  { path: "/supabase", component: SupabaseTestPage },

  //==============trips-related=========================
  { path: "/tripsSummary", component: TripSummaryPage },
  {
    path: "/trips/:id",
    props: true, //HERE PROPS ARE NEEDED
    component: TripDetailPage,
  },
  {
    path: "/trips2/:id",
    props: true, //HERE PROPS ARE NEEDED
    component: TripDetailPage2,
  },
  { path: "/startTrip", component: StartTripPage },
  //====================================================

  { path: "/login", name: "login", component: UserLoginFormPage },
  { path: "/allBadges", name: "allBadges", component: AllAppBadgesPage },
  {
    path: "/drive3",
    meta: {
      requiresAuth: true,
    },
    component: DriveModePage3,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//from: https://stackoverflow.com/questions/52653337/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("store.getters.getUser returns ", store.getters.getUser);

    console.log("store.getters.isLoggedIn returns ", store.getters.isLoggedIn);
    if (!store.getters.isLoggedIn) {
      console.log("user not logged in");
      next({ name: "login" }); //TODO CHANGE TO LOGIN!
    } else {
      console.log("user logged in");

      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
