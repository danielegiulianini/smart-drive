import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

//import HelloWorld from "../components/HelloWorld.vue";
import TheAppProfilePage from "../views/TheAppProfilePage.vue";
import TripsOverviewPage from "../views/TripsOverviewPage.vue";
import TripDetailPage from "../views/TripDetailPage.vue";
import TripDetailPage2 from "../views/TripDetailPage2.vue";

import DashboardPage from "../views/DashboardPage.vue";
import GaragePage from "../views/GaragePage.vue";
import VehicleDetailPage from "../views/VehicleDetailPage.vue";
import VehicleDetailPage2 from "../views/VehicleDetailPage2.vue";
import ScorePage from "../views/ScorePage.vue";

import DriveModePage from "../views/DriveModePage.vue";
import DriveModePage2 from "../views/DriveModePage2.vue";
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

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    //props:true,
    component: TheAppProfilePage,
  },
  {
    path: "/trips",
    name: "Trips",
    //props:true,
    meta: {
      requiresAuth: true,
    },
    component: TripsOverviewPage,
  },
  { path: "/trips/:id", component: TripDetailPage },
  { path: "/trips2/:id", component: TripDetailPage2 },
  { path: "/dashboard", component: DashboardPage },
  { path: "/garage", component: GaragePage }, //or vehicles...

  { path: "/vehicle/:id", name: "VehicleDetail", component: VehicleDetailPage }, //or vehicles...
  { path: "/vehicle2/:_id", component: VehicleDetailPage2, props: true }, //or vehicles... HERE PROPS ARE NEEDED

  { path: "/drive/:id", component: DriveModePage },
  { path: "/drive2/:id", component: DriveModePage2 },

  { path: "/score/:id", component: ScorePage },

  { path: "/signup", name: "signup", component: SignupStepperPage },
  { path: "/signup2", component: SignupStepperPage2 },
  { path: "/signup3", component: SignupStepperPage3 },
  { path: "/signup4", component: UserSignupFormPage },

  { path: "/tripsSummary", component: TripSummaryPage },
  { path: "/fileUpload", component: fileUpload },

  { path: "/addVehicle", component: AddVehicleFormPage },
  { path: "/supabase", component: SupabaseTestPage },
  { path: "/startTrip", component: StartTripPage },
  { path: "/login", component: UserLoginFormPage },
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
    if (!store.getters.isLoggedIn) {
      console.log("user not logged in");
      next({ name: "signup" }); //TODO CHANGE TO LOGIN!
    } else {
      console.log("user logged in");

      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
